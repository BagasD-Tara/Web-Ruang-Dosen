import { fetchCourseDetail, fetchCourses } from '@/lib/api/courseApi';
import {
  mapApiCourseDetailToStudentCourseDetail,
  mapApiCourseDetailToLecturerManageCourse,
  mapApiCoursesToLecturerCourses,
  mapApiCoursesToStudentCourses,
} from '@/lib/adapters/courseAdapter';
import { COURSES, getCourseDetailById, type Course, type CourseDetail } from '@/lib/mock/courses';
import { LECTURER_COURSES, type LecturerCourse } from '@/lib/mock/lecturerCourses';
import {
  getLecturerManageCourseById,
  type LecturerManageCourseData,
} from '@/lib/mock/lecturerCourseManagement';

export async function getStudentCourses(): Promise<Course[]> {
  try {
    const apiCourses = await fetchCourses();
    return mapApiCoursesToStudentCourses(apiCourses);
  } catch {
    return COURSES;
  }
}

export async function getStudentCourseDetail(courseId: string): Promise<CourseDetail | null> {
  try {
    const apiCourse = await fetchCourseDetail(courseId);
    return mapApiCourseDetailToStudentCourseDetail(apiCourse);
  } catch {
    return getCourseDetailById(Number(courseId)) ?? null;
  }
}

export async function getLecturerCourses(): Promise<LecturerCourse[]> {
  try {
    const apiCourses = await fetchCourses();
    return mapApiCoursesToLecturerCourses(apiCourses);
  } catch {
    return LECTURER_COURSES;
  }
}

export async function getLecturerManageCourse(courseId: string): Promise<LecturerManageCourseData | null> {
  try {
    const apiCourse = await fetchCourseDetail(courseId);
    return mapApiCourseDetailToLecturerManageCourse(apiCourse);
  } catch {
    return getLecturerManageCourseById(courseId);
  }
}
