import { notFound } from 'next/navigation';
import { LecturerModuleEditorView } from '@/components/lecturer/LecturerModuleEditorView';
import { getLecturerManageCourseById } from '@/lib/mock/lecturerCourseManagement';

interface LecturerCreateModulePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LecturerCreateModulePage({
  params,
}: LecturerCreateModulePageProps) {
  const { courseId } = await params;
  const courseData = getLecturerManageCourseById(courseId);

  if (!courseData) {
    notFound();
  }

  return (
    <LecturerModuleEditorView
      mode="create"
      course={courseData.course}
      termLabel={courseData.termLabel}
      moduleCount={courseData.modules.length}
    />
  );
}
