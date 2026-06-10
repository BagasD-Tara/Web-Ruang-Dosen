import { apiRequest } from './httpClient';
import { getApiBaseUrl } from './apiConfig';

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
    next: { revalidate: 0, tags: ['courses'] },
  });
}

export function fetchCourseDetail(courseId: string, accessToken?: string) {
  const headers: HeadersInit = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return apiRequest<ApiCourseDetail>(`/courses/${courseId}`, {
    headers,
    next: { revalidate: 30 },
  });
}

export function fetchMyCourses(accessToken: string) {
  return apiRequest<ApiCourseListItem[]>('/courses/my', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0, tags: ['courses'] },
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

export function createCourseApi(
  data: { title: string; description?: string; instructorId: string },
  accessToken: string
) {
  return apiRequest<ApiCourseListItem>('/courses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}

export function createMaterialApi(
  data: {
    title: string;
    type: ApiMaterialType;
    content?: string;
    url?: string;
    courseId: string;
  },
  accessToken: string
) {
  return apiRequest<ApiMaterial>('/materials', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}

export function updateMaterialApi(
  id: string,
  data: {
    title?: string;
    type?: ApiMaterialType;
    content?: string;
    url?: string;
  },
  accessToken: string
) {
  return apiRequest<ApiMaterial>(`/materials/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteMaterialApi(id: string, accessToken: string) {
  return apiRequest<{ message?: string }>(`/materials/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function uploadFileApi(file: File, accessToken: string) {
  const formData = new FormData();
  formData.append('file', file);

  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const response = await fetch(`${baseUrl}/uploads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  return response.json() as Promise<{ url: string; fileName: string; size: number }>;
}

