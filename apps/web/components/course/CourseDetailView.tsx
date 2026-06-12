'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Play, FileText, BookOpen, HelpCircle,
  CheckCircle2, ChevronDown, ChevronUp, Calendar, Clock,
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { getQuizzesByCourse } from '@/app/lib/api/quiz';
import { QuizInfoModal } from '@/app/components/quiz/QuizInfoModal';
import type { Quiz } from '@/app/types/quiz';

import type { CourseContentItem, CourseContentTab, CourseDetail, CourseModule } from '@/lib/types/course';
import type { CourseSource } from '@/lib/courseNavigation';
import {
  buildAssignmentHref,
  buildMaterialHref,
  getCourseBreadcrumbParent,
  getCourseSource,
} from '@/lib/courseNavigation';
import { getCourseContentVisualConfig } from './courseContentPresentation';

// ─── Konstanta ────────────────────────────────────────────────────────────────

const TABS: { key: CourseContentTab; label: string }[] = [
  { key: 'materials', label: 'Materials' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'labs', label: 'Labs' },
];

const MATERIAL_ICON_MAP = {
  video:   { Icon: Play,      bg: 'bg-blue-50',  color: 'text-blue-600' },
  pdf:     { Icon: FileText,  bg: 'bg-gray-100', color: 'text-gray-600' },
  article: { Icon: BookOpen,  bg: 'bg-gray-100', color: 'text-gray-600' },
  assignment: { Icon: FileText, bg: 'bg-gray-100', color: 'text-gray-600' },
  lab: { Icon: BookOpen, bg: 'bg-gray-100', color: 'text-gray-600' },
} as const;

// ─── Helper: cek apakah quiz sudah pernah dikerjakan ─────────────────────────

function getCompletedAttemptId(quizId: string): string | null {
  if (typeof window === 'undefined') return null;
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (!key?.startsWith('quiz-result-')) continue;
    try {
      const data = JSON.parse(sessionStorage.getItem(key) ?? '');
      if (data?.attempt?.quizId === quizId) return data.attempt.id;
    } catch {
      // skip invalid entry
    }
  }
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center text-sm text-gray-400">
      {text}
    </div>
  );
}

interface QuizRowProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
  onReview: (attemptId: string, quizId: string) => void;
}

function QuizRow({ quiz, onStart, onReview }: QuizRowProps) {
  if (!quiz) return null;

  const completedAttemptId = getCompletedAttemptId(quiz.id);
  const isCompleted = Boolean(completedAttemptId);

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
        <HelpCircle className="h-5 w-5 text-orange-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm">{quiz.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Quiz • {quiz.durationMinutes} min • {quiz.totalQuestions} questions
        </p>
      </div>
      {isCompleted ? (
        <button
          onClick={() => onReview(completedAttemptId!, quiz.id)}
          className="flex-shrink-0 rounded-lg border border-blue-700 px-4 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Lihat Review
        </button>
      ) : (
        <button
          onClick={() => onStart(quiz)}
          className="flex-shrink-0 rounded-lg bg-blue-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Start Quiz
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface CourseDetailViewProps {
  course: CourseDetail;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const source = getCourseSource(searchParams.get('from'));
  const firstMaterial = course.tabs.materials[0]?.items[0];

  const [activeTab, setActiveTab] = useState<CourseContentTab>('materials');
  const modules = course.tabs[activeTab];
  
  // By default, open all modules
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.id, true]))
  );
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [courseQuizzes, setCourseQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const quizzes = await getQuizzesByCourse(course.id.toString());
        setCourseQuizzes(quizzes);
      } catch (err) {
        console.error('Failed to load course quizzes', err);
      }
    }
    fetchQuizzes();
  }, [course.id]);

  useEffect(() => {
    // Update openModules when switching tabs
    setOpenModules(Object.fromEntries(course.tabs[activeTab].map((m) => [m.id, true])));
  }, [activeTab, course.tabs]);

  function toggleModule(id: string) {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleStartQuiz(quiz: Quiz) {
    if (quiz) setSelectedQuiz(quiz);
  }

  function handleReview(attemptId: string, quizId: string) {
    router.push(`/quiz/${quizId}/review?attemptId=${attemptId}`);
  }

  return (
    <div className="min-h-screen pb-10">
      {/* ── Banner ── */}
      <div className={cn("relative h-[200px]", course.bannerColorClass || "bg-gradient-to-br from-blue-800 to-blue-600")}>
        <div className="absolute left-1/2 top-1/2 h-4 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
      </div>

      {/* ── Card info course ── */}
      <div className="mx-4 -mt-16 mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:mx-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          {/* Kiri: info */}
          <div className="flex-1 min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                {course.heroAccentLabel || 'Intermediate'}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                <Clock className="h-3 w-3" />
                {course.durationWeeks ?? 12} Weeks
              </span>
            </div>

            <h1 className="mb-3 text-xl font-bold text-gray-900 lg:text-2xl">
              {course.title}
            </h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                {course.instructorInitials}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {course.instructorName}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {course.instructorRole || 'Instructor'}
              </span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              {course.description} {course.subtitle}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${course.progressPercentage}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-sm text-gray-500">
                {course.progressPercentage}% Complete
              </span>
            </div>
          </div>

          {/* Kanan: tombol aksi */}
          <div className="flex w-full flex-col gap-3 lg:w-[200px] lg:flex-shrink-0">
            {firstMaterial ? (
              <Link 
                href={buildMaterialHref(course.id, firstMaterial.id, source)}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                <Play className="h-4 w-4 fill-white" />
                {course.status === 'notstart' ? 'Start Learning' : 'Continue Learning'}
              </Link>
            ) : (
              <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
                <Play className="h-4 w-4 fill-white" />
                {course.status === 'notstart' ? 'Start Learning' : 'Continue Learning'}
              </button>
            )}
            
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
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

        {/* ── Konten tab ── */}
        <div className="rounded-b-xl border border-t-0 border-gray-200 bg-gray-50 p-5">

          {/* Materials & Assignments & Labs */}
          {activeTab !== 'quizzes' && (
            <div className="space-y-4">
              {modules.length === 0 ? (
                <EmptyState text={`Belum ada ${activeTab} untuk course ini.`} />
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
                      <h2 className="font-semibold text-gray-900">{modul.title}</h2>
                      {openModules[modul.id]
                        ? <ChevronUp className="h-5 w-5 text-gray-400" />
                        : <ChevronDown className="h-5 w-5 text-gray-400" />
                      }
                    </button>

                    {/* Daftar item */}
                    {openModules[modul.id] && (
                      <div className="divide-y divide-gray-100 border-t border-gray-100">
                        {modul.items.map((item) => {
                          const iconConfig = MATERIAL_ICON_MAP[item.type as keyof typeof MATERIAL_ICON_MAP] ?? MATERIAL_ICON_MAP.article;
                          const Icon = iconConfig.Icon;
                          const href = activeTab === 'materials' 
                            ? buildMaterialHref(course.id, item.id, source)
                            : buildAssignmentHref(course.id, item.id, source);

                          return (
                            <Link
                              key={item.id}
                              href={href}
                              className={cn(
                                "flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors",
                                item.isCompleted && "border-l-4 border-l-blue-600"
                              )}
                            >
                              <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl", iconConfig.bg)}>
                                <Icon className={cn("h-5 w-5", iconConfig.color)} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.meta}</p>
                              </div>
                              {item.isCompleted && (
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                              )}
                            </Link>
                          );
                        })}

                        {/* Tampilkan baris quiz jika ada di modul ini (hanya untuk referensi quiz di tab materials) */}
                        {activeTab === 'materials' && courseQuizzes.filter(q => q.moduleId === modul.id).map(quiz => (
                          <QuizRow
                            key={quiz.id}
                            quiz={quiz}
                            onStart={handleStartQuiz}
                            onReview={handleReview}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === "quizzes" && (
            <div className="space-y-3">
              {courseQuizzes.length === 0 ? (
                <EmptyState text="Belum ada kuis untuk course ini." />
              ) : (
                courseQuizzes.map((quiz) => {
                  const completedAttemptId = getCompletedAttemptId(quiz.id);
                  const isCompleted = Boolean(completedAttemptId);
                  return (
                    <div
                      key={quiz.id}
                      className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50">
                        <HelpCircle className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{quiz.title}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                          <span>{quiz.durationMinutes} menit</span>
                          <span>{quiz.totalQuestions} soal</span>
                          <span className="font-medium text-yellow-600">+{quiz.xpReward} XP</span>
                        </div>
                      </div>
                      {isCompleted ? (
                        <button
                          onClick={() => handleReview(completedAttemptId!, quiz.id)}
                          className="flex-shrink-0 rounded-lg border border-blue-700 px-4 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                        >
                          Lihat Review
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedQuiz(quiz)}
                          className="flex-shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
                        >
                          Mulai Kuis
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
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
