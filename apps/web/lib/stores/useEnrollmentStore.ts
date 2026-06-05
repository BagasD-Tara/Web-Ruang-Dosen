'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnrollmentStore {
  enrolledCourseIds: Array<number | string>;
  enrollCourse: (courseId: number | string) => void;
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
    }),
    {
      name: 'ruang-dosen-enrollments',
    }
  )
);
