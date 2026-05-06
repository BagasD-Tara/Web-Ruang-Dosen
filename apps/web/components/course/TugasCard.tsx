'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export interface Tugas {
  id: string;
  title: string;
  deadline: string; // ISO string or formatted date
  status: 'pending' | 'submitted' | 'graded' | 'late';
  score?: number;
}

interface TugasCardProps {
  tugas: Tugas;
  onClick?: (tugas: Tugas) => void;
}

export const TugasCard: React.FC<TugasCardProps> = ({ tugas, onClick }) => {
  const getStatusDisplay = () => {
    switch (tugas.status) {
      case 'submitted':
        return { label: 'Menunggu Penilaian', color: 'bg-blue-100 text-blue-700', border: 'border-l-blue-500' };
      case 'graded':
        return { label: 'Sudah Dinilai', color: 'bg-green-100 text-green-700', border: 'border-l-green-500' };
      case 'late':
        return { label: 'Terlambat', color: 'bg-red-100 text-red-700', border: 'border-l-red-500' };
      case 'pending':
      default:
        return { label: 'Belum Dikerjakan', color: 'bg-orange-100 text-orange-700', border: 'border-l-orange-500' };
    }
  };

  const statusInfo = getStatusDisplay();

  const formatDeadline = (dateString: string) => {
    // In a real app, use a library like date-fns. For now, simple mock formatting.
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card 
      onClick={() => onClick && onClick(tugas)}
      className={`border-l-4 ${statusInfo.border}`}
    >
      <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 gap-4">
        <div className="flex gap-4 items-start md:items-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
            📝
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#111827] mb-1">
              {tugas.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6B7280]">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Tenggat: {formatDeadline(tugas.deadline)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            {tugas.status === 'graded' && tugas.score !== undefined && (
              <span className="text-sm font-bold text-[#111827] mt-1.5">
                Nilai: <span className={tugas.score >= 80 ? 'text-green-600' : 'text-orange-600'}>{tugas.score}/100</span>
              </span>
            )}
          </div>
          
          <button 
            className="px-4 py-2 bg-[#111827] text-white text-sm font-semibold rounded-lg hover:bg-[#374151] transition-colors shrink-0"
            aria-label="Kerjakan Tugas"
          >
            {tugas.status === 'graded' ? 'Lihat' : 'Kerjakan'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
