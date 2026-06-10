import { apiRequest } from './httpClient';

export type ApiMaterialType = 'TEXT' | 'VIDEO' | 'DOCUMENT';

export interface ApiUserSummary {
  id?: string;
  name: string;
  email?: string;
  role?: string;
  xp?: number;
}

export interface ApiCourseListItem {
  id: string;
  title: string;
  description?: string | null;
  instructorId: string;
  instructor?: ApiUserSummary;
  createdAt: string;
  updatedAt: string;
  _count?: {
    enrollments?: number;
  };
}

export interface ApiMaterial {
  id: string;
  title: string;
  url?: string | null;
  content?: string | null;
  type: ApiMaterialType;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiAssignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiQuiz {
  id: string;
  title: string;
  passingScore?: number;
  xpReward?: number;
  timeLimit?: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLab {
  id: string;
  title: string;
  instructions: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCourseDetail extends ApiCourseListItem {
  materials: ApiMaterial[];
  assignments: ApiAssignment[];
  quizzes: ApiQuiz[];
  labs: ApiLab[];
}

export function fetchCourses() {
  return apiRequest<ApiCourseListItem[]>('/courses', {
    next: { revalidate: 30 },
  });
}

export function fetchCourseDetail(courseId: string) {
  return apiRequest<ApiCourseDetail>(`/courses/${courseId}`, {
    next: { revalidate: 30 },
  });
}

export function fetchMyCourses(accessToken: string) {
  return apiRequest<ApiCourseListItem[]>('/courses/my', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
}

export function enrollInCourse(courseId: string, accessToken: string) {
  return apiRequest<{ message?: string }>(`/courses/${courseId}/enroll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
