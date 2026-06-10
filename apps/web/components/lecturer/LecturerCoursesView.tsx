import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { LecturerCourse } from '@/lib/mock/lecturerCourses';

interface LecturerCoursesViewProps {
  courses: LecturerCourse[];
  searchQuery: string;
}

const COURSE_STATUS_STYLE: Record<LecturerCourse['status'], { background: string; color: string }> = {
  Active: { background: '#E7F6EE', color: '#187346' },
  Draft: { background: '#FFF4DE', color: '#946200' },
};

export function LecturerCoursesView({
  courses,
  searchQuery,
}: LecturerCoursesViewProps) {
  const filteredCourses = filterCourses(courses, searchQuery);
  const activeCourseCount = courses.filter((course) => course.status === 'Active').length;
  const totalStudents = courses.reduce((total, course) => total + course.studentCount, 0);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[720px]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--color-brand-primary)' }}>
            Lecturer Workspace
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-[40px]" style={{ color: 'var(--color-text-primary)' }}>
            Teaching Courses
          </h1>
          <p className="mt-3 text-base leading-7 sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Manage your active classes, review schedules, and prepare learning activities from one course list.
          </p>
        </div>

        <Link
          href="/dosen/courses/create"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-base font-semibold text-white no-underline transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-brand-primary)' }}
        >
          <span className="text-xl leading-none">+</span>
          Create New Course
        </Link>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Owned Courses" value={courses.length.toString()} helper={`${activeCourseCount} active this term`} />
        <SummaryCard label="Students Enrolled" value={totalStudents.toString()} helper="Across all owned courses" />
        <SummaryCard label="Pending Setup" value={courses.filter((course) => course.status === 'Draft').length.toString()} helper="Draft courses need review" />
      </section>

      <section className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Course List
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Select a course to manage materials, quizzes, assignments, labs, and student activity.
          </p>
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {filteredCourses.length} courses shown
        </p>
      </section>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <LecturerCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyCoursesState />
      )}
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
    <article className="rounded-2xl border bg-white px-5 py-4" style={{ borderColor: 'var(--color-border)' }}>
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-3xl leading-none" style={{ color: 'var(--color-text-primary)' }}>
          {value}
        </strong>
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {helper}
        </span>
      </div>
    </article>
  );
}

function LecturerCourseCard({ course }: { course: LecturerCourse }) {
  const statusStyle = COURSE_STATUS_STYLE[course.status];

  return (
    <article className="overflow-hidden rounded-[22px] border bg-white shadow-[0_10px_26px_rgba(15,33,74,0.04)]" style={{ borderColor: 'var(--color-border)' }}>
      <div className="relative aspect-[16/8] overflow-hidden">
        <Image
          src={course.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-white/95 px-3 py-1 text-sm font-bold" style={{ color: 'var(--color-brand-primary)' }}>
            {course.code}
          </span>
          <span className="rounded-lg px-3 py-1 text-xs font-bold" style={statusStyle}>
            {course.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--color-text-muted)' }}>
          {course.department}
        </p>
        <h3 className="mt-2 min-h-[56px] text-xl font-bold leading-7" style={{ color: 'var(--color-text-primary)' }}>
          {course.title}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <CourseMetric icon={<StudentsIcon />} value={`${course.studentCount} Students`} />
          <CourseMetric icon={<ModulesIcon />} value={`${course.moduleCount} Modules`} />
          <CourseMetric icon={<AssignmentIcon />} value={`${course.assignmentCount} Tasks`} />
        </div>

        <Link
          href={`/dosen/courses/${course.id}`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm font-bold no-underline transition-colors hover:bg-[#F5F8FF]"
          style={{ borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)' }}
        >
          Manage Course
        </Link>
      </div>
    </article>
  );
}

function CourseMetric({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0" style={{ color: 'var(--color-text-muted)' }}>
        {icon}
      </span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function EmptyCoursesState() {
  return (
    <div className="rounded-2xl border bg-white px-6 py-16 text-center" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        No courses found
      </h2>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Try a different search keyword or create a new course.
      </p>
    </div>
  );
}

function filterCourses(courses: LecturerCourse[], searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return courses;
  }

  return courses.filter((course) => {
    return [
      course.code,
      course.title,
      course.department,
      course.status,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
  });
}

function StudentsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM1.5 16a5.5 5.5 0 0 1 11 0M13 8.5a2.4 2.4 0 0 0 0-4.8M14.2 15.5a4.1 4.1 0 0 0-2-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ModulesIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function AssignmentIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M6 3h6l2 2v12H4V3h2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M7 9h4M7 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
