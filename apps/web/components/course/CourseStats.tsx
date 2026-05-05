import React from 'react';

interface CourseStatsProps {
  activeCoursesCount: number;
  semText: string;
  stats: {
    totalCourses: number;
    ongoingCourses: number;
    doneCourses: number;
    avgProgress: number;
  };
}

export const CourseStats: React.FC<CourseStatsProps> = ({ activeCoursesCount, semText, stats }) => {
  return (
    <div className="mb-10">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#111827] leading-tight">
          Halo Zia, Siap Belajar? 👋
        </h1>
        <p className="text-[#6B7280] text-sm mt-1">
          Anda memiliki <span className="font-semibold text-[#111827]">{activeCoursesCount} mata kuliah aktif</span> di {semText}.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-lg">📚</div>
            <div>
              <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Total Matkul</div>
              <div className="text-xl font-bold text-[#111827]">{stats.totalCourses}</div>
            </div>
          </div>
        </div>
        {/* Ongoing */}
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-lg">🔄</div>
            <div>
              <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Sedang Dipelajari</div>
              <div className="text-xl font-bold text-[#D97706]">{stats.ongoingCourses}</div>
            </div>
          </div>
        </div>
        {/* Done */}
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center text-lg">✅</div>
            <div>
              <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Sudah Selesai</div>
              <div className="text-xl font-bold text-[#059669]">{stats.doneCourses}</div>
            </div>
          </div>
        </div>
        {/* Avg Progress */}
        <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-lg">📊</div>
            <div>
              <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Rata-rata Progres</div>
              <div className="text-xl font-bold text-[#E8311F]">{stats.avgProgress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
