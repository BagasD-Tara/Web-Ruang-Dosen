import React from 'react';
import { SORT_OPTIONS, SortOption } from '@/hooks/useCourses';

interface CourseFiltersProps {
  availableSemesters: string[];
  activeSem: string;
  setActiveSem: (sem: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  availableSemesters,
  activeSem,
  setActiveSem,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {availableSemesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setActiveSem(sem)}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap shadow-sm border ${
              activeSem === sem
                ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-[#1E293B]/20'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#1E293B] hover:text-[#1E293B]'
            }`}
          >
            {sem === 'all' ? 'Semua Semester' : `Semester ${sem}`}
          </button>
        ))}
      </div>

      {/* Sort — aligned right */}
      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <span className="text-[13px] font-semibold text-[#6B7280] whitespace-nowrap">Urutkan:</span>
        <div className="relative min-w-[140px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full h-10 pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-semibold text-[#111827] outline-none cursor-pointer hover:border-[#9CA3AF] appearance-none transition-all focus:border-[#6366F1]"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'Progress Terbesar' ? 'Progress' : option}
              </option>
            ))}
          </select>
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
