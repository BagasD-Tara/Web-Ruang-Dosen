'use client';

import React from 'react';
import { TugasCard, Tugas } from '@/components/course/TugasCard';

const mockTugas: Tugas[] = [
  {
    id: 't1',
    title: 'Tugas 1: Membuat Algoritma Sorting',
    deadline: '2026-05-10T23:59:00',
    status: 'pending'
  },
  {
    id: 't2',
    title: 'Tugas 2: Implementasi Struktur Data Tree',
    deadline: '2026-05-15T23:59:00',
    status: 'submitted'
  },
  {
    id: 't3',
    title: 'Kuis 1: Konsep Dasar',
    deadline: '2026-04-20T23:59:00',
    status: 'graded',
    score: 85
  },
  {
    id: 't4',
    title: 'Tugas Praktikum Tambahan',
    deadline: '2026-04-25T23:59:00',
    status: 'late'
  }
];

export default function CourseTugasPage({ params }: { params: { courseId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#111827]">Daftar Tugas & Kuis</h2>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#4B5563] font-medium px-3 py-2 outline-none">
            <option value="all">Semua Tugas</option>
            <option value="pending">Belum Dikerjakan</option>
            <option value="graded">Sudah Dinilai</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {mockTugas.map((tugas) => (
          <TugasCard key={tugas.id} tugas={tugas} />
        ))}
      </div>
    </div>
  );
}
