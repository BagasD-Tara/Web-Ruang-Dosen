'use client';

import Link from 'next/link';
import React from 'react';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';
import type {
  LecturerEnrollmentData,
  LecturerEnrollmentStudent,
  StudentEnrollmentStatus,
} from '@/lib/mock/lecturerEnrollment';

interface LecturerManageEnrollmentViewProps {
  data: LecturerEnrollmentData;
}

const STATUS_STYLE: Record<StudentEnrollmentStatus, { background: string; color: string }> = {
  Active: { background: '#E7F6EE', color: '#187346' },
  'At Risk': { background: '#FFF4DE', color: '#946200' },
  'Needs Review': { background: '#FDECEC', color: '#B3261E' },
};

const PAGE_SIZE_OPTIONS = ['10', '20', '50'] as const;

export function LecturerManageEnrollmentView({
  data,
}: LecturerManageEnrollmentViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredStudents = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return data.students;
    }

    return data.students.filter((student) =>
      [student.name, student.email, student.status].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [data.students, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedStudents = filteredStudents.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: data.courseTitle, href: `/dosen/courses/${data.courseId}` },
          { label: 'Enrolled Students' },
        ]}
      />

      <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <h1
            className="text-[34px] font-bold leading-tight sm:text-[44px]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Enrolled Students
          </h1>
          <p
            className="mt-3 text-lg sm:text-[20px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {data.courseCode} - {data.termLabel}
          </p>
        </div>

        <div className="w-full max-w-[360px]">
          <SearchInput
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Total Students"
          value={String(data.students.length)}
          helper="Currently enrolled in this course"
        />
        <SummaryCard
          label="Needs Attention"
          value={String(data.students.filter((student) => student.status !== 'Active').length)}
          helper="At risk or pending review"
        />
        <SummaryCard
          label="Average Progress"
          value={`${Math.round(getAverageProgress(data.students))}%`}
          helper="Based on current mock completion"
        />
      </section>

      <section
        className="overflow-hidden rounded-[28px] border bg-white shadow-[0_12px_28px_rgba(15,33,74,0.04)]"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="hidden grid-cols-[2.1fr_2.2fr_1.4fr_1fr_1.4fr] gap-6 border-b px-8 py-6 text-[15px] font-bold uppercase tracking-[0.05em] lg:grid" style={{ borderColor: 'rgba(195,198,214,0.8)', color: 'var(--color-text-secondary)' }}>
          <span>Student Name</span>
          <span>Email Address</span>
          <span>Date Joined</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(195,198,214,0.75)' }}>
          {paginatedStudents.length > 0 ? (
            paginatedStudents.map((student) => (
              <EnrollmentRow key={student.id} courseId={data.courseId} student={student} />
            ))
          ) : (
            <EmptyEnrollmentState />
          )}
        </div>

        <div className="flex flex-col gap-4 border-t px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: 'rgba(195,198,214,0.8)' }}>
          <div className="flex items-center gap-3 text-base" style={{ color: 'var(--color-text-secondary)' }}>
            <span>Show entries:</span>
            <div className="w-[88px]">
              <SelectInput
                value={String(pageSize)}
                onChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
                options={PAGE_SIZE_OPTIONS}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {buildPaginationSummary(filteredStudents.length, safeCurrentPage, pageSize)}
            </span>

            <div className="flex items-center gap-2">
              <PaginationButton
                label="Previous page"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
              >
                <ChevronLeftIcon />
              </PaginationButton>
              <PaginationButton
                label="Next page"
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
              >
                <ChevronRightIcon />
              </PaginationButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article
      className="rounded-[24px] border bg-white px-5 py-5 shadow-[0_10px_22px_rgba(15,33,74,0.04)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </p>
      <strong className="mt-3 block text-[34px] leading-none" style={{ color: 'var(--color-text-primary)' }}>
        {value}
      </strong>
      <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {helper}
      </p>
    </article>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }}>
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Find student..."
        className="h-12 w-full rounded-[18px] border pl-12 pr-4 text-base outline-none transition-colors focus:border-[#7DA8FF]"
        style={{ borderColor: 'var(--color-border)', background: '#FFFFFF', color: 'var(--color-text-primary)' }}
      />
    </div>
  );
}

function EnrollmentRow({
  courseId,
  student,
}: {
  courseId: string;
  student: LecturerEnrollmentStudent;
}) {
  const initials = getInitials(student.name);
  const progressHref = `/dosen/courses/${courseId}/enrollment/${student.id}/progress`;

  return (
    <article className="px-5 py-5 sm:px-8">
      <div className="hidden grid-cols-[2.1fr_2.2fr_1.4fr_1fr_1.4fr] items-center gap-6 lg:grid">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar initials={initials} />
          <p className="truncate text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {student.name}
          </p>
        </div>

        <p className="truncate text-base" style={{ color: 'var(--color-text-secondary)' }}>
          {student.email}
        </p>
        <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
          {student.dateJoined}
        </p>
        <div>
          <StatusPill status={student.status} />
        </div>
        <div className="flex justify-end gap-2">
          <RowActionLink href={progressHref}>View Progress</RowActionLink>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        <div className="flex items-start gap-4">
          <Avatar initials={initials} />
          <div className="min-w-0 flex-1">
            <p className="text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {student.name}
            </p>
            <p className="mt-1 break-all text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {student.email}
            </p>
          </div>
          <StatusPill status={student.status} />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span>Joined {student.dateJoined}</span>
        </div>

        <div className="flex gap-2">
          <RowActionLink href={progressHref}>View Progress</RowActionLink>
        </div>
      </div>
    </article>
  );
}

function Avatar({ initials }: { initials: string }) {
  const palette = getAvatarPalette(initials);

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[20px] font-bold"
      style={{ background: palette.background, color: palette.color }}
    >
      {initials}
    </div>
  );
}

function StatusPill({ status }: { status: StudentEnrollmentStatus }) {
  return (
    <span
      className="inline-flex rounded-full px-3 py-1 text-sm font-semibold"
      style={STATUS_STYLE[status]}
    >
      {status}
    </span>
  );
}

function RowActionLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-[12px] border px-4 text-sm font-semibold transition-colors hover:bg-[#F5F8FF]"
      style={{ borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)' }}
    >
      {children}
    </Link>
  );
}

function EmptyEnrollmentState() {
  return (
    <div className="px-6 py-16 text-center">
      <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        No students found
      </h2>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Try another search keyword or adjust the current page size.
      </p>
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-[14px] border px-4 pr-10 text-base outline-none transition-colors focus:border-[#7DA8FF]"
        style={{ borderColor: 'var(--color-border)', background: '#FFFFFF', color: 'var(--color-text-primary)' }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }}>
        <SelectChevronIcon />
      </span>
    </div>
  );
}

function PaginationButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      {children}
    </button>
  );
}

function buildPaginationSummary(totalCount: number, currentPage: number, pageSize: number) {
  if (totalCount === 0) {
    return 'Showing 0 students';
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalCount, currentPage * pageSize);

  return `Showing ${start}-${end} of ${totalCount}`;
}

function getAverageProgress(students: LecturerEnrollmentStudent[]) {
  if (students.length === 0) {
    return 0;
  }

  const totalProgress = students.reduce(
    (progressSum, student) => progressSum + student.progressPercentage,
    0
  );

  return totalProgress / students.length;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function getAvatarPalette(initials: string) {
  const palettes = [
    { background: '#DCE8FF', color: '#4A5E8A' },
    { background: '#C45414', color: '#FFFFFF' },
    { background: '#2F66D8', color: '#FFFFFF' },
    { background: '#DDE7FF', color: '#4B5E89' },
    { background: '#184B9C', color: '#FFFFFF' },
  ];

  const paletteIndex = initials
    .split('')
    .reduce((sum, character) => sum + character.charCodeAt(0), 0) % palettes.length;

  return palettes[paletteIndex];
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="m12.5 12.5 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M10.5 4.5 6 9l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7.5 4.5 12 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SelectChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 5.5 7 9l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
