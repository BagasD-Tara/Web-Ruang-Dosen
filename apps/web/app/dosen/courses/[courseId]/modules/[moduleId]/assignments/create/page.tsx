import { notFound } from 'next/navigation';
import { LecturerAssignmentEditorView } from '@/components/lecturer/LecturerAssignmentEditorView';
import {
  getLecturerAssignmentsByCourseId,
  getLecturerModuleById,
} from '@/lib/mock/lecturerCourseManagement';

interface LecturerCreateAssignmentPageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default async function LecturerCreateAssignmentPage({
  params,
}: LecturerCreateAssignmentPageProps) {
  const { courseId, moduleId } = await params;
  const moduleData = getLecturerModuleById(courseId, moduleId);
  const courseAssignments = getLecturerAssignmentsByCourseId(courseId);

  if (!moduleData || !courseAssignments) {
    notFound();
  }

  return (
    <LecturerAssignmentEditorView
      mode="create"
      course={moduleData.course}
      module={moduleData.module}
      existingAssignments={courseAssignments.assignments}
    />
  );
}
