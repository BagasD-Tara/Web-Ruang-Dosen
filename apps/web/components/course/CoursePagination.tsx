import React from 'react';

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
}

export const CoursePagination: React.FC<CoursePaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] bg-white rounded-[10px] text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-[10px] font-bold transition-all ${
            currentPage === page
              ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/20'
              : 'border border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] bg-white rounded-[10px] text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  );
};
