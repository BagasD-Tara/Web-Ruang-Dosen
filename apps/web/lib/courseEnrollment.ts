import type { Course } from '@/lib/mock/courses';

export function isCourseEnrolled(course: Course, enrolledCourseIds: Array<number | string>) {
  return enrolledCourseIds.includes(course.id);
}
