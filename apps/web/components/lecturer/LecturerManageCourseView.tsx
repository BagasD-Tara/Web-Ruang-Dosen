'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Settings,
  Plus,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lock,
  FileText,
  Video,
  Link as LinkIcon,
  HelpCircle,
  ClipboardList,
  Edit2,
  BookOpen,
  Pencil,
  Trash2,
  BarChart2,
  PlayCircle
} from 'lucide-react';
import { getQuizzesByCourse, deleteQuiz } from '@/app/lib/api/quiz';
import type { Quiz } from '@/app/types/quiz';
import type {
  LecturerCourseModule,
  LecturerManageCourseData,
  LecturerMaterialKind,
  LecturerModuleAssessment,
  LecturerModuleMaterial,
} from '@/lib/types/course';

// Adapter: backend response → tipe Quiz resmi
function adaptQuiz(raw: any): Quiz {
  return {
    id: raw.id,
    title: raw.title,
    courseId: raw.courseId ?? "",
    moduleId: raw.moduleId ?? "",
    moduleTitle: raw.moduleTitle ?? "—",
    status: raw.status ?? "draft",
    totalQuestions: raw._count?.questions ?? raw.totalQuestions ?? 0,
    durationMinutes: raw.timeLimit ?? raw.durationMinutes ?? 0,
    xpReward: raw.xpReward ?? 0,
    minimumScore: raw.passingScore ?? raw.minimumScore ?? 0,
    createdAt: raw.createdAt ?? "",
    updatedAt: raw.updatedAt ?? "",
  };
}

interface LecturerManageCourseViewProps {
  data: LecturerManageCourseData;
}

export function LecturerManageCourseView({ data }: LecturerManageCourseViewProps) {
  const router = useRouter();
  const courseId = data.course.id.toString();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [errorQuizzes, setErrorQuizzes] = useState<string | null>(null);

  // Default expand all modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    Object.fromEntries(data.modules.map(m => [m.id, true]))
  );

  useEffect(() => {
    async function load() {
      setLoadingQuizzes(true);
      setErrorQuizzes(null);
      try {
        const raw = await getQuizzesByCourse(courseId);
        setQuizzes(Array.isArray(raw) ? raw.map(adaptQuiz) : []);
      } catch (err) {
        console.error(err);
        setErrorQuizzes("Gagal memuat data kuis. Periksa koneksi atau coba lagi.");
      } finally {
        setLoadingQuizzes(false);
      }
    }
    load();
  }, [courseId]);

  function toggleModule(modId: string) {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  }

  async function handleDeleteQuiz(quizId: string) {
    if (!confirm("Yakin ingin menghapus kuis ini?")) return;
    try {
      await deleteQuiz(quizId);
      setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus kuis. Coba lagi.");
    }
  }

  function MaterialTypeIcon({ kind, className }: { kind: LecturerMaterialKind, className?: string }) {
    if (kind === 'document') return <FileText className={className} />;
    if (kind === 'video') return <PlayCircle className={className} />;
    return <LinkIcon className={className} />;
  }

  return (
    <div className="manage-view-wrapper dashboard-content">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: data.course.title },
        ]}
      />

      <section className="manage-header">
        <div className="manage-header-left">
          <h1>{data.course.title}</h1>
          <div className="course-meta">
            <span>{data.course.code}</span>
            <span className="dot">•</span>
            <span>{data.termLabel}</span>
            <span className="dot">•</span>
            <span>{data.credits} Credits</span>
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
            <p className="text-5xl font-bold">{data.enrolledStudents}</p>
            <p className="mt-2 text-sm text-blue-100">+{data.weeklyGrowth} new students this week</p>
            <button 
              onClick={() => router.push(`/dosen/courses/${courseId}/enrollment`)}
              className="mt-6 w-full rounded-lg bg-white/20 py-2.5 text-sm font-semibold text-white hover:bg-white/30 border border-white/30 transition"
            >
              Manage Enrollment →
            </button>
          </div>

          {/* Right: Modules */}
          <div className="space-y-4">
            {data.modules.length === 0 ? (
              <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-12 text-center">
                <BookOpen className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500 mb-4">Belum ada modul untuk kelas ini.</p>
                <button
                  onClick={() => router.push(`/dosen/courses/${courseId}/modules/create`)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold mx-auto transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Buat Modul Pertama
                </button>
              </div>
            ) : (
              data.modules.map((module, idx) => {
                const moduleNum = idx + 1;
                const statusKey = module.status;
                const isExpanded = expandedModules[module.id] ?? false;
                
                // Get quizzes for this module
                const moduleQuizzes = quizzes.filter(q => q.moduleId === module.id);
                // Also get assignments from module.assessments
                const moduleAssignments = module.assessments.filter(a => a.kind === 'assignment');

                return (
                  <div key={module.id} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">

                    {/* Module Header */}
                    <div
                      onClick={() => toggleModule(module.id)}
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
                          <h3 className="text-sm font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {module.weekLabel} • {module.materials.length} Materials • {moduleQuizzes.length} Quiz • {moduleAssignments.length} Assignment
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {statusKey === "Published" && (
                          <span className="px-3 py-1 rounded-full bg-green-50 text-xs font-semibold text-green-700 border border-green-200">
                            {statusKey}
                          </span>
                        )}
                        {statusKey === "Draft" && (
                          <span className="px-3 py-1 rounded-full bg-amber-50 text-xs font-semibold text-amber-700 border border-amber-200">
                            Draft
                          </span>
                        )}
                        {statusKey === "Hidden" && (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-xs font-semibold text-gray-600 border border-gray-200">
                            <Lock className="w-3 h-3" /> Hidden
                          </span>
                        )}
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && statusKey !== "Hidden" && (
                      <>
                        {/* Learning Materials */}
                        <div className="px-6 py-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                              <FileText className="w-3.5 h-3.5" />
                              Learning Materials
                            </div>
                            <button 
                              onClick={() => router.push(`/dosen/courses/${courseId}/modules/${module.id}/materials/create`)}
                              className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                            >
                              Add Material
                            </button>
                          </div>
                          <div className="space-y-2">
                            {module.materials.map((mat) => (
                              <div key={mat.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                                <MaterialTypeIcon kind={mat.kind} className="w-4 h-4 text-blue-400" />
                                <p className="flex-1 text-sm font-medium text-gray-800">{mat.title}</p>
                                <button 
                                  onClick={() => router.push(`/dosen/courses/${courseId}/modules/${module.id}/materials/${mat.id}/edit`)}
                                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            {module.materials.length === 0 && (
                              <p className="text-xs text-gray-500 italic">No materials yet.</p>
                            )}
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
                                onClick={() => router.push(`/dosen/quiz/create?courseId=${courseId}&moduleId=${module.id}`)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                              >
                                Create Quiz
                              </button>
                              <span className="text-gray-300 text-xs">•</span>
                              <button 
                                onClick={() => router.push(`/dosen/courses/${courseId}/modules/${module.id}/assignments/create`)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                              >
                                Create Assignment
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {/* Quiz items */}
                            {moduleQuizzes.map((quiz) => (
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

                            {/* Assignment items */}
                            {moduleAssignments.map((assignment) => (
                              <div key={assignment.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-700">{assignment.title}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{assignment.meta}</p>
                                </div>
                                {assignment.badgeLabel && (
                                  <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded flex-shrink-0">
                                    {assignment.badgeLabel}
                                  </span>
                                )}
                                <button 
                                  onClick={() => router.push(`/dosen/courses/${courseId}/modules/${module.id}/assignments/${assignment.id}/edit`)}
                                  className="p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            
                            {moduleQuizzes.length === 0 && moduleAssignments.length === 0 && (
                              <p className="text-xs text-gray-500 italic">No assessments yet.</p>
                            )}
                          </div>
                        </div>

                        {/* Footer module */}
                        <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
                          <button 
                            onClick={() => router.push(`/dosen/courses/${courseId}/modules/${module.id}/edit`)}
                            className="text-sm font-medium text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                          >
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

function toggleExpandedModule(
  moduleId: string,
  setExpandedModuleIds: React.Dispatch<React.SetStateAction<string[]>>
) {
  setExpandedModuleIds((currentIds) => {
    if (currentIds.includes(moduleId)) {
      return currentIds.filter((currentId) => currentId !== moduleId);
    }
    return [...currentIds, moduleId];
  });
}

function getDefaultExpandedModuleIds(modules: LecturerCourseModule[]) {
  const explicitExpandedModuleIds = modules
    .filter((module) => module.defaultExpanded)
    .map((module) => module.id);

  if (explicitExpandedModuleIds.length > 0) {
    return explicitExpandedModuleIds;
  }

  return modules.length > 0 ? [modules[0].id] : [];
}

function formatModuleSummary(module: LecturerCourseModule) {
  const parts = [];
  if (module.materials.length > 0) {
    parts.push(`${module.materials.length} Materials`);
  }

  if (module.assessments.length > 0) {
    const qCount = module.assessments.filter((a) => a.kind === 'quiz').length;
    const aCount = module.assessments.filter((a) => a.kind === 'assignment').length;

    if (qCount > 0) parts.push(`${qCount} Quiz`);
    if (aCount > 0) parts.push(`${aCount} Assignment`);
  }

  return parts.length > 0 ? parts.join(' • ') : '0 Materials • 0 Assessments';
}

function MaterialTypeIcon({ kind }: { kind: LecturerMaterialKind }) {
  if (kind === 'document') return <FileText size={20} />;
  if (kind === 'video') return <Video size={20} />;
  return <LinkIcon size={20} />;
}

function AssessmentTypeIcon({ kind }: { kind: LecturerModuleAssessment['kind'] }) {
  return kind === 'quiz' ? (
    <HelpCircle size={20} />
  ) : (
    <ClipboardList size={20} />
  );
}

