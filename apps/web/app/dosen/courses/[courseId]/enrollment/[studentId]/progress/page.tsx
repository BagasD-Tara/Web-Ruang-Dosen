import { notFound } from 'next/navigation';
import { LecturerStudentProgressView } from '@/components/lecturer/LecturerStudentProgressView';
import { getLecturerStudentProgressData } from '@/lib/mock/lecturerStudentProgress';

export default async function LecturerStudentProgressPage({
  params,
}: {
  params: Promise<{ courseId: string; studentId: string }>;
}) {
  const { courseId, studentId } = await params;
  const progressData = getLecturerStudentProgressData(courseId, studentId);

  if (!progressData) {
    notFound();
  }

  return <LecturerStudentProgressView data={progressData} />;
}
