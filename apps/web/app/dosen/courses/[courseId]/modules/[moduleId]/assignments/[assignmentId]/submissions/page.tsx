import { notFound } from 'next/navigation';
import { LecturerAssignmentSubmissionsView } from '@/components/lecturer/LecturerAssignmentSubmissionsView';
import { getLecturerAssignmentSubmissions } from '@/lib/mock/lecturerAssignmentSubmissions';

export default async function LecturerAssignmentSubmissionsPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; assignmentId: string }>;
}) {
  const { courseId, moduleId, assignmentId } = await params;
  const submissionsData = getLecturerAssignmentSubmissions(courseId, moduleId, assignmentId);

  if (!submissionsData) {
    notFound();
  }

  return <LecturerAssignmentSubmissionsView {...submissionsData} />;
}
