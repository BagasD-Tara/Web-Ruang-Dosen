'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export interface Materi {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'document';
  duration?: string; // e.g., '15 Menit'
  size?: string; // e.g., '2.5 MB'
  isRead: boolean;
}

interface MateriCardProps {
  materi: Materi;
  onClick?: (materi: Materi) => void;
}

export const MateriCard: React.FC<MateriCardProps> = ({ materi, onClick }) => {
  const getIcon = () => {
    switch (materi.type) {
      case 'video':
        return '🎥';
      case 'pdf':
        return '📄';
      case 'document':
        return '📝';
      default:
        return '📁';
    }
  };

  const getThemeColor = () => {
    switch (materi.type) {
      case 'video':
        return 'text-red-600 bg-red-50';
      case 'pdf':
        return 'text-red-500 bg-red-50';
      case 'document':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card 
      onClick={() => onClick && onClick(materi)}
      className={`border-l-4 ${materi.isRead ? 'border-l-[#E5E7EB]' : 'border-l-[#0D9488]'}`}
    >
      <CardContent className="flex items-center justify-between p-4 md:p-5">
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${getThemeColor()}`}>
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                {materi.type}
              </span>
              {!materi.isRead && (
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" title="Belum dibaca"></span>
              )}
            </div>
            <h3 className={`text-[15px] font-bold ${materi.isRead ? 'text-[#4B5563]' : 'text-[#111827]'}`}>
              {materi.title}
            </h3>
            <p className="text-xs text-[#6B7280] font-medium mt-1">
              {materi.duration || materi.size || 'N/A'}
            </p>
          </div>
        </div>
        <button 
          className="px-4 py-2 bg-[#F3F4F6] text-[#4B5563] text-sm font-semibold rounded-lg hover:bg-[#E5E7EB] transition-colors shrink-0"
          aria-label="Buka Materi"
        >
          Buka
        </button>
      </CardContent>
    </Card>
  );
};
