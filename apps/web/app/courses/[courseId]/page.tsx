'use client';

import React, { use } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { MateriCard, Materi } from '@/components/course/MateriCard';

const mockMateri: Materi[] = [
  {
    id: 'm1',
    title: 'Pengantar dan Kontrak Kuliah',
    type: 'document',
    size: '1.2 MB',
    isRead: true
  },
  {
    id: 'm2',
    title: 'Konsep Dasar Pemrograman',
    type: 'video',
    duration: '45 Menit',
    isRead: false
  },
  {
    id: 'm3',
    title: 'Slide Presentasi Algoritma Dasar',
    type: 'pdf',
    size: '3.4 MB',
    isRead: false
  }
];

export default function CourseOverviewPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: Materi List (Main Content) */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-[#111827]">Materi Terbaru</h2>
        
        <div className="flex flex-col gap-4">
          {mockMateri.map((materi) => (
            <MateriCard key={materi.id} materi={materi} />
          ))}
        </div>
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
