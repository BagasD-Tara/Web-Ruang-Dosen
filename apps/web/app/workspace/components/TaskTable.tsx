import React from 'react';

export function TaskTable() {
  return (
    <div className="space-y-stack-md">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-headline-md text-[20px] font-bold text-on-surface">Lab Tasks</h3>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded uppercase tracking-wider">2 Tasks Available</span>
      </div>
      <div className="bg-surface border border-outline-variant rounded shadow-sm overflow-hidden border-t-4 border-t-primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[35%]">Task Name</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[30%]">Deadline</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase w-[15%]">Status</th>
                <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody className="font-technical-code text-technical-code">
              {/* Task 1 */}
              <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-container/30 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">assignment</span>
                    </div>
                    <span className="text-on-surface font-medium">Module 1 - Task 1</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">May 15, 2024 • 23:59</td>
                <td className="py-4 px-6">
                  <span className="bg-warning-container text-on-warning-container px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide">—</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="bg-primary text-on-primary px-4 py-1.5 rounded font-label-caps text-label-caps hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-sm">
                    Submit Task
                    <span className="material-symbols-outlined text-[16px]">upload</span>
                  </button>
                </td>
              </tr>

              {/* Task 2 - Locked */}
              <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors bg-surface-container-low/50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-container/30 flex items-center justify-center text-primary opacity-50">
                      <span className="material-symbols-outlined text-[18px]">assignment</span>
                    </div>
                    <span className="text-on-surface font-medium opacity-70">Module 1 - Task 2</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-on-surface-variant opacity-70">May 18, 2024 • 23:59</td>
                <td className="py-4 px-6">
                  <span className="bg-warning-container text-on-warning-container px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide">—</span>
                </td>
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
