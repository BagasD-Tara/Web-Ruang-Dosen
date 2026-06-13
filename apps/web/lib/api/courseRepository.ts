import { fetchCourseDetail, fetchCourses, fetchMyCourses, fetchCourseEnrollmentsApi } from '@/lib/api/courseApi';
import { getDemoStudentAccessToken } from '@/lib/api/demoStudentSession';
import { cookies } from 'next/headers';
import {
  mapApiCourseDetailToStudentCourseDetail,
  mapApiCourseDetailToLecturerManageCourse,
  mapApiCoursesToLecturerCourses,
  mapApiCoursesToStudentCourses,
} from '@/lib/adapters/courseAdapter';
import type { Course, CourseDetail, LecturerCourse, LecturerManageCourseData, AssignmentSubmissionsData, StudentProgressData, LecturerStudentProgressData } from '@/lib/types/course';

export async function getStudentCourses(): Promise<Course[]> {
  try {
    const apiCourses = await fetchCourses();
    const enrolledCourseIds = await getStudentEnrolledCourseIds();
    return mapApiCoursesToStudentCourses(apiCourses, enrolledCourseIds);
  } catch (error) {
    console.error('getStudentCourses error:', error);
    return [];
  }
}

export async function getStudentCourseDetail(courseId: string): Promise<CourseDetail | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const apiCourse = await fetchCourseDetail(courseId, token);
    const enrolledCourseIds = await getStudentEnrolledCourseIds(token);

    return mapApiCourseDetailToStudentCourseDetail(apiCourse, enrolledCourseIds);
  } catch (error) {
    console.error(`getStudentCourseDetail error for ${courseId}:`, error);
    return null;
  }
}

export async function getStudentMyCourses(): Promise<Course[]> {
  try {
    let token;
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } catch {}

    const accessToken = token || await getDemoStudentAccessToken();
    const apiCourses = await fetchMyCourses(accessToken);
    const apiCourseIds = apiCourses.map((course) => course.id);
    return mapApiCoursesToStudentCourses(apiCourses, apiCourseIds);
  } catch (error) {
    console.error('getStudentMyCourses error:', error);
    return [];
  }
}

export async function getLecturerCourses(): Promise<LecturerCourse[]> {
  try {
    const apiCourses = await fetchCourses();
    return mapApiCoursesToLecturerCourses(apiCourses);
  } catch (error) {
    console.error('getLecturerCourses error:', error);
    return [];
  }
}

export async function getLecturerManageCourse(courseId: string): Promise<LecturerManageCourseData | null> {
  try {
    let token;
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } catch {}

    const [apiCourse, enrollments] = await Promise.all([
      fetchCourseDetail(courseId, token),
      token ? fetchCourseEnrollmentsApi(courseId, token) : Promise.resolve([]),
    ]);

    const mappedCourse = mapApiCourseDetailToLecturerManageCourse(apiCourse);
    const enrolledStudentsCount = enrollments.length;

    return {
      ...mappedCourse,
      enrolledStudents: enrolledStudentsCount,
      course: {
        ...mappedCourse.course,
        studentCount: enrolledStudentsCount,
      },
    };
  } catch (error) {
    console.error(`getLecturerManageCourse error for ${courseId}:`, error);
    return null;
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
      .map((assessment) => ({
        assignment: assessment,
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

  try {
    let token;
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } catch {}

    const enrollments = token ? await fetchCourseEnrollmentsApi(courseId, token) : [];

    return {
      courseId: courseData.course.id,
      courseTitle: courseData.course.title,
      courseCode: courseData.course.code,
      termLabel: courseData.termLabel,
      students: enrollments.map(e => ({
        id: e.user.id,
        name: e.user.name,
        email: e.user.email,
        dateJoined: formatEnrollmentDate(e.createdAt),
        progressPercentage: 0,
      })),
    };
  } catch (error) {
    console.error(`getLecturerEnrollment error for ${courseId}:`, error);
    return null;
  }
}

export async function getLecturerAssignmentSubmissions(courseId: string, moduleId: string, assignmentId: string): Promise<AssignmentSubmissionsData | null> {
  const assignmentData = await getLecturerAssignment(courseId, moduleId, assignmentId);
  if (!assignmentData) return null;
  
  // Minimal stub for now, will replace with real API call later if needed
  return {
    assignment: assignmentData.assignment,
    course: assignmentData.course,
    moduleInfo: {
      id: assignmentData.module.id,
      title: assignmentData.module.title,
      orderLabel: assignmentData.module.orderLabel,
    },
    stats: {
      totalStudents: 0,
      submitted: 0,
      graded: 0,
      averageScore: 0,
    },
    submissions: [],
  };
}

export async function getLecturerStudentProgress(courseId: string, studentId: string): Promise<LecturerStudentProgressData | null> {
  const courseData = await getLecturerManageCourse(courseId);
  const enrollmentData = await getLecturerEnrollment(courseId);
  if (!courseData || !enrollmentData) return null;
  
  const student = enrollmentData.students.find(s => s.id === studentId);
  if (!student) return null;

  return {
    student: {
      name: student.name,
      email: student.email,
      dateJoined: student.dateJoined,
    },
    course: courseData.course,
    termLabel: courseData.termLabel,
    summary: {
      materialProgressPercentage: 0,
      completedMaterials: 0,
      totalMaterials: 0,
      gradedAssignments: 0,
      totalAssignments: 0,
      averageAssignmentScore: null,
    },
    materials: [],
    assignments: [],
  };
}

function formatEnrollmentDate(dateValue?: string) {
  if (!dateValue) {
    return '-';
  }

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

let _enrolledCourseIdsPromise: Promise<string[]> | null = null;
let _enrolledCourseIdsFetchedAt: number | null = null;
const ENROLLED_IDS_TTL_MS = 55 * 60 * 1000;

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
      _enrolledCourseIdsPromise = null;
      _enrolledCourseIdsFetchedAt = null;
      return [];
    }
  })();

  return _enrolledCourseIdsPromise;
}
