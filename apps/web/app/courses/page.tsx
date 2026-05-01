import React from 'react';
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="bg-surface text-on-surface font-body-base text-body-base min-h-screen flex flex-col">
      {/* TopNavBar Component */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-display-lg antialiased tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-blue-700">Practical Labs</span>
          <nav className="hidden md:flex items-center gap-6 h-16">
            <Link className="text-slate-600 hover:text-blue-600 transition-colors h-full flex items-center px-1" href="/labs">Dashboard</Link>
            <Link className="text-blue-700 font-semibold border-b-2 border-blue-700 h-full flex items-center px-1" href="/courses">Courses</Link>
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
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-page py-margin-page">
        {/* Header Section */}
        <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-2 font-body-sm text-body-sm">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Courses</a>
              <span className="text-outline-variant font-technical-code">/</span>
              <span className="text-on-surface font-medium">Module Library</span>
            </nav>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Module Library</h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">
              Explore available laboratory modules. Enroll in new technical courses or track your progress in current experiments.
            </p>
          </div>
        </div>

        {/* Modules List */}
        <div className="flex flex-col gap-stack-lg">

          {/* Lab Group: Thermodynamics Lab */}
          <LabGroup
            color="bg-primary"
            icon="science"
            title="Thermodynamics Lab"
            modules={[
              'Module 1: Closed Systems Analysis',
              'Module 2: Virtual Calorimetry Experiments',
            ]}
          />

          {/* Lab Group: Microbiology Basics */}
          <LabGroup
            color="bg-secondary"
            icon="biotech"
            title="Microbiology Basics"
            modules={[
              'Module 1: Cellular Structures',
              'Module 2: Staining & Microscopic Analysis',
            ]}
          />

          {/* Lab Group: Organic Chemistry I */}
          <LabGroup
            color="bg-primary"
            icon="science"
            title="Organic Chemistry I"
            modules={[
              'Module 1: Carbon-Containing Compounds',
              'Module 2: Basic Synthesis Techniques',
            ]}
          />

          {/* Lab Group: Quantum Mechanics */}
          <LabGroup
            color="bg-tertiary"
            icon="speed"
            title="Quantum Mechanics"
            modules={[
              'Module 1: Wave-Particle Duality',
              "Module 2: Schrödinger's Equation",
            ]}
          />

          {/* Lab Group: Electromagnetism Lab */}
          <LabGroup
            color="bg-tertiary"
            icon="bolt"
            title="Electromagnetism Lab"
            modules={[
              "Module 1: Maxwell's Equations",
              'Module 2: Circuit Theory & Magnetic Fields',
            ]}
          />

          {/* Lab Group: Neurobiology Practicum */}
          <LabGroup
            color="bg-secondary"
            icon="psychology"
            title="Neurobiology Practicum"
            modules={[
              'Module 1: Neural Pathways',
              'Module 2: Synaptic Transmission & Anatomy',
            ]}
          />

        </div>
      </main>
    </div>
  );
}

function LabGroup({
  color,
  icon,
  title,
  modules,
}: {
  color: string;
  icon: string;
  title: string;
  modules: string[];
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      {/* Top accent bar */}
      <div className={`h-1 w-full ${color}`}></div>

      {/* Group Header */}
      <div className="px-stack-md py-stack-sm border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
        <div className="flex items-center gap-stack-sm">
          <h2 className="font-headline-md text-[20px] leading-tight text-on-surface">{title}</h2>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-stack-md py-2 border-b border-outline-variant bg-surface-container-low font-label-caps text-label-caps text-on-surface-variant tracking-wider">
        <div className="col-span-12">Module Name</div>
      </div>

      {/* Module Rows */}
      <div className="divide-y divide-outline-variant">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-4 px-stack-md py-4 md:items-center hover:bg-surface-container-low/30 transition-colors"
          >
            <div className="md:col-span-10">
              <h3 className="font-medium text-on-surface text-body-base">{mod}</h3>
            </div>
            <div className="md:col-span-2 md:text-right flex items-center justify-between md:justify-end">
              <a
                className="text-primary font-body-sm text-body-sm font-medium hover:text-primary-container flex items-center gap-base-unit group"
                href="#"
              >
                Download
                <span className="material-symbols-outlined text-[16px] group-hover:translate-y-1 transition-transform">
                  download
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
