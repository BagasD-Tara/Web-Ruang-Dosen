import { notFound } from 'next/navigation';
import { LecturerManageCourseView } from '@/components/lecturer/LecturerManageCourseView';
import { getLecturerManageCourseById } from '@/lib/mock/lecturerCourseManagement';

export default async function LecturerManageCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseManagementData = getLecturerManageCourseById(courseId);

  if (!courseManagementData) {
    notFound();
  }

  return <LecturerManageCourseView data={courseManagementData} />;
}
