'use client';

import React from 'react';
import Link from 'next/link';
import { LECTURER_COURSES } from '@/lib/mock/lecturerCourses';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';
import {
  LECTURER_CARD_CLASSNAME,
  LECTURER_COMPACT_CONTROL_CLASSNAME,
} from './shared/lecturerUiStyles';

type PublishingMode = 'draft' | 'published';
type TeachingFormat = 'Theory and Practice' | 'Project-Based' | 'Research Seminar';

interface CourseDraftFormState {
  title: string;
  department: string;
  semester: string;
  credits: string;
  teachingFormat: TeachingFormat;
  durationWeeks: string;
  enrollmentCap: string;
  description: string;
  includeStarterModule: boolean;
}

const SEMESTER_OPTIONS = [
  'Fall Semester 2026',
  'Spring Semester 2027',
  'Short Semester 2027',
];
const CREDIT_OPTIONS = ['2', '3', '4'];
const TEACHING_FORMAT_OPTIONS: TeachingFormat[] = [
  'Theory and Practice',
  'Project-Based',
  'Research Seminar',
];
const DEPARTMENT_OPTIONS = Array.from(
  new Set(LECTURER_COURSES.map((course) => course.department))
).toSorted();

const INITIAL_FORM_STATE: CourseDraftFormState = {
  title: 'Advanced Machine Learning',
  department: 'Computer Science',
  semester: 'Fall Semester 2026',
  credits: '3',
  teachingFormat: 'Theory and Practice',
  durationWeeks: '12',
  enrollmentCap: '60',
  description:
    'A comprehensive advanced module focused on deep learning fundamentals, scalable model architecture, and applied experimentation for senior students.',
  includeStarterModule: true,
};

export function LecturerCreateCourseView() {
  const [draft, setDraft] = React.useState(INITIAL_FORM_STATE);
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-6 lg:px-8">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: 'Create Course' },
        ]}
      />

      <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[760px]">
          <h1
            className="text-[34px] font-bold leading-tight sm:text-[46px]"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            Create New Course
          </h1>
          <p
            className="mt-3 text-lg leading-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Fill in the course identity, delivery plan, and publishing setup before the backend generates the course code and saves the data.
          </p>
        </div>

        <Link
          href="/dosen/courses"
          className="inline-flex h-12 items-center justify-center rounded-[14px] border px-5 text-base font-semibold no-underline transition-colors hover:bg-[#F5F8FF]"
          style={{ borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)' }}
        >
          Back to Courses
        </Link>
      </section>

      {feedbackMessage ? (
        <div
          className="mb-6 rounded-[18px] border px-5 py-4 text-sm sm:text-base"
          style={{ borderColor: '#B7D1FF', background: '#EEF4FF', color: 'var(--color-brand-primary)' }}
        >
          {feedbackMessage}
        </div>
      ) : null}

      <form
        className={`${LECTURER_CARD_CLASSNAME} overflow-hidden`}
        style={{ borderColor: 'var(--color-border)' }}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="space-y-0 px-5 py-6 sm:px-7 sm:py-7">
          <FormSection title="Course Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Course Title">
                <TextInput
                  value={draft.title}
                  onChange={(value) => updateDraftField('title', value, setDraft)}
                  placeholder="Enter course title"
                />
              </FormField>
              <FormField label="Department">
                <SelectInput
                  value={draft.department}
                  onChange={(value) => updateDraftField('department', value, setDraft)}
                  options={DEPARTMENT_OPTIONS}
                />
              </FormField>
              <FormField label="Semester">
                <SelectInput
                  value={draft.semester}
                  onChange={(value) => updateDraftField('semester', value, setDraft)}
                  options={SEMESTER_OPTIONS}
                />
              </FormField>
              <FormField label="Credits">
                <SelectInput
                  value={draft.credits}
                  onChange={(value) => updateDraftField('credits', value, setDraft)}
                  options={CREDIT_OPTIONS}
                />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Delivery Setup">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField label="Teaching Format">
                <SelectInput
                  value={draft.teachingFormat}
                  onChange={(value) =>
                    updateDraftField('teachingFormat', value as TeachingFormat, setDraft)
                  }
                  options={TEACHING_FORMAT_OPTIONS}
                />
              </FormField>
              <FormField label="Duration (weeks)">
                <TextInput
                  value={draft.durationWeeks}
                  onChange={(value) => updateDraftField('durationWeeks', value, setDraft)}
                  placeholder="12"
                />
              </FormField>
              <FormField label="Enrollment Cap">
                <TextInput
                  value={draft.enrollmentCap}
                  onChange={(value) => updateDraftField('enrollmentCap', value, setDraft)}
                  placeholder="60"
                />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Description">
            <FormField label="Course Overview">
              <TextAreaInput
                value={draft.description}
                onChange={(value) => updateDraftField('description', value, setDraft)}
                placeholder="Describe the course scope and expected student outcomes."
              />
            </FormField>
          </FormSection>

          <div className="grid grid-cols-1 gap-6 border-b py-6" style={{ borderColor: 'rgba(195,198,214,0.75)' }}>
            <CompactSection title="Initial Course Options">
              <div className="grid grid-cols-1 gap-3">
                <CheckboxRow
                  checked={draft.includeStarterModule}
                  label="Generate a starter module outline"
                  onToggle={() => toggleDraftFlag('includeStarterModule', setDraft)}
                />
              </div>
            </CompactSection>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 border-t px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          style={{ borderColor: 'rgba(195,198,214,0.75)' }}
        >
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => handleDraftAction('draft', setFeedbackMessage)}
              className="inline-flex h-12 items-center justify-center rounded-[14px] border px-5 text-base font-semibold transition-colors hover:bg-[#F5F8FF]"
              style={{ borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)' }}
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleDraftAction('published', setFeedbackMessage)}
              disabled={!canCreateCourse(draft)}
              className="inline-flex h-12 items-center justify-center rounded-[14px] px-5 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              Create Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CompactSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-[22px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b py-6 first:pt-0 last:border-b-0 last:pb-0" style={{ borderColor: 'rgba(195,198,214,0.75)' }}>
      <h2 className="mb-4 text-[22px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-semibold uppercase tracking-[0.04em]"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={LECTURER_COMPACT_CONTROL_CLASSNAME}
      style={{ borderColor: 'var(--color-border)', background: '#FFFFFF', color: 'var(--color-text-primary)' }}
    />
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
        className={`${LECTURER_COMPACT_CONTROL_CLASSNAME} appearance-none pr-11`}
        style={{ borderColor: 'var(--color-border)', background: '#FFFFFF', color: 'var(--color-text-primary)' }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <SelectChevronIcon />
      </span>
    </div>
  );
}

function TextAreaInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={5}
      className="w-full rounded-[14px] border px-4 py-3 text-base outline-none transition-colors focus:border-[#7DA8FF]"
      style={{ borderColor: 'var(--color-border)', background: '#FFFFFF', color: 'var(--color-text-primary)' }}
    />
  );
}

function CheckboxRow({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-start gap-4 rounded-[16px] border px-4 py-4 text-left transition-colors hover:bg-[#F8FAFF]"
      style={{ borderColor: checked ? '#7DA8FF' : 'var(--color-border)' }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border"
        style={{
          borderColor: checked ? 'var(--color-brand-primary)' : 'var(--color-border)',
          background: checked ? 'var(--color-brand-primary)' : '#FFFFFF',
          color: '#FFFFFF',
        }}
      >
        {checked ? <CheckIcon /> : null}
      </span>
      <span className="block text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {label}
      </span>
    </button>
  );
}

function updateDraftField<K extends keyof CourseDraftFormState>(
  key: K,
  value: CourseDraftFormState[K],
  setDraft: React.Dispatch<React.SetStateAction<CourseDraftFormState>>
) {
  setDraft((currentDraft) => ({
    ...currentDraft,
    [key]: value,
  }));
}

function toggleDraftFlag(
  key: 'includeStarterModule',
  setDraft: React.Dispatch<React.SetStateAction<CourseDraftFormState>>
) {
  setDraft((currentDraft) => ({
    ...currentDraft,
    [key]: !currentDraft[key],
  }));
}

function handleDraftAction(
  publishingMode: PublishingMode,
  setFeedbackMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  setFeedbackMessage(
    publishingMode === 'draft'
      ? 'Course draft is saved locally. You can continue preparing modules and materials.'
      : 'Course setup is ready to be created. Connect the form to backend submission when the API is available.'
  );
}

function canCreateCourse(draft: CourseDraftFormState) {
  return Boolean(
    draft.title.trim() &&
      draft.department.trim() &&
      draft.description.trim() &&
      draft.durationWeeks.trim() &&
      draft.enrollmentCap.trim()
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="m2.5 6 2 2L9.5 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
