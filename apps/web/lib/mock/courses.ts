export type CourseStatus = 'ongoing' | 'completed' | 'notstart';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseContentTab = 'materials' | 'quizzes' | 'assignments' | 'labs';
export type CourseContentType = 'video' | 'pdf' | 'article' | 'document' | 'quiz' | 'assignment' | 'lab';

export interface Course {
  id: number;
  code: string;
  semester: string;
  level: CourseLevel;
  category: string;
  title: string;
  bannerColorClass: string;
  bannerEmoji: string;
  description: string;
  instructorName: string;
  instructorInitials: string;
  instructorRole?: string;
  creditHours: number;
  progressPercentage: number;
  status: CourseStatus;
  totalMaterials: number;
  totalQuizzes: number;
  isNew: boolean;
  durationWeeks?: number;
}

export interface MaterialContent {
  markdown?: string;
  videoUrl?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  previewText?: string;
}

export interface CourseContentItem {
  id: string;
  title: string;
  type: CourseContentType;
  meta: string;
  isCompleted?: boolean;
  summary?: string;
  content?: MaterialContent;
}

export interface CourseModule {
  id: string;
  title: string;
  items: CourseContentItem[];
}

export interface CourseScheduleEntry {
  day: string;
  time: string;
  room: string;
}

export interface CourseDetail extends Course {
  subtitle: string;
  breadcrumbLabel?: string;
  heroAccentLabel: string;
  tabs: Record<CourseContentTab, CourseModule[]>;
  schedule: CourseScheduleEntry[];
}

const COURSE_SEEDS: Course[] = [
  {
    id: 1,
    code: 'TI101',
    semester: '1',
    level: 'Advanced',
    category: 'Computer Science',
    title: 'Advanced Machine Learning Architecture',
    bannerColorClass: 'bg-gradient-to-br from-[#0A3A9C] via-[#0A4AB8] to-[#0A2E7A]',
    bannerEmoji: 'AI',
    description: 'Master the foundations of deep learning, neural networks, and scalable AI architectures in a rigorous advanced module.',
    instructorName: 'Dr. Alan Turing',
    instructorInitials: 'AT',
    instructorRole: 'Prof. of Computer Science',
    creditHours: 3,
    progressPercentage: 35,
    status: 'ongoing',
    totalMaterials: 12,
    totalQuizzes: 5,
    isNew: true,
    durationWeeks: 12,
  },
  {
    id: 2,
    code: 'TI102',
    semester: '1',
    level: 'Beginner',
    category: 'Mathematics',
    title: 'Linear Algebra Foundations',
    bannerColorClass: 'bg-gradient-to-br from-[#0D3A7A] to-[#2F6DBB]',
    bannerEmoji: 'LA',
    description: 'A structured introduction to matrices, vectors, linear systems, and geometric interpretation for computational problem solving.',
    instructorName: 'Prof. Emmy Noether',
    instructorInitials: 'EN',
    instructorRole: 'Professor of Mathematics',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 10,
    totalQuizzes: 4,
    isNew: false,
    durationWeeks: 10,
  },
  {
    id: 3,
    code: 'TI103',
    semester: '1',
    level: 'Intermediate',
    category: 'Literature',
    title: 'Modernist Poetry',
    bannerColorClass: 'bg-gradient-to-br from-[#1F315E] to-[#4C6FD8]',
    bannerEmoji: 'MP',
    description: 'Study fragmentation, rhythm, and symbolic structure in twentieth century modernist literary movements.',
    instructorName: 'Prof. T.S. Eliot',
    instructorInitials: 'TE',
    instructorRole: 'Faculty of Literature',
    creditHours: 2,
    progressPercentage: 100,
    status: 'completed',
    totalMaterials: 8,
    totalQuizzes: 3,
    isNew: false,
    durationWeeks: 8,
  },
  {
    id: 4,
    code: 'TI201',
    semester: '2',
    level: 'Advanced',
    category: 'Physics',
    title: 'Quantum Mechanics',
    bannerColorClass: 'bg-gradient-to-br from-[#10294F] to-[#285DA3]',
    bannerEmoji: 'QM',
    description: 'Explore state vectors, operators, and wave mechanics through conceptual and analytical physics exercises.',
    instructorName: 'Prof. Richard Feynman',
    instructorInitials: 'RF',
    instructorRole: 'Professor of Physics',
    creditHours: 4,
    progressPercentage: 20,
    status: 'ongoing',
    totalMaterials: 15,
    totalQuizzes: 6,
    isNew: false,
    durationWeeks: 14,
  },
  {
    id: 5,
    code: 'TI202',
    semester: '2',
    level: 'Intermediate',
    category: 'Data Science',
    title: 'Machine Learning Models',
    bannerColorClass: 'bg-gradient-to-br from-[#0F3C73] to-[#3377CC]',
    bannerEmoji: 'ML',
    description: 'Understand supervised and unsupervised learning pipelines with emphasis on model evaluation and feature engineering.',
    instructorName: 'Prof. Andrew Ng',
    instructorInitials: 'AN',
    instructorRole: 'Professor of Data Science',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 14,
    totalQuizzes: 5,
    isNew: false,
    durationWeeks: 12,
  },
  {
    id: 6,
    code: 'TI203',
    semester: '2',
    level: 'Beginner',
    category: 'History',
    title: 'Ancient Civilizations',
    bannerColorClass: 'bg-gradient-to-br from-[#153868] to-[#4B7CC8]',
    bannerEmoji: 'AC',
    description: 'Survey key cultures, governance systems, and artifacts of early civilizations across several regions.',
    instructorName: 'Prof. Mary Beard',
    instructorInitials: 'MB',
    instructorRole: 'Faculty of History',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 12,
    totalQuizzes: 5,
    isNew: false,
    durationWeeks: 11,
  },
  {
    id: 7,
    code: 'TI301',
    semester: '3',
    level: 'Intermediate',
    category: 'Computer Science',
    title: 'Web Development Frontend',
    bannerColorClass: 'bg-gradient-to-br from-[#0C3C8C] via-[#1456D9] to-[#0B2F6B]',
    bannerEmoji: 'FE',
    description: 'Build responsive interfaces with semantic HTML, modern CSS, JavaScript, and React patterns for production-ready frontend systems.',
    instructorName: 'Dr. Ahmad Fauzi',
    instructorInitials: 'AF',
    instructorRole: 'Frontend Engineering Lecturer',
    creditHours: 4,
    progressPercentage: 55,
    status: 'ongoing',
    totalMaterials: 18,
    totalQuizzes: 7,
    isNew: true,
    durationWeeks: 14,
  },
  {
    id: 8,
    code: 'TI302',
    semester: '3',
    level: 'Advanced',
    category: 'Computer Science',
    title: 'Web Development Backend',
    bannerColorClass: 'bg-gradient-to-br from-[#0B397A] via-[#0F59B6] to-[#062C5C]',
    bannerEmoji: 'BE',
    description: 'Develop backend services with RESTful API design, authentication, middleware, persistence, and deployment workflows.',
    instructorName: 'Dr. Budi Santoso',
    instructorInitials: 'BS',
    instructorRole: 'Backend Systems Lecturer',
    creditHours: 4,
    progressPercentage: 20,
    status: 'ongoing',
    totalMaterials: 16,
    totalQuizzes: 6,
    isNew: true,
    durationWeeks: 14,
  },
  {
    id: 9,
    code: 'TI303',
    semester: '3',
    level: 'Advanced',
    category: 'Data Science',
    title: 'Machine Learning Dasar',
    bannerColorClass: 'bg-gradient-to-br from-[#133A6B] to-[#4D89DA]',
    bannerEmoji: 'DS',
    description: 'Learn core machine learning concepts, from regression and classification to clustering and baseline validation.',
    instructorName: 'Prof. Siti Rahma',
    instructorInitials: 'SR',
    instructorRole: 'Professor of Data Science',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 20,
    totalQuizzes: 8,
    isNew: true,
    durationWeeks: 13,
  },
  {
    id: 10,
    code: 'TI304',
    semester: '3',
    level: 'Intermediate',
    category: 'Computer Science',
    title: 'UI Engineering Systems',
    bannerColorClass: 'bg-gradient-to-br from-[#0F3A70] to-[#2B67BA]',
    bannerEmoji: 'UI',
    description: 'Translate interface systems into reusable components, design tokens, and maintainable frontend architecture.',
    instructorName: 'Dr. Rina Mahardika',
    instructorInitials: 'RM',
    instructorRole: 'UI Systems Lecturer',
    creditHours: 3,
    progressPercentage: 10,
    status: 'ongoing',
    totalMaterials: 11,
    totalQuizzes: 4,
    isNew: true,
    durationWeeks: 10,
  },
  {
    id: 11,
    code: 'TI305',
    semester: '3',
    level: 'Beginner',
    category: 'Business',
    title: 'Product Management Basics',
    bannerColorClass: 'bg-gradient-to-br from-[#113560] to-[#4A7BC4]',
    bannerEmoji: 'PM',
    description: 'Introduce product discovery, roadmap planning, prioritization, and collaboration in software teams.',
    instructorName: 'Dra. Laila Putri',
    instructorInitials: 'LP',
    instructorRole: 'Product Strategy Lecturer',
    creditHours: 2,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 9,
    totalQuizzes: 3,
    isNew: false,
    durationWeeks: 8,
  },
  {
    id: 12,
    code: 'TI306',
    semester: '3',
    level: 'Intermediate',
    category: 'Design',
    title: 'Interaction Design Studio',
    bannerColorClass: 'bg-gradient-to-br from-[#193B6C] to-[#5383CF]',
    bannerEmoji: 'IX',
    description: 'Practice user flows, wireframing, prototyping, and interaction rationale for digital products.',
    instructorName: 'Sinta Kusuma, M.Ds',
    instructorInitials: 'SK',
    instructorRole: 'Interaction Design Lecturer',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 13,
    totalQuizzes: 3,
    isNew: true,
    durationWeeks: 11,
  },
  {
    id: 13,
    code: 'TI401',
    semester: '4',
    level: 'Advanced',
    category: 'Cybersecurity',
    title: 'Applied Network Security',
    bannerColorClass: 'bg-gradient-to-br from-[#0B2D57] to-[#376FC0]',
    bannerEmoji: 'NS',
    description: 'Cover secure communication, threat modeling, and layered defense strategies in networked systems.',
    instructorName: 'Dr. Damar Wibowo',
    instructorInitials: 'DW',
    instructorRole: 'Security Research Lecturer',
    creditHours: 4,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 15,
    totalQuizzes: 5,
    isNew: true,
    durationWeeks: 14,
  },
  {
    id: 14,
    code: 'TI402',
    semester: '4',
    level: 'Intermediate',
    category: 'Computer Science',
    title: 'Mobile App Architecture',
    bannerColorClass: 'bg-gradient-to-br from-[#123E73] to-[#5A91E1]',
    bannerEmoji: 'MA',
    description: 'Focus on application structure, data flow, and scalable mobile feature organization.',
    instructorName: 'Dr. Nabila Artha',
    instructorInitials: 'NA',
    instructorRole: 'Mobile Engineering Lecturer',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 12,
    totalQuizzes: 4,
    isNew: false,
    durationWeeks: 12,
  },
  {
    id: 15,
    code: 'TI403',
    semester: '4',
    level: 'Advanced',
    category: 'Computer Science',
    title: 'Cloud Infrastructure Fundamentals',
    bannerColorClass: 'bg-gradient-to-br from-[#102E59] to-[#4378C7]',
    bannerEmoji: 'CL',
    description: 'Study core cloud concepts, compute models, service orchestration, and deployment environments.',
    instructorName: 'Ir. Dito Perkasa',
    instructorInitials: 'DP',
    instructorRole: 'Cloud Platform Lecturer',
    creditHours: 4,
    progressPercentage: 65,
    status: 'ongoing',
    totalMaterials: 17,
    totalQuizzes: 6,
    isNew: false,
    durationWeeks: 14,
  },
  {
    id: 16,
    code: 'TI404',
    semester: '4',
    level: 'Intermediate',
    category: 'Data Science',
    title: 'Data Visualization Practice',
    bannerColorClass: 'bg-gradient-to-br from-[#1D4170] to-[#6595E2]',
    bannerEmoji: 'DV',
    description: 'Learn storytelling with data through dashboards, comparative charts, and analytical presentation.',
    instructorName: 'Maya Lestari, M.Stat',
    instructorInitials: 'ML',
    instructorRole: 'Data Analytics Lecturer',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 10,
    totalQuizzes: 4,
    isNew: false,
    durationWeeks: 10,
  },
  {
    id: 17,
    code: 'TI405',
    semester: '4',
    level: 'Beginner',
    category: 'Computer Science',
    title: 'Database Modeling Essentials',
    bannerColorClass: 'bg-gradient-to-br from-[#16325D] to-[#557FC2]',
    bannerEmoji: 'DB',
    description: 'Build strong foundations in data modeling, normalization, and relational database design.',
    instructorName: 'Dr. Hendra Saputra',
    instructorInitials: 'HS',
    instructorRole: 'Database Systems Lecturer',
    creditHours: 3,
    progressPercentage: 0,
    status: 'notstart',
    totalMaterials: 11,
    totalQuizzes: 4,
    isNew: false,
    durationWeeks: 10,
  },
  {
    id: 18,
    code: 'TI406',
    semester: '4',
    level: 'Advanced',
    category: 'Business',
    title: 'Digital Strategy and Innovation',
    bannerColorClass: 'bg-gradient-to-br from-[#203A63] to-[#5C88CC]',
    bannerEmoji: 'IN',
    description: 'Analyze digital transformation, business model innovation, and organizational technology strategy.',
    instructorName: 'Dr. Farah Pradana',
    instructorInitials: 'FP',
    instructorRole: 'Digital Business Lecturer',
    creditHours: 2,
    progressPercentage: 100,
    status: 'completed',
    totalMaterials: 8,
    totalQuizzes: 3,
    isNew: true,
    durationWeeks: 8,
  },
];

const DEFAULT_ARTICLE_MARKDOWN = `## The Chain Rule Application

Backpropagation is the backbone of neural network training. It allows us to calculate the gradient of the loss function with respect to the weights by applying the chain rule backwards through the network layers.

To understand the mathematics fully, we must first establish the forward pass:

- Compute the forward pass to obtain the predicted output.
- Calculate the error between the predicted output and true target.
- Compute the derivative of the loss function.
- Propagate the error backwards to update the weights.

\`\`\`
δL = ∂L/∂a × σ'(zL)
δl = (Wl+1)Tδl+1 × σ'(zl)
\`\`\`
`;

const DEFAULT_VIDEO_URL = 'https://www.youtube.com/embed/aircAruvnKk';
const DEFAULT_DOCUMENT_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

function createMaterialItem(item: CourseContentItem, index: number): CourseContentItem {
  if (item.type === 'video') {
    return {
      ...item,
      summary: item.summary ?? 'Watch the lecture video and follow the explanation from concept to worked example.',
      content: {
        videoUrl: item.content?.videoUrl ?? DEFAULT_VIDEO_URL,
        previewText: item.summary ?? 'Main lecture video for this material.',
      },
    };
  }

  if (item.type === 'pdf' || item.type === 'document') {
    return {
      ...item,
      summary: item.summary ?? 'Download the supporting document and review the key definitions before continuing.',
      content: {
        downloadUrl: item.content?.downloadUrl ?? DEFAULT_DOCUMENT_URL,
        downloadLabel: item.content?.downloadLabel ?? 'Download File',
        previewText: item.summary ?? 'Supporting reading document for this topic.',
      },
    };
  }

  if (item.type === 'article') {
    return {
      ...item,
      summary: item.summary ?? 'Read the written material carefully and review the formulas and examples provided.',
      content: {
        markdown: item.content?.markdown ?? DEFAULT_ARTICLE_MARKDOWN,
        previewText: item.summary ?? `Reading material ${index + 1}`,
      },
    };
  }

  return item;
}

function createMaterialModules(modules: CourseModule[]) {
  return modules.map((module) => ({
    ...module,
    items: module.items.map((item, index) => createMaterialItem(item, index)),
  }));
}

const DEFAULT_MATERIALS: CourseModule[] = createMaterialModules([
  {
    id: 'mod-1',
    title: 'Module 1: Foundations',
    items: [
      {
        id: 'm1',
        title: '1.1 Introduction to Neural Networks',
        type: 'video',
        meta: '45 mins',
        isCompleted: true,
        summary: 'This lecture introduces perceptrons, layers, and the intuition behind supervised learning.',
      },
      {
        id: 'm2',
        title: '1.2 Deep Learning Whitepaper',
        type: 'document',
        meta: '24 Pages',
        summary: 'A comprehensive overview of foundational deep learning architectures and their historical context.',
      },
      {
        id: 'm3',
        title: '1.3 Backpropagation Math',
        type: 'article',
        meta: '30 mins read',
        summary: 'Read the derivation of the backpropagation update rule and how the chain rule is applied layer by layer.',
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Module 2: Next Foundations',
    items: [
      { id: 'm4', title: '2.1 Convolutional Layers Overview', type: 'video', meta: '38 mins' },
      { id: 'm5', title: '2.2 Optimization Cheat Sheet', type: 'pdf', meta: '18 Pages' },
      { id: 'm6', title: '2.3 Regularization in Practice', type: 'article', meta: '20 mins read' },
    ],
  },
  {
    id: 'mod-3',
    title: 'Module 3: Training Workflow',
    items: [
      { id: 'm7', title: '3.1 Dataset Preparation Notes', type: 'article', meta: '18 mins read' },
      { id: 'm8', title: '3.2 Batch Size and Epoch Strategy', type: 'article', meta: '22 mins read' },
      { id: 'm9', title: '3.3 Validation Split Checklist', type: 'article', meta: '14 mins read' },
    ],
  },
  {
    id: 'mod-4',
    title: 'Module 4: Model Evaluation',
    items: [
      { id: 'm10', title: '4.1 Accuracy, Precision, and Recall', type: 'article', meta: '24 mins read' },
      { id: 'm11', title: '4.2 Confusion Matrix Interpretation', type: 'article', meta: '16 mins read' },
      { id: 'm12', title: '4.3 Error Analysis Worksheet', type: 'article', meta: '20 mins read' },
    ],
  },
  {
    id: 'mod-5',
    title: 'Module 5: Optimization Patterns',
    items: [
      { id: 'm13', title: '5.1 Learning Rate Scheduling', type: 'article', meta: '19 mins read' },
      { id: 'm14', title: '5.2 Momentum and Adaptive Methods', type: 'article', meta: '25 mins read' },
      { id: 'm15', title: '5.3 Practical Debugging Guide', type: 'article', meta: '21 mins read' },
    ],
  },
  {
    id: 'mod-6',
    title: 'Module 6: Deployment Readiness',
    items: [
      { id: 'm16', title: '6.1 Model Packaging Overview', type: 'article', meta: '17 mins read' },
      { id: 'm17', title: '6.2 Inference Latency Notes', type: 'article', meta: '18 mins read' },
      { id: 'm18', title: '6.3 Monitoring Model Drift', type: 'article', meta: '23 mins read' },
    ],
  },
]);

const DEFAULT_ASSIGNMENTS: CourseModule[] = [
  {
    id: 'asg-1',
    title: 'Assignments',
    items: [
      { id: 'a1', title: 'Assignment 1: Weekly Case Study', type: 'assignment', meta: 'Due 14 Jun 2026' },
      { id: 'a2', title: 'Assignment 2: Reflection Report', type: 'assignment', meta: 'Due 21 Jun 2026' },
    ],
  },
];

function createCourseDetail(
  course: Course,
  overrides?: Partial<Pick<CourseDetail, 'subtitle' | 'heroAccentLabel' | 'breadcrumbLabel' | 'schedule' | 'tabs'>>
): CourseDetail {
  return {
    ...course,
    subtitle:
      overrides?.subtitle ??
      'Designed for students seeking rigorous theoretical grounding alongside practical implementation skills.',
    heroAccentLabel: overrides?.heroAccentLabel ?? `${course.level} Module`,
    breadcrumbLabel: overrides?.breadcrumbLabel ?? course.title,
    schedule:
      overrides?.schedule ?? [
        { day: 'Monday', time: '09:00 - 11:00 WIB', room: 'Room A-302' },
        { day: 'Thursday', time: '13:00 - 14:40 WIB', room: 'Lab Session' },
      ],
    tabs: overrides?.tabs ?? {
      materials: DEFAULT_MATERIALS,
      quizzes: [],
      assignments: DEFAULT_ASSIGNMENTS,
      labs: [],
    },
  };
}

export const COURSES: Course[] = COURSE_SEEDS;

export const COURSE_DETAILS: CourseDetail[] = COURSE_SEEDS.map((course) => {
  if (course.id === 1) {
    return createCourseDetail(course, {
      heroAccentLabel: 'Advanced Module',
      schedule: [
        { day: 'Monday', time: '09:00 - 11:00 WIB', room: 'Room A-302' },
        { day: 'Thursday', time: '13:00 - 14:40 WIB', room: 'Lab AI-2' },
      ],
      tabs: {
        materials: DEFAULT_MATERIALS,
        quizzes: [],
        assignments: [
          {
            id: 'asg-aml',
            title: 'Assignments',
            items: [
              { id: 'aa1', title: 'Assignment 1: Build a Perceptron', type: 'assignment', meta: 'Due 14 Jun 2026' },
              { id: 'aa2', title: 'Assignment 2: Loss Function Analysis', type: 'assignment', meta: 'Due 21 Jun 2026' },
            ],
          },
        ],
        labs: [],
      },
    });
  }

  if (course.id === 7) {
    return createCourseDetail(course, {
      schedule: [
        { day: 'Tuesday', time: '08:00 - 10:30 WIB', room: 'Studio Web-1' },
        { day: 'Friday', time: '10:00 - 11:40 WIB', room: 'Lab UI-3' },
      ],
      tabs: {
        materials: createMaterialModules([
          {
            id: 'fmod-1',
            title: 'Module 1: UI Fundamentals',
            items: [
              { id: 'fm1', title: '1.1 Semantic HTML Review', type: 'video', meta: '32 mins', isCompleted: true },
              { id: 'fm2', title: '1.2 CSS Layout System Notes', type: 'document', meta: '16 Pages', isCompleted: true },
              { id: 'fm3', title: '1.3 Accessibility Checklist', type: 'article', meta: '15 mins read' },
            ],
          },
          {
            id: 'fmod-2',
            title: 'Module 2: React Components',
            items: [
              { id: 'fm4', title: '2.1 Component Composition', type: 'video', meta: '41 mins' },
              { id: 'fm5', title: '2.2 State and Events Notes', type: 'pdf', meta: '12 Pages' },
            ],
          },
        ]),
        quizzes: [],
        assignments: [
          {
            id: 'fasg-1',
            title: 'Assignments',
            items: [
              { id: 'fa1', title: 'Assignment 1: Landing Page Recreation', type: 'assignment', meta: 'Due 10 Jun 2026' },
              { id: 'fa2', title: 'Assignment 2: Responsive Dashboard', type: 'assignment', meta: 'Due 18 Jun 2026' },
            ],
          },
        ],
        labs: [],
      },
    });
  }

  if (course.id === 8) {
    return createCourseDetail(course, {
      heroAccentLabel: 'Advanced Module',
      schedule: [
        { day: 'Wednesday', time: '10:00 - 12:30 WIB', room: 'Room B-204' },
        { day: 'Friday', time: '13:00 - 14:40 WIB', room: 'Lab API-1' },
      ],
      tabs: {
        materials: createMaterialModules([
          {
            id: 'bmod-1',
            title: 'Module 1: API Fundamentals',
            items: [
              { id: 'bm1', title: '1.1 REST Design Principles', type: 'video', meta: '36 mins' },
              { id: 'bm2', title: '1.2 Request Lifecycle Notes', type: 'document', meta: '14 Pages' },
              { id: 'bm3', title: '1.3 HTTP Status Code Reference', type: 'article', meta: '10 mins read', isCompleted: true },
            ],
          },
        ]),
        quizzes: [],
        assignments: [
          {
            id: 'basg-1',
            title: 'Assignments',
            items: [
              { id: 'ba1', title: 'Assignment 1: CRUD Service', type: 'assignment', meta: 'Due 12 Jun 2026' },
              { id: 'ba2', title: 'Assignment 2: Auth Middleware', type: 'assignment', meta: 'Due 20 Jun 2026' },
            ],
          },
        ],
        labs: [],
      },
    });
  }

  return createCourseDetail(course);
});

export function getCourseById(courseId: number): Course | undefined {
  return COURSES.find((course) => course.id === courseId);
}

export function getCourseDetailById(courseId: number): CourseDetail | undefined {
  return COURSE_DETAILS.find((course) => course.id === courseId);
}

export function getCourseMaterialById(courseId: number, materialId: string) {
  const course = getCourseDetailById(courseId);
  if (!course) {
    return null;
  }

  for (const courseModule of course.tabs.materials) {
    const item = courseModule.items.find((entry) => entry.id === materialId);
    if (item) {
      return {
        course,
        module: courseModule,
        material: item,
      };
    }
  }

  return null;
}
