'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CourseCatalogLayout } from '@/components/course/CourseCatalogLayout';
import { EnrollModal } from '@/components/course/EnrollModal';
import { useCourses } from '@/hooks/useCourses';
import { isCourseEnrolled } from '@/lib/courseEnrollment';
import { buildCourseDetailHref } from '@/lib/courseNavigation';
import type { Course } from '@/lib/mock/courses';
import { useEnrollmentStore } from '@/lib/stores/useEnrollmentStore';

interface MyCoursesCatalogViewProps {
  searchQuery: string;
}

export function MyCoursesCatalogView({ searchQuery }: MyCoursesCatalogViewProps) {
  const router = useRouter();
  const [enrollCourse, setEnrollCourse] = React.useState<Course | null>(null);
  const enrolledCourseIds = useEnrollmentStore((state) => state.enrolledCourseIds);
  const enrollCourseById = useEnrollmentStore((state) => state.enrollCourse);
  const courseFilters = useCourses(
    searchQuery,
    (course) => isCourseEnrolled(course, enrolledCourseIds)
  );

  const visibleCourses = React.useMemo(() => {
    return courseFilters.paginatedCourses.map((course) =>
      course.status === 'notstart'
        ? { ...course, status: 'ongoing' as const, progressPercentage: 0 }
        : course
    );
  }, [courseFilters.paginatedCourses]);

  const handleConfirmEnroll = (course: Course) => {
    enrollCourseById(course.id);
    setEnrollCourse(null);
    router.push(buildCourseDetailHref(course.id, 'my-courses'));
  };

  const handleCourseClick = (course: Course) => {
    if (!isCourseEnrolled(course, enrolledCourseIds)) {
      setEnrollCourse(course);
      return;
    }

    router.push(buildCourseDetailHref(course.id, 'my-courses'));
  };

  return (
    <>
      <EnrollModal
        course={enrollCourse}
        onClose={() => setEnrollCourse(null)}
        onConfirm={handleConfirmEnroll}
      />
      <CourseCatalogLayout
        title="My Courses"
        description="Courses you are actively enrolled in and ready to continue."
        currentBreadcrumb="My Courses"
        courses={visibleCourses}
        selectedCategory={courseFilters.selectedCategory}
        selectedLevel={courseFilters.selectedLevel}
        currentPage={courseFilters.currentPage}
        totalPages={courseFilters.totalPages}
        emptyState={<MyCoursesEmptyState />}
        onCategoryChange={courseFilters.setSelectedCategory}
        onLevelChange={courseFilters.setSelectedLevel}
        onPageChange={courseFilters.setCurrentPage}
        onResetFilters={courseFilters.resetFilters}
        onCourseClick={handleCourseClick}
        onEnroll={setEnrollCourse}
      />
    </>
  );
}

function MyCoursesEmptyState() {
  return (
    <div className="rounded-[22px] border bg-white px-6 py-16 text-center" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        No enrolled courses found
      </h2>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Enroll in a course from the main course catalog to see it here.
      </p>
    </div>
  );
}
