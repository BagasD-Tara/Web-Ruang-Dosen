'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course/CourseCard';
import { CourseModal } from '@/components/course/CourseModal';
import { CourseStats } from '@/components/course/CourseStats';
import { CourseFilters } from '@/components/course/CourseFilters';
import { CoursePagination } from '@/components/course/CoursePagination';
import { useCourses } from '@/hooks/useCourses';

export default function CoursesPage() {
  const router = useRouter();
  const {
    activeSem, setActiveSem,
    searchQuery, setSearchQuery,
    selectedCourse, handleSelectCourse,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    availableSemesters,
    paginatedCourses,
    totalPages,
    activeCoursesCount,
    semText,
    stats,
    resetFilters
  } = useCourses();

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] relative">

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        {/* TOP HEADER — White Zone with bottom border */}
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20 px-5 lg:px-10 py-3">
          <div className="flex items-center justify-between gap-5">
            
            {/* Brand & Breadcrumbs */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0D9488] rounded-[8px] flex items-center justify-center shrink-0">
                  <svg className="w-4.5 h-4.5 stroke-white fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 2 2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-[16px] md:text-[18px] font-extrabold text-[#1F2937] tracking-tight">
                  Ruang<span className="text-[#0D9488]">Dosen</span>
                </span>
              </div>
              
              <div className="h-5 w-px bg-[#E5E7EB] hidden sm:block"></div>

              <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
                <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-colors">Beranda</a>
                <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="text-[#111827]">Daftar Mata Kuliah</span>
              </nav>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-xl">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] w-4.5 h-4.5 stroke-[2.5px] fill-none" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari mata kuliah..."
                  className="w-full h-10 pl-11 pr-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] outline-none transition-all focus:bg-white focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 placeholder-[#9CA3AF]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Action Icons & Profile */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button className="hidden md:flex w-9 h-9 items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#6366F1] rounded-lg transition-all relative">
                <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm shrink-0 cursor-pointer hover:scale-105 transition-transform">ZA</div>
            </div>
          </div>
        </div>

        {/* CONTENT AREA — Light Gray Zone */}
        <div className="p-5 lg:p-10">

          {/* MOBILE SEARCH BAR */}
          <div className="lg:hidden relative mb-8">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] w-4.5 h-4.5 stroke-[2.5px] fill-none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari mata kuliah..."
              className="w-full h-12 pl-11 pr-5 bg-white border border-[#E5E7EB] rounded-2xl text-sm text-[#111827] outline-none focus:border-[#6366F1] placeholder-[#9CA3AF]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <CourseStats 
            activeCoursesCount={activeCoursesCount} 
            semText={semText} 
            stats={stats} 
          />

          <CourseFilters 
            availableSemesters={availableSemesters}
            activeSem={activeSem}
            setActiveSem={setActiveSem}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* GRID */}
          {paginatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={handleSelectCourse}
                  onContinue={handleSelectCourse}
                  onStart={handleSelectCourse}
                  onViewGrade={handleSelectCourse}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="text-6xl mb-4 grayscale">🔍</div>
              <h3 className="text-[18px] font-bold text-[#475569]">Mata kuliah tidak ditemukan</h3>
              <p className="text-[14px] text-[#64748B] mt-1 max-w-[300px]">Coba ubah kata kunci pencarian atau reset filter di samping.</p>
              <button
                onClick={resetFilters}
                className="mt-5 text-[#4F46E5] font-bold text-sm hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          <CoursePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div> {/* END CONTENT AREA */}
      </main>

      {/* MODAL */}
      <CourseModal
        course={selectedCourse}
        onClose={() => handleSelectCourse(null)}
        onEnter={() => selectedCourse && router.push(`/courses/${selectedCourse.id}`)}
      />
    </div>
  );
}
