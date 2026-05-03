import React from 'react';

export function WarningModal({ message, onAcknowledge }: { message: string, onAcknowledge: () => void }) {
  return (
    <div className="absolute inset-0 bg-on-surface/50 z-200 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl max-w-md w-full p-8 text-center shadow-lg border border-outline-variant">
        <span className="material-symbols-outlined text-[48px] text-error mb-4">warning</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Security Warning</h2>
        <p className="text-on-surface-variant mb-8">{message}</p>
        <button 
          onClick={onAcknowledge}
          className="px-6 py-3 bg-error hover:bg-error/90 text-white font-bold rounded shadow-sm w-full"
        >
          Acknowledge & Return to Exam
        </button>
      </div>
    </div>
  );
}
