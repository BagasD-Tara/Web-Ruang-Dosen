import { notFound } from 'next/navigation';
import { LecturerCourseSettingsView } from '@/components/lecturer/LecturerCourseSettingsView';
import { getLecturerManageCourseById } from '@/lib/mock/lecturerCourseManagement';

interface LecturerCourseSettingsPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LecturerCourseSettingsPage({
  params,
}: LecturerCourseSettingsPageProps) {
  const { courseId } = await params;
  const courseData = getLecturerManageCourseById(courseId);

  if (!courseData) {
    notFound();
  }

  return <LecturerCourseSettingsView data={courseData} />;
}
