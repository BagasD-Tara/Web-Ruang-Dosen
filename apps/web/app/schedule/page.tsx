import React from 'react';
import Link from 'next/link';
import { TopNavBar } from '@/components/TopNavBar';

export default function SchedulePage() {
  return (
    <div className="bg-background text-on-background font-body-base text-body-base min-h-screen flex flex-col">
      {/* TopNavBar Component */}
      <TopNavBar />

      <main className="flex-1 py-12 px-8 w-full max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 text-xs font-medium text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" href="/labs">Dashboard</Link>
            <span className="text-outline-variant font-normal text-[10px]">/</span>
            <span className="text-on-surface">Laboratory Schedule</span>
          </nav>
          <Link
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-headline-md text-sm mb-4 transition-colors group"
            href="/labs"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back
          </Link>
          <h1 className="font-headline-md text-[32px] text-on-background text-left mb-2">Laboratory Schedule</h1>
          <p className="text-on-surface-variant text-body-base max-w-2xl">
            Manage your weekly laboratory sessions, track upcoming experiments, and view completed practical credits.
          </p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Lab Card 1 */}
          <ScheduleCard
            title="Basis Data H"
            description="Learn fundamentals of relational databases, SQL queries, and database design principles."
            location="Lab A"
            room="Room B2"
            day="Monday"
            time="16:20 - 19:05"
          />

          {/* Lab Card 2 */}
          <ScheduleCard
            title="Struktur Data G"
            description="Implementation of basic data structures including arrays, linked lists, trees, and graphs."
            location="Lab C"
            room="Room 104"
            day="Tuesday"
            time="08:40 - 10:20"
          />

          {/* Lab Card 3 */}
          <ScheduleCard
            title="Sistem Operasi F"
            description="Practical exercises on process management, memory management, and file systems."
            location="Lab A"
            room="Room B2"
            day="Wednesday"
            time="13:00 - 15:40"
          />

        </div>
      </main>
    </div>
  );
}

function ScheduleCard({
  title,
  description,
  location,
  room,
  day,
  time,
}: {
  title: string;
  description: string;
  location: string;
  room: string;
  day: string;
  time: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <h3 className="font-headline-md text-on-surface text-xl font-bold">{title}</h3>
        <p className="text-on-surface-variant text-sm line-clamp-2">{description}</p>
      </div>
      <hr className="border-outline-variant" />
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">location_on</span>
          <div>
            <p className="text-sm font-medium text-on-surface">{location}</p>
            <p className="text-xs">{room}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">schedule</span>
          <div>
            <p className="text-sm font-medium text-on-surface">{day}</p>
            <p className="text-xs">{time}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-end">
        <Link className="text-primary hover:text-primary-container text-sm font-semibold flex items-center gap-1 transition-colors" href="/workspace">
          View Details
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
