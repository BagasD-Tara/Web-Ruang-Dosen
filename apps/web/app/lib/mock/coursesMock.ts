
export interface MockCourse {
  id: string;
  title: string;
  instructor: string;
  instructorInitials: string;
  instructorRole: string;
  description: string;
  level: string;
  durationWeeks: number;
  totalModules: number;
  progress: number;
  bannerColorClass: string;
}

export interface MockMaterial {
  id: string;
  type: "video" | "pdf" | "article";
  title: string;
  meta: string;
  isCompleted: boolean;
}

export interface MockModule {
  id: string;
  title: string;
  courseId: string;
  quizId: string;
  materials: MockMaterial[];
}

// ─── Data Courses ─────────────────────────────────────────────────────────────

export const MOCK_COURSES: MockCourse[] = [
  {
    id: "course-1",
    title: "Advanced Machine Learning Architecture",
    instructor: "Dr. Alan Turing",
    instructorInitials: "AT",
    instructorRole: "Prof. of Computer Science",
    description:
      "Master the foundations of deep learning, neural networks, and scalable AI architectures in this comprehensive advanced module. Designed for students seeking rigorous theoretical grounding alongside practical implementation skills.",
    level: "Advanced Module",
    durationWeeks: 12,
    totalModules: 3,
    progress: 35,
    bannerColorClass: "from-blue-900 via-blue-800 to-blue-900",
  },
  {
    id: "course-2",
    title: "Web Development Frontend",
    instructor: "Dr. Ahmad Fauzi",
    instructorInitials: "AF",
    instructorRole: "Frontend Engineering Lecturer",
    description:
      "Build responsive interfaces with semantic HTML, modern CSS, JavaScript, and React patterns for production-ready frontend systems.",
    level: "Intermediate Module",
    durationWeeks: 14,
    totalModules: 2,
    progress: 55,
    bannerColorClass: "from-blue-800 via-blue-700 to-blue-800",
  },
  {
    id: "course-3",
    title: "Dasar-Dasar Algoritma & Struktur Data",
    instructor: "Dr. Budi Santoso",
    instructorInitials: "BS",
    instructorRole: "Computer Science Lecturer",
    description:
      "Pelajari konsep dasar algoritma, struktur data, dan analisis kompleksitas untuk membangun fondasi pemrograman yang kuat.",
    level: "Beginner Module",
    durationWeeks: 10,
    totalModules: 2,
    progress: 20,
    bannerColorClass: "from-blue-700 via-blue-600 to-blue-800",
  },
];

// ─── Data Modul & Materi per Course ───────────────────────────────────────────

export const MOCK_MODULES: Record<string, MockModule[]> = {
  "course-1": [
    {
      id: "module-1",
      title: "Module 1: Foundations",
      courseId: "course-1",
      quizId: "quiz-1",
      materials: [
        {
          id: "mat-1-1",
          type: "video",
          title: "1.1 Introduction to Neural Networks",
          meta: "Video • 45 mins",
          isCompleted: true,
        },
        {
          id: "mat-1-2",
          type: "pdf",
          title: "1.2 Deep Learning Whitepaper",
          meta: "PDF Reading • 24 Pages",
          isCompleted: false,
        },
        {
          id: "mat-1-3",
          type: "article",
          title: "1.3 Backpropagation Math",
          meta: "Article • 30 mins read",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: Next Foundations",
      courseId: "course-1",
      quizId: "quiz-2",
      materials: [
        {
          id: "mat-2-1",
          type: "video",
          title: "2.1 Convolutional Layers Overview",
          meta: "Video • 38 mins",
          isCompleted: false,
        },
        {
          id: "mat-2-2",
          type: "pdf",
          title: "2.2 Optimization Cheat Sheet",
          meta: "PDF Reading • 18 Pages",
          isCompleted: false,
        },
        {
          id: "mat-2-3",
          type: "article",
          title: "2.3 Regularization in Practice",
          meta: "Article • 20 mins read",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: Training Workflow",
      courseId: "course-1",
      quizId: "quiz-3",
      materials: [
        {
          id: "mat-3-1",
          type: "article",
          title: "3.1 Dataset Preparation Notes",
          meta: "Article • 18 mins read",
          isCompleted: false,
        },
        {
          id: "mat-3-2",
          type: "article",
          title: "3.2 Batch Size and Epoch Strategy",
          meta: "Article • 22 mins read",
          isCompleted: false,
        },
        {
          id: "mat-3-3",
          type: "article",
          title: "3.3 Validation Split Checklist",
          meta: "Article • 14 mins read",
          isCompleted: false,
        },
      ],
    },
  ],

  "course-2": [
    {
      id: "module-4",
      title: "Module 1: UI Fundamentals",
      courseId: "course-2",
      quizId: "quiz-4",
      materials: [
        {
          id: "mat-4-1",
          type: "video",
          title: "1.1 Semantic HTML Review",
          meta: "Video • 32 mins",
          isCompleted: true,
        },
        {
          id: "mat-4-2",
          type: "pdf",
          title: "1.2 CSS Layout System Notes",
          meta: "PDF Reading • 16 Pages",
          isCompleted: true,
        },
        {
          id: "mat-4-3",
          type: "article",
          title: "1.3 Accessibility Checklist",
          meta: "Article • 15 mins read",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-5",
      title: "Module 2: React Components",
      courseId: "course-2",
      quizId: "quiz-5",
      materials: [
        {
          id: "mat-5-1",
          type: "video",
          title: "2.1 Component Composition",
          meta: "Video • 41 mins",
          isCompleted: false,
        },
        {
          id: "mat-5-2",
          type: "pdf",
          title: "2.2 State and Events Notes",
          meta: "PDF Reading • 12 Pages",
          isCompleted: false,
        },
        {
          id: "mat-5-3",
          type: "article",
          title: "2.3 React Hooks Deep Dive",
          meta: "Article • 28 mins read",
          isCompleted: false,
        },
      ],
    },
  ],

  "course-3": [
    {
      id: "module-6",
      title: "Modul 1: Pengenalan Struktur Data",
      courseId: "course-3",
      quizId: "quiz-6",
      materials: [
        {
          id: "mat-6-1",
          type: "video",
          title: "1.1 Pengenalan Array dan Linked List",
          meta: "Video • 40 mins",
          isCompleted: true,
        },
        {
          id: "mat-6-2",
          type: "pdf",
          title: "1.2 Stack dan Queue — Panduan Lengkap",
          meta: "PDF Reading • 18 Pages",
          isCompleted: false,
        },
        {
          id: "mat-6-3",
          type: "article",
          title: "1.3 Implementasi Stack di Python",
          meta: "Article • 15 mins read",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-7",
      title: "Modul 2: Algoritma Pencarian & Pengurutan",
      courseId: "course-3",
      quizId: "quiz-7",
      materials: [
        {
          id: "mat-7-1",
          type: "video",
          title: "2.1 Linear Search vs Binary Search",
          meta: "Video • 35 mins",
          isCompleted: false,
        },
        {
          id: "mat-7-2",
          type: "pdf",
          title: "2.2 Bubble Sort, Merge Sort, Quick Sort",
          meta: "PDF Reading • 24 Pages",
          isCompleted: false,
        },
        {
          id: "mat-7-3",
          type: "article",
          title: "2.3 Memilih Algoritma Sort yang Tepat",
          meta: "Article • 20 mins read",
          isCompleted: false,
        },
      ],
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getMockCourseById(id: string): MockCourse | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}

export function getMockModulesByCourse(courseId: string): MockModule[] {
  return MOCK_MODULES[courseId] ?? [];
}