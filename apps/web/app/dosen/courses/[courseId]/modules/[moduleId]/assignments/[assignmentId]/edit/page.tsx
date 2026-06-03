import { notFound } from 'next/navigation';
import { LecturerAssignmentEditorView } from '@/components/lecturer/LecturerAssignmentEditorView';
import {
  getLecturerAssignmentById,
  getLecturerAssignmentsByCourseId,
} from '@/lib/mock/lecturerCourseManagement';

interface LecturerEditAssignmentPageProps {
  params: Promise<{ courseId: string; moduleId: string; assignmentId: string }>;
}

export default async function LecturerEditAssignmentPage({
  params,
}: LecturerEditAssignmentPageProps) {
  const { courseId, moduleId, assignmentId } = await params;
  const assignmentData = getLecturerAssignmentById(courseId, moduleId, assignmentId);
  const courseAssignments = getLecturerAssignmentsByCourseId(courseId);

  if (!assignmentData || !courseAssignments) {
    notFound();
  }

  return (
    <LecturerAssignmentEditorView
      mode="edit"
      course={assignmentData.course}
      module={assignmentData.module}
      assignment={assignmentData.assignment}
      existingAssignments={courseAssignments.assignments}
    />
  );
}
