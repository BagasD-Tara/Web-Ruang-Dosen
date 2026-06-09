"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Clock, BarChart2 } from "lucide-react";
import { MOCK_COURSES } from "@/app/lib/mock/coursesMock";

export default function CoursesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500">
            Pilih kursus yang ingin Anda pelajari.
          </p>
        </header>

        <div className="space-y-3">
          {MOCK_COURSES.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/courses/${course.id}`)}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Ikon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5" />
                      {course.totalModules} Modul
                    </span>
                    <span className="flex items-center gap-1">
                      👨‍🏫 {course.instructor}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {course.progress}% selesai
                    </span>
                  </div>
                </div>

                {/* Tombol */}
                <button
                  className="flex-shrink-0 px-4 py-2 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/courses/${course.id}`);
                  }}
                >
                  Buka
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}