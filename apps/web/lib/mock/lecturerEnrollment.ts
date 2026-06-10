import { getLecturerManageCourseById } from './lecturerCourseManagement';

export interface LecturerEnrollmentStudent {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  progressPercentage: number;
}

export interface LecturerEnrollmentData {
  courseId: string;
  courseTitle: string;
  courseCode: string;
  termLabel: string;
  students: LecturerEnrollmentStudent[];
}

const ENROLLMENT_STUDENT_OVERRIDES: Record<string, LecturerEnrollmentStudent[]> = {
  'aml-501': [
    createStudent('aml-stu-01', 'Alex Johnson', 'alex.j@university.edu', 'Oct 12, 2023', 84),
    createStudent('aml-stu-02', 'Maria Garcia', 'm.garcia@university.edu', 'Oct 14, 2023', 91),
    createStudent('aml-stu-03', 'Liam Smith', 'lsmith@university.edu', 'Oct 15, 2023', 42),
    createStudent('aml-stu-04', 'Noah Martinez', 'n.martinez@university.edu', 'Oct 18, 2023', 58),
    createStudent('aml-stu-05', 'Sophia Brown', 'sbrown@university.edu', 'Oct 19, 2023', 76),
    createStudent('aml-stu-06', 'Emma Davis', 'emma.davis@university.edu', 'Oct 20, 2023', 88),
    createStudent('aml-stu-07', 'James Wilson', 'jwilson@university.edu', 'Oct 21, 2023', 39),
    createStudent('aml-stu-08', 'Olivia Moore', 'omoore@university.edu', 'Oct 23, 2023', 81),
    createStudent('aml-stu-09', 'Benjamin Taylor', 'btaylor@university.edu', 'Oct 24, 2023', 67),
    createStudent('aml-stu-10', 'Ava Anderson', 'ava.anderson@university.edu', 'Oct 25, 2023', 73),
    createStudent('aml-stu-11', 'Lucas Thomas', 'lucas.thomas@university.edu', 'Oct 27, 2023', 49),
    createStudent('aml-stu-12', 'Mia Jackson', 'mia.jackson@university.edu', 'Oct 28, 2023', 86),
    createStudent('aml-stu-13', 'William White', 'w.white@university.edu', 'Oct 29, 2023', 79),
    createStudent('aml-stu-14', 'Charlotte Harris', 'charlotte.harris@university.edu', 'Oct 30, 2023', 93),
    createStudent('aml-stu-15', 'Elijah Martin', 'elijah.martin@university.edu', 'Nov 01, 2023', 36),
    createStudent('aml-stu-16', 'Amelia Thompson', 'amelia.thompson@university.edu', 'Nov 02, 2023', 82),
  ],
};

export function getLecturerEnrollmentData(courseId: string) {
  const courseData = getLecturerManageCourseById(courseId);

  if (!courseData) {
    return null;
  }

  return buildEnrollmentData(courseId, courseData);
}

export function buildEnrollmentData(courseId: string, courseData: any) {
  return {
    courseId,
    courseTitle: courseData.course.title,
    courseCode: courseData.course.code,
    termLabel: courseData.termLabel,
    students:
      ENROLLMENT_STUDENT_OVERRIDES[courseId] ??
      createFallbackStudents(courseId, courseData.enrolledStudents),
  };
}

function createFallbackStudents(courseId: string, enrolledStudents: number) {
  const fallbackCount = Math.min(enrolledStudents, 50);
  const students: LecturerEnrollmentStudent[] = [];

  for (let index = 0; index < fallbackCount; index += 1) {
    const studentNumber = index + 1;
    students.push(
      createStudent(
        `${courseId}-student-${studentNumber}`,
        `Student ${studentNumber}`,
        `student${studentNumber}@university.edu`,
        `Nov ${String(3 + index).padStart(2, '0')}, 2023`,
        Math.max(28, 92 - index * 3)
      )
    );
  }

  return students;
}

function createStudent(
  id: string,
  name: string,
  email: string,
  dateJoined: string,
  progressPercentage: number
): LecturerEnrollmentStudent {
  return {
    id,
    name,
    email,
    dateJoined,
    progressPercentage,
  };
}
