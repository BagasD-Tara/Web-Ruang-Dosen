import { notFound } from 'next/navigation';
import { LecturerManageEnrollmentView } from '@/components/lecturer/LecturerManageEnrollmentView';
import { getLecturerEnrollmentData } from '@/lib/mock/lecturerEnrollment';

export default async function LecturerManageEnrollmentPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const enrollmentData = getLecturerEnrollmentData(courseId);

  if (!enrollmentData) {
    notFound();
  }

  return <LecturerManageEnrollmentView data={enrollmentData} />;
}
