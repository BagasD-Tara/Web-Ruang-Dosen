"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Trash2, GripVertical, Plus, Clock, Star } from "lucide-react";
import {
  getQuizById,
  getQuizQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateQuiz,
} from "@/app/lib/api/quiz";
import type { Quiz, QuizQuestion } from "@/app/types/quiz";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OptionFormState {
  label: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionFormState {
  questionText: string;
  options: OptionFormState[];
  explanation: string;
  points: number;
  required: boolean;
  shuffle: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyQuestion(): QuestionFormState {
  return {
    questionText: "",
    options: [
      { label: "A", text: "", isCorrect: false },
      { label: "B", text: "", isCorrect: false },
      { label: "C", text: "", isCorrect: false },
      { label: "D", text: "", isCorrect: false },
    ],
    explanation: "",
    points: 5,
    required: true,
    shuffle: false,
  };
}

function questionToForm(q: QuizQuestion): QuestionFormState {
  return {
    questionText: q.questionText,
    options: q.options.map((o) => ({
      label: o.label,
      text: o.text,
      isCorrect: o.isCorrect ?? false,
    })),
    explanation: q.explanation ?? "",
    points: q.points,
    required: true,
    shuffle: false,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuizEditorPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<QuestionFormState>(emptyQuestion());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    async function load() {
      setError(null);
      try {
        const [quizData, questionsData] = await Promise.all([
          getQuizById(quizId),
          getQuizQuestions(quizId),
        ]);
        setQuiz(quizData);
        setQuestions(questionsData);
        if (questionsData.length > 0) {
          setEditForm(questionToForm(questionsData[0]));
          setActiveQuestionId(questionsData[0].id);
          setCurrentQIndex(0);
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data kuis. Periksa koneksi server.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [quizId]);

  // Simpan soal aktif ke API lalu pindah ke soal lain
  const saveCurrentAndSwitch = async (targetIndex: number) => {
    if (activeQuestionId && targetIndex !== currentQIndex) {
      setSaving(true);
      try {
        await updateQuestion(activeQuestionId, {
          questionText: editForm.questionText,
          options: editForm.options,
          explanation: editForm.explanation,
          points: editForm.points,
        });
      } catch (err) {
        console.error("Gagal menyimpan soal:", err);
      } finally {
        setSaving(false);
      }
    }
    const target = questions[targetIndex];
    if (target) {
      setCurrentQIndex(targetIndex);
      setActiveQuestionId(target.id);
      setEditForm(questionToForm(target));
    }
  };

  const handleSaveQuestion = async () => {
    if (!activeQuestionId) return;
    setSaving(true);
    try {
      const updated = await updateQuestion(activeQuestionId, {
        questionText: editForm.questionText,
        options: editForm.options,
        explanation: editForm.explanation,
        points: editForm.points,
      });
      setQuestions((prev) =>
        prev.map((q) => (q.id === activeQuestionId ? updated : q))
      );
    } catch (err) {
      console.error("Gagal menyimpan soal:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuestion = async () => {
    setSaving(true);
    try {
      // Simpan soal aktif dulu
      if (activeQuestionId) {
        await updateQuestion(activeQuestionId, {
          questionText: editForm.questionText,
          options: editForm.options,
          explanation: editForm.explanation,
          points: editForm.points,
        });
      }

      // Buat soal baru kosong
      const newQuestion = await createQuestion(quizId, {
        questionText: "Tulis pertanyaan di sini...",
        options: [
          { label: "A", text: "", isCorrect: true },
          { label: "B", text: "", isCorrect: false },
          { label: "C", text: "", isCorrect: false },
          { label: "D", text: "", isCorrect: false },
        ],
        explanation: "",
        points: 10,
      });

      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      const newIndex = updatedQuestions.length - 1;
      setCurrentQIndex(newIndex);
      setActiveQuestionId(newQuestion.id);
      setEditForm(questionToForm(newQuestion));
    } catch (err) {
      console.error("Gagal menambah soal:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuestion = async (index: number) => {
    const q = questions[index];
    if (!q) return;
    if (!confirm("Yakin ingin menghapus soal ini?")) return;
    try {
      await deleteQuestion(q.id);
      const updated = questions.filter((_, i) => i !== index);
      setQuestions(updated);
      const newIndex = Math.min(index, updated.length - 1);
      if (updated[newIndex]) {
        setCurrentQIndex(newIndex);
        setActiveQuestionId(updated[newIndex].id);
        setEditForm(questionToForm(updated[newIndex]));
      } else {
        setCurrentQIndex(0);
        setActiveQuestionId(null);
        setEditForm(emptyQuestion());
      }
    } catch (err) {
      console.error("Gagal menghapus soal:", err);
    }
  };

  // Publish: simpan dulu soal aktif, lalu update status quiz
  const handlePublish = async () => {
    if (!quiz) return;
    setPublishing(true);
    try {
      // Simpan soal aktif
      if (activeQuestionId) {
        await updateQuestion(activeQuestionId, {
          questionText: editForm.questionText,
          options: editForm.options,
          explanation: editForm.explanation,
          points: editForm.points,
        });
      }
      // Update status quiz via updateQuiz (tidak ada publishQuiz di backend)
      // Cukup navigate ke stats setelah simpan
      router.push(`/dosen/dosen/quiz/${quizId}/stats`);
    } catch (err) {
      console.error("Gagal menerbitkan kuis:", err);
    } finally {
      setPublishing(false);
    }
  };

  const setCorrectAnswer = (optionLabel: string) => {
    setEditForm((prev) => ({
      ...prev,
      options: prev.options.map((o) => ({
        ...o,
        isCorrect: o.label === optionLabel,
      })),
    }));
  };

  // ─── Render states ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="bg-gray-50 min-h-full pb-8">

      {/* Breadcrumb + Title */}
      <div className="max-w-7xl mx-auto w-full px-4 py-5">
        <p className="text-xs text-gray-500 mb-1">
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => router.back()}
          >
            Kuis
          </span>
          <span className="mx-1">›</span>
          <span>Editor</span>
        </p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Editor Kuis: {quiz.title}
            </h1>
            <p className="text-sm text-gray-500">{quiz.moduleTitle}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveQuestion}
              disabled={saving}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-60 transition-colors"
            >
              {saving ? "Menyimpan..." : "Simpan Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {publishing ? "Memproses..." : "Terbitkan Kuis"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 flex gap-6">

        {/* Sidebar kiri */}
        <div className="w-64 flex-shrink-0 space-y-4">

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">Pengaturan Kuis</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Durasi (Menit)</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{quiz.durationMinutes}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Ambang Kelulusan (%)</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span>{quiz.minimumScore}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Kesempatan Mencoba</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 appearance-none">
                  <option>1 Kali</option>
                  <option>2 Kali</option>
                  <option>Tidak Terbatas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Navigasi soal */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-700 mb-3">Navigasi Soal</p>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => saveCurrentAndSwitch(i)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold border-2 transition-colors ${
                    i === currentQIndex
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main editor */}
        <div className="flex-1 min-w-0 space-y-4">
          {questions.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-sm mb-4">Belum ada soal. Tambahkan soal pertama.</p>
              <button
                onClick={handleAddQuestion}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold mx-auto transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Soal Baru
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              {/* Header soal */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {currentQIndex + 1}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Pertanyaan Pilihan Ganda
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteQuestion(currentQIndex)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Teks pertanyaan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teks Pertanyaan
                </label>
                <textarea
                  rows={3}
                  value={editForm.questionText}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, questionText: e.target.value }))
                  }
                  placeholder="Tulis pertanyaan di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                />
              </div>

              {/* Pilihan jawaban */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilihan Jawaban{" "}
                  <span className="font-normal text-gray-400">(Centang untuk Kunci Jawaban)</span>
                </label>
                <div className="space-y-2">
                  {editForm.options.map((opt) => (
                    <div
                      key={opt.label}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                        opt.isCorrect ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="correct-answer"
                        checked={opt.isCorrect}
                        onChange={() => setCorrectAnswer(opt.label)}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                      />
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        opt.isCorrect ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {opt.label}.
                      </span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            options: prev.options.map((o) =>
                              o.label === opt.label ? { ...o, text: e.target.value } : o
                            ),
                          }))
                        }
                        placeholder={`Opsi ${opt.label}`}
                        className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
                      />
                      {opt.isCorrect && (
                        <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                          KUNCI
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer soal */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.required}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, required: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    Wajib Diisi
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.shuffle}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, shuffle: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-blue-600"
                    />
                    Acak Pilihan
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Poin:</span>
                  <input
                    type="number"
                    value={editForm.points}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, points: Number(e.target.value) }))
                    }
                    min={1}
                    className="w-16 px-2 py-1 rounded-lg border border-gray-200 text-sm text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tombol tambah soal */}
          <button
            onClick={handleAddQuestion}
            disabled={saving}
            className="w-full py-4 bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 transition-all text-sm font-medium disabled:opacity-60"
          >
            <Plus className="w-5 h-5" />
            Tambah Soal Baru
          </button>
        </div>
      </div>
    </div>
  );
}