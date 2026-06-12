'use client';

import React from 'react';
import Link from 'next/link';
import type { LecturerCourse } from '@/lib/types/course';
import { createCourseAction } from '@/app/actions/createCourse';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';
import './LecturerCreateCourseView.css';

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
const DEPARTMENT_OPTIONS = [
  'Computer Science',
  'Data Science',
  'Information Technology',
  'Software Engineering',
  'Cybersecurity',
  'Information Systems',
  'Artificial Intelligence',
  'Business Analytics',
];

const INITIAL_FORM_STATE: CourseDraftFormState = {
  title: '',
  department: 'Computer Science',
  semester: 'Fall Semester 2026',
  credits: '3',
  teachingFormat: 'Theory and Practice',
  durationWeeks: '12',
  enrollmentCap: '60',
  description: '',
  includeStarterModule: true,
};

export function LecturerCreateCourseView() {
  const [draft, setDraft] = React.useState(INITIAL_FORM_STATE);
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (isSubmitted) {
    return (
      <div className="create-course-wrapper dashboard-content">
        <LecturerBreadcrumbs
          items={[
            { label: 'Home', href: '/dashboard_dosen' },
            { label: 'Courses', href: '/dosen/courses' },
            { label: 'Create Course' },
          ]}
        />
        <div className="form-card" style={{ padding: '60px 20px', textAlign: 'center', marginTop: '32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E8F5E9', color: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '16px' }}>Course Created Successfully!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>
            Your new course <strong>{draft.title}</strong> has been created.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/dosen/courses" className="btn-draft" style={{ textDecoration: 'none' }}>
              Back to Courses
            </Link>
            <button
              onClick={() => {
                setDraft(INITIAL_FORM_STATE);
                setIsSubmitted(false);
                setFeedbackMessage(null);
                window.scrollTo(0, 0);
              }}
              className="btn-submit"
            >
              Create Another Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-course-wrapper dashboard-content">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dashboard_dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: 'Create Course' },
        ]}
      />

      <section className="create-course-header">
        <div className="header-text">
          <h1>Create New Course</h1>
          <p>
            Fill in the course identity, delivery plan, and publishing setup before the backend generates the course code and saves the data.
          </p>
        </div>

        <Link
          href="/dosen/courses"
          className="btn-back"
        >
          Back to Courses
        </Link>
      </section>

      {feedbackMessage ? (
        <div className="feedback-msg">
          {feedbackMessage}
        </div>
      ) : null}

      <form
        className="form-card"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="form-body">
          <FormSection title="Course Information">
            <div className="grid-cols-1 md:grid-cols-2">
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
            <div className="grid-cols-1 md:grid-cols-3">
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

          <div className="create-course-section">
            <h2 className="create-course-section-title">Initial Course Options</h2>
            <div className="grid-cols-1">
              <CheckboxRow
                checked={draft.includeStarterModule}
                label="Generate a starter module outline"
                onToggle={() => toggleDraftFlag('includeStarterModule', setDraft)}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => {
              setFeedbackMessage('Course draft is saved locally. You can continue preparing modules and materials.');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-draft"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={async () => {
              const newCourse: LecturerCourse = {
                id: `course-${Date.now()}`,
                code: draft.department.substring(0, 2).toUpperCase() + '-' + Math.floor(Math.random() * 900 + 100),
                title: draft.title,
                department: draft.department,
                studentCount: 0,
                moduleCount: 0,
                assignmentCount: 0,
                status: 'Draft',
                imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
              };
              await createCourseAction(newCourse);
              setIsSubmitted(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={!canCreateCourse(draft)}
            className="btn-submit"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
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
    <section className="create-course-section">
      <h2 className="create-course-section-title">
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
    <label className="form-field">
      <span className="field-label">
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
      className="input-control"
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
    <div className="select-wrapper">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-control select-control"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="select-icon">
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
      className="textarea-control"
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
      className={`checkbox-row ${checked ? 'checked' : ''}`}
    >
      <span className="checkbox-box">
        {checked ? <CheckIcon /> : null}
      </span>
      <span className="checkbox-label">
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

