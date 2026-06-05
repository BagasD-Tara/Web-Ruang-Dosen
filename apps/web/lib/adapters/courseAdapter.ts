import type {
  ApiAssignment,
  ApiCourseDetail,
  ApiCourseListItem,
  ApiLab,
  ApiMaterial,
  ApiQuiz,
} from '@/lib/api/courseApi';
import type {
  Course,
  CourseContentItem,
  CourseContentType,
  CourseDetail,
  CourseModule,
} from '@/lib/mock/courses';
import type { LecturerCourse } from '@/lib/mock/lecturerCourses';
import type {
  LecturerCourseModule,
  LecturerManageCourseData,
  LecturerModuleAssessment,
  LecturerModuleMaterial,
} from '@/lib/mock/lecturerCourseManagement';

const DEFAULT_COURSE_CATEGORY = 'Computer Science';
const DEFAULT_COURSE_LEVEL = 'Intermediate';
const DEFAULT_CREDIT_HOURS = 3;
const DEFAULT_DURATION_WEEKS = 12;
const DEFAULT_SEMESTER = '2026';
const DEFAULT_BANNER_CLASS = 'bg-gradient-to-br from-[#0A3A9C] via-[#0A4AB8] to-[#0A2E7A]';
const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80';

export function mapApiCoursesToStudentCourses(courses: ApiCourseListItem[]): Course[] {
  return courses.map(mapApiCourseToStudentCourse);
}

export function mapApiCourseToStudentCourse(course: ApiCourseListItem): Course {
  const instructorName = course.instructor?.name ?? 'Course Instructor';

  return {
    id: course.id,
    code: createCourseCode(course.title),
    semester: DEFAULT_SEMESTER,
    level: DEFAULT_COURSE_LEVEL,
    category: DEFAULT_COURSE_CATEGORY,
    title: course.title,
    bannerColorClass: DEFAULT_BANNER_CLASS,
    bannerEmoji: createCourseInitials(course.title),
    description: course.description ?? 'Course description is being prepared by the lecturer.',
    instructorName,
    instructorInitials: createPersonInitials(instructorName),
    instructorRole: 'Course Instructor',
    creditHours: DEFAULT_CREDIT_HOURS,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 0,
    totalQuizzes: 0,
    isNew: false,
    durationWeeks: DEFAULT_DURATION_WEEKS,
  };
}

export function mapApiCourseDetailToStudentCourseDetail(course: ApiCourseDetail): CourseDetail {
  const baseCourse = mapApiCourseToStudentCourse(course);
  const materials = mapMaterialsToContentItems(course.materials);
  const assignments = mapAssignmentsToContentItems(course.assignments);
  const quizzes = mapQuizzesToContentItems(course.quizzes);
  const labs = mapLabsToContentItems(course.labs);

  return {
    ...baseCourse,
    subtitle: '',
    breadcrumbLabel: course.title,
    heroAccentLabel: 'COURSE MODULE',
    totalMaterials: materials.length,
    totalQuizzes: quizzes.length,
    tabs: {
      materials: createSingleModule('Module 1: Learning Materials', materials),
      quizzes: createSingleModule('Quizzes', quizzes),
      assignments: createSingleModule('Assignments', assignments),
      labs: createSingleModule('Labs', labs),
    },
    schedule: [],
  };
}

export function mapApiCoursesToLecturerCourses(courses: ApiCourseListItem[]): LecturerCourse[] {
  return courses.map((course) => ({
    id: course.id,
    code: createCourseCode(course.title),
    title: course.title,
    department: DEFAULT_COURSE_CATEGORY,
    studentCount: course._count?.enrollments ?? 0,
    moduleCount: 1,
    assignmentCount: 0,
    status: 'Active',
    imageUrl: DEFAULT_IMAGE_URL,
  }));
}

export function mapApiCourseDetailToLecturerManageCourse(course: ApiCourseDetail): LecturerManageCourseData {
  const lecturerCourse = mapApiCoursesToLecturerCourses([course])[0];
  const materials = mapApiMaterialsToLecturerMaterials(course.materials);
  const assessments = mapApiAssignmentsToLecturerAssessments(course.assignments);

  return {
    course: {
      ...lecturerCourse,
      moduleCount: materials.length + assessments.length > 0 ? 1 : 0,
      assignmentCount: assessments.length,
    },
    termLabel: 'Current Semester',
    credits: DEFAULT_CREDIT_HOURS,
    enrolledStudents: course._count?.enrollments ?? 0,
    weeklyGrowth: 0,
    modules: createLecturerModules(materials, assessments),
  };
}

function mapMaterialsToContentItems(materials: ApiMaterial[]): CourseContentItem[] {
  return materials.map((material) => ({
    id: material.id,
    title: material.title,
    type: mapMaterialType(material.type),
    meta: createMaterialMeta(material),
    summary: material.content ?? material.url ?? undefined,
    content: {
      markdown: material.type === 'TEXT' ? material.content ?? '' : undefined,
      videoUrl: material.type === 'VIDEO' ? material.url ?? undefined : undefined,
      downloadUrl: material.type === 'DOCUMENT' ? material.url ?? undefined : undefined,
      downloadLabel: material.type === 'DOCUMENT' ? material.title : undefined,
      previewText: material.content ?? undefined,
    },
  }));
}

function mapApiMaterialsToLecturerMaterials(materials: ApiMaterial[]): LecturerModuleMaterial[] {
  return materials.map((material) => ({
    id: material.id,
    title: material.title,
    kind: material.type === 'VIDEO' ? 'video' : material.type === 'DOCUMENT' ? 'document' : 'link',
    meta: createMaterialMeta(material),
    description: material.content ?? undefined,
    visibilityStatus: 'Published',
    fileName: material.url ?? undefined,
    externalUrl: material.type === 'TEXT' ? undefined : material.url ?? undefined,
  }));
}

function mapApiAssignmentsToLecturerAssessments(
  assignments: ApiAssignment[]
): LecturerModuleAssessment[] {
  return assignments.map((assignment) => ({
    id: assignment.id,
    title: assignment.title,
    kind: 'assignment',
    meta: `Due ${formatDate(assignment.deadline)}`,
    description: assignment.description,
    status: 'Active',
    deadline: assignment.deadline,
    submissionRequirement: 'File Upload',
    submittedCount: 0,
    studentCount: 0,
    badgeLabel: '0 Submissions',
    badgeTone: 'brand',
  }));
}

function createLecturerModules(
  materials: LecturerModuleMaterial[],
  assessments: LecturerModuleAssessment[]
): LecturerCourseModule[] {
  if (materials.length === 0 && assessments.length === 0) {
    return [];
  }

  return [
    {
      id: 'api-module-1',
      orderLabel: 'M1',
      title: 'Course Content',
      weekLabel: 'Current Module',
      status: 'Published',
      durationWeeks: DEFAULT_DURATION_WEEKS,
      materials,
      assessments,
      defaultExpanded: true,
    },
  ];
}

function mapAssignmentsToContentItems(assignments: ApiAssignment[]): CourseContentItem[] {
  return assignments.map((assignment) => ({
    id: assignment.id,
    title: assignment.title,
    type: 'assignment',
    meta: `Due ${formatDate(assignment.deadline)}`,
    summary: assignment.description,
  }));
}

function mapQuizzesToContentItems(quizzes: ApiQuiz[]): CourseContentItem[] {
  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    type: 'quiz',
    meta: `${quiz.timeLimit ?? 30} mins`,
  }));
}

function mapLabsToContentItems(labs: ApiLab[]): CourseContentItem[] {
  return labs.map((lab) => ({
    id: lab.id,
    title: lab.title,
    type: 'lab',
    meta: 'Practical Lab',
    summary: lab.instructions,
  }));
}

function createSingleModule(title: string, items: CourseContentItem[]): CourseModule[] {
  if (items.length === 0) {
    return [];
  }

  return [{ id: 'api-module-1', title, items }];
}

function mapMaterialType(type: ApiMaterial['type']): CourseContentType {
  if (type === 'VIDEO') {
    return 'video';
  }

  if (type === 'DOCUMENT') {
    return 'document';
  }

  return 'article';
}

function createMaterialMeta(material: ApiMaterial) {
  if (material.type === 'VIDEO') {
    return 'Video';
  }

  if (material.type === 'DOCUMENT') {
    return 'Downloadable Document';
  }

  return 'Reading Material';
}

function createCourseCode(title: string) {
  const prefix = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

  return `${prefix || 'RD'}-API`;
}

function createCourseInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

function createPersonInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));
}
