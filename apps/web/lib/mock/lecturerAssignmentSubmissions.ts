import {
  getLecturerAssignmentById,
  type LecturerCourseModule,
  type LecturerModuleAssessment,
} from './lecturerCourseManagement';
import type { LecturerCourse } from './lecturerCourses';

export type AssignmentSubmissionStatus = 'Needs Grading' | 'Graded' | 'Returned';

export interface LecturerAssignmentSubmission {
  id: string;
  studentName: string;
  studentEmail: string;
  submittedAt: string;
  fileName: string;
  fileMeta: string;
  status: AssignmentSubmissionStatus;
  score?: number;
  feedback?: string;
}

export interface LecturerAssignmentSubmissionsData {
  course: LecturerCourse;
  module: LecturerCourseModule;
  assignment: LecturerModuleAssessment;
  submissions: LecturerAssignmentSubmission[];
}

const SUBMISSION_OVERRIDES: Record<string, LecturerAssignmentSubmission[]> = {
  'aml-m1-assignment': [
    {
      id: 'sub-001',
      studentName: 'Alex Johnson',
      studentEmail: 'alex.johnson@university.edu',
      submittedAt: '2026-10-19T21:15',
      fileName: 'alex_perceptron_project.zip',
      fileMeta: '4.8 MB',
      status: 'Needs Grading',
    },
    {
      id: 'sub-002',
      studentName: 'Maria Garcia',
      studentEmail: 'maria.garcia@university.edu',
      submittedAt: '2026-10-20T10:42',
      fileName: 'maria_perceptron_report.pdf',
      fileMeta: '1.9 MB',
      status: 'Graded',
      score: 92,
      feedback: 'Clear implementation and strong explanation.',
    },
    {
      id: 'sub-003',
      studentName: 'Liam Smith',
      studentEmail: 'liam.smith@university.edu',
      submittedAt: '2026-10-20T22:08',
      fileName: 'liam_assignment_1.zip',
      fileMeta: '5.2 MB',
      status: 'Needs Grading',
    },
    {
      id: 'sub-004',
      studentName: 'Nadia Putri',
      studentEmail: 'nadia.putri@university.edu',
      submittedAt: '2026-10-18T16:30',
      fileName: 'nadia_perceptron_submission.docx',
      fileMeta: '860 KB',
      status: 'Returned',
      score: 78,
      feedback: 'Resubmit the experiment output section.',
    },
  ],
};

export function getLecturerAssignmentSubmissions(
  courseId: string,
  moduleId: string,
  assignmentId: string
): LecturerAssignmentSubmissionsData | null {
  const assignmentData = getLecturerAssignmentById(courseId, moduleId, assignmentId);

  if (!assignmentData) {
    return null;
  }

  return buildAssignmentSubmissionsData(assignmentId, assignmentData);
}

export function buildAssignmentSubmissionsData(assignmentId: string, assignmentData: any): LecturerAssignmentSubmissionsData {
  return {
    course: assignmentData.course,
    module: assignmentData.module,
    assignment: assignmentData.assignment,
    submissions:
      SUBMISSION_OVERRIDES[assignmentId] ??
      createDefaultSubmissions(assignmentData.assignment, assignmentData.course.studentCount),
  };
}

function createDefaultSubmissions(
  assignment: LecturerModuleAssessment,
  studentCount: number
): LecturerAssignmentSubmission[] {
  const submittedCount = assignment.submittedCount ?? Math.max(1, Math.round(studentCount * 0.35));

  if (submittedCount === 0) {
    return [];
  }

  return DEFAULT_STUDENTS.slice(0, Math.min(submittedCount, DEFAULT_STUDENTS.length)).map(
    (student, studentIndex) => ({
      id: `${assignment.id}-submission-${studentIndex + 1}`,
      studentName: student.name,
      studentEmail: student.email,
      submittedAt: createSubmittedAt(studentIndex),
      fileName: `${student.slug}-${assignment.id}.zip`,
      fileMeta: `${studentIndex + 2}.${studentIndex + 1} MB`,
      status: studentIndex % 3 === 0 ? 'Graded' : 'Needs Grading',
      score: studentIndex % 3 === 0 ? 85 + studentIndex : undefined,
      feedback: studentIndex % 3 === 0 ? 'Reviewed and accepted.' : undefined,
    })
  );
}

const DEFAULT_STUDENTS = [
  { name: 'Alya Rahman', email: 'alya.rahman@university.edu', slug: 'alya-rahman' },
  { name: 'Bima Pratama', email: 'bima.pratama@university.edu', slug: 'bima-pratama' },
  { name: 'Clara Wijaya', email: 'clara.wijaya@university.edu', slug: 'clara-wijaya' },
  { name: 'Dion Saputra', email: 'dion.saputra@university.edu', slug: 'dion-saputra' },
  { name: 'Eka Lestari', email: 'eka.lestari@university.edu', slug: 'eka-lestari' },
  { name: 'Farhan Naufal', email: 'farhan.naufal@university.edu', slug: 'farhan-naufal' },
];

function createSubmittedAt(studentIndex: number) {
  const submissionDay = 18 + (studentIndex % 3);
  const submissionHour = 9 + studentIndex;

  return `2026-10-${submissionDay}T${submissionHour.toString().padStart(2, '0')}:30`;
}
