import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LecturerAssignmentEditorView } from '@/components/lecturer/LecturerAssignmentEditorView';
import { getLecturerModule, getLecturerAssignmentsByCourse } from '@/lib/api/courseRepository';
import { createLecturerAssignment } from '@/lib/mock/lecturerCourseManagement';
import type { LecturerAssignmentStatus } from '@/lib/mock/lecturerCourseManagement';

interface LecturerCreateAssignmentPageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default async function LecturerCreateAssignmentPage({
  params,
}: LecturerCreateAssignmentPageProps) {
  const { courseId, moduleId } = await params;
  const moduleData = await getLecturerModule(courseId, moduleId);
  const courseAssignments = await getLecturerAssignmentsByCourse(courseId);

  if (!moduleData || !courseAssignments) {
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

    createLecturerAssignment(courseId, moduleId, {
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
    redirect(`/dosen/courses/${courseId}`);
  }

  return (
    <LecturerAssignmentEditorView
      mode="create"
      course={moduleData.course}
      module={moduleData.module}
      existingAssignments={courseAssignments.assignments}
      onSave={handleSave}
    />
  );
}
