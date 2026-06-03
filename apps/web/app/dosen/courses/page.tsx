import { LecturerCoursesView } from '@/components/lecturer/LecturerCoursesView';
import { LECTURER_COURSES } from '@/lib/mock/lecturerCourses';

export default async function LecturerCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return (
    <LecturerCoursesView
      courses={LECTURER_COURSES}
      searchQuery={params.q ?? ''}
    />
  );
}
