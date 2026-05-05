import React, { useEffect } from 'react';
import { Course } from '@/lib/mock/courses';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnter?: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onEnter }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!course) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] bg-[#171A26]/50 flex items-center justify-center backdrop-blur-[2px] transition-opacity p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-[24px] w-[520px] max-w-full shadow-[0_12px_32px_rgba(0,0,0,0.10),0_4px_8px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-[140px] flex items-center justify-center text-[56px] ${course.cc}`}>
          {course.emoji}
        </div>
        <div className="p-[24px]">
          <p className="text-[12px] font-bold text-[#E8311F] uppercase tracking-[0.5px] mb-[4px]">
            {course.code} · {course.level}
          </p>
          <h2 className="text-[20px] font-extrabold text-[#171A26] leading-[1.3] mb-[10px]">
            {course.title}
          </h2>
          <p className="text-[14px] text-[#6B7280] leading-[1.6] mb-[20px]">
            {course.desc}
          </p>
          
          <div className="flex gap-[20px] mb-[20px] flex-wrap">
            <div className="flex-1 min-w-[100px]">
              <div className="text-[11px] text-[#9397A8] font-bold uppercase tracking-[0.5px]">Dosen</div>
              <div className="text-[14px] font-semibold text-[#2B2F42] mt-[2px]">{course.instr}</div>
            </div>
            <div className="flex-1 min-w-[80px]">
              <div className="text-[11px] text-[#9397A8] font-bold uppercase tracking-[0.5px]">SKS</div>
              <div className="text-[14px] font-semibold text-[#2B2F42] mt-[2px]">{course.sks} SKS</div>
            </div>
            <div className="flex-1 min-w-[100px]">
              <div className="text-[11px] text-[#9397A8] font-bold uppercase tracking-[0.5px]">Semester</div>
              <div className="text-[14px] font-semibold text-[#2B2F42] mt-[2px]">Semester {course.sem}</div>
            </div>
          </div>
          
          <div className="flex gap-[10px]">
            <button 
              className="flex-1 h-[44px] bg-[#E8311F] text-white text-[14px] font-bold rounded-[10px] transition-colors hover:bg-[#C4220F]"
              onClick={() => {
                if (onEnter) {
                  onEnter();
                } else {
                  onClose();
                }
              }}
            >
              Masuk Course →
            </button>
            <button 
              className="h-[44px] px-[20px] border-[1.5px] border-[#D5D7E0] rounded-[10px] text-[14px] font-semibold text-[#565C73] transition-all hover:border-[#9397A8] hover:text-[#171A26]"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
