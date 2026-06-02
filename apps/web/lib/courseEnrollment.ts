import type { Course } from '@/lib/mock/courses';

export function isCourseEnrolled(course: Course, enrolledCourseIds: number[]) {
  return course.status !== 'notstart' || enrolledCourseIds.includes(course.id);
}
