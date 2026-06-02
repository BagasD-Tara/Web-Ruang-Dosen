import { notFound } from 'next/navigation';
import { CourseDetailView } from '@/components/course/CourseDetailView';
import { getCourseDetailById } from '@/lib/mock/courses';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourseDetailById(Number(courseId));

  if (!course) {
    notFound();
  }

  return <CourseDetailView course={course} />;
}
