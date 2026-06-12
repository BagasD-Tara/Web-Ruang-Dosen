import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LecturerAssignmentEditorView } from '@/components/lecturer/LecturerAssignmentEditorView';
import {
  getLecturerAssignment,
  getLecturerAssignmentsByCourse,
} from '@/lib/api/courseRepository';
import { updateAssignmentApi, deleteAssignmentApi } from '@/lib/api/courseApi';
import { cookies } from 'next/headers';

interface LecturerEditAssignmentPageProps {
  params: Promise<{ courseId: string; moduleId: string; assignmentId: string }>;
  searchParams: Promise<{ from?: string }>;
}

export default async function LecturerEditAssignmentPage({
  params,
  searchParams,
}: LecturerEditAssignmentPageProps) {
  const { courseId, moduleId, assignmentId } = await params;
  const { from } = await searchParams;
  const returnHref = from === 'course'
    ? `/dosen/courses/${courseId}`
    : `/dosen/courses/${courseId}/assignments`;
  const assignmentData = await getLecturerAssignment(courseId, moduleId, assignmentId);
  const courseAssignments = await getLecturerAssignmentsByCourse(courseId);

  if (!assignmentData || !courseAssignments) {
    notFound();
  }

  async function handleSave(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const deadline = formData.get('deadline') as string;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      try {
        await updateAssignmentApi(
          assignmentId,
          {
            title,
            description,
            deadline: new Date(deadline).toISOString(),
          },
          token
        );
      } catch (error) {
        console.error('Failed to update assignment via API:', error);
      }
    }

    revalidatePath(`/dosen/courses/${courseId}`);
    revalidatePath(`/dosen/courses/${courseId}/assignments`);
    redirect(returnHref);
  }

  async function handleDelete() {
    'use server';

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      try {
        await deleteAssignmentApi(assignmentId, token);
      } catch (error) {
        console.error('Failed to delete assignment via API:', error);
      }
    }

    revalidatePath(`/dosen/courses/${courseId}`);
    revalidatePath(`/dosen/courses/${courseId}/assignments`);
    redirect(returnHref);
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
      returnHref={returnHref}
    />
  );
}
