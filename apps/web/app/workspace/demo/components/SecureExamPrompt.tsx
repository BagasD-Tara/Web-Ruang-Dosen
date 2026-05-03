import React from 'react';

export function SecureExamPrompt({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 bg-background z-100 flex flex-col items-center justify-center p-8 text-center">
      <span className="material-symbols-outlined text-[64px] text-primary mb-4">lock</span>
      <h1 className="text-3xl font-headline-md font-bold text-on-surface mb-2">Secure Exam Environment</h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        This module requires a secure environment. Once started, you will be in fullscreen mode. Leaving the window, switching tabs, or exiting fullscreen will be recorded as a violation.
      </p>
      <button 
        onClick={onStart}
        className="px-8 py-3 bg-primary hover:opacity-90 text-on-primary font-bold rounded text-lg shadow-sm"
      >
        Start Secure Exam
      </button>
    </div>
  );
}
