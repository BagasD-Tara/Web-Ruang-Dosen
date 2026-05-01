import React from 'react';
import Link from 'next/link';

export default function WorkspacePage() {
  return (
    <div className="bg-background text-on-background font-body-base min-h-screen flex flex-col">
      {/* Top NavBar */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm antialiased tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-blue-700">Practical Labs</span>
          <nav className="hidden md:flex items-center gap-6 h-16">
            <Link className="text-blue-700 font-semibold border-b-2 border-blue-700 h-full flex items-center px-1" href="/labs">Dashboard</Link>
            <Link className="text-slate-600 hover:text-blue-600 transition-colors h-full flex items-center px-1" href="/courses">Courses</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2NGhGaXrn6CU7oCDEowWr_0zoOYv4pTZfY-4aDRH_FLqS0kvplzpZbM0_ZVIbgWhxjz11Pnw6t2DM0-Mx6wDlLwR4tABOGWZgzyvFB_HNkvIlOD96C1nGaPt6lNP8hPjT-dI8GjTPb6m9xRt4RgvVwJeWyi8C4WU1JZGcNbEIW43x8O9Gc8MEEX4Q25jWGhevKxmI77BJyOgkTr3OPvZfnNS2wgFfANhzDOlCIAOgZSdt946cKYziqFjPUCUlpz2UO9zZmzTeUM"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-margin-page max-w-[1280px] w-full mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 text-xs font-medium text-on-surface-variant">
          <Link className="hover:text-primary transition-colors" href="/labs">Dashboard</Link>
          <span className="text-outline-variant font-normal text-[10px]">/</span>
          <Link className="hover:text-primary transition-colors" href="/schedule">Laboratory Schedule</Link>
          <span className="text-outline-variant font-normal text-[10px]">/</span>
          <span className="text-on-surface">Lab Workspace</span>
        </nav>

        <Link
          className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-headline-md text-sm mb-4 transition-colors group"
          href="/schedule"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back
        </Link>

        {/* Page Header */}
        <div className="mb-stack-lg border-l-4 border-primary pl-4 py-2 bg-surface-container-low rounded-r">
          <h2 className="font-display-lg text-[32px] font-bold text-on-surface mb-1">Advanced Titration &amp; pH Analysis</h2>
          <p className="font-body-base text-body-base text-on-surface-variant">Lab A/B - Seat B2 • WED, 13:30 - 16:05</p>
        </div>

        {/* Module Table */}
        <div className="space-y-stack-lg">
          <div className="bg-surface border border-outline-variant rounded shadow-sm overflow-hidden border-t-4 border-t-primary">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Module Name</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Topic</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">Grade</th>
                    <th className="py-3 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Action</th>
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
                      <button className="bg-primary text-on-primary px-4 py-1.5 rounded font-label-caps text-label-caps hover:bg-primary-container transition-colors flex items-center gap-2 ml-auto shadow-sm">
                        Start Demo
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      </button>
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
                    <td className="py-4 px-6 text-primary/70 font-medium italic">Pending</td>
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
      </main>
    </div>
  );
}
