import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LecturerAssignmentEditorView } from '@/components/lecturer/LecturerAssignmentEditorView';
import {
  getLecturerAssignment,
  getLecturerAssignmentsByCourse,
} from '@/lib/api/courseRepository';
import {
  updateLecturerAssignment,
  deleteLecturerAssignment,
} from '@/lib/mock/lecturerCourseManagement';
import type { LecturerAssignmentStatus } from '@/lib/mock/lecturerCourseManagement';

interface LecturerEditAssignmentPageProps {
  params: Promise<{ courseId: string; moduleId: string; assignmentId: string }>;
}

export default async function LecturerEditAssignmentPage({
  params,
}: LecturerEditAssignmentPageProps) {
  const { courseId, moduleId, assignmentId } = await params;
  const assignmentData = await getLecturerAssignment(courseId, moduleId, assignmentId);
  const courseAssignments = await getLecturerAssignmentsByCourse(courseId);

  if (!assignmentData || !courseAssignments) {
    notFound();
  }

  async function handleSave(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const assignedDate = formData.get('assignedDate') as string;
    const deadline = formData.get('deadline') as string;
    const submissionRequirement = formData.get('submissionRequirement') as string;
    const status = (formData.get('status') as LecturerAssignmentStatus) ?? 'Draft';
    const templateName = formData.get('templateName') as string | undefined;
    const templateMeta = formData.get('templateMeta') as string | undefined;

    updateLecturerAssignment(courseId, moduleId, assignmentId, {
      title,
      description,
      assignedDate,
      deadline,
      submissionRequirement,
      status,
      templateName: templateName || undefined,
      templateMeta: templateMeta || undefined,
    });

    revalidatePath(`/dosen/courses/${courseId}`);
    revalidatePath(`/dosen/courses/${courseId}/assignments`);
    redirect(`/dosen/courses/${courseId}/assignments`);
  }

  async function handleDelete() {
    'use server';

    deleteLecturerAssignment(courseId, moduleId, assignmentId);

    revalidatePath(`/dosen/courses/${courseId}`);
    revalidatePath(`/dosen/courses/${courseId}/assignments`);
    redirect(`/dosen/courses/${courseId}/assignments`);
  }

  return (
    <LecturerAssignmentEditorView
      mode="edit"
      course={assignmentData.course}
      module={assignmentData.module}
      assignment={assignmentData.assignment}
      existingAssignments={courseAssignments.assignments}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
