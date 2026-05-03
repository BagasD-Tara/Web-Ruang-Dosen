import React from 'react';
import { TopNavBar } from '@/components/TopNavBar';

export default function CoursesPage() {
  return (
    <div className="bg-surface text-on-surface font-body-base text-body-base min-h-screen flex flex-col">
      {/* TopNavBar Component */}
      <TopNavBar />

      {/* Main Content */}
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-page py-margin-page">
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
            title="Thermodynamics Lab"
            modules={[
              'Module 1: Closed Systems Analysis',
              'Module 2: Virtual Calorimetry Experiments',
            ]}
          />

          {/* Lab Group: Microbiology Basics */}
          <LabGroup
            color="bg-secondary"
            title="Microbiology Basics"
            modules={[
              'Module 1: Cellular Structures',
              'Module 2: Staining & Microscopic Analysis',
            ]}
          />

          {/* Lab Group: Organic Chemistry I */}
          <LabGroup
            color="bg-primary"
            title="Organic Chemistry I"
            modules={[
              'Module 1: Carbon-Containing Compounds',
              'Module 2: Basic Synthesis Techniques',
            ]}
          />

          {/* Lab Group: Quantum Mechanics */}
          <LabGroup
            color="bg-tertiary"
            title="Quantum Mechanics"
            modules={[
              'Module 1: Wave-Particle Duality',
              "Module 2: Schrödinger's Equation",
            ]}
          />

          {/* Lab Group: Electromagnetism Lab */}
          <LabGroup
            color="bg-tertiary"
            title="Electromagnetism Lab"
            modules={[
              "Module 1: Maxwell's Equations",
              'Module 2: Circuit Theory & Magnetic Fields',
            ]}
          />

          {/* Lab Group: Neurobiology Practicum */}
          <LabGroup
            color="bg-secondary"
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
  title,
  modules,
}: {
  color: string;
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
