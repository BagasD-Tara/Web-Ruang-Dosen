"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save } from "lucide-react";
import { createQuiz } from "@/app/lib/api/quiz";

interface ModuleOption {
  id: string;
  title: string;
}

type QuizPublishStatus = "DRAFT" | "PUBLISHED";

export default function CreateQuizPage() {
  return (
    <Suspense fallback={<CreateQuizLoadingState />}>
      <CreateQuizContent />
    </Suspense>
  );
}

function CreateQuizLoadingState() {
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <p className="text-sm text-gray-500">Memuat form kuis...</p>
        </div>
      </div>
    </div>
  );
}

function StatusOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
        selected
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function CreateQuizContent() {
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
    status: "DRAFT" as QuizPublishStatus,
  });
  const [modules, setModules] = useState<ModuleOption[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        if (!prefillModuleId && options.length > 0) {
          setForm((prev) =>
            options.some((option) => option.id === prev.moduleId)
              ? prev
              : { ...prev, moduleId: "" }
          );
        }
      } catch {
        setModules([]);
      }
    }
    loadModules();
  }, [form.courseId, prefillModuleId]);

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
        status: form.status,
      });
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Publikasi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <StatusOption
                    label="Draft"
                    selected={form.status === "DRAFT"}
                    onSelect={() => setForm((prev) => ({ ...prev, status: "DRAFT" }))}
                  />
                  <StatusOption
                    label="Publish"
                    selected={form.status === "PUBLISHED"}
                    onSelect={() => setForm((prev) => ({ ...prev, status: "PUBLISHED" }))}
                  />
                </div>
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
                  Kuis akan disimpan sebagai <span className="text-blue-600 font-semibold">{form.status === "DRAFT" ? "Draft" : "Published"}</span>
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
