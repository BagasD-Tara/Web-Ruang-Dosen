'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TopNavBar } from '@/components/TopNavBar';
import { ModuleTable } from './components/ModuleTable';

export default function WorkspacePage() {
  const [demoViolations, setDemoViolations] = useState<number | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Allow messages from the same origin
      if (event.origin !== window.location.origin) return;
      
      if (event.data?.type === 'DEMO_FINISHED') {
        setDemoViolations(event.data.warnings);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-base min-h-screen flex flex-col">
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-1 py-12 px-8 w-full max-w-[1280px] mx-auto">
        {/* Header section matching schedule page layout */}
        <div className="mb-12">
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

          {/* Page Header Info */}
          <div className="border-l-4 border-primary pl-4 py-2 bg-surface-container-low rounded-r mt-2">
            <h2 className="font-display-lg text-[32px] font-bold text-on-surface mb-1">Advanced Titration &amp; pH Analysis</h2>
            <p className="font-body-base text-body-base text-on-surface-variant">Lab A/B - Seat B2 • WED, 13:30 - 16:05</p>
          </div>
        </div>

        {/* Module Table */}
        <ModuleTable demoViolations={demoViolations} />
      </main>
    </div>
  );
}
