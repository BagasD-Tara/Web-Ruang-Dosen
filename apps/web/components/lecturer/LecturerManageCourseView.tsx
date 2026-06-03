'use client';

import Link from 'next/link';
import React from 'react';
import type {
  LecturerBadgeTone,
  LecturerCourseModule,
  LecturerManageCourseData,
  LecturerMaterialKind,
  LecturerModuleAssessment,
  LecturerModuleMaterial,
  LecturerModuleStatus,
} from '@/lib/mock/lecturerCourseManagement';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';

interface LecturerManageCourseViewProps {
  data: LecturerManageCourseData;
}

const MODULE_STATUS_STYLE: Record<LecturerModuleStatus, { background: string; color: string }> = {
  Published: { background: '#E7EEFF', color: 'var(--color-brand-primary)' },
  Draft: { background: '#F2F4F7', color: 'var(--color-text-secondary)' },
  Locked: { background: '#F2F4F7', color: 'var(--color-text-muted)' },
};

const BADGE_STYLE: Record<LecturerBadgeTone, { background: string; color: string }> = {
  neutral: { background: '#F1F2F4', color: 'var(--color-text-secondary)' },
  brand: { background: '#E7EEFF', color: 'var(--color-brand-primary)' },
};

export function LecturerManageCourseView({ data }: LecturerManageCourseViewProps) {
  const [expandedModuleIds, setExpandedModuleIds] = React.useState(() =>
    getDefaultExpandedModuleIds(data.modules)
  );

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: data.course.title },
        ]}
      />

      <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <h1
            className="text-[36px] font-bold leading-tight sm:text-[48px]"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {data.course.title}
          </h1>
          <p
            className="mt-3 text-lg sm:text-[20px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {data.course.code} - {data.termLabel} - {data.credits} Credits
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ActionButton href={`/dosen/courses/${data.course.id}/settings`} icon={<SettingsIcon />}>
            Course Settings
          </ActionButton>
          <ActionButton href={`/dosen/courses/${data.course.id}/modules/create`} icon={<PlusIcon />} primary>
            New Module
          </ActionButton>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-6 xl:self-start">
          <EnrollmentSummaryCard
            courseId={data.course.id}
            enrolledStudents={data.enrolledStudents}
            weeklyGrowth={data.weeklyGrowth}
          />
        </div>

        <div className="space-y-5">
          {data.modules.map((module) => (
            <ModuleCard
              key={module.id}
              courseId={data.course.id}
              module={module}
              expanded={expandedModuleIds.includes(module.id)}
              onToggle={() => toggleExpandedModule(module.id, setExpandedModuleIds)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function EnrollmentSummaryCard({
  courseId,
  enrolledStudents,
  weeklyGrowth,
}: {
  courseId: string;
  enrolledStudents: number;
  weeklyGrowth: number;
}) {
  return (
    <article
      className="overflow-hidden rounded-[28px] px-7 py-8 text-white shadow-[0_18px_36px_rgba(0,53,148,0.2)]"
      style={{ background: 'linear-gradient(180deg, #0F52C7 0%, #003594 100%)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[18px] font-semibold leading-8 text-white/80">
            View Enrolled Students
          </p>
          <strong className="mt-2 block text-[72px] leading-none">{enrolledStudents}</strong>
        </div>
        <div className="text-white/24">
          <StudentsIcon />
        </div>
      </div>

      <p className="mt-6 flex items-center gap-2 text-[18px] text-white/72">
        <GrowthIcon />
        +{weeklyGrowth} new students this week
      </p>

      <Link
        href={`/dosen/courses/${courseId}/enrollment`}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white/12 px-5 text-lg font-semibold text-white transition-colors hover:bg-white/18"
      >
        Manage Enrollment
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

function ModuleCard({
  courseId,
  module,
  expanded,
  onToggle,
}: {
  courseId: string;
  module: LecturerCourseModule;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isLocked = module.status === 'Locked';
  const borderColor =
    expanded && module.status === 'Published'
      ? 'var(--color-brand-primary)'
      : 'var(--color-border)';

  return (
    <article
      className="rounded-[28px] border bg-white shadow-[0_12px_28px_rgba(15,33,74,0.04)]"
      style={{ borderColor }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-4 px-5 py-5 text-left sm:px-7 sm:py-7"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[18px] font-bold"
            style={{ background: '#E7EEFF', color: 'var(--color-brand-dark)' }}
          >
            {module.orderLabel}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <h2
                  className="text-[24px] font-bold leading-tight sm:text-[28px]"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {module.title}
                </h2>
                <p
                  className="mt-2 text-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {formatModuleSummary(module)}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start">
                <StatusPill status={module.status} />
                {isLocked ? <LockIcon /> : null}
                <ChevronIcon expanded={expanded} />
              </div>
            </div>
          </div>
        </div>
      </button>

      {expanded ? (
        <div
          className="border-t px-5 pb-6 pt-5 sm:px-7"
          style={{ borderColor: 'rgba(195,198,214,0.85)' }}
        >
          {isLocked ? (
            <LockedModuleMessage />
          ) : (
            <>
              <ModuleSection
                title="Learning Materials"
                icon={<MaterialsIcon />}
                actions={[
                  {
                    label: 'Add Material',
                    href: `/dosen/courses/${courseId}/modules/${module.id}/materials/create`,
                  },
                ]}
              >
                <div className="space-y-3">
                  {module.materials.map((material) => (
                    <MaterialRow
                      key={material.id}
                      courseId={courseId}
                      moduleId={module.id}
                      material={material}
                    />
                  ))}
                  {module.materials.length === 0 ? <ModuleEmptyState label="No materials added yet." /> : null}
                </div>
              </ModuleSection>

              <ModuleSection
                title="Assessments"
                icon={<AssessmentIcon />}
                actions={[
                  { label: 'Create Quiz' },
                  {
                    label: 'Create Assignment',
                    href: `/dosen/courses/${courseId}/modules/${module.id}/assignments/create`,
                  },
                ]}
              >
                <div className="space-y-3">
                  {module.assessments.map((assessment) => (
                    <AssessmentRow
                      key={assessment.id}
                      courseId={courseId}
                      moduleId={module.id}
                      assessment={assessment}
                    />
                  ))}
                  {module.assessments.length === 0 ? <ModuleEmptyState label="No assessments added yet." /> : null}
                </div>
              </ModuleSection>

              <div className="mt-6 flex justify-end border-t pt-5" style={{ borderColor: 'rgba(195,198,214,0.85)' }}>
                <ActionButton href={`/dosen/courses/${courseId}/modules/${module.id}/edit`}>
                  Edit Module Settings
                </ActionButton>
              </div>
            </>
          )}
        </div>
      ) : null}
    </article>
  );
}

function ModuleSection({
  title,
  icon,
  actions,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  actions: Array<{ label: string; href?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="py-4 first:pt-0">
      <div
        className="mb-4 flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: 'rgba(195,198,214,0.85)' }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: 'var(--color-text-secondary)' }}>{icon}</span>
          <h3 className="text-[18px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            action.href ? (
              <Link
                key={action.label}
                href={action.href}
                className="text-lg font-semibold transition-opacity hover:opacity-75"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                {action.label}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                className="text-lg font-semibold transition-opacity hover:opacity-75"
                style={{ color: 'var(--color-brand-primary)' }}
              >
                {action.label}
              </button>
            )
          ))}
        </div>
      </div>

      {children}
    </section>
  );
}

function MaterialRow({
  courseId,
  moduleId,
  material,
}: {
  courseId: string;
  moduleId: string;
  material: LecturerModuleMaterial;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[18px] border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
          style={{ background: '#F7F8FB' }}
        >
          <MaterialTypeIcon kind={material.kind} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {material.title}
          </p>
          <p className="mt-1 text-base" style={{ color: 'var(--color-text-secondary)' }}>
            {material.meta}
          </p>
        </div>
      </div>

      <RowActionGroup
        editHref={`/dosen/courses/${courseId}/modules/${moduleId}/materials/${material.id}/edit`}
      />
    </div>
  );
}

function AssessmentRow({
  courseId,
  moduleId,
  assessment,
}: {
  courseId: string;
  moduleId: string;
  assessment: LecturerModuleAssessment;
}) {
  const editHref =
    assessment.kind === 'assignment'
      ? `/dosen/courses/${courseId}/modules/${moduleId}/assignments/${assessment.id}/edit`
      : undefined;

  return (
    <div
      className="flex flex-col gap-4 rounded-[18px] border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
          style={{ background: '#F7F8FB' }}
        >
          <AssessmentTypeIcon kind={assessment.kind} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {assessment.title}
          </p>
          <p className="mt-1 text-base" style={{ color: 'var(--color-text-secondary)' }}>
            {assessment.meta}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
        {assessment.badgeLabel ? (
          <span
            className="rounded-full px-3 py-1 text-sm font-semibold"
            style={BADGE_STYLE[assessment.badgeTone ?? 'neutral']}
          >
            {assessment.badgeLabel}
          </span>
        ) : null}
        <RowActionGroup editHref={editHref} />
      </div>
    </div>
  );
}

function RowActionGroup({ editHref }: { editHref?: string }) {
  return (
    <div className="flex items-center gap-2">
      {editHref ? (
        <IconActionLink href={editHref} label="Edit item">
          <EditIcon />
        </IconActionLink>
      ) : (
        <IconActionButton label="Edit item">
          <EditIcon />
        </IconActionButton>
      )}
    </div>
  );
}

function IconActionLink({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#EEF3FF]"
      style={{ color: 'var(--color-brand-primary)' }}
    >
      {children}
    </Link>
  );
}

function IconActionButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#EEF3FF]"
      style={{ color: 'var(--color-brand-primary)' }}
    >
      {children}
    </button>
  );
}

function ModuleEmptyState({ label }: { label: string }) {
  return (
    <div
      className="rounded-[18px] border border-dashed px-4 py-4 text-base"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      {label}
    </div>
  );
}

function LockedModuleMessage() {
  return (
    <div
      className="rounded-[18px] border border-dashed px-5 py-5 text-base"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
    >
      This module stays locked until the previous module is published and required materials are ready.
    </div>
  );
}

function StatusPill({ status }: { status: LecturerModuleStatus }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-sm font-semibold"
      style={MODULE_STATUS_STYLE[status]}
    >
      {status}
    </span>
  );
}

function ActionButton({
  children,
  icon,
  primary = false,
  href,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  primary?: boolean;
  href?: string;
}) {
  const className =
    'inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border px-5 text-lg font-semibold transition-colors hover:opacity-90';
  const style = {
    background: primary ? 'var(--color-brand-primary)' : '#FFFFFF',
    borderColor: 'var(--color-brand-primary)',
    color: primary ? '#FFFFFF' : 'var(--color-brand-primary)',
  };

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} style={style}>
      {icon}
      {children}
    </button>
  );
}

function toggleExpandedModule(
  moduleId: string,
  setExpandedModuleIds: React.Dispatch<React.SetStateAction<string[]>>
) {
  setExpandedModuleIds((currentIds) => {
    if (currentIds.includes(moduleId)) {
      return currentIds.filter((currentId) => currentId !== moduleId);
    }

    return [...currentIds, moduleId];
  });
}

function getDefaultExpandedModuleIds(modules: LecturerCourseModule[]) {
  const explicitExpandedModuleIds = modules
    .filter((module) => module.defaultExpanded)
    .map((module) => module.id);

  if (explicitExpandedModuleIds.length > 0) {
    return explicitExpandedModuleIds;
  }

  return modules.length > 0 ? [modules[0].id] : [];
}

function formatModuleSummary(module: LecturerCourseModule) {
  const summaryParts = [module.weekLabel];

  if (module.status === 'Locked') {
    summaryParts.push('Locked');
    return summaryParts.join(' - ');
  }

  summaryParts.push(`${module.materials.length} Materials`);

  if (module.assessments.length > 0) {
    const quizCount = module.assessments.filter((assessment) => assessment.kind === 'quiz').length;
    const assignmentCount = module.assessments.filter((assessment) => assessment.kind === 'assignment').length;

    if (quizCount > 0) {
      summaryParts.push(`${quizCount} Quiz${quizCount > 1 ? 'zes' : ''}`);
    }

    if (assignmentCount > 0) {
      summaryParts.push(`${assignmentCount} Assignment${assignmentCount > 1 ? 's' : ''}`);
    }
  }

  return summaryParts.join(' - ');
}

function MaterialTypeIcon({ kind }: { kind: LecturerMaterialKind }) {
  if (kind === 'document') {
    return <DocumentIcon />;
  }

  if (kind === 'video') {
    return <VideoIcon />;
  }

  return <LinkMaterialIcon />;
}

function AssessmentTypeIcon({
  kind,
}: {
  kind: LecturerModuleAssessment['kind'];
}) {
  return kind === 'quiz' ? <QuizIcon /> : <AssignmentItemIcon />;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}
      aria-hidden="true"
    >
      <path
        d="M6 8.5 11 13.5 16 8.5"
        stroke="#586377"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StudentsIcon() {
  return (
    <svg width="112" height="88" viewBox="0 0 112 88" fill="none" aria-hidden="true">
      <path d="M44 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-24 48a24 24 0 0 1 48 0v8H20v-8Z" fill="currentColor" />
      <path d="M84 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24ZM64 76a20 20 0 0 1 40 0v8H64v-8Z" fill="currentColor" />
      <path d="M16 32a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-14 40a18 18 0 0 1 28-15v19H2v-4Z" fill="currentColor" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="m3 12 4-4 2.5 2.5L15 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 5H15v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M7.7 1.4h2.6l.5 2a5.9 5.9 0 0 1 1.7.9l1.9-.9 1.3 2.3-1.5 1.4a6 6 0 0 1 0 1.9l1.5 1.4-1.3 2.3-1.9-.9a5.9 5.9 0 0 1-1.7.9l-.5 2H7.7l-.5-2a5.9 5.9 0 0 1-1.7-.9l-1.9.9-1.3-2.3 1.5-1.4a6 6 0 0 1 0-1.9L2.3 5.7 3.6 3.4l1.9.9a5.9 5.9 0 0 1 1.7-.9l.5-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="10" height="7" rx="2" stroke="#586377" strokeWidth="1.6" />
      <path d="M6.5 8V6a2.5 2.5 0 0 1 5 0v2" stroke="#586377" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MaterialsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 5h6a4 4 0 0 1 4 4v8a3 3 0 0 0-3-3H3V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M19 5h-6a4 4 0 0 0-4 4v8a3 3 0 0 1 3-3h7V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function AssessmentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M7 3h8l3 3v13H4V3h3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 9h6M8 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M6 2.5h7l4 4V19H6V2.5Z" stroke="#FF3B30" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10h5M9 13.5h5M9 17h3" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="15" height="13" rx="2" stroke="#0F74E6" strokeWidth="1.8" />
      <path d="m9 8 5 3-5 3V8Z" fill="#0F74E6" />
    </svg>
  );
}

function LinkMaterialIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M9 7.5h-2A3.5 3.5 0 0 0 7 14h2" stroke="#586377" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 7.5h2a3.5 3.5 0 0 1 0 6.5h-2" stroke="#586377" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 11h5" stroke="#586377" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M7 4h8l3 3v11H4V4h3Z" stroke="#8F2C00" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 9.5a2.5 2.5 0 1 1 4 2l-1 1" stroke="#8F2C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="15.5" r="1" fill="#8F2C00" />
    </svg>
  );
}

function AssignmentItemIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="12" height="14" rx="2" stroke="#003594" strokeWidth="1.8" />
      <path d="m8 11 2 2 4-4" stroke="#003594" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7.5h6" stroke="#003594" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m4 13.5 8.8-8.8a1.8 1.8 0 1 1 2.5 2.5L6.5 16H4v-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
