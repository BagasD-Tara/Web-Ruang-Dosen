export type CourseSource = 'courses' | 'my-courses';

export interface CourseBreadcrumbParent {
  label: string;
  href: string;
}

export function getCourseSource(sourceParam: string | null): CourseSource {
  return sourceParam === 'my-courses' ? 'my-courses' : 'courses';
}

export function getCourseBreadcrumbParent(source: CourseSource): CourseBreadcrumbParent {
  return source === 'my-courses'
    ? { label: 'My Courses', href: '/courses/my' }
    : { label: 'Courses', href: '/courses' };
}

export function buildCourseDetailHref(courseId: number, source: CourseSource) {
  return `/courses/${courseId}?from=${source}`;
}

export function buildMaterialHref(courseId: number, materialId: string, source: CourseSource) {
  return `/courses/${courseId}/materials/${materialId}?from=${source}`;
}

export function buildAssignmentHref(courseId: number, assignmentId: string, source: CourseSource) {
  return `/courses/${courseId}/tugas?from=${source}&assignment=${assignmentId}`;
}
