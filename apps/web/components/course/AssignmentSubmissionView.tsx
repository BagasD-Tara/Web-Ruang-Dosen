'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { CourseContentItem, CourseDetail } from '@/lib/mock/courses';
import {
  buildAssignmentHref,
  buildCourseDetailHref,
  getCourseBreadcrumbParent,
  getCourseSource,
} from '@/lib/courseNavigation';

interface AssignmentSubmissionViewProps {
  course: CourseDetail;
  assignment: CourseContentItem;
  previousAssignment?: CourseContentItem;
  nextAssignment?: CourseContentItem;
}

interface AssignmentActionBarProps {
  previousHref?: string;
  nextHref?: string;
  onSubmit?: () => void;
}

interface AssignmentNavButtonProps {
  href?: string;
  label: string;
  direction: 'previous' | 'next';
  primary?: boolean;
}

interface StatusRowProps {
  icon: React.ReactNode;
  label: string;
  primaryText: string;
  secondaryText?: string;
  secondaryTone?: string;
  badge?: boolean;
}

const ASSIGNMENT_REQUIREMENTS = [
  'Implement the forward pass and activation function (Step or Sigmoid).',
  'Implement the training loop using the perceptron learning rule.',
  'Test your implementation on a simple linearly separable dataset (e.g., AND or OR gate logic).',
  'Provide a short report (PDF) explaining your code structure and demonstrating the output.',
];

export function AssignmentSubmissionView({
  course,
  assignment,
  previousAssignment,
  nextAssignment,
}: AssignmentSubmissionViewProps) {
  const searchParams = useSearchParams();
  const source = getCourseSource(searchParams.get('from'));
  const courseDetailHref = buildCourseDetailHref(course.id, source);
  const parentBreadcrumb = getCourseBreadcrumbParent(source);
  const previousHref = previousAssignment
    ? buildAssignmentHref(course.id, previousAssignment.id, source)
    : undefined;
  const nextHref = nextAssignment
    ? buildAssignmentHref(course.id, nextAssignment.id, source)
    : undefined;

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <AssignmentBreadcrumbs
          course={course}
          courseDetailHref={courseDetailHref}
          parentLabel={parentBreadcrumb.label}
          parentHref={parentBreadcrumb.href}
          showParent={source === 'my-courses'}
        />

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
          <main className="space-y-7">
            <AssignmentHero assignment={assignment} />
            <AssignmentBrief assignment={assignment} />
            <SubmissionBox />
          </main>

          <AssignmentStatusCard assignment={assignment} />
        </div>
      </div>

      <AssignmentActionBar previousHref={previousHref} nextHref={nextHref} onSubmit={() => alert('Assignment Submitted!')} />
    </div>
  );
}

function AssignmentBreadcrumbs({
  course,
  courseDetailHref,
  parentLabel,
  parentHref,
  showParent,
}: {
  course: CourseDetail;
  courseDetailHref: string;
  parentLabel: string;
  parentHref: string;
  showParent: boolean;
}) {
  return (
    <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
      <Link href="/" className="transition-opacity hover:opacity-70">
        Home
      </Link>
      <span>&rsaquo;</span>
      <Link href="/courses" className="transition-opacity hover:opacity-70">
        Courses
      </Link>
      {showParent ? (
        <>
          <span>&rsaquo;</span>
          <Link href={parentHref} className="transition-opacity hover:opacity-70">
            {parentLabel}
          </Link>
        </>
      ) : null}
      <span>&rsaquo;</span>
      <Link href={courseDetailHref} className="transition-opacity hover:opacity-70">
        {course.breadcrumbLabel ?? course.title}
      </Link>
      <span>&rsaquo;</span>
      <span>Module 1</span>
      <span>&rsaquo;</span>
      <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        Assignment
      </span>
    </nav>
  );
}

function AssignmentHero({ assignment }: { assignment: CourseContentItem }) {
  return (
    <AssignmentSection>
      <h1 className="text-xl font-bold leading-tight sm:text-2xl" style={{ color: 'var(--color-text-primary)' }}>
        {assignment.title}
      </h1>
      <p className="mt-3 text-base leading-7 sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
        Demonstrate your foundational understanding of neural networks.
      </p>
    </AssignmentSection>
  );
}

function AssignmentBrief({ assignment }: { assignment: CourseContentItem }) {
  const briefContent = assignment.summary || 'Follow the instructions provided to complete this assignment.';
  const requirements = assignment.content?.previewText 
    ? assignment.content.previewText.split('\n').filter(Boolean)
    : ASSIGNMENT_REQUIREMENTS;

  return (
    <AssignmentSection>
      <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
        Assignment Brief
      </h2>
      <p className="mt-5 text-base leading-8 sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
        {briefContent}
      </p>
      <ul className="mt-5 space-y-3 pl-6 text-base leading-7 sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
        {requirements.map((requirement, idx) => (
          <li key={idx}>{requirement.replace(/^- /, '')}</li>
        ))}
      </ul>
    </AssignmentSection>
  );
}

function SubmissionBox() {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <AssignmentSection>
      <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
        Submission Box
      </h2>
      <div className="mt-5 rounded-[24px] border-2 border-dashed px-5 py-10 text-center relative" style={{ borderColor: '#BFC7DA', background: '#FBFCFE' }}>
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleFileChange}
          accept=".pdf,.py,.ipynb"
        />
        <UploadIcon />
        <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {file ? file.name : 'Drag and drop your files here'}
        </h3>
        <p className="mt-3 text-base" style={{ color: 'var(--color-text-secondary)' }}>
          Supported formats: PDF, .py, .ipynb (Max 50MB)
        </p>
        <button
          type="button"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-xl border bg-white px-7 text-base font-semibold transition-opacity hover:opacity-80"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-brand-primary)' }}
        >
          {file ? 'Change File' : 'Browse Files'}
        </button>
      </div>
    </AssignmentSection>
  );
}

function AssignmentSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border bg-white px-6 py-7 shadow-[0_12px_28px_rgba(7,27,63,0.04)] sm:px-8" style={{ borderColor: 'var(--color-border)' }}>
      {children}
    </section>
  );
}

function AssignmentStatusCard({ assignment }: { assignment: CourseContentItem }) {
  const metaParts = assignment.meta ? assignment.meta.split(' • ') : [];
  const points = metaParts.length > 0 ? metaParts[0] : '100 Points';
  const dueDate = metaParts.length > 1 ? metaParts[1] : 'No Due Date';

  return (
    <aside className="h-fit rounded-[28px] border bg-white px-6 py-7 shadow-[0_12px_28px_rgba(7,27,63,0.04)] xl:sticky xl:top-28" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
        Assignment Status
      </h2>
      <div className="mt-5 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
        <StatusRow
          icon={<ClockStatusIcon />}
          label="Due Date"
          primaryText={dueDate}
          secondaryText="Open"
          secondaryTone="#A42C08"
        />
        <StatusRow
          icon={<TrophyIcon />}
          label="Points Possible"
          primaryText={points}
        />
        <StatusRow
          icon={<ClipboardStatusIcon />}
          label="Submission Status"
          primaryText="Not Submitted"
          badge
        />
      </div>
    </aside>
  );
}

function StatusRow({
  icon,
  label,
  primaryText,
  secondaryText,
  secondaryTone,
  badge = false,
}: StatusRowProps) {
  return (
    <div className="mb-8 flex items-start gap-4 last:mb-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF0F2]" style={{ color: 'var(--color-text-muted)' }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </p>
        {badge ? (
          <span className="mt-2 inline-flex rounded-full border bg-[#F3F4F8] px-4 py-1 text-base font-semibold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            {primaryText}
          </span>
        ) : (
          <p className="mt-1 text-lg font-semibold leading-7" style={{ color: 'var(--color-text-primary)' }}>
            {primaryText}
          </p>
        )}
        {secondaryText ? (
          <p className="mt-1 text-lg font-semibold" style={{ color: secondaryTone ?? 'var(--color-text-secondary)' }}>
            {secondaryText}
          </p>
        ) : null}
      </div>
    </div>
  );
}

interface AssignmentActionBarProps {
  previousHref?: string;
  nextHref?: string;
  onSubmit?: () => void;
}

function AssignmentActionBar({ previousHref, nextHref, onSubmit }: AssignmentActionBarProps) {
  return (
    <div className="border-t bg-white px-4 py-4 sm:px-6 lg:px-8" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mx-auto grid w-full max-w-[1280px] gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AssignmentNavButton href={previousHref} label="Previous" direction="previous" />
          <AssignmentNavButton href={nextHref} label="Next" direction="next" primary />
        </div>
        <div className="flex justify-start xl:justify-end">
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#86A2D5] px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Submit Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

function AssignmentNavButton({
  href,
  label,
  direction,
  primary = false,
}: AssignmentNavButtonProps) {
  const borderColor = primary ? 'var(--color-brand-primary)' : 'var(--color-border)';
  const textColor = primary ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)';
  const content = (
    <>
      {direction === 'previous' ? <AssignmentArrowIcon direction="previous" /> : null}
      {label}
      {direction === 'next' ? <AssignmentArrowIcon direction="next" /> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border bg-white px-6 text-base font-semibold no-underline transition-opacity hover:opacity-80"
        style={{ borderColor, color: textColor }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-xl border bg-white px-6 text-base font-semibold opacity-45"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      {content}
    </button>
  );
}

function AssignmentArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  const isPrevious = direction === 'previous';

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d={isPrevious ? 'M10 3.5 5.5 8l4.5 4.5M6 8h6.5' : 'M6 3.5 10.5 8 6 12.5M3.5 8H10'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="mx-auto h-10 w-10" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-text-muted)' }}>
      <path d="M8 17H7a4 4 0 0 1-.8-7.92A5.5 5.5 0 0 1 16.6 7.2 4.5 4.5 0 0 1 17.5 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v7M9 15l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockStatusIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3M12 12v4M9 20h6M10 16h4v4h-4v-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClipboardStatusIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M9 4h6l1 2h3v16H5V6h3l1-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12h4M9 16h3M16 15l2 2 3-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
