import { useState, useMemo, useEffect } from 'react';
import { COURSES, Course } from '@/lib/mock/courses';

export const ITEMS_PER_PAGE = 6;
export const SORT_OPTIONS = ['Terbaru', 'Nama A-Z', 'Progress Terbesar'] as const;
export type SortOption = typeof SORT_OPTIONS[number];

export function useCourses() {
  const [activeSem, setActiveSem] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('Terbaru');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Semesters from Data
  const availableSemesters = useMemo(() => {
    const sems = Array.from(new Set(COURSES.map(c => c.sem))).sort((a, b) => Number(a) - Number(b));
    return ['all', ...sems];
  }, []);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    let result = COURSES.filter((c) => {
      const matchSem = activeSem === 'all' || c.sem === activeSem;
      const matchSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSem && matchSearch;
    });

    if (sortBy === 'Nama A-Z') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Progress Terbesar') {
      result = [...result].sort((a, b) => b.prog - a.prog);
    }

    return result;
  }, [activeSem, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSem, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeCoursesCount = activeSem === 'all'
    ? COURSES.filter(c => c.status === 'ongoing').length
    : COURSES.filter(c => c.status === 'ongoing' && c.sem === activeSem).length;
  const semText = activeSem === 'all' ? 'semua semester' : `Semester ${activeSem}`;

  // Dynamic Stats
  const totalCourses = COURSES.length;
  const ongoingCourses = COURSES.filter(c => c.status === 'ongoing').length;
  const doneCourses = COURSES.filter(c => c.status === 'done').length;
  const avgProgress = totalCourses > 0 
    ? Math.round(COURSES.reduce((sum, c) => sum + c.prog, 0) / totalCourses)
    : 0;

  const handleSelectCourse = (course: Course | null) => {
    setSelectedCourse(course);
  };

  const resetFilters = () => {
    setActiveSem('all');
    setSearchQuery('');
    setSortBy('Terbaru');
  };

  return {
    activeSem, setActiveSem,
    searchQuery, setSearchQuery,
    selectedCourse, handleSelectCourse,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    availableSemesters,
    paginatedCourses,
    totalPages,
    activeCoursesCount,
    semText,
    stats: {
      totalCourses,
      ongoingCourses,
      doneCourses,
      avgProgress
    },
    resetFilters
  };
}
