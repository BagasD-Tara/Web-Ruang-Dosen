import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function CourseOverviewPage({ params }: { params: { courseId: string } }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: Materi List (Main Content) */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-[#111827]">Daftar Materi</h2>
        
        {/* Placeholder MateriCard */}
        <Card className="border-l-4 border-l-[#0D9488]">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-xl shrink-0">
                📄
              </div>
              <div>
                <div className="text-xs font-bold text-[#6B7280] mb-1">Pertemuan 1</div>
                <h3 className="text-[15px] font-bold text-[#111827]">Pengantar dan Kontrak Kuliah</h3>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#F3F4F6] text-[#4B5563] text-sm font-semibold rounded-lg hover:bg-[#E5E7EB] transition-colors">
              Buka
            </button>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#E5E7EB]">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-xl shrink-0">
                🎥
              </div>
              <div>
                <div className="text-xs font-bold text-[#6B7280] mb-1">Pertemuan 2</div>
                <h3 className="text-[15px] font-bold text-[#111827]">Konsep Dasar Pemrograman</h3>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#F3F4F6] text-[#4B5563] text-sm font-semibold rounded-lg hover:bg-[#E5E7EB] transition-colors">
              Buka
            </button>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN: Sidebar Stats / Info */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-[#1E293B] p-5">
            <h3 className="text-white font-bold text-[15px]">Informasi Kelas</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-[#6B7280] font-semibold uppercase">Dosen Pengampu</div>
              <div className="text-sm font-bold text-[#111827] mt-1">Dr. Budi Santoso, M.Kom</div>
            </div>
            <div>
              <div className="text-xs text-[#6B7280] font-semibold uppercase">Jadwal</div>
              <div className="text-sm font-bold text-[#111827] mt-1">Senin, 08:00 - 10:30 WIB</div>
            </div>
            <div>
              <div className="text-xs text-[#6B7280] font-semibold uppercase">SKS</div>
              <div className="text-sm font-bold text-[#111827] mt-1">3 SKS</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-[#111827] mb-3 text-[15px]">Progress Anda</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-extrabold text-[#0D9488]">45</span>
              <span className="text-sm text-[#6B7280] font-semibold mb-1">%</span>
            </div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#0D9488] rounded-full w-[45%]"></div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
