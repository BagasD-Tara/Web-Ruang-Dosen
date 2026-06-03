import Link from 'next/link';
import type {
  LecturerAssignmentStatus,
  LecturerCourseModule,
  LecturerModuleAssessment,
} from '@/lib/mock/lecturerCourseManagement';
import type { LecturerCourse } from '@/lib/mock/lecturerCourses';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';

interface AssignmentListItem {
  assignment: LecturerModuleAssessment;
  module: LecturerCourseModule;
}

interface LecturerAssignmentsListViewProps {
  course: LecturerCourse;
  assignments: AssignmentListItem[];
}

const STATUS_STYLE: Record<LecturerAssignmentStatus, { background: string; color: string }> = {
  Active: { background: '#E7EEFF', color: 'var(--color-brand-primary)' },
  Draft: { background: '#F1F2F4', color: 'var(--color-text-secondary)' },
  Scheduled: { background: '#FFF3D6', color: '#9A5B00' },
};

export function LecturerAssignmentsListView({
  course,
  assignments,
}: LecturerAssignmentsListViewProps) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: course.title, href: `/dosen/courses/${course.id}` },
          { label: 'Assignments' },
        ]}
      />

      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-[34px] font-bold leading-tight sm:text-[44px]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Existing Assignments
          </h1>
          <p className="mt-3 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Review assignments across all modules in this course.
          </p>
        </div>
        <Link
          href={`/dosen/courses/${course.id}`}
          className="inline-flex h-12 items-center justify-center rounded-[14px] border px-5 text-base font-semibold no-underline transition-colors hover:bg-[#F5F8FF]"
          style={{
            borderColor: 'var(--color-brand-primary)',
            color: 'var(--color-brand-primary)',
          }}
        >
          Back to Course
        </Link>
      </section>

      <section className="space-y-4">
        {assignments.map(({ assignment, module }) => (
          <AssignmentListCard
            key={assignment.id}
            courseId={course.id}
            module={module}
            assignment={assignment}
          />
        ))}
      </section>
    </div>
  );
}

function AssignmentListCard({
  courseId,
  module,
  assignment,
}: {
  courseId: string;
  module: LecturerCourseModule;
  assignment: LecturerModuleAssessment;
}) {
  const status = assignment.status ?? 'Draft';

  return (
    <article
      className="grid grid-cols-1 gap-4 rounded-[20px] border bg-white px-5 py-5 shadow-[0_12px_28px_rgba(15,33,74,0.04)] lg:grid-cols-[minmax(0,1fr)_220px_auto]"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
          {module.orderLabel} - {module.title}
        </p>
        <h2
          className="mt-2 text-[22px] font-bold leading-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {assignment.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-base" style={{ color: 'var(--color-text-secondary)' }}>
          {assignment.description ?? assignment.meta}
        </p>
      </div>

      <div className="space-y-2 text-base" style={{ color: 'var(--color-text-secondary)' }}>
        <p>{formatSubmissionText(assignment)}</p>
        <p>{assignment.deadline ? `Due ${formatDateLabel(assignment.deadline)}` : 'No deadline'}</p>
      </div>

      <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
        <StatusPill status={status} />
        <Link
          href={`/dosen/courses/${courseId}/modules/${module.id}/assignments/${assignment.id}/edit`}
          className="inline-flex h-11 items-center justify-center rounded-[12px] border px-4 text-base font-semibold no-underline transition-colors hover:bg-[#F5F8FF]"
          style={{
            borderColor: 'var(--color-brand-primary)',
            color: 'var(--color-brand-primary)',
          }}
        >
          Edit
        </Link>
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: LecturerAssignmentStatus }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-sm font-semibold"
      style={STATUS_STYLE[status]}
    >
      {status}
    </span>
  );
}

function formatSubmissionText(assignment: LecturerModuleAssessment) {
  if (assignment.status === 'Draft') {
    return 'Draft assignment';
  }

  return `${assignment.submittedCount ?? 0}/${assignment.studentCount ?? 0} submitted`;
}

function formatDateLabel(dateTime: string) {
  const [date] = dateTime.split('T');
  return date;
}
