import { fetchCourseDetail, fetchCourses, fetchMyCourses } from '@/lib/api/courseApi';
import { getDemoStudentAccessToken } from '@/lib/api/demoStudentSession';
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
    const enrolledCourseIds = await getStudentEnrolledCourseIds();

    return mapApiCoursesToStudentCourses(apiCourses, enrolledCourseIds);
  } catch {
    return COURSES;
  }
}

export async function getStudentCourseDetail(courseId: string): Promise<CourseDetail | null> {
  try {
    const apiCourse = await fetchCourseDetail(courseId);
    const enrolledCourseIds = await getStudentEnrolledCourseIds();

    return mapApiCourseDetailToStudentCourseDetail(apiCourse, enrolledCourseIds);
  } catch {
    return getCourseDetailById(Number(courseId)) ?? null;
  }
}

export async function getStudentMyCourses(): Promise<Course[]> {
  try {
    const accessToken = await getDemoStudentAccessToken();
    const apiCourses = await fetchMyCourses(accessToken);
    const enrolledCourseIds = apiCourses.map((course) => course.id);

    return mapApiCoursesToStudentCourses(apiCourses, enrolledCourseIds);
  } catch {
    return COURSES.filter((course) => course.status !== 'notstart');
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

async function getStudentEnrolledCourseIds() {
  try {
    const accessToken = await getDemoStudentAccessToken();
    const enrolledCourses = await fetchMyCourses(accessToken);

    return enrolledCourses.map((course) => course.id);
  } catch {
    return [];
  }
}
