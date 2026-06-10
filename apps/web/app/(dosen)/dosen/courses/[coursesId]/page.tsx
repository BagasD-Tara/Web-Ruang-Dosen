"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, BarChart2,
  FileText, PlayCircle, Lock, ChevronDown,
  Users, HelpCircle,
} from "lucide-react";
import { getQuizzesByCourse, deleteQuiz } from "@/app/lib/mock/quizDosen";
import type { Quiz } from "@/app/lib/mock/quizDosen";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ModuleData {
  title: string;
  quizzes: Quiz[];
}

// ─── Konstanta ────────────────────────────────────────────────────────────────

const MODULE_STATUS = ["Published", "Draft", "Locked"] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseQuizManagementPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = (params.coursesId as string) || "advanced-ml";

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getQuizzesByCourse(courseId)
      .then(setQuizzes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  // Kelompokkan quiz per modul
  const modulesMap: Record<string, ModuleData> = {};
  quizzes.forEach((quiz) => {
    const modId = quiz.moduleId || "mod-umum";
    const modTitle = quiz.moduleTitle || "Modul Umum";
    if (!modulesMap[modId]) modulesMap[modId] = { title: modTitle, quizzes: [] };
    modulesMap[modId].quizzes.push(quiz);
  });

  const moduleEntries = Object.entries(modulesMap);

  function toggleModule(modId: string) {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  }

  async function handleDeleteQuiz(quizId: string) {
    if (!confirm("Yakin ingin menghapus kuis ini?")) return;
    await deleteQuiz(quizId);
    setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 pt-6">

        {/* Header */}
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">
            <span
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => router.push("/dosen/courses")}
            >
              My Courses
            </span>
            {" › "}
            <span className="text-gray-700">Advanced Machine Learning</span>
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Advanced Machine Learning</h1>
              <p className="text-sm text-gray-500 mt-1">CS-401 • Fall Semester 2023 • 3 Credits</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                ⚙️ Course Settings
              </button>
              <button
                onClick={() => router.push(`/dosen/quiz/create?courseId=${courseId}`)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Module
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] mt-6">

          {/* Left: Students Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg p-6 h-fit">
            <div className="flex items-start justify-between gap-3 mb-6">
              <div>
                <p className="text-sm font-semibold text-blue-100">View Enrolled</p>
                <p className="text-sm font-semibold text-blue-100">Students</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-5xl font-bold">48</p>
            <p className="mt-2 text-sm text-blue-100">+3 new students this week</p>
            <button className="mt-6 w-full rounded-lg bg-white/20 py-2.5 text-sm font-semibold text-white hover:bg-white/30 border border-white/30 transition">
              Manage Enrollment →
            </button>
          </div>

          {/* Right: Modules */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-gray-400 text-sm">Memuat data...</div>
            ) : moduleEntries.length === 0 ? (
              <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-12 text-center">
                <HelpCircle className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500 mb-4">Belum ada modul.</p>
                <button
                  onClick={() => router.push(`/dosen/quiz/create?courseId=${courseId}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold mx-auto transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Buat Kuis Pertama
                </button>
              </div>
            ) : (
              moduleEntries.map(([modId, moduleData], idx) => {
                const moduleNum = idx + 1;
                const statusKey = MODULE_STATUS[idx % 3];
                const isExpanded = expandedModules[modId] ?? false;

                return (
                  <div key={modId} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">

                    {/* Module Header */}
                    <div
                      onClick={() => toggleModule(modId)}
                      className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                          statusKey === "Published" ? "bg-blue-50 text-blue-600" :
                          statusKey === "Draft" ? "bg-amber-50 text-amber-600" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          M{moduleNum}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{moduleData.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Week {moduleNum}-{moduleNum + 1} • {moduleData.quizzes.length} Materials • {moduleData.quizzes.length} Quiz • 1 Assignment
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {statusKey === "Published" && (
                          <span className="px-3 py-1 rounded-full bg-green-50 text-xs font-semibold text-green-700 border border-green-200">
                            Published
                          </span>
                        )}
                        {statusKey === "Draft" && (
                          <span className="px-3 py-1 rounded-full bg-amber-50 text-xs font-semibold text-amber-700 border border-amber-200">
                            Draft
                          </span>
                        )}
                        {statusKey === "Locked" && (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-xs font-semibold text-gray-600 border border-gray-200">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <>
                        {/* Learning Materials */}
                        <div className="px-6 py-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                              <FileText className="w-3.5 h-3.5" />
                              Learning Materials
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                              Add Material
                            </button>
                          </div>
                          <div className="space-y-2">
                            {[
                              { icon: <FileText className="w-4 h-4 text-red-400" />, title: "Lecture Slides: Perceptrons" },
                              { icon: <PlayCircle className="w-4 h-4 text-blue-400" />, title: "Video: Activation Functions Explained" },
                            ].map((mat) => (
                              <div key={mat.title} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                                {mat.icon}
                                <p className="flex-1 text-sm font-medium text-gray-800">{mat.title}</p>
                                <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition">
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Assessments */}
                        <div className="px-6 py-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                              <HelpCircle className="w-3.5 h-3.5" />
                              Assessments
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => router.push(`/dosen/quiz/create?courseId=${courseId}&moduleId=${modId}`)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                              >
                                Create Quiz
                              </button>
                              <span className="text-gray-300 text-xs">•</span>
                              <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                                Create Assignment
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {/* Quiz items */}
                            {moduleData.quizzes.map((quiz) => (
                              <div
                                key={quiz.id}
                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                                  <HelpCircle className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">{quiz.title}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {quiz.durationMinutes} menit • {quiz.totalQuestions ?? 0} Questions
                                  </p>
                                </div>
                                <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-1 rounded flex-shrink-0">
                                  Auto-graded
                                </span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                  <button
                                    onClick={() => router.push(`/dosen/quiz/${quiz.id}/stats`)}
                                    className="p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition"
                                    title="Lihat Statistik"
                                  >
                                    <BarChart2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => router.push(`/dosen/quiz/${quiz.id}/edit`)}
                                    className="p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition"
                                    title="Edit Kuis"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                                    title="Hapus Kuis"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* Sample Assignment */}
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4 text-blue-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-700">Assignment 1: Build a Simple Perceptron</p>
                                <p className="text-xs text-gray-500 mt-0.5">Due: Oct 20, 23:59 • 15% of Final Grade</p>
                              </div>
                              <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded flex-shrink-0">
                                24 Submissions
                              </span>
                              <button className="p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Footer module */}
                        <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
                          <button className="text-sm font-medium text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                            Edit Module Settings
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}