import { notFound } from 'next/navigation';
import { LecturerMaterialEditorView } from '@/components/lecturer/LecturerMaterialEditorView';
import { getLecturerMaterialById } from '@/lib/mock/lecturerCourseManagement';

interface LecturerEditMaterialPageProps {
  params: Promise<{ courseId: string; moduleId: string; materialId: string }>;
}

export default async function LecturerEditMaterialPage({
  params,
}: LecturerEditMaterialPageProps) {
  const { courseId, moduleId, materialId } = await params;
  const materialData = getLecturerMaterialById(courseId, moduleId, materialId);

  if (!materialData) {
    notFound();
  }

  return (
    <LecturerMaterialEditorView
      mode="edit"
      course={materialData.course}
      module={materialData.module}
      material={materialData.material}
    />
  );
}
