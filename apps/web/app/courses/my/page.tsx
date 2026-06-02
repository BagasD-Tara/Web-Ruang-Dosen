import { MyCoursesCatalogView } from '@/components/course/MyCoursesCatalogView';

export default async function MyCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <MyCoursesCatalogView searchQuery={params.q ?? ''} />;
}
