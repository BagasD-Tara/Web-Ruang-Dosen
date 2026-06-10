import {
  getLecturerManageCourseById,
  type LecturerCourseModule,
  type LecturerModuleAssessment,
  type LecturerModuleMaterial,
} from './lecturerCourseManagement';
import { getLecturerEnrollmentData, type LecturerEnrollmentStudent } from './lecturerEnrollment';
import type { LecturerCourse } from './lecturerCourses';

export type ProgressItemStatus = 'Completed' | 'In Progress' | 'Not Started';
export type GradingStatus = 'Graded' | 'Submitted' | 'Missing' | 'Draft';

export interface StudentMaterialProgress {
  id: string;
  moduleLabel: string;
  title: string;
  type: string;
  status: ProgressItemStatus;
  completedAt?: string;
}

export interface StudentAssignmentProgress {
  id: string;
  moduleLabel: string;
  title: string;
  status: GradingStatus;
  submittedAt?: string;
  score?: number;
  maxScore: number;
}

export interface LecturerStudentProgressData {
  course: LecturerCourse;
  termLabel: string;
  student: LecturerEnrollmentStudent;
  summary: {
    materialProgressPercentage: number;
    completedMaterials: number;
    totalMaterials: number;
    gradedAssignments: number;
    totalAssignments: number;
    averageAssignmentScore: number | null;
  };
  materials: StudentMaterialProgress[];
  assignments: StudentAssignmentProgress[];
  quizzes: [];
  labs: [];
}

const MAX_ASSIGNMENT_SCORE = 100;

export function getLecturerStudentProgressData(
  courseId: string,
  studentId: string
): LecturerStudentProgressData | null {
  const courseData = getLecturerManageCourseById(courseId);
  const enrollmentData = getLecturerEnrollmentData(courseId);

  if (!courseData || !enrollmentData) {
    return null;
  }

  return buildStudentProgressData(courseData, enrollmentData, studentId);
}

export function buildStudentProgressData(courseData: any, enrollmentData: any, studentId: string): LecturerStudentProgressData | null {
  const student = enrollmentData?.students.find((currentStudent: any) => currentStudent.id === studentId);

  if (!courseData || !student) {
    return null;
  }

  const materials = createMaterialProgress(courseData.modules, student.progressPercentage);
  const assignments = createAssignmentProgress(courseData.modules, student);
  const gradedAssignments = assignments.filter((assignment) => assignment.status === 'Graded');
  const averageAssignmentScore = calculateAverageAssignmentScore(gradedAssignments);

  return {
    course: courseData.course,
    termLabel: courseData.termLabel,
    student,
    summary: {
      materialProgressPercentage: student.progressPercentage,
      completedMaterials: materials.filter((material) => material.status === 'Completed').length,
      totalMaterials: materials.length,
      gradedAssignments: gradedAssignments.length,
      totalAssignments: assignments.length,
      averageAssignmentScore,
    },
    materials,
    assignments,
    quizzes: [],
    labs: [],
  };
}

function createMaterialProgress(
  modules: LecturerCourseModule[],
  progressPercentage: number
): StudentMaterialProgress[] {
  const materials = modules.flatMap((module) =>
    module.materials.map((material) => mapMaterialProgress(module, material))
  );
  const completedCount = Math.floor((materials.length * progressPercentage) / 100);

  return materials.map((material, materialIndex) => {
    if (materialIndex < completedCount) {
      return {
        ...material,
        status: 'Completed',
        completedAt: `2026-10-${String(10 + materialIndex).padStart(2, '0')}`,
      };
    }

    if (materialIndex === completedCount && progressPercentage > 0) {
      return { ...material, status: 'In Progress' };
    }

    return material;
  });
}

function mapMaterialProgress(
  module: LecturerCourseModule,
  material: LecturerModuleMaterial
): StudentMaterialProgress {
  return {
    id: material.id,
    moduleLabel: module.orderLabel,
    title: material.title,
    type: material.kind,
    status: 'Not Started',
  };
}

function createAssignmentProgress(
  modules: LecturerCourseModule[],
  student: LecturerEnrollmentStudent
): StudentAssignmentProgress[] {
  const assignments = modules.flatMap((module) =>
    module.assessments
      .filter((assessment) => assessment.kind === 'assignment' && assessment.status !== 'Draft')
      .map((assignment) => mapAssignmentProgress(module, assignment, student))
  );

  return assignments;
}

function mapAssignmentProgress(
  module: LecturerCourseModule,
  assignment: LecturerModuleAssessment,
  student: LecturerEnrollmentStudent
): StudentAssignmentProgress {
  const numericSeed = createNumericSeed(student.id, assignment.id);
  const isLowProgressStudent = student.progressPercentage < 50;

  if (assignment.status === 'Draft') {
    return createAssignmentProgressItem(module, assignment, 'Draft');
  }

  if (isLowProgressStudent && numericSeed % 2 === 0) {
    return createAssignmentProgressItem(module, assignment, 'Missing');
  }

  if (numericSeed % 3 === 0) {
    return createAssignmentProgressItem(module, assignment, 'Submitted', `2026-10-${18 + (numericSeed % 5)}`);
  }

  return createAssignmentProgressItem(
    module,
    assignment,
    'Graded',
    `2026-10-${16 + (numericSeed % 6)}`,
    Math.min(98, 72 + (numericSeed % 24))
  );
}

function createAssignmentProgressItem(
  module: LecturerCourseModule,
  assignment: LecturerModuleAssessment,
  status: GradingStatus,
  submittedAt?: string,
  score?: number
): StudentAssignmentProgress {
  return {
    id: assignment.id,
    moduleLabel: module.orderLabel,
    title: assignment.title,
    status,
    submittedAt,
    score,
    maxScore: MAX_ASSIGNMENT_SCORE,
  };
}

function calculateAverageAssignmentScore(assignments: StudentAssignmentProgress[]) {
  if (assignments.length === 0) {
    return null;
  }

  const scoreTotal = assignments.reduce((totalScore, assignment) => totalScore + (assignment.score ?? 0), 0);
  return Math.round(scoreTotal / assignments.length);
}

function createNumericSeed(...values: string[]) {
  return values
    .join('-')
    .split('')
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
}
