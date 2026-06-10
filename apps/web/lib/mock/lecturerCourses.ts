export interface LecturerCourse {
  id: string;
  code: string;
  title: string;
  department: string;
  studentCount: number;
  moduleCount: number;
  assignmentCount: number;
  status: 'Active' | 'Draft';
  imageUrl: string;
}

declare global {
  var __LECTURER_COURSES: LecturerCourse[] | undefined;
}

function saveMockData() {
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const file = path.join(process.cwd(), 'mock_persisted_data.json');
      const overrides = globalThis.__MANAGE_COURSE_OVERRIDES || {};
      const data = {
        courses: globalThis.__LECTURER_COURSES,
        overrides,
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
        if (parsed.courses && Array.isArray(parsed.courses)) {
          globalThis.__LECTURER_COURSES = parsed.courses;
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

if (!globalThis.__LECTURER_COURSES) {
  globalThis.__LECTURER_COURSES = [
    {
    id: 'aml-501',
    code: 'CS-501',
    title: 'Advanced Machine Learning',
    department: 'Computer Science',
    studentCount: 48,
    moduleCount: 8,
    assignmentCount: 6,
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dsa-302',
    code: 'CS-302',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science',
    studentCount: 120,
    moduleCount: 12,
    assignmentCount: 10,
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sep-410',
    code: 'SE-410',
    title: 'Software Engineering Project',
    department: 'Software Engineering',
    studentCount: 30,
    moduleCount: 6,
    assignmentCount: 4,
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dbs-204',
    code: 'CS-204',
    title: 'Database Systems',
    department: 'Computer Science',
    studentCount: 86,
    moduleCount: 9,
    assignmentCount: 7,
    status: 'Draft',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hci-330',
    code: 'UX-330',
    title: 'Human Computer Interaction',
    department: 'Interaction Design',
    studentCount: 64,
    moduleCount: 7,
    assignmentCount: 5,
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'net-315',
    code: 'IT-315',
    title: 'Computer Networks',
    department: 'Information Technology',
    studentCount: 72,
    moduleCount: 10,
    assignmentCount: 8,
    status: 'Draft',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  },
];
}

export const LECTURER_COURSES = globalThis.__LECTURER_COURSES!;

export function getLecturerCourseById(courseId: string) {
  return LECTURER_COURSES.find((course) => course.id === courseId) ?? null;
}

export function addLecturerCourse(course: LecturerCourse) {
  LECTURER_COURSES.push(course);
  saveMockData();
}
