'use client';

import Link from 'next/link';
import React from 'react';
import type {
  AssignmentSubmissionStatus,
  LecturerAssignmentSubmission,
} from '@/lib/mock/lecturerAssignmentSubmissions';
import type {
  LecturerCourseModule,
  LecturerModuleAssessment,
} from '@/lib/mock/lecturerCourseManagement';
import type { LecturerCourse } from '@/lib/mock/lecturerCourses';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';

interface LecturerAssignmentSubmissionsViewProps {
  course: LecturerCourse;
  module: LecturerCourseModule;
  assignment: LecturerModuleAssessment;
  submissions: LecturerAssignmentSubmission[];
}

const STATUS_STYLE: Record<AssignmentSubmissionStatus, { background: string; color: string }> = {
  'Needs Grading': { background: '#FFF3D6', color: '#9A5B00' },
  Graded: { background: '#E7F6EE', color: '#187346' },
  Returned: { background: '#FFECEC', color: '#B42318' },
};

export function LecturerAssignmentSubmissionsView({
  course,
  module,
  assignment,
  submissions,
}: LecturerAssignmentSubmissionsViewProps) {
  const [selectedSubmission, setSelectedSubmission] =
    React.useState<LecturerAssignmentSubmission | null>(null);
  const returnHref = `/dosen/courses/${course.id}/assignments`;

  return (
    <>
      <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8">
        <LecturerBreadcrumbs
          items={[
            { label: 'Home', href: '/dosen' },
            { label: 'Courses', href: '/dosen/courses' },
            { label: course.title, href: `/dosen/courses/${course.id}` },
            { label: 'Assignments', href: returnHref },
            { label: 'Submissions' },
          ]}
        />

        <HeaderSection
          courseId={course.id}
          moduleLabel={module.orderLabel}
          assignmentTitle={assignment.title}
        />

        {submissions.length > 0 ? (
          <SubmissionList
            submissions={submissions}
            onGrade={setSelectedSubmission}
          />
        ) : (
          <EmptySubmissionsState courseId={course.id} />
        )}
      </div>

      <GradeSubmissionDialog
        submission={selectedSubmission}
        assignmentTitle={assignment.title}
        onClose={() => setSelectedSubmission(null)}
      />
    </>
  );
}

function HeaderSection({
  courseId,
  moduleLabel,
  assignmentTitle,
}: {
  courseId: string;
  moduleLabel: string;
  assignmentTitle: string;
}) {
  return (
    <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-[0.08em]"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          {moduleLabel} Assignment Submissions
        </p>
        <h1
          className="text-[32px] font-bold leading-tight sm:text-[44px]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {assignmentTitle}
        </h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Review submitted files, submission dates, and grade student work.
        </p>
      </div>

      <Link
        href={`/dosen/courses/${courseId}/assignments`}
        className="inline-flex h-12 min-w-[190px] items-center justify-center whitespace-nowrap rounded-[14px] border px-5 text-base font-semibold no-underline transition-colors hover:bg-[#F5F8FF]"
        style={{
          borderColor: 'var(--color-brand-primary)',
          color: 'var(--color-brand-primary)',
        }}
      >
        Back to Assignments
      </Link>
    </section>
  );
}

function SubmissionList({
  submissions,
  onGrade,
}: {
  submissions: LecturerAssignmentSubmission[];
  onGrade: (submission: LecturerAssignmentSubmission) => void;
}) {
  return (
    <section
      className="overflow-hidden rounded-[24px] border bg-white shadow-[0_14px_32px_rgba(15,33,74,0.04)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="hidden grid-cols-[minmax(220px,1.2fr)_minmax(180px,0.8fr)_180px_140px_120px] gap-5 border-b px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] lg:grid">
        <span>Student</span>
        <span>Submitted File</span>
        <span>Date Submitted</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
        {submissions.map((submission) => (
          <SubmissionRow
            key={submission.id}
            submission={submission}
            onGrade={onGrade}
          />
        ))}
      </div>
    </section>
  );
}

function SubmissionRow({
  submission,
  onGrade,
}: {
  submission: LecturerAssignmentSubmission;
  onGrade: (submission: LecturerAssignmentSubmission) => void;
}) {
  return (
    <article className="grid grid-cols-1 gap-4 px-5 py-5 lg:grid-cols-[minmax(220px,1.2fr)_minmax(180px,0.8fr)_180px_140px_120px] lg:items-center lg:px-6">
      <StudentIdentity submission={submission} />
      <SubmittedFile submission={submission} />
      <SubmissionDate submittedAt={submission.submittedAt} />
      <StatusPill status={submission.status} />
      <button
        type="button"
        onClick={() => onGrade(submission)}
        className="inline-flex h-11 items-center justify-center rounded-[12px] px-4 text-base font-semibold text-white transition-opacity hover:opacity-90 lg:justify-self-end"
        style={{ background: 'var(--color-brand-primary)' }}
      >
        Grade
      </button>
    </article>
  );
}

function StudentIdentity({ submission }: { submission: LecturerAssignmentSubmission }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
        style={{ background: '#E7EEFF', color: 'var(--color-brand-primary)' }}
      >
        {createInitials(submission.studentName)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {submission.studentName}
        </p>
        <p className="truncate text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {submission.studentEmail}
        </p>
      </div>
    </div>
  );
}

function SubmittedFile({ submission }: { submission: LecturerAssignmentSubmission }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {submission.fileName}
      </p>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {submission.fileMeta}
      </p>
    </div>
  );
}

function SubmissionDate({ submittedAt }: { submittedAt: string }) {
  return (
    <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
      {formatDateTime(submittedAt)}
    </p>
  );
}

function StatusPill({ status }: { status: AssignmentSubmissionStatus }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold"
      style={STATUS_STYLE[status]}
    >
      {status}
    </span>
  );
}

function EmptySubmissionsState({ courseId }: { courseId: string }) {
  return (
    <section
      className="rounded-[24px] border bg-white px-6 py-16 text-center shadow-[0_14px_32px_rgba(15,33,74,0.04)]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
        No submissions yet
      </h2>
      <p className="mx-auto mt-3 max-w-[520px] text-base" style={{ color: 'var(--color-text-secondary)' }}>
        No student has submitted this assignment yet.
      </p>
      <Link
        href={`/dosen/courses/${courseId}/assignments`}
        className="mt-7 inline-flex h-12 items-center justify-center rounded-[14px] px-5 text-base font-semibold text-white no-underline transition-opacity hover:opacity-90"
        style={{ background: 'var(--color-brand-primary)' }}
      >
        Back to Assignments
      </Link>
    </section>
  );
}

function GradeSubmissionDialog({
  submission,
  assignmentTitle,
  onClose,
}: {
  submission: LecturerAssignmentSubmission | null;
  assignmentTitle: string;
  onClose: () => void;
}) {
  if (!submission) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
      <section className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-[0_24px_80px_rgba(15,33,74,0.24)]">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--color-brand-primary)' }}>
            Grade Submission
          </p>
          <h2 className="mt-2 text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {submission.studentName}
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {assignmentTitle}
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Score
            </span>
            <input
              type="number"
              min="0"
              max="100"
              defaultValue={submission.score ?? ''}
              placeholder="0 - 100"
              className="h-12 w-full rounded-[14px] border px-4 text-base outline-none"
              style={{ borderColor: 'var(--color-border)' }}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Feedback
            </span>
            <textarea
              defaultValue={submission.feedback ?? ''}
              placeholder="Write brief feedback for the student..."
              className="min-h-[120px] w-full resize-none rounded-[14px] border px-4 py-3 text-base outline-none"
              style={{ borderColor: 'var(--color-border)' }}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-[12px] border px-5 text-base font-semibold"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-[12px] px-5 text-base font-semibold text-white"
            style={{ background: 'var(--color-brand-primary)' }}
          >
            Save Grade
          </button>
        </div>
      </section>
    </div>
  );
}

function createInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

function formatDateTime(dateTime: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateTime));
}
