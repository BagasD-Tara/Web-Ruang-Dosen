'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnrollmentStore {
  enrolledCourseIds: Array<number | string>;
  enrollCourse: (courseId: number | string) => void;
  unenrollCourse: (courseId: number | string) => void;
  syncEnrollments: (courseIds: Array<number | string>) => void;
  resetEnrollments: () => void;
}

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set) => ({
      enrolledCourseIds: [],
      enrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourseIds: state.enrolledCourseIds.includes(courseId)
            ? state.enrolledCourseIds
            : [...state.enrolledCourseIds, courseId],
        })),
      unenrollCourse: (courseId) =>
        set((state) => ({
          enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
        })),
      syncEnrollments: (courseIds) =>
        set({
          enrolledCourseIds: [...new Set(courseIds)],
        }),
      resetEnrollments: () => set({ enrolledCourseIds: [] }),
    }),
    {
      name: 'ruang-dosen-enrollments',
    }
  )
);
