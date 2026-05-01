import React from 'react';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="bg-background text-on-background font-body-base text-body-base min-h-screen flex flex-col">
      {/* TopNavBar Component */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-display-lg antialiased tracking-tight">
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
            icon="database"
            title="Basis Data H"
            description="Learn fundamentals of relational databases, SQL queries, and database design principles."
            location="Lab A"
            room="Room B2"
            day="Monday"
            time="16:20 - 19:05"
          />

          {/* Lab Card 2 */}
          <ScheduleCard
            icon="data_object"
            title="Struktur Data G"
            description="Implementation of basic data structures including arrays, linked lists, trees, and graphs."
            location="Lab C"
            room="Room 104"
            day="Tuesday"
            time="08:40 - 10:20"
          />

          {/* Lab Card 3 */}
          <ScheduleCard
            icon="memory"
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
  icon,
  title,
  description,
  location,
  room,
  day,
  time,
}: {
  icon: string;
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
