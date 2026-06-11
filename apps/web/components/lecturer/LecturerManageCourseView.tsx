'use client';

import Link from 'next/link';
import React from 'react';
import {
  Settings,
  Plus,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lock,
  FileText,
  Video,
  Link as LinkIcon,
  HelpCircle,
  ClipboardList,
  Edit2,
  BookOpen
} from 'lucide-react';
import type {
  LecturerCourseModule,
  LecturerManageCourseData,
  LecturerMaterialKind,
  LecturerModuleAssessment,
  LecturerModuleMaterial,
} from '@/lib/mock/lecturerCourseManagement';
import { LecturerBreadcrumbs } from './LecturerBreadcrumbs';
import './LecturerManageCourseView.css';

interface LecturerManageCourseViewProps {
  data: LecturerManageCourseData;
}

export function LecturerManageCourseView({ data }: LecturerManageCourseViewProps) {
  const [expandedModuleIds, setExpandedModuleIds] = React.useState(() =>
    getDefaultExpandedModuleIds(data.modules)
  );

  return (
    <div className="manage-view-wrapper dashboard-content">
      <LecturerBreadcrumbs
        items={[
          { label: 'Home', href: '/dosen' },
          { label: 'Courses', href: '/dosen/courses' },
          { label: data.course.title },
        ]}
      />

      <section className="manage-header">
        <div className="manage-header-left">
          <h1>{data.course.title}</h1>
          <div className="course-meta">
            <span>{data.course.code}</span>
            <span className="dot">•</span>
            <span>{data.termLabel}</span>
            <span className="dot">•</span>
            <span>{data.credits} Credits</span>
          </div>
        </div>

        <div className="manage-header-right">
          <Link
            href={`/dosen/courses/${data.course.id}/settings`}
            className="btn-secondary"
          >
            <Settings size={18} />
            Course Settings
          </Link>
          <Link
            href={`/dosen/courses/${data.course.id}/modules/create`}
            className="btn-primary"
          >
            <Plus size={18} />
            New Module
          </Link>
        </div>
      </section>

      <section className="manage-grid">
        <div className="manage-grid-left">
          <EnrollmentSummaryCard
            courseId={data.course.id}
            enrolledStudents={data.enrolledStudents}
            weeklyGrowth={data.weeklyGrowth}
          />
        </div>

        <div className="manage-grid-right">
          <div className="module-list">
            {data.modules.length > 0 ? (
              data.modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  courseId={data.course.id}
                  module={module}
                  expanded={expandedModuleIds.includes(module.id)}
                  onToggle={() => toggleExpandedModule(module.id, setExpandedModuleIds)}
                />
              ))
            ) : (
              <div className="empty-modules">
                <div className="empty-modules-icon">
                  <BookOpen size={28} />
                </div>
                <h3>Belum Ada Modul</h3>
                <p>Kelas ini belum memiliki modul materi.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================== COMPONENTS ================== */

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
    <article className="enrollment-card">
      <div className="enrollment-header">
        <div className="enrollment-icon">
          <Users size={22} />
        </div>
        <h2 className="enrollment-title">
          View Enrolled<br />Students
        </h2>
      </div>

      <strong className="enrollment-value">
        {enrolledStudents}
      </strong>

      <p className="enrollment-growth">
        <TrendingUp size={16} />
        <span>+{weeklyGrowth} new students this week</span>
      </p>

      <Link
        href={`/dosen/courses/${courseId}/enrollment`}
        className="btn-manage-enrollment"
      >
        Manage Enrollment
        <ArrowRight size={18} />
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
  const statusClass = module.status.toLowerCase();

  return (
    <article className={`module-card ${expanded ? 'expanded' : ''}`}>
      <button
        type="button"
        onClick={onToggle}
        className="module-card-header"
      >
        <div className="module-card-left">
          <div className={`module-order ${statusClass}`}>
            {module.orderLabel}
          </div>

          <div className="module-info">
            <h2>{module.title}</h2>
            <p className="module-meta">
              <span>{module.weekLabel}</span>
              <span className="dot">•</span>
              {isLocked ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12}/> Locked
                </span>
              ) : (
                <span>{formatModuleSummary(module)}</span>
              )}
            </p>
          </div>
        </div>

        <div className="module-card-right">
          <span className={`module-status ${statusClass}`}>
            {module.status}
          </span>
          <div className="module-chevron">
            {expanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </div>
        </div>
      </button>

      {/* EXPANDED CONTENT */}
      {expanded && !isLocked && (
        <div className="module-content">
          <div className="module-content-inner">
            {/* Learning Materials */}
            <div className="content-section">
              <div className="section-header">
                <div className="section-title">
                  <BookOpen size={18} />
                  Learning Materials
                </div>
                <Link
                  href={`/dosen/courses/${courseId}/modules/${module.id}/materials/create`}
                  className="btn-link"
                >
                  Add Material
                </Link>
              </div>
              <div className="items-list">
                {module.materials.map((material) => (
                  <MaterialRow
                    key={material.id}
                    courseId={courseId}
                    moduleId={module.id}
                    material={material}
                  />
                ))}
              </div>
            </div>

            {/* Assessments */}
            <div className="content-section">
              <div className="section-header">
                <div className="section-title">
                  <ClipboardList size={18} />
                  Assessments
                </div>
                <div className="section-actions">
                  <button
                    type="button"
                    disabled
                    title="Quiz creation is not yet available"
                    className="btn-link"
                    style={{ opacity: 0.4, cursor: 'not-allowed' }}
                  >
                    Create Quiz
                  </button>
                  <Link
                    href={`/dosen/courses/${courseId}/modules/${module.id}/assignments/create`}
                    className="btn-link"
                  >
                    Create Assignment
                  </Link>
                </div>
              </div>
              <div className="items-list">
                {module.assessments.map((assessment) => (
                  <AssessmentRow
                    key={assessment.id}
                    courseId={courseId}
                    moduleId={module.id}
                    assessment={assessment}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="module-footer">
            <Link
              href={`/dosen/courses/${courseId}/modules/${module.id}/edit`}
              className="btn-small"
            >
              Edit Module Settings
            </Link>
          </div>
        </div>
      )}
    </article>
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
    <div className="item-row">
      <div className="item-left">
        <div className={`item-icon ${material.kind}`}>
          <MaterialTypeIcon kind={material.kind} />
        </div>
        <div className="item-details">
          <h4>{material.title}</h4>
        </div>
      </div>
      <div className="item-right">
        <RowActions editHref={`/dosen/courses/${courseId}/modules/${moduleId}/materials/${material.id}/edit`} />
      </div>
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
      ? `/dosen/courses/${courseId}/modules/${moduleId}/assignments/${assessment.id}/edit?from=course`
      : undefined;

  return (
    <div className="item-row">
      <div className="item-left">
        <div className={`item-icon ${assessment.kind}`}>
          <AssessmentTypeIcon kind={assessment.kind} />
        </div>
        <div className="item-details">
          <h4>{assessment.title}</h4>
          <p>{assessment.meta}</p>
        </div>
      </div>
      <div className="item-right">
        {assessment.badgeLabel && (
          <span className="item-badge">
            {assessment.badgeLabel}
          </span>
        )}
        <RowActions editHref={editHref} />
      </div>
    </div>
  );
}

function RowActions({ editHref }: { editHref?: string }) {
  return (
    <div className="row-actions">
      {editHref ? (
        <Link href={editHref} className="btn-icon" title="Edit">
          <Edit2 size={16} />
        </Link>
      ) : (
        <button
          type="button"
          className="btn-icon"
          disabled
          title="Quiz editing is not yet available"
          style={{ opacity: 0.4, cursor: 'not-allowed' }}
        >
          <Edit2 size={16} />
        </button>
      )}
    </div>
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
  const parts = [];
  if (module.materials.length > 0) {
    parts.push(`${module.materials.length} Materials`);
  }

  if (module.assessments.length > 0) {
    const qCount = module.assessments.filter((a) => a.kind === 'quiz').length;
    const aCount = module.assessments.filter((a) => a.kind === 'assignment').length;

    if (qCount > 0) parts.push(`${qCount} Quiz`);
    if (aCount > 0) parts.push(`${aCount} Assignment`);
  }

  return parts.length > 0 ? parts.join(' • ') : '0 Materials • 0 Assessments';
}

function MaterialTypeIcon({ kind }: { kind: LecturerMaterialKind }) {
  if (kind === 'document') return <FileText size={20} />;
  if (kind === 'video') return <Video size={20} />;
  return <LinkIcon size={20} />;
}

function AssessmentTypeIcon({ kind }: { kind: LecturerModuleAssessment['kind'] }) {
  return kind === 'quiz' ? (
    <HelpCircle size={20} />
  ) : (
    <ClipboardList size={20} />
  );
}

