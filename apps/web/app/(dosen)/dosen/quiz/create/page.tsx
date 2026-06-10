"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
// import { createQuiz } from "@/app/lib/api/quiz";
import { createQuiz } from "@/app/lib/mock/quizDosen";

export default function CreateQuizPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    courseId: "",
    moduleId: "",
    xpReward: 100,
    minimumScore: 70,
    durationMinutes: 60,
    status: "draft" as "draft" | "terkunci",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["xpReward", "minimumScore", "durationMinutes"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Judul kuis tidak boleh kosong.");
      return;
    }
    if (!form.courseId) {
      setError("Pilih mata kuliah terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const quiz = await createQuiz(form);
      router.push(`/dosen/quiz/${quiz.id}/edit`);
    } catch {
      setError("Gagal membuat kuis. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Detail Kuis</h1>
          <p className="text-sm text-gray-500 mb-8">
            Isi informasi dasar untuk membuat kuis baru bagi mahasiswa.
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Kuis
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Contoh: Ujian Tengah Semester Kalkulus I"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Mata kuliah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Mata Kuliah
              </label>
              <select
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition appearance-none"
              >
                <option value="">Pilih mata kuliah aktif...</option>
                {/* Options will be loaded from API in real implementation */}
                <option value="course-1">Advanced Machine Learning</option>
                <option value="course-2">Dasar-Dasar Algoritma</option>
                <option value="course-3">Basis Data</option>
              </select>
            </div>

            {/* Three fields row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reward XP
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="xpReward"
                    value={form.xpReward}
                    onChange={handleChange}
                    min={0}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-red-500">
                    XP
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skor Minimum Lulus
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="minimumScore"
                    value={form.minimumScore}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi (Menit)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="durationMinutes"
                    value={form.durationMinutes}
                    onChange={handleChange}
                    min={1}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    min
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Status Kuis Setelah Simpan:</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: "draft" }))}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    form.status === "draft"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: "terkunci" }))}
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    form.status === "terkunci"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  🔒 Terkunci
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60 transition-colors"
              >
                <Save className="w-4 h-4" />
                {submitting ? "Menyimpan..." : "Simpan Kuis"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}