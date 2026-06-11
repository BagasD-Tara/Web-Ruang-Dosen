"use client";

import type { ReactNode } from "react";
import { Bell } from "lucide-react";


const BookIcon: React.FC = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 1h7a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H1V1z" stroke="#003594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 1h-7a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h8V1z" stroke="#003594" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// QuizHeader: wrapper layout untuk halaman quiz (header + content + footer)
export default function QuizHeader({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* HEADER */}
      <header className="h-16 border-b bg-white sticky top-0 z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon />
            <span
              className="text-xl font-bold hidden sm:inline"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Ruang Dosen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-slate-500" />
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <img
                src="/avatar.png"
                alt="avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t bg-white py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <p className="font-bold text-blue-700 text-sm">Ruang Dosen</p>
            <p className="text-xs text-slate-400 mt-0.5">
              © 2024 Ruang Dosen Academic Platform. All rights reserved.
            </p>
          </div>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-700">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700">Terms of Service</a>
            <a href="#" className="hover:text-slate-700">Help Center</a>
            <a href="#" className="hover:text-slate-700">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}