import {
  getLecturerCourseById,
  type LecturerCourse,
} from './lecturerCourses';

export type LecturerModuleStatus = 'Published' | 'Draft' | 'Locked';
export type LecturerMaterialKind = 'document' | 'video' | 'link';
export type LecturerMaterialVisibility = 'Published' | 'Draft';
export type LecturerAssessmentKind = 'quiz' | 'assignment';
export type LecturerAssignmentStatus = 'Active' | 'Draft' | 'Scheduled';
export type LecturerBadgeTone = 'neutral' | 'brand';

export interface LecturerModuleMaterial {
  id: string;
  title: string;
  kind: LecturerMaterialKind;
  meta: string;
  description?: string;
  visibilityStatus?: LecturerMaterialVisibility;
  fileName?: string;
  fileMeta?: string;
  externalUrl?: string;
}

export interface LecturerModuleAssessment {
  id: string;
  title: string;
  kind: LecturerAssessmentKind;
  meta: string;
  description?: string;
  status?: LecturerAssignmentStatus;
  assignedDate?: string;
  deadline?: string;
  submissionRequirement?: string;
  templateName?: string;
  templateMeta?: string;
  submittedCount?: number;
  studentCount?: number;
  badgeLabel?: string;
  badgeTone?: LecturerBadgeTone;
}

export interface LecturerCourseModule {
  id: string;
  orderLabel: string;
  title: string;
  weekLabel: string;
  status: LecturerModuleStatus;
  description?: string;
  durationWeeks?: number;
  accessControl?: 'Enrolled Students Only' | 'All Course Members';
  materials: LecturerModuleMaterial[];
  assessments: LecturerModuleAssessment[];
  defaultExpanded?: boolean;
}

export interface LecturerManageCourseData {
  course: LecturerCourse;
  termLabel: string;
  credits: number;
  enrolledStudents: number;
  weeklyGrowth: number;
  modules: LecturerCourseModule[];
}

type LecturerManageCourseDetail = Omit<LecturerManageCourseData, 'course'>;

declare global {
  var __MANAGE_COURSE_OVERRIDES: Record<string, LecturerManageCourseDetail> | undefined;
}

function saveMockData() {
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const file = path.join(process.cwd(), 'mock_persisted_data.json');
      const courses = globalThis.__LECTURER_COURSES || [];
      const data = {
        courses,
        overrides: globalThis.__MANAGE_COURSE_OVERRIDES,
      };
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save mock data:', err);
    }
  }
}

function loadMockData() {
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const file = path.join(process.cwd(), 'mock_persisted_data.json');
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        if (parsed.overrides) {
          globalThis.__MANAGE_COURSE_OVERRIDES = parsed.overrides;
        }
      }
    } catch (err) {
      console.error('Failed to load mock data:', err);
    }
  }
}

if (typeof window === 'undefined') {
  loadMockData();
}

if (!globalThis.__MANAGE_COURSE_OVERRIDES) {
  globalThis.__MANAGE_COURSE_OVERRIDES = {
    'aml-501': {
    termLabel: 'Fall Semester 2026',
    credits: 3,
    enrolledStudents: 48,
    weeklyGrowth: 3,
    modules: [
      {
        id: 'aml-m1',
        orderLabel: 'M1',
        title: 'Introduction to Neural Networks',
        weekLabel: 'Week 1-2',
        status: 'Published',
        description:
          'By the end of this module, students will be able to explain neuron structure, activation flow, and the role of loss functions in supervised learning.',
        durationWeeks: 2,
        accessControl: 'Enrolled Students Only',
        defaultExpanded: true,
        materials: [
          {
            id: 'aml-m1-slides',
            title: 'Lecture Slides: Perceptrons',
            kind: 'document',
            meta: 'PDF Document',
            description: 'Core concepts of perceptrons and neural network foundations.',
            visibilityStatus: 'Published',
            fileName: 'AML_Module1_Perceptrons.pdf',
            fileMeta: '4.2 MB - Uploaded Sep 12, 2026',
          },
          {
            id: 'aml-m1-video',
            title: 'Video: Activation Functions Explained',
            kind: 'video',
            meta: '18 min video',
            description: 'A focused walkthrough of activation functions and why they matter in neural network training.',
            visibilityStatus: 'Published',
            fileName: 'activation-functions-overview.mp4',
            fileMeta: '184 MB - Uploaded Sep 14, 2026',
          },
          {
            id: 'aml-m1-link',
            title: 'Reading: Backpropagation Notes',
            kind: 'link',
            meta: 'External Link',
            description: 'Supplementary reading for backpropagation notation and chain rule intuition.',
            visibilityStatus: 'Draft',
            externalUrl: 'https://example.com/backpropagation-notes',
          },
        ],
        assessments: [
          {
            id: 'aml-m1-quiz',
            title: 'Quiz 1: Fundamentals',
            kind: 'quiz',
            meta: 'Due Oct 15, 23:59 - 10 Questions',
            badgeLabel: 'Auto-graded',
            badgeTone: 'neutral',
          },
          {
            id: 'aml-m1-assignment',
            title: 'Assignment 1: Build a Simple Perceptron',
            kind: 'assignment',
            meta: 'Due Oct 20, 23:59 - 15% of Final Grade',
            description:
              'Build a simple single-layer perceptron from scratch and submit both source code and a short implementation report.',
            status: 'Active',
            assignedDate: '2026-10-10T09:00',
            deadline: '2026-10-20T23:59',
            submissionRequirement: 'File Upload (PDF, DOCX, ZIP)',
            templateName: 'perceptron_assignment_template.docx',
            templateMeta: '48 KB',
            submittedCount: 24,
            studentCount: 48,
            badgeLabel: '24 Submissions',
            badgeTone: 'brand',
          },
        ],
      },
      {
        id: 'aml-m2',
        orderLabel: 'M2',
        title: 'Deep Learning Architectures',
        weekLabel: 'Week 3-4',
        status: 'Draft',
        description:
          'Students will compare feed-forward, convolutional, and deeper architectures to understand where each model family is applied.',
        durationWeeks: 2,
        accessControl: 'Enrolled Students Only',
        materials: [],
        assessments: [
          {
            id: 'aml-m2-assignment',
            title: 'Assignment 2: Compare Neural Architectures',
            kind: 'assignment',
            meta: 'Scheduled for Nov 03 - 20% of Final Grade',
            description:
              'Compare feed-forward and convolutional architectures using a short technical report and experiment summary.',
            status: 'Draft',
            assignedDate: '2026-10-28T09:00',
            deadline: '2026-11-03T23:59',
            submissionRequirement: 'File Upload (PDF, DOCX, ZIP)',
            templateName: 'architecture_comparison_template.docx',
            templateMeta: '52 KB',
            submittedCount: 0,
            studentCount: 48,
            badgeLabel: 'Draft',
            badgeTone: 'neutral',
          },
        ],
      },
      {
        id: 'aml-m3',
        orderLabel: 'M3',
        title: 'Convolutional Neural Networks (CNNs)',
        weekLabel: 'Week 5-6',
        status: 'Locked',
        description:
          'This module is prepared for image-based learning tasks and will be opened after foundational concepts are completed.',
        durationWeeks: 2,
        accessControl: 'Enrolled Students Only',
        materials: [],
        assessments: [],
      },
    ],
  },
};
}

export const MANAGE_COURSE_OVERRIDES = globalThis.__MANAGE_COURSE_OVERRIDES!;

export function getLecturerManageCourseById(courseId: string) {
  const course = getLecturerCourseById(courseId);

  if (!course) {
    return null;
  }

  const detail = MANAGE_COURSE_OVERRIDES[courseId] ?? buildDefaultManageCourseDetail(course);

  return {
    course,
    ...detail,
  };
}

function buildDefaultManageCourseDetail(course: LecturerCourse): LecturerManageCourseDetail {
  const titleSeed = createCourseTitleSeed(course.title);

  return {
    termLabel: course.status === 'Active' ? 'Fall Semester 2026' : 'Spring Semester 2027',
    credits: 3,
    enrolledStudents: course.studentCount,
    weeklyGrowth: course.status === 'Active' ? Math.max(1, Math.round(course.studentCount / 24)) : 0,
    modules: [
      {
        id: `${course.id}-m1`,
        orderLabel: 'M1',
        title: `${titleSeed} Foundations`,
        weekLabel: 'Week 1-2',
        status: course.status === 'Active' ? 'Published' : 'Draft',
        description:
          'Introduce the key terminology, course workflow, and conceptual foundation that students need before moving into applied work.',
        durationWeeks: 2,
        accessControl: 'Enrolled Students Only',
        defaultExpanded: true,
        materials: [
          {
            id: `${course.id}-m1-outline`,
            title: 'Course Outline and Teaching Notes',
            kind: 'document',
            meta: 'PDF Document',
            description: 'Instructor notes and a course outline for the opening module.',
            visibilityStatus: 'Published',
            fileName: `${course.id}-course-outline.pdf`,
            fileMeta: '2.8 MB - Uploaded Sep 10, 2026',
          },
          {
            id: `${course.id}-m1-video`,
            title: 'Instructor Walkthrough Video',
            kind: 'video',
            meta: '14 min video',
            description: 'A short video walkthrough introducing the course workflow and first module activities.',
            visibilityStatus: 'Draft',
            fileName: `${course.id}-walkthrough.mp4`,
            fileMeta: '126 MB - Uploaded Sep 11, 2026',
          },
        ],
        assessments: [
          {
            id: `${course.id}-m1-quiz`,
            title: 'Orientation Quiz',
            kind: 'quiz',
            meta: 'Due during Week 2 - 8 Questions',
            badgeLabel: 'Auto-graded',
            badgeTone: 'neutral',
          },
          {
            id: `${course.id}-m1-assignment`,
            title: 'Starter Assignment',
            kind: 'assignment',
            meta: 'Submission window opens after publishing',
            description:
              'Complete the starter activity and submit the required files according to the course instructions.',
            status: course.status === 'Active' ? 'Active' : 'Draft',
            assignedDate: '2026-09-12T09:00',
            deadline: '2026-09-20T23:59',
            submissionRequirement: 'File Upload (PDF, DOCX, ZIP)',
            templateName: `${course.id}-starter-template.docx`,
            templateMeta: '45 KB',
            submittedCount: Math.max(8, Math.round(course.studentCount * 0.45)),
            studentCount: course.studentCount,
            badgeLabel: `${Math.max(8, Math.round(course.studentCount * 0.45))} Submissions`,
            badgeTone: 'brand',
          },
        ],
      },
      {
        id: `${course.id}-m2`,
        orderLabel: 'M2',
        title: `Applied ${titleSeed}`,
        weekLabel: 'Week 3-5',
        status: 'Draft',
        description:
          'Extend the foundational concepts into guided implementation, case studies, and short assessment checkpoints.',
        durationWeeks: 3,
        accessControl: 'Enrolled Students Only',
        materials: [],
        assessments: [
          {
            id: `${course.id}-m2-assignment`,
            title: `Applied ${titleSeed} Assignment`,
            kind: 'assignment',
            meta: 'Scheduled for Week 4 - 20% of Final Grade',
            description:
              'Submit a practical exercise that demonstrates applied understanding from the second module.',
            status: 'Draft',
            assignedDate: '2026-09-26T09:00',
            deadline: '2026-10-04T23:59',
            submissionRequirement: 'File Upload (PDF, DOCX, ZIP)',
            templateName: `${course.id}-applied-template.docx`,
            templateMeta: '50 KB',
            submittedCount: 0,
            studentCount: course.studentCount,
            badgeLabel: 'Draft',
            badgeTone: 'neutral',
          },
        ],
      },
      {
        id: `${course.id}-m3`,
        orderLabel: 'M3',
        title: 'Evaluation and Final Delivery',
        weekLabel: 'Week 6-8',
        status: 'Locked',
        description:
          'Reserve the final module for synthesis, evaluation criteria, and final delivery once earlier work is completed.',
        durationWeeks: 3,
        accessControl: 'Enrolled Students Only',
        materials: [],
        assessments: [],
      },
    ],
  };
}

function createCourseTitleSeed(title: string) {
  return title
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getLecturerModuleById(courseId: string, moduleId: string) {
  const courseData = getLecturerManageCourseById(courseId);

  if (!courseData) {
    return null;
  }

  const selectedModule = courseData.modules.find(
    (courseModule) => courseModule.id === moduleId
  );

  if (!selectedModule) {
    return null;
  }

  return {
    course: courseData.course,
    termLabel: courseData.termLabel,
    module: selectedModule,
    moduleCount: courseData.modules.length,
  };
}

export function getLecturerMaterialById(
  courseId: string,
  moduleId: string,
  materialId: string
) {
  const moduleData = getLecturerModuleById(courseId, moduleId);

  if (!moduleData) {
    return null;
  }

  const selectedMaterial = moduleData.module.materials.find(
    (material) => material.id === materialId
  );

  if (!selectedMaterial) {
    return null;
  }

  return {
    ...moduleData,
    material: selectedMaterial,
  };
}

export function getLecturerAssignmentById(
  courseId: string,
  moduleId: string,
  assignmentId: string
) {
  const moduleData = getLecturerModuleById(courseId, moduleId);

  if (!moduleData) {
    return null;
  }

  const selectedAssignment = moduleData.module.assessments.find(
    (assessment) => assessment.id === assignmentId && assessment.kind === 'assignment'
  );

  if (!selectedAssignment) {
    return null;
  }

  return {
    ...moduleData,
    assignment: selectedAssignment,
  };
}

export function getLecturerAssignmentsByCourseId(courseId: string) {
  const courseData = getLecturerManageCourseById(courseId);

  if (!courseData) {
    return null;
  }

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

export function createLecturerModule(
  courseId: string,
  moduleData: {
    title: string;
    description: string;
    sequence: string;
    durationWeeks: string;
    visibilityStatus: 'Published' | 'Draft';
  }
) {
  let courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) {
    const course = getLecturerCourseById(courseId);
    if (course) {
      courseDetail = buildDefaultManageCourseDetail(course);
    } else {
      courseDetail = {
        termLabel: 'Current Semester',
        credits: 3,
        enrolledStudents: 0,
        weeklyGrowth: 0,
        modules: [],
      };
    }
    MANAGE_COURSE_OVERRIDES[courseId] = courseDetail;
  }

  // Parse order sequence, e.g. "Module 4 (End of current list)" -> "M4"
  const match = moduleData.sequence.match(/Module\s+(\d+)/);
  const orderLabel = match ? `M${match[1]}` : `M${courseDetail.modules.length + 1}`;

  const newModule: LecturerCourseModule = {
    id: `${courseId}-m${Date.now()}`,
    orderLabel,
    title: moduleData.title,
    weekLabel: `Duration: ${moduleData.durationWeeks} Weeks`,
    status: moduleData.visibilityStatus,
    description: moduleData.description,
    durationWeeks: Number(moduleData.durationWeeks) || 1,
    accessControl: 'Enrolled Students Only',
    materials: [],
    assessments: [],
    defaultExpanded: true,
  };

  courseDetail.modules.push(newModule);
  saveMockData();
  return newModule;
}

export function updateLecturerModule(
  courseId: string,
  moduleId: string,
  moduleData: {
    title: string;
    description: string;
    sequence: string;
    durationWeeks: string;
    visibilityStatus: 'Published' | 'Draft';
  }
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return null;

  const moduleIndex = courseDetail.modules.findIndex((m) => m.id === moduleId);
  if (moduleIndex === -1) return null;

  const match = moduleData.sequence.match(/Module\s+(\d+)/);
  const orderLabel = match ? `M${match[1]}` : courseDetail.modules[moduleIndex].orderLabel;

  courseDetail.modules[moduleIndex] = {
    ...courseDetail.modules[moduleIndex],
    orderLabel,
    title: moduleData.title,
    weekLabel: `Duration: ${moduleData.durationWeeks} Weeks`,
    status: moduleData.visibilityStatus,
    description: moduleData.description,
    durationWeeks: Number(moduleData.durationWeeks) || 1,
  };

  saveMockData();
  return courseDetail.modules[moduleIndex];
}

export function deleteLecturerModule(courseId: string, moduleId: string) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return false;

  const initialLength = courseDetail.modules.length;
  courseDetail.modules = courseDetail.modules.filter((m) => m.id !== moduleId);
  
  saveMockData();
  return courseDetail.modules.length < initialLength;
}

export function createLecturerMaterial(
  courseId: string,
  moduleId: string,
  materialData: {
    title: string;
    description: string;
    materialKind: LecturerMaterialKind;
    visibilityStatus: LecturerMaterialVisibility;
    externalUrl: string;
    fileName?: string;
    fileMeta?: string;
  }
) {
  let courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) {
    const course = getLecturerCourseById(courseId);
    if (course) {
      courseDetail = buildDefaultManageCourseDetail(course);
    } else {
      courseDetail = {
        termLabel: 'Current Semester',
        credits: 3,
        enrolledStudents: 0,
        weeklyGrowth: 0,
        modules: [],
      };
    }
    MANAGE_COURSE_OVERRIDES[courseId] = courseDetail;
  }

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return null;

  const newMaterial: LecturerModuleMaterial = {
    id: `${moduleId}-mat-${Date.now()}`,
    title: materialData.title,
    kind: materialData.materialKind,
    meta: materialData.materialKind === 'video' ? 'Video' : materialData.materialKind === 'document' ? 'PDF Document' : 'External Link',
    description: materialData.description,
    visibilityStatus: materialData.visibilityStatus,
    fileName: materialData.fileName,
    fileMeta: materialData.fileMeta,
    externalUrl: materialData.externalUrl,
  };

  targetModule.materials.push(newMaterial);
  saveMockData();
  return newMaterial;
}

export function updateLecturerMaterial(
  courseId: string,
  moduleId: string,
  materialId: string,
  materialData: {
    title: string;
    description: string;
    materialKind: LecturerMaterialKind;
    visibilityStatus: LecturerMaterialVisibility;
    externalUrl: string;
    fileName?: string;
    fileMeta?: string;
  }
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return null;

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return null;

  const matIndex = targetModule.materials.findIndex((m) => m.id === materialId);
  if (matIndex === -1) return null;

  targetModule.materials[matIndex] = {
    ...targetModule.materials[matIndex],
    title: materialData.title,
    kind: materialData.materialKind,
    meta: materialData.materialKind === 'video' ? 'Video' : materialData.materialKind === 'document' ? 'PDF Document' : 'External Link',
    description: materialData.description,
    visibilityStatus: materialData.visibilityStatus,
    fileName: materialData.fileName ?? targetModule.materials[matIndex].fileName,
    fileMeta: materialData.fileMeta ?? targetModule.materials[matIndex].fileMeta,
    externalUrl: materialData.externalUrl,
  };

  saveMockData();
  return targetModule.materials[matIndex];
}

export function deleteLecturerMaterial(
  courseId: string,
  moduleId: string,
  materialId: string
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return false;

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return false;

  const initialLength = targetModule.materials.length;
  targetModule.materials = targetModule.materials.filter((m) => m.id !== materialId);

  saveMockData();
  return targetModule.materials.length < initialLength;
}

export function createLecturerAssignment(
  courseId: string,
  moduleId: string,
  assignmentData: {
    title: string;
    description: string;
    assignedDate: string;
    deadline: string;
    submissionRequirement: string;
    status: LecturerAssignmentStatus;
    templateName?: string;
    templateMeta?: string;
  }
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return null;

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return null;

  const newAssignment: LecturerModuleAssessment = {
    id: `${moduleId}-asgn-${Date.now()}`,
    title: assignmentData.title,
    kind: 'assignment',
    meta: `Due ${new Date(assignmentData.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    description: assignmentData.description,
    status: assignmentData.status,
    assignedDate: assignmentData.assignedDate,
    deadline: assignmentData.deadline,
    submissionRequirement: assignmentData.submissionRequirement,
    templateName: assignmentData.templateName,
    templateMeta: assignmentData.templateMeta,
    submittedCount: 0,
    studentCount: courseDetail.enrolledStudents,
    badgeLabel: assignmentData.status === 'Active' ? '0 Submissions' : assignmentData.status,
    badgeTone: assignmentData.status === 'Active' ? 'brand' : 'neutral',
  };

  targetModule.assessments.push(newAssignment);
  saveMockData();
  return newAssignment;
}

export function updateLecturerAssignment(
  courseId: string,
  moduleId: string,
  assignmentId: string,
  assignmentData: {
    title: string;
    description: string;
    assignedDate: string;
    deadline: string;
    submissionRequirement: string;
    status: LecturerAssignmentStatus;
    templateName?: string;
    templateMeta?: string;
  }
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return null;

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return null;

  const asgIndex = targetModule.assessments.findIndex(
    (a) => a.id === assignmentId && a.kind === 'assignment'
  );
  if (asgIndex === -1) return null;

  targetModule.assessments[asgIndex] = {
    ...targetModule.assessments[asgIndex],
    title: assignmentData.title,
    meta: `Due ${new Date(assignmentData.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    description: assignmentData.description,
    status: assignmentData.status,
    assignedDate: assignmentData.assignedDate,
    deadline: assignmentData.deadline,
    submissionRequirement: assignmentData.submissionRequirement,
    templateName: assignmentData.templateName ?? targetModule.assessments[asgIndex].templateName,
    templateMeta: assignmentData.templateMeta ?? targetModule.assessments[asgIndex].templateMeta,
    badgeLabel: assignmentData.status === 'Active'
      ? `${targetModule.assessments[asgIndex].submittedCount ?? 0} Submissions`
      : assignmentData.status,
    badgeTone: assignmentData.status === 'Active' ? 'brand' : 'neutral',
  };

  saveMockData();
  return targetModule.assessments[asgIndex];
}

export function deleteLecturerAssignment(
  courseId: string,
  moduleId: string,
  assignmentId: string
) {
  // If no override exists for this course, initialize one from the base data
  if (!MANAGE_COURSE_OVERRIDES[courseId]) {
    const baseData = getLecturerManageCourseById(courseId);
    if (baseData) {
      const { course: _course, ...rest } = baseData;
      MANAGE_COURSE_OVERRIDES[courseId] = rest;
    }
  }

  const courseDetail = MANAGE_COURSE_OVERRIDES[courseId];
  if (!courseDetail) return false;

  const targetModule = courseDetail.modules.find((m) => m.id === moduleId);
  if (!targetModule) return false;

  const initialLength = targetModule.assessments.length;
  targetModule.assessments = targetModule.assessments.filter(
    (a) => !(a.id === assignmentId && a.kind === 'assignment')
  );

  saveMockData();
  return targetModule.assessments.length < initialLength;
}
