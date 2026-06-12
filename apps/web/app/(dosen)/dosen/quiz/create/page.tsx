"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save } from "lucide-react";
import { createQuiz } from "@/app/lib/api/quiz";

// Tipe course untuk dropdown
interface CourseOption {
  id: string;
  title: string;
}

interface ModuleOption {
  id: string;
  title: string;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Bisa dipre-fill dari query param kalau dipanggil dari halaman course
  const prefillCourseId = searchParams.get("courseId") ?? "";
  const prefillModuleId = searchParams.get("moduleId") ?? "";

  const [form, setForm] = useState({
    title: "",
    courseId: prefillCourseId,
    moduleId: prefillModuleId,
    xpReward: 100,
    minimumScore: 70,
    durationMinutes: 60,
  });
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [modules, setModules] = useState<ModuleOption[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch daftar course dari API
  useEffect(() => {
    async function loadCourses() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/courses/my`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (!res.ok) throw new Error("Gagal fetch courses");
        const data = await res.json();
        const options: CourseOption[] = Array.isArray(data)
          ? data.map((c: any) => ({ id: c.id, title: c.title ?? c.name ?? c.id }))
          : [];
        setCourses(options);
      } catch {
        // Fallback ke list statis jika API courses belum siap
        setCourses([
          { id: "course-1", title: "Advanced Machine Learning" },
        ]);
      }
    }
    loadCourses();
  }, []);

  // Fetch modules when courseId changes
  useEffect(() => {
    async function loadModules() {
      if (!form.courseId) {
        setModules([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/courses/${form.courseId}/modules`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (!res.ok) throw new Error("Gagal fetch modules");
        const data = await res.json();
        const options: ModuleOption[] = Array.isArray(data)
          ? data.map((m: any) => ({ id: m.id, title: m.title ?? m.name ?? m.id }))
          : [];
        setModules(options);
        // Reset moduleId if it's no longer valid
        if (options.length > 0 && !options.find(o => o.id === form.moduleId)) {
           setForm(prev => ({ ...prev, moduleId: "" }));
        }
      } catch {
        setModules([]);
      }
    }
    loadModules();
  }, [form.courseId]);

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
    if (!form.moduleId) {
      setError("Pilih modul terlebih dahulu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const quiz = await createQuiz({
        title: form.title,
        moduleId: form.moduleId,
        xpReward: form.xpReward,
        minimumScore: form.minimumScore,
        durationMinutes: form.durationMinutes,
      });
      // Langsung ke editor soal setelah berhasil buat quiz
      router.push(`/dosen/quiz/${quiz.id}/edit`);
    } catch (err) {
      console.error(err);
      setError("Gagal membuat kuis. Periksa koneksi server dan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Mata kuliah & Modul */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mata Kuliah
                </label>
                <select
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition appearance-none disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={!!prefillCourseId}
                >
                  <option value="">Pilih mata kuliah aktif...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                  {prefillCourseId && courses.length === 0 && (
                     <option value={prefillCourseId}>Memuat...</option>
                  )}
                </select>
              </div>

              {/* Modul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modul
                </label>
                <select
                  name="moduleId"
                  value={form.moduleId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition appearance-none disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={!!prefillModuleId || !form.courseId || modules.length === 0}
                >
                  <option value="">Pilih modul aktif...</option>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                  {prefillModuleId && modules.length === 0 && (
                     <option value={prefillModuleId}>Memuat...</option>
                  )}
                </select>
              </div>
            </div>

            {/* XP, Skor minimum, Durasi */}
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

            {/* Info */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Kuis akan disimpan sebagai <span className="text-blue-600 font-semibold">Draft</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Setelah disimpan, kamu bisa menambahkan soal di halaman editor.
                </p>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex justify-end gap-3 pt-2">
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
