"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  FileText,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import {
  getMockCourseById,
  getMockModulesByCourse,
} from "@/app/lib/mock/coursesMock";
import { MOCK_QUIZZES } from "@/app/lib/mock/quizMock";
import { QuizInfoModal } from "@/app/components/quiz/QuizInfoModal";
import type { Quiz } from "@/app/types/quiz";

// ─── tipe tab ─────────────────────────────────────────────
type Tab = "materials" | "quizzes" | "assignments" | "labs";

const TABS: { key: Tab; label: string }[] = [
  { key: "materials", label: "Materials" },
  { key: "quizzes", label: "Quizzes" },
  { key: "assignments", label: "Assignments" },
  { key: "labs", label: "Labs" },
];

// ─── ikon per tipe materi ─────────────────────────────────
const ICON_MAP = {
  video: { Icon: Play, bg: "bg-blue-50", color: "text-blue-600" },
  pdf: { Icon: FileText, bg: "bg-gray-100", color: "text-gray-600" },
  article: { Icon: BookOpen, bg: "bg-gray-100", color: "text-gray-600" },
  quiz: { Icon: HelpCircle, bg: "bg-orange-50", color: "text-orange-500" },
} as const;

// ─────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.coursesId as string;

  const course = getMockCourseById(courseId);
  const modules = getMockModulesByCourse(courseId);

  const [activeTab, setActiveTab] = useState<Tab>("materials");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.id, true]))
  );
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
        Course tidak ditemukan.
      </div>
    );
  }

  function toggleModule(id: string) {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleStartQuiz(quizId: string) {
    const quiz = MOCK_QUIZZES[quizId];
    if (quiz) setSelectedQuiz(quiz);
  }

  // semua quiz di course ini untuk tab Quizzes
  const courseQuizzes = Object.values(MOCK_QUIZZES).filter(
    (q) => q.courseId === courseId
  );

  return (
    <div className="min-h-screen">
      {/* ── Banner biru ──────────────────────────────────── */}
      <div className="relative h-[200px] bg-gradient-to-br from-blue-800 to-blue-600">
        {/* oval dekorasi */}
        <div className="absolute left-1/2 top-1/2 h-4 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
      </div>

      {/* ── Card info course (mengambang di atas banner) ── */}
      <div className="mx-4 -mt-16 mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:mx-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Kiri: info */}
          <div className="flex-1 min-w-0">
            {/* Badge level + durasi */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Advanced Module
              </span>
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                <Clock className="h-3 w-3" />
                12 Weeks
              </span>
            </div>

            {/* Judul */}
            <h1 className="mb-3 text-xl font-bold text-gray-900 lg:text-2xl">
              {course.title}
            </h1>

            {/* Instruktur */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                {course.instructor
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {course.instructor}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Prof. of Computer Science
              </span>
            </div>

            {/* Deskripsi */}
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              {course.description}
            </p>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-sm text-gray-500">
                {course.progress}% Complete
              </span>
            </div>
          </div>

          {/* Kanan: tombol aksi */}
          <div className="flex w-full flex-col gap-3 lg:w-[200px] lg:flex-shrink-0">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
              <Play className="h-4 w-4 fill-white" />
              Continue Learning
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab navigasi ─────────────────────────────────── */}
      <div className="mx-4 lg:mx-8">
        <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "border-b-2 px-5 py-4 text-sm font-medium transition-colors",
                activeTab === key
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Konten tab ───────────────────────────────── */}
        <div className="rounded-b-xl border border-t-0 border-gray-200 bg-gray-50 p-5">
          {/* TAB: Materials */}
          {activeTab === "materials" && (
            <div className="space-y-4">
              {modules.length === 0 ? (
                <EmptyState text="Belum ada materi untuk course ini." />
              ) : (
                modules.map((modul) => (
                  <div
                    key={modul.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >
                    {/* Header modul */}
                    <button
                      onClick={() => toggleModule(modul.id)}
                      className="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <h2 className="font-semibold text-gray-900">
                        {modul.title}
                      </h2>
                      {openModules[modul.id] ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {/* Daftar materi */}
                    {openModules[modul.id] && (
                      <div className="divide-y divide-gray-100">
                        {/* Materi (video/pdf/article) */}
                        {modul.materials.map((item) => {
                          const { Icon, bg, color } =
                            ICON_MAP[item.type] ?? ICON_MAP.article;
                          return (
                            <div
                              key={item.id}
                              className={cn(
                                "flex items-center gap-4 px-6 py-4",
                                item.isCompleted &&
                                  "border-l-4 border-l-blue-600"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                                  bg
                                )}
                              >
                                <Icon className={cn("h-5 w-5", color)} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">
                                  {item.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.meta}
                                </p>
                              </div>
                              {item.isCompleted && (
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                              )}
                            </div>
                          );
                        })}

                        {/* Baris kuis di bawah materi */}
                        <div className="flex items-center gap-4 px-6 py-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                            <HelpCircle className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm">
                              {MOCK_QUIZZES[modul.quizId]?.title ?? "Kuis"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Quiz •{" "}
                              {MOCK_QUIZZES[modul.quizId]?.durationMinutes} min
                              •{" "}
                              {MOCK_QUIZZES[modul.quizId]?.totalQuestions}{" "}
                              questions
                            </p>
                          </div>
                          <button
                            onClick={() => handleStartQuiz(modul.quizId)}
                            className="flex-shrink-0 rounded-lg bg-blue-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
                          >
                            Start Quiz
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Quizzes */}
          {activeTab === "quizzes" && (
            <div className="space-y-3">
              {courseQuizzes.length === 0 ? (
                <EmptyState text="Belum ada kuis untuk course ini." />
              ) : (
                courseQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                      <HelpCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">
                        {quiz.title}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span>{quiz.durationMinutes} menit</span>
                        <span>{quiz.totalQuestions} soal</span>
                        <span className="font-medium text-yellow-600">
                          +{quiz.xpReward} XP
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedQuiz(quiz)}
                      className="flex-shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
                    >
                      Mulai Kuis
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Assignments */}
          {activeTab === "assignments" && (
            <EmptyState text="Belum ada assignment untuk course ini." />
          )}

          {/* TAB: Labs */}
          {activeTab === "labs" && (
            <EmptyState text="Belum ada lab untuk course ini." />
          )}
        </div>
      </div>

      {/* Modal info quiz */}
      {selectedQuiz && (
        <QuizInfoModal
          quiz={selectedQuiz}
          onStart={() => router.push(`/quiz/${selectedQuiz.id}`)}
          onClose={() => setSelectedQuiz(null)}
        />
      )}
    </div>
  );
}

// ─── Komponen empty state ─────────────────────────────────
function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center text-sm text-gray-400">
      {text}
    </div>
  );
}