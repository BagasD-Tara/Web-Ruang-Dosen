import { notFound } from 'next/navigation';
import { LecturerMaterialEditorView } from '@/components/lecturer/LecturerMaterialEditorView';
import { getLecturerModuleById } from '@/lib/mock/lecturerCourseManagement';

interface LecturerCreateMaterialPageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default async function LecturerCreateMaterialPage({
  params,
}: LecturerCreateMaterialPageProps) {
  const { courseId, moduleId } = await params;
  const moduleData = getLecturerModuleById(courseId, moduleId);

  if (!moduleData) {
    notFound();
  }

  return (
    <LecturerMaterialEditorView
      mode="create"
      course={moduleData.course}
      module={moduleData.module}
    />
  );
}
