import React from 'react';
import { Course } from '@/lib/mock/courses';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  onContinue?: (course: Course) => void;
  onStart?: (course: Course) => void;
  onViewGrade?: (course: Course) => void;
}

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'dasar': return 'bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]';
    case 'menengah': return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
    case 'lanjut': return 'bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3]';
    default: return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
  }
};

const renderStatusButton = (
  course: Course, 
  onContinue?: (course: Course) => void, 
  onStart?: (course: Course) => void, 
  onViewGrade?: (course: Course) => void
) => {
  switch (course.status) {
    case 'done':
      return (
        <button 
          className="text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] border border-[#A8EFCA] bg-[#EDFBF4] text-[#16A85A]"
          onClick={(e) => {
            e.stopPropagation();
            onViewGrade && onViewGrade(course);
          }}
        >
          Lihat Nilai ✓
        </button>
      );
    case 'ongoing':
      return (
        <button 
          className="bg-[#E8311F] text-white text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] transition-all hover:bg-[#C4220F] hover:shadow-md hover:shadow-[#E8311F]/20 hover:-translate-y-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onContinue && onContinue(course);
          }}
        >
          Lanjutkan →
        </button>
      );
    case 'notstart':
      return (
        <button 
          className="bg-[#F59E0B] text-white text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] transition-all hover:bg-[#D97706] hover:shadow-md hover:shadow-[#F59E0B]/20 hover:-translate-y-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onStart && onStart(course);
          }}
        >
          Mulai Belajar
        </button>
      );
    default:
      return null;
  }
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, onContinue, onStart, onViewGrade }) => {
  return (
    <Card 
      className="border-[1.5px] border-[#EDEEF2] rounded-[16px] overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.10),0_4px_8px_rgba(0,0,0,0.05)] hover:border-[#D5D7E0] cursor-pointer"
      onClick={() => onClick(course)}
    >
      <CardHeader className="h-[130px] relative overflow-hidden p-0">
        <div className={`w-full h-full flex items-center justify-center text-[48px] ${course.cc}`}>
          {course.emoji}
        </div>
        <span className="absolute top-[10px] left-[10px] bg-white/95 rounded-[20px] px-[10px] py-[3px] text-[11px] font-bold text-[#111827] shadow-sm backdrop-blur-[4px]">
          Sem {course.sem}
        </span>
        {course.isNew && (
          <span className="absolute top-[10px] right-[10px] bg-[#F59E0B] rounded-[20px] px-[10px] py-[3px] text-[11px] font-bold text-white shadow-sm shadow-[#F59E0B]/30">
            NEW
          </span>
        )}
      </CardHeader>
      
      <CardContent className="p-[16px]">
        <div className="flex items-center gap-2 mb-[6px]">
          <span className="text-[11px] font-bold text-[#0284C7] tracking-[0.5px]">
            {course.code}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelColor(course.level)} uppercase tracking-wider`}>
            {course.level}
          </span>
        </div>
        <h3 className="text-[15px] font-bold text-[#111827] leading-[1.35] mb-[8px] line-clamp-2 h-[40px]">
          {course.title}
        </h3>
        <div className="flex items-center gap-[7px] mb-[12px]">
          <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284C7] flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm">
            {course.init}
          </div>
          <span className="text-[12px] text-[#6B7280] font-medium">{course.instr}</span>
        </div>
        
        <div className="mb-[12px]">
          <div className="flex justify-between text-[12px] mb-[5px]">
            <span className="text-[#6B7280] font-medium">Progress</span>
            <span className="text-[#111827] font-bold">{course.prog}%</span>
          </div>
          <div className="h-[5px] bg-[#F1F5F9] rounded-[10px] overflow-hidden">
            <div 
              className={`h-full rounded-[10px] transition-all duration-500 ${course.prog === 100 ? 'bg-[#10B981]' : 'bg-[#E8311F]'}`} 
              style={{ width: `${course.prog}%` }}
            ></div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-[16px] py-[12px] border-t border-[#EDEEF2] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[4px] text-[11px] text-[#6B7280]">
            <svg className="w-[13px] h-[13px] stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            {course.mat}
          </div>
          <div className="flex items-center gap-[4px] text-[11px] text-[#6B7280]">
            <svg className="w-[13px] h-[13px] stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            {course.quiz}
          </div>
        </div>
        {renderStatusButton(course, onContinue, onStart, onViewGrade)}
      </CardFooter>
    </Card>
  );
};
