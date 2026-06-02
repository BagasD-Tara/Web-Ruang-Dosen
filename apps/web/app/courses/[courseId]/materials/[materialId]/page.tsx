import { notFound } from 'next/navigation';
import { MaterialReaderView } from '@/components/course/MaterialReaderView';
import { getCourseMaterialById } from '@/lib/mock/courses';

export default async function CourseMaterialPage({
  params,
}: {
  params: Promise<{ courseId: string; materialId: string }>;
}) {
  const { courseId, materialId } = await params;
  const result = getCourseMaterialById(Number(courseId), materialId);

  if (!result) {
    notFound();
  }

  return (
    <MaterialReaderView
      course={result.course}
      currentModule={result.module}
      currentMaterial={result.material}
    />
  );
}
