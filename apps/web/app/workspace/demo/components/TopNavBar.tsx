import React from 'react';

export function TopNavBar({ warnings }: { warnings: number }) {
  return (
    <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-display-lg antialiased tracking-tight">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-blue-700">Practical Labs</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-error-container border border-error rounded-full text-error font-technical-code text-sm animate-pulse">
          <span className="material-symbols-outlined text-lg">timer</span>
          <span>01:24:45</span>
        </div>
        {warnings > 0 && (
          <div className="bg-error-container text-on-error-container px-3 py-1 rounded text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">warning</span>
            {warnings} Violations
          </div>
        )}
      </div>
    </header>
  );
}
