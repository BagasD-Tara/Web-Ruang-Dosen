'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Base Card component with standard shadow, border, and hover effects.
 */
export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <article 
      className={`bg-white border-[1.5px] border-[#EDEEF2] rounded-[16px] overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.10),0_4px_8px_rgba(0,0,0,0.05)] hover:border-[#D5D7E0] ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </article>
  );
};

/**
 * Card Header area, typically used for images, colors, or main icons.
 */
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Content area, with standard padding.
 */
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`p-[16px] ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Footer area, with top border and standard padding.
 */
export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`px-[16px] py-[12px] border-t border-[#EDEEF2] flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};
