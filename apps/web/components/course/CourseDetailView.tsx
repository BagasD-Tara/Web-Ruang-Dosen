'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { CourseContentItem, CourseContentTab, CourseDetail, CourseModule } from '@/lib/mock/courses';
import type { CourseSource } from '@/lib/courseNavigation';
import {
  buildAssignmentHref,
  buildMaterialHref,
  getCourseBreadcrumbParent,
  getCourseSource,
} from '@/lib/courseNavigation';
import { getCourseContentVisualConfig } from './courseContentPresentation';

const TAB_OPTIONS: Array<{ key: CourseContentTab; label: string }> = [
  { key: 'materials', label: 'Materials' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'labs', label: 'Labs' },
];

interface CourseDetailViewProps {
  course: CourseDetail;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = React.useState<CourseContentTab>('materials');
  const modules = course.tabs[activeTab];
  const source = getCourseSource(searchParams.get('from'));
  const firstMaterial = course.tabs.materials[0]?.items[0];
  const breadcrumbContext = getCourseBreadcrumbParent(source);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        <Link href="/dashboard_mahasiswa" className="transition-opacity hover:opacity-70">
          Home
        </Link>
        <span>›</span>
        <Link href="/courses" className="transition-opacity hover:opacity-70">
          Courses
        </Link>
        {source === 'my-courses' ? (
          <>
            <span>›</span>
            <Link href={breadcrumbContext.href} className="transition-opacity hover:opacity-70">
              {breadcrumbContext.label}
            </Link>
          </>
        ) : null}
        <span>›</span>
        <span style={{ color: 'var(--color-text-primary)' }}>{course.breadcrumbLabel ?? course.title}</span>
      </nav>

      <section
        className="overflow-hidden rounded-[28px] border bg-white shadow-[0_14px_40px_rgba(7,27,63,0.05)]"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {/* Banner Section */}
        <div className={`relative h-[160px] w-full lg:h-[200px] ${course.bannerColorClass}`}>
          <div
            className="absolute left-1/2 top-[40px] h-3 w-16 -translate-x-1/2 rounded-full opacity-30"
            style={{ background: 'rgba(255,255,255,0.42)' }}
          />
        </div>

        {/* Content Card (Overlapping) */}
        <div className="relative z-10 px-5 pb-8 sm:px-7">
          <div
            className="relative -mt-20 rounded-[22px] border bg-white px-5 py-6 shadow-[0_14px_28px_rgba(7,27,63,0.08)] sm:px-8 lg:-mt-24 lg:px-9 lg:py-8"
            style={{ borderColor: 'rgba(195,198,214,0.85)' }}
          >
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge>{course.heroAccentLabel}</Badge>
                  <Badge icon={<ClockIcon />}>{course.durationWeeks ?? 12} Weeks</Badge>
                </div>

                <h1 className="text-[28px] font-bold leading-tight sm:text-[34px]" style={{ color: 'var(--color-text-primary)' }}>
                  {course.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                  <Avatar initials={course.instructorInitials} />
                  <span style={{ color: 'var(--color-text-primary)' }}>{course.instructorName}</span>
                  <span className="text-[#9AA3B2]">•</span>
                  <span>{course.instructorRole ?? 'Course Instructor'}</span>
                </div>

                <p className="mt-5 max-w-[720px] text-base leading-8" style={{ color: 'var(--color-text-secondary)' }}>
                  {course.description} {course.subtitle}
                </p>

                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="h-2.5 w-full max-w-[355px] overflow-hidden rounded-full bg-[#D8DEE8]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${course.progressPercentage}%`,
                        background: 'linear-gradient(90deg, #003594 0%, #1F58C7 100%)',
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                    {course.progressPercentage}% Complete
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 lg:max-w-[260px] lg:pt-[58px]">
                {firstMaterial ? (
                  <ActionButton
                    primary
                    icon={<PlayButtonIcon />}
                    href={buildMaterialHref(course.id, firstMaterial.id, source)}
                  >
                    {course.status === 'notstart' ? 'Start Learning' : 'Continue Learning'}
                  </ActionButton>
                ) : (
                  <ActionButton primary icon={<PlayButtonIcon />}>
                    {course.status === 'notstart' ? 'Start Learning' : 'Continue Learning'}
                  </ActionButton>
                )}
                <ActionButton icon={<CalendarButtonIcon />} onClick={() => alert('View Schedule clicked!')}>View Schedule</ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-9">
        <div className="flex flex-wrap gap-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {TAB_OPTIONS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className="border-b-2 pb-4 text-lg font-semibold transition-colors"
                style={{
                  borderColor: isActive ? 'var(--color-brand-primary)' : 'transparent',
                  color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-8">
          {modules.length > 0 ? (
            modules.map((module) => (
              <ModuleSection
                key={module.id}
                module={module}
                courseId={course.id}
                activeTab={activeTab}
                source={source}
              />
            ))
          ) : (
            <EmptyTabState tab={activeTab} />
          )}
        </div>
      </section>
    </div>
  );
}

function ModuleSection({
  module,
  courseId,
  activeTab,
  source,
}: {
  module: CourseModule;
  courseId: number | string;
  activeTab: CourseContentTab;
  source: CourseSource;
}) {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <section>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mb-4 flex w-full items-center justify-between text-left"
      >
        <h2 className="text-[28px] font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
          {module.title}
        </h2>
        <ChevronIcon expanded={expanded} />
      </button>

      {expanded ? (
        <div className="space-y-4">
          {module.items.map((item) => (
            <ContentItemCard
              key={item.id}
              item={item}
              href={getContentItemHref({
                activeTab,
                courseId,
                itemId: item.id,
                source,
              })}
              showSubmitButton={item.type === 'assignment'}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ContentItemCard({
  item,
  href,
  showSubmitButton = false,
}: {
  item: CourseContentItem;
  href?: string;
  showSubmitButton?: boolean;
}) {
  const typeConfig = getCourseContentVisualConfig(item.type);
  const content = (
    <>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: typeConfig.background }}>
          {typeConfig.icon}
        </div>

        <div>
          <h3 className="text-[18px] font-semibold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            {item.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span>{typeConfig.metaLabel}</span>
            <span>•</span>
            <span>{item.meta}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {showSubmitButton ? (
          <span
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0F4BB6] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Submit
          </span>
        ) : null}

        {item.isCompleted ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4BB6] text-white">
            <CheckIcon />
          </div>
        ) : null}
      </div>
    </>
  );

  return (
    <article
      className="rounded-[22px] border bg-white shadow-[0_8px_24px_rgba(7,27,63,0.03)]"
      style={{
        borderColor: 'var(--color-border)',
        borderLeftWidth: item.isCompleted ? '5px' : '1px',
        borderLeftColor: item.isCompleted ? 'var(--color-brand-primary)' : 'var(--color-border)',
      }}
    >
      {href ? (
        <Link
          href={href}
          className="flex flex-col gap-4 px-4 py-4 no-underline sm:flex-row sm:items-center sm:justify-between sm:px-5"
        >
          {content}
        </Link>
      ) : (
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          {content}
        </div>
      )}
    </article>
  );
}

function EmptyTabState({ tab }: { tab: CourseContentTab }) {
  return (
    <div
      className="rounded-[22px] border bg-white px-6 py-10 text-center"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {tab.charAt(0).toUpperCase() + tab.slice(1)} belum tersedia
      </h3>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Detail untuk bagian ini masih dikosongkan sementara.
      </p>
    </div>
  );
}

function Badge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.04em]"
      style={{ background: '#E7EEFF', color: 'var(--color-brand-primary)' }}
    >
      {icon}
      {children}
    </span>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A3A9C] text-sm font-bold text-white">
      {initials}
    </div>
  );
}

function ActionButton({
  children,
  primary = false,
  icon,
  href,
  onClick,
}: {
  children: React.ReactNode;
  primary?: boolean;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const className = "flex h-14 items-center justify-center gap-2 rounded-[18px] border px-5 text-lg font-semibold transition-opacity hover:opacity-90";
  const style =
    primary
      ? {
          background: 'var(--color-brand-primary)',
          borderColor: 'var(--color-brand-primary)',
          color: '#FFFFFF',
        }
      : {
          background: '#FFFFFF',
          borderColor: 'var(--color-brand-primary)',
          color: 'var(--color-brand-primary)',
        };

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
      >
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 items-center justify-center gap-2 rounded-[18px] border px-5 text-lg font-semibold transition-opacity hover:opacity-90"
      style={style}
    >
      {icon}
      {children}
    </button>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }}
    >
      <path d="M7 11.5 14 18.5 21 11.5" stroke="#434654" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v3.75l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="m4 9 3.2 3.2L14 5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayButtonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="m7.5 5.8 5 3.2-5 3.2V5.8Z" fill="currentColor" />
    </svg>
  );
}

function CalendarButtonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.5 2v3M5.5 2v3M2 7.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function getContentItemHref({
  activeTab,
  courseId,
  itemId,
  source,
}: {
  activeTab: CourseContentTab;
  courseId: number | string;
  itemId: string;
  source: CourseSource;
}) {
  if (activeTab === 'materials') {
    return buildMaterialHref(courseId, itemId, source);
  }

  if (activeTab === 'assignments') {
    return buildAssignmentHref(courseId, itemId, source);
  }

  return undefined;
}

