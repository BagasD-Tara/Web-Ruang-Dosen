"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, Briefcase, BookOpen } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EEF2F6] via-[#E2E8F0] to-[#D5E0F8] flex items-center justify-center p-6 antialiased">
      <div className="max-w-4xl w-full flex flex-col items-center gap-8">
        
        {/* Header Section */}
        <header className="text-center space-y-3 max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#003594] text-white shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-[#00174B]">
              Ruang Dosen
            </span>
          </div>
          <p className="text-base text-[#586377] leading-relaxed">
            Platform Pembelajaran Interaktif. Silakan pilih portal untuk masuk ke dalam sistem.
          </p>
        </header>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          
          {/* Student Portal Card */}
          <div
            onClick={() => router.push("/courses")}
            className="group relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#C3C6D6]/50 p-8 shadow-sm hover:shadow-xl hover:border-[#003594]/30 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Hover background highlight */}
            <div className="absolute top-0 right-0 h-32 w-32 -mr-8 -mt-8 rounded-full bg-[#D5E0F8]/20 group-hover:scale-150 transition-transform duration-500 blur-xl" />
            
            <div className="relative space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D5E0F8] text-[#003594] group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#191C1D] group-hover:text-[#003594] transition-colors">
                  Portal Mahasiswa
                </h2>
                <p className="text-sm text-[#586377] leading-relaxed">
                  Akses modul kuliah, kerjakan kuis interaktif, tinjau hasil nilai Anda, dan lihat peringkat Anda di leaderboard kelas.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#003594]">
              <span>Masuk Sebagai Mahasiswa</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </div>

          {/* Lecturer Portal Card */}
          <div
            onClick={() => router.push("/dosen/courses")}
            className="group relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#C3C6D6]/50 p-8 shadow-sm hover:shadow-xl hover:border-[#003594]/30 hover:bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Hover background highlight */}
            <div className="absolute top-0 right-0 h-32 w-32 -mr-8 -mt-8 rounded-full bg-[#003594]/5 group-hover:scale-150 transition-transform duration-500 blur-xl" />

            <div className="relative space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00174B] text-white group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-7 w-7" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#191C1D] group-hover:text-[#003594] transition-colors">
                  Portal Dosen
                </h2>
                <p className="text-sm text-[#586377] leading-relaxed">
                  Kelola modul kuis perkuliahan, buat pertanyaan kuis baru, terbitkan kuis, dan pantau grafik analitik statistik nilai mahasiswa.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#003594]">
              <span>Masuk Sebagai Dosen</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <footer className="text-xs text-[#586377]/80 text-center mt-4">
          © 2026 Ruang Dosen Academic Platform. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
