import { CoursesCatalogView } from '@/components/course/CoursesCatalogView';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <CoursesCatalogView searchQuery={params.q ?? ''} />;
}
