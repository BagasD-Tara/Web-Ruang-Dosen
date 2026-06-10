import { notFound } from 'next/navigation';
import { LecturerModuleEditorView } from '@/components/lecturer/LecturerModuleEditorView';
import { getLecturerModuleById } from '@/lib/mock/lecturerCourseManagement';

interface LecturerEditModulePageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default async function LecturerEditModulePage({
  params,
}: LecturerEditModulePageProps) {
  const { courseId, moduleId } = await params;
  const moduleData = getLecturerModuleById(courseId, moduleId);

  if (!moduleData) {
    notFound();
  }

  return (
    <LecturerModuleEditorView
      mode="edit"
      course={moduleData.course}
      termLabel={moduleData.termLabel}
      module={moduleData.module}
      moduleCount={moduleData.moduleCount}
    />
  );
}
