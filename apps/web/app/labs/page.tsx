import React from 'react';
import Link from 'next/link';
import { TopNavBar } from '@/components/TopNavBar';

export default function LabsDashboard() {
  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      {/* TopNavBar Component */}
      <TopNavBar />

      <main className="max-w-[1280px] mx-auto px-6 py-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-grid">
          {/* Left Column: Main Dashboard Content (12 Cols as per provided HTML) */}
          <div className="lg:col-span-12 space-y-stack-lg">
            
            {/* 1. Announcements */}
            <section className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-lg space-y-stack-md">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">campaign</span>
                <h3 className="font-label-caps text-label-caps">ANNOUNCEMENTS</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-1">
                  <h5 className="text-sm font-bold text-on-surface">New Lab Equipment Added</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Dr. Aris added Spectroscopy tools to the advanced modules.</p>
                  <span className="text-[10px] text-outline mt-1 block">2 hours ago</span>
                </div>
                <div className="border-l-4 border-outline-variant pl-4 py-1">
                  <h5 className="text-sm font-bold text-on-surface">System Maintenance</h5>
                  <p className="text-xs text-on-surface-variant mt-1">Scheduled update tomorrow at 02:00 AM PST.</p>
                  <span className="text-[10px] text-outline mt-1 block">1 day ago</span>
                </div>
              </div>
            </section>

            {/* 2. Current Lab Hero Card */}
            <section className="relative overflow-hidden rounded-xl bg-white border border-outline-variant shadow-sm group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="p-stack-lg flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-2 md:text-left w-full text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-label-caps text-label-caps text-primary uppercase">Current Lab</span>
                      <span className="font-technical-code text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded uppercase">Wed, 13:30 - 16:05</span>
                    </div>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Advanced Titration & pH Analysis</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Experiment 4: Determining the concentration of an unknown acid through automated volumetric analysis.</p>
                  <div className="w-full bg-surface-container h-2 rounded-full mt-4 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[65%]"></div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <Link 
                    href="/workspace"
                    className="w-full px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue Lab</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. Lab Schedule */}
            <section className="space-y-stack-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">Lab Schedule</h3>
                <Link className="text-primary font-label-caps text-label-caps hover:underline" href="/schedule">View</Link>
              </div>
              <div className="bg-white border border-outline-variant rounded-xl p-stack-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Schedule Card 1 */}
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
                    <div className="space-y-1">
                      <h5 className="font-bold text-on-surface text-sm">Basis Data H</h5>
                      <p className="text-xs text-on-surface-variant font-medium">Lab A • Room B2</p>
                      <p className="text-[10px] text-primary font-technical-code uppercase mt-1">Mon, 16:20 - 19:05</p>
                    </div>
                  </div>
                  {/* Schedule Card 2 */}
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
                    <div className="space-y-1">
                      <h5 className="font-bold text-on-surface text-sm">Operating Systems</h5>
                      <p className="text-xs text-on-surface-variant font-medium">Lab B • Room B4</p>
                      <p className="text-[10px] text-secondary font-technical-code uppercase mt-1">Tue, 08:00 - 10:35</p>
                    </div>
                  </div>
                  {/* Schedule Card 3 */}
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
                    <div className="space-y-1">
                      <h5 className="font-bold text-on-surface text-sm">Web Programming</h5>
                      <p className="text-xs text-on-surface-variant font-medium">Lab C • Room C1</p>
                      <p className="text-[10px] text-tertiary font-technical-code uppercase mt-1">Wed, 13:30 - 16:05</p>
                    </div>
                  </div>
                  {/* Schedule Card 4 */}
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30">
                    <div className="space-y-1">
                      <h5 className="font-bold text-on-surface text-sm">Cloud Computing</h5>
                      <p className="text-xs text-on-surface-variant font-medium">Lab D • Room D2</p>
                      <p className="text-[10px] text-outline font-technical-code uppercase mt-1">Thu, 10:45 - 13:20</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Available Modules */}
            <section className="space-y-stack-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">Available Modules</h3>
                <div className="flex gap-4">
                  <Link className="text-primary font-label-caps text-label-caps hover:underline cursor-pointer" href="/courses">View</Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                {/* Lab Card 1 */}
                <div className="group bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all">
                  <div className="h-2 bg-tertiary"></div>
                  <div className="p-stack-md space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-on-surface">Thermodynamics Lab</h4>
                    </div>
                    <p className="text-body-sm text-on-surface-variant">Exploring the laws of energy conversion through controlled heat cycles and engine simulations.</p>
                    <div className="flex items-center justify-end pt-2">
                      <button className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Lab Card 2 */}
                <div className="group bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all">
                  <div className="h-2 bg-primary-container"></div>
                  <div className="p-stack-md space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-on-surface">Microbiology Basics</h4>
                    </div>
                    <p className="text-body-sm text-on-surface-variant">Introduction to aseptic techniques and bacteria staining procedures in a virtual sterile hood.</p>
                    <div className="flex items-center justify-end pt-2">
                      <button className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Floating Action Button for Support/Context */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <span className="material-symbols-outlined">support_agent</span>
        <span className="absolute right-full mr-4 bg-on-surface text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Contact Lab Assistant</span>
      </button>
    </div>
  );
}
