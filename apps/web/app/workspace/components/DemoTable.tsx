import Link from 'next/link';
import React from 'react';

export function DemoTable({ demoViolations }: { demoViolations: number | null }) {
  return (
    <div className="space-y-stack-md">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-headline-md text-[20px] font-bold text-on-surface">Lab Demo</h3>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded uppercase tracking-wider">3 Demo Available</span>
      </div>
      <div className="bg-surface border border-outline-variant rounded shadow-sm overflow-hidden border-t-4 border-t-primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[35%]">Demo Name</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[30%]">Topic</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[15%]">Grade</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody className="font-technical-code text-technical-code">
              {/* Row 1 - Active */}
              <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">computer</span>
                    </div>
                    <span className="text-on-surface font-medium">Module 1 - DEMO</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Introductory Walkthrough</td>
                <td className="py-4 px-6 text-on-surface font-semibold">A</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    {demoViolations !== null && (
                      <div className={`text-xs font-bold px-2 py-1 rounded ${demoViolations > 0 ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                        {demoViolations > 0 ? `${demoViolations} Violations` : 'No Violations'}
                      </div>
                    )}
                    <button 
                      onClick={() => window.open('/workspace/demo', 'DemoWindow', `width=${window.screen.availWidth},height=${window.screen.availHeight},top=0,left=0,menubar=no,toolbar=no,location=no,status=no`)}
                      className="bg-primary text-on-primary px-4 py-1.5 rounded font-label-caps text-label-caps hover:bg-primary-container transition-colors inline-flex items-center gap-2 shadow-sm"
                    >
                      Start Demo
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 - Locked */}
              <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors bg-surface-container-low/50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-primary opacity-50">
                      <span className="material-symbols-outlined text-[18px]">computer</span>
                    </div>
                    <span className="text-on-surface font-medium opacity-70">Module 2 - DEMO</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant opacity-70">Process Simulation</td>
                <td className="py-4 px-6 text-primary/70 font-medium italic">—</td>
                <td className="py-4 px-6 text-right">
                  <button disabled className="bg-surface text-on-surface-variant px-4 py-1.5 rounded font-label-caps text-label-caps border border-outline-variant opacity-50 cursor-not-allowed flex items-center gap-2 ml-auto">
                    Locked
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </button>
                </td>
              </tr>

              {/* Row 3 - Locked */}
              <tr className="hover:bg-surface-container-lowest transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-primary opacity-50">
                      <span className="material-symbols-outlined text-[18px]">computer</span>
                    </div>
                    <span className="text-on-surface font-medium opacity-70">Module 3 - DEMO</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant opacity-70">Final Evaluation</td>
                <td className="py-4 px-6 text-on-surface-variant/50">—</td>
                <td className="py-4 px-6 text-right">
                  <button disabled className="bg-surface text-on-surface-variant px-4 py-1.5 rounded font-label-caps text-label-caps border border-outline-variant opacity-50 cursor-not-allowed flex items-center gap-2 ml-auto">
                    Locked
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
