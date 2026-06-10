import { notFound } from 'next/navigation';
import { LecturerAssignmentsListView } from '@/components/lecturer/LecturerAssignmentsListView';
import { getLecturerAssignmentsByCourseId } from '@/lib/mock/lecturerCourseManagement';

interface LecturerAssignmentsPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LecturerAssignmentsPage({
  params,
}: LecturerAssignmentsPageProps) {
  const { courseId } = await params;
  const assignmentData = getLecturerAssignmentsByCourseId(courseId);

  if (!assignmentData) {
    notFound();
  }

  return (
    <LecturerAssignmentsListView
      course={assignmentData.course}
      assignments={assignmentData.assignments}
    />
  );
}
