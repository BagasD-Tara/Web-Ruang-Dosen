// ============================================================
// QUIZ API CLIENT
// ============================================================

import axios from "axios";
import type {
  Quiz,
  QuizQuestion,
  QuizAttempt,
  QuizResult,
  LeaderboardEntry,
  QuizStats,
} from "@/app/types/quiz";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

// Attach auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Mahasiswa ──────────────────────────────────────────────

/** Ambil semua quiz dalam sebuah course (berdasarkan module) */
export async function getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
  const { data } = await api.get(`/courses/${courseId}/quizzes`);
  return data;
}

/** Ambil detail quiz (info + pertanyaan) */
export async function getQuizById(quizId: string): Promise<Quiz> {
  const { data } = await api.get(`/quizzes/${quizId}`);
  return data;
}

/** Ambil soal-soal quiz (tanpa jawaban benar) */
export async function getQuizQuestions(
  quizId: string
): Promise<QuizQuestion[]> {
  const { data } = await api.get(`/quizzes/${quizId}/questions`);
  return data;
}

/** Submit jawaban quiz */
export async function submitQuiz(
  quizId: string,
  answers: Record<string, string>
): Promise<QuizResult> {
  const { data } = await api.post(`/quizzes/${quizId}/submit`, { answers });
  return data;
}

/** Ambil hasil quiz (untuk review) */
export async function getQuizResult(attemptId: string): Promise<QuizResult> {
  const { data } = await api.get(`/quiz-attempts/${attemptId}`);
  return data;
}

/** Ambil attempt terakhir mahasiswa untuk quiz ini */
export async function getMyAttempt(
  quizId: string
): Promise<QuizAttempt | null> {
  try {
    const { data } = await api.get(`/quizzes/${quizId}/my-attempt`);
    return data;
  } catch {
    return null;
  }
}

/** Ambil leaderboard */
export async function getLeaderboard(
  filter: "all_time" | "this_week" = "all_time"
): Promise<LeaderboardEntry[]> {
  const { data } = await api.get(`/leaderboard?filter=${filter}`);
  return data;
}

// ── Dosen ──────────────────────────────────────────────────

/** Buat quiz baru */
export async function createQuiz(payload: {
  title: string;
  courseId: string;
  moduleId: string;
  xpReward: number;
  minimumScore: number;
  durationMinutes: number;
  status: "draft" | "terkunci";
}): Promise<Quiz> {
  const { data } = await api.post("/quizzes", payload);
  return data;
}

/** Update quiz */
export async function updateQuiz(
  quizId: string,
  payload: Partial<{
    title: string;
    xpReward: number;
    minimumScore: number;
    durationMinutes: number;
    status: string;
  }>
): Promise<Quiz> {
  const { data } = await api.patch(`/quizzes/${quizId}`, payload);
  return data;
}

/** Hapus quiz */
export async function deleteQuiz(quizId: string): Promise<void> {
  await api.delete(`/quizzes/${quizId}`);
}

/** Tambah soal ke quiz */
export async function createQuestion(
  quizId: string,
  payload: {
    questionText: string;
    options: { label: string; text: string; isCorrect: boolean }[];
    explanation?: string;
    points: number;
  }
): Promise<QuizQuestion> {
  const { data } = await api.post(`/quizzes/${quizId}/questions`, payload);
  return data;
}

/** Update soal */
export async function updateQuestion(
  questionId: string,
  payload: Partial<{
    questionText: string;
    options: { label: string; text: string; isCorrect: boolean }[];
    explanation: string;
    points: number;
  }>
): Promise<QuizQuestion> {
  const { data } = await api.patch(`/questions/${questionId}`, payload);
  return data;
}

/** Hapus soal */
export async function deleteQuestion(questionId: string): Promise<void> {
  await api.delete(`/questions/${questionId}`);
}

/** Ambil statistik kuis (dosen) */
export async function getQuizStats(quizId: string): Promise<QuizStats> {
  const { data } = await api.get(`/quizzes/${quizId}/stats`);
  return data;
}

/** Terbitkan kuis */
export async function publishQuiz(quizId: string): Promise<Quiz> {
  const { data } = await api.patch(`/quizzes/${quizId}/publish`);
  return data;
}