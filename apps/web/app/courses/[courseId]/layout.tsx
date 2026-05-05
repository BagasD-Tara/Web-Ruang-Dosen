import React from 'react';
import Link from 'next/link';

export default function CourseDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20 px-5 lg:px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#0D9488] rounded-[8px] flex items-center justify-center">
              <svg className="w-4.5 h-4.5 stroke-white fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 2 2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-[16px] md:text-[18px] font-extrabold text-[#1F2937] tracking-tight">
              Ruang<span className="text-[#0D9488]">Dosen</span>
            </span>
          </div>
          
          <div className="h-5 w-px bg-[#E5E7EB] hidden sm:block"></div>

          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link href="/" className="text-[#6B7280] hover:text-[#111827] transition-colors">Beranda</Link>
            <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <Link href="/courses" className="text-[#6B7280] hover:text-[#111827] transition-colors">Daftar Mata Kuliah</Link>
            <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="text-[#111827] font-semibold">Detail Kursus</span>
          </nav>
        </div>
      </header>

      {/* COURSE HEADER BANNER & TABS */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
          <div className="py-8">
            <div className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              ID Kursus: {params.courseId}
            </div>
            <h1 className="text-3xl font-extrabold text-[#111827] mb-2">Memuat Mata Kuliah...</h1>
            <p className="text-[#6B7280]">Pilih tab di bawah untuk melihat materi atau tugas.</p>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            <Link 
              href={`/courses/${params.courseId}`}
              className="px-1 py-4 border-b-2 border-[#0D9488] text-[#0D9488] text-sm font-bold whitespace-nowrap"
            >
              Ikhtisar & Materi
            </Link>
            <Link 
              href={`/courses/${params.courseId}/tugas`}
              className="px-1 py-4 border-b-2 border-transparent text-[#6B7280] hover:text-[#111827] text-sm font-semibold whitespace-nowrap transition-colors"
            >
              Tugas & Kuis
            </Link>
            <Link 
              href={`/courses/${params.courseId}/nilai`}
              className="px-1 py-4 border-b-2 border-transparent text-[#6B7280] hover:text-[#111827] text-sm font-semibold whitespace-nowrap transition-colors"
            >
              Penilaian
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-5 lg:p-10">
        {children}
      </main>
    </div>
  );
}
