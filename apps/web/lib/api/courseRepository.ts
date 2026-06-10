import { fetchCourseDetail, fetchCourses, fetchMyCourses } from '@/lib/api/courseApi';
import { getDemoStudentAccessToken } from '@/lib/api/demoStudentSession';
import { cookies } from 'next/headers';
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
  MANAGE_COURSE_OVERRIDES,
} from '@/lib/mock/lecturerCourseManagement';
import { buildEnrollmentData } from '@/lib/mock/lecturerEnrollment';
import { buildAssignmentSubmissionsData } from '@/lib/mock/lecturerAssignmentSubmissions';
import { buildStudentProgressData } from '@/lib/mock/lecturerStudentProgress';

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
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const apiCourse = await fetchCourseDetail(courseId, token);
    const enrolledCourseIds = await getStudentEnrolledCourseIds(token);

    return mapApiCourseDetailToStudentCourseDetail(apiCourse, enrolledCourseIds);
  } catch {
    const isNumeric = !isNaN(Number(courseId));
    return isNumeric ? (getCourseDetailById(Number(courseId)) ?? null) : null;
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
    const mapped = mapApiCoursesToLecturerCourses(apiCourses);

    // Merge with local mock courses to ensure courses created locally or fallback mock courses are visible
    const combined = [...mapped];
    for (const localCourse of LECTURER_COURSES) {
      if (!combined.some((c) => c.id === localCourse.id)) {
        combined.push(localCourse);
      }
    }
    return combined;
  } catch (error) {
    console.error('getLecturerCourses error:', error);
    return LECTURER_COURSES;
  }
}

export async function getLecturerManageCourse(courseId: string): Promise<LecturerManageCourseData | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const apiCourse = await fetchCourseDetail(courseId, token);
    const mapped = mapApiCourseDetailToLecturerManageCourse(apiCourse);

    // Merge locally created modules if they exist in MANAGE_COURSE_OVERRIDES
    const localDetail = MANAGE_COURSE_OVERRIDES[courseId];
    console.log('getLecturerManageCourse debug:', { courseId, localDetail, MANAGE_COURSE_OVERRIDES });
    if (localDetail && localDetail.modules) {
      // Concat the local modules to the mapped ones
      mapped.modules = [...mapped.modules, ...localDetail.modules];
    }
    
    mapped.course.moduleCount = mapped.modules.length;
    
    return mapped;
  } catch {
    return getLecturerManageCourseById(courseId) ?? null;
  }
}

export async function getLecturerModule(courseId: string, moduleId: string) {
  const courseData = await getLecturerManageCourse(courseId);
  if (!courseData) return null;
  const selectedModule = courseData.modules.find((m) => m.id === moduleId);
  if (!selectedModule) return null;
  return {
    course: courseData.course,
    termLabel: courseData.termLabel,
    module: selectedModule,
    moduleCount: courseData.modules.length,
  };
}

export async function getLecturerMaterial(courseId: string, moduleId: string, materialId: string) {
  const moduleData = await getLecturerModule(courseId, moduleId);
  if (!moduleData) return null;
  const selectedMaterial = moduleData.module.materials.find((m) => m.id === materialId);
  if (!selectedMaterial) return null;
  return {
    ...moduleData,
    material: selectedMaterial,
  };
}

export async function getLecturerAssignment(courseId: string, moduleId: string, assignmentId: string) {
  const moduleData = await getLecturerModule(courseId, moduleId);
  if (!moduleData) return null;
  const selectedAssignment = moduleData.module.assessments.find(
    (a) => a.id === assignmentId && a.kind === 'assignment'
  );
  if (!selectedAssignment) return null;
  return {
    ...moduleData,
    assignment: selectedAssignment,
  };
}

export async function getLecturerAssignmentsByCourse(courseId: string) {
  const courseData = await getLecturerManageCourse(courseId);
  if (!courseData) return null;
  const assignments = courseData.modules.flatMap((courseModule) =>
    courseModule.assessments
      .filter((assessment) => assessment.kind === 'assignment')
      .map((assignment) => ({
        assignment,
        module: courseModule,
      }))
  );
  return {
    course: courseData.course,
    termLabel: courseData.termLabel,
    assignments,
  };
}

export async function getLecturerEnrollment(courseId: string) {
  const courseData = await getLecturerManageCourse(courseId);
  if (!courseData) return null;
  return buildEnrollmentData(courseId, courseData);
}

export async function getLecturerAssignmentSubmissions(courseId: string, moduleId: string, assignmentId: string) {
  const assignmentData = await getLecturerAssignment(courseId, moduleId, assignmentId);
  if (!assignmentData) return null;
  return buildAssignmentSubmissionsData(assignmentId, assignmentData);
}

export async function getLecturerStudentProgress(courseId: string, studentId: string) {
  const courseData = await getLecturerManageCourse(courseId);
  const enrollmentData = await getLecturerEnrollment(courseId);
  if (!courseData || !enrollmentData) return null;
  return buildStudentProgressData(courseData, enrollmentData, studentId);
}


// Memoize per-invocation: simpan Promise yang sedang berjalan agar concurrent call
// dalam satu request cycle tidak melakukan login + fetch dua kali.
let _enrolledCourseIdsPromise: Promise<string[]> | null = null;
let _enrolledCourseIdsFetchedAt: number | null = null;
const ENROLLED_IDS_TTL_MS = 55 * 60 * 1000; // selaraskan dengan token TTL

async function getStudentEnrolledCourseIds(userToken?: string): Promise<string[]> {
  if (userToken) {
    try {
      const enrolledCourses = await fetchMyCourses(userToken);
      return enrolledCourses.map((course) => course.id);
    } catch {
      return [];
    }
  }

  const now = Date.now();

  // Kembalikan Promise yang sedang berjalan (dedup concurrent calls)
  if (
    _enrolledCourseIdsPromise &&
    _enrolledCourseIdsFetchedAt &&
    now - _enrolledCourseIdsFetchedAt < ENROLLED_IDS_TTL_MS
  ) {
    return _enrolledCourseIdsPromise;
  }

  _enrolledCourseIdsFetchedAt = now;
  _enrolledCourseIdsPromise = (async () => {
    try {
      const accessToken = await getDemoStudentAccessToken();
      const enrolledCourses = await fetchMyCourses(accessToken);
      return enrolledCourses.map((course) => course.id);
    } catch {
      _enrolledCourseIdsPromise = null; // reset agar retry berikutnya bisa berjalan
      _enrolledCourseIdsFetchedAt = null;
      return [];
    }
  })();

  return _enrolledCourseIdsPromise;
}
