"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/api/apiConfig";
import "./dashboard.css";

interface DashboardUser {
  id?: string;
  name?: string;
  role?: string;
}

interface EnrolledCourse {
  id: string;
  title: string;
  category?: string;
  instructor?: {
    name?: string;
  };
  enrollments?: Array<{
    studentId?: string;
  }>;
}

interface DisplayCourse {
  id: string;
  title: string;
  instructor: string;
  tag: string;
  tagColor: "blue" | "purple";
  progress: number;
  progressColor: "blue" | "purple";
  action: string;
  actionType: "primary" | "secondary";
}

const DASHBOARD_STATS = {
  overallProgress: 68,
  completedModules: 24,
  pendingAssignments: 3,
};

const RING_RADIUS = 30;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const FALLBACK_COURSES: DisplayCourse[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    instructor: "Prof. Alan Turing",
    tag: "COMPUTER SCIENCE",
    tagColor: "blue",
    progress: 82,
    progressColor: "blue",
    action: "Continue Module",
    actionType: "primary",
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Grace Hopper",
    tag: "DATA SCIENCE",
    tagColor: "purple",
    progress: 45,
    progressColor: "purple",
    action: "Resume Video",
    actionType: "secondary",
  },
];

const COURSE_PROGRESS_FALLBACKS = [82, 45, 64, 58];

export default function DashboardMahasiswaPage() {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const currentUser = await resolveCurrentUser(token);
        setUser(currentUser);

        const courses = await fetchStudentCourses(token, currentUser?.id);
        setEnrolledCourses(courses.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const displayCourses = useMemo(
    () => buildDisplayCourses(enrolledCourses),
    [enrolledCourses]
  );

  if (loading) {
    return (
      <div className="student-dashboard dashboard-content">
        <div className="stat-card">Memuat...</div>
      </div>
    );
  }

  const ringOffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * DASHBOARD_STATS.overallProgress) / 100;

  return (
    <div className="student-dashboard dashboard-content">
      <section className="welcome-banner">
        <div className="banner-decoration">
          <div className="banner-circle banner-circle-1" />
          <div className="banner-circle banner-circle-2" />
          <div className="banner-circle banner-circle-3" />
          <div className="banner-dots" />
        </div>

        <div className="banner-content">
          <p className="banner-greeting">Selamat Datang Kembali</p>
          <h2 className="banner-title">Halo, {user?.name || "Mahasiswa"}</h2>
          <p className="banner-subtitle">
            Perjalanan akademikmu <strong>terlihat luar biasa</strong> semester ini.
          </p>
        </div>

        <div className="banner-actions">
          <button className="btn-primary-white" type="button">
            <DownloadIcon />
            Ekspor Laporan
          </button>
          <button className="btn-outline-white" type="button" onClick={() => router.push("/courses")}>
            <BookIcon />
            Lihat Kursus
          </button>
        </div>
      </section>

      <section className="stat-overview">
        <div className="stat-card progress-card">
          <div className="stat-card-accent accent-blue" />
          <p className="stat-label">OVERALL PROGRESS</p>
          <div className="progress-ring-wrap">
            <div className="progress-ring-info">
              <p className="stat-value">
                {DASHBOARD_STATS.overallProgress}<span className="stat-unit">%</span>
              </p>
              <p className="stat-change neutral">Semester ini</p>
            </div>
            <div className="ring-container">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <circle className="ring-bg" cx="36" cy="36" r={RING_RADIUS} />
                <circle
                  className="ring-fill"
                  cx="36"
                  cy="36"
                  r={RING_RADIUS}
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                  stroke="url(#ringGradient)"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="ring-label">{DASHBOARD_STATS.overallProgress}%</div>
            </div>
          </div>
        </div>

        <SummaryCard
          accentClass="accent-green"
          iconClass="green"
          label="COMPLETED"
          value={`${DASHBOARD_STATS.completedModules}`}
          unit="Modules"
          change="+4 minggu ini"
        />
        <SummaryCard
          accentClass="accent-orange"
          iconClass="orange"
          label="PENDING"
          value={`${DASHBOARD_STATS.pendingAssignments}`}
          unit="Assignments"
          change="Tenggat dalam 2 hari"
          warning
        />
      </section>

      <div className="main-body-layout">
        <section>
          <div className="section-header">
            <h3 className="section-title">Active Courses</h3>
            <Link href="/courses/my" className="view-all-link">
              View All
              <ChevronRightIcon />
            </Link>
          </div>

          <div className="course-grid">
            {displayCourses.map((course) => (
              <CourseCard key={course.id} course={course} onOpen={() => router.push(`/courses/${course.id}`)} />
            ))}
          </div>
        </section>

        <aside className="right-panel">
          <div className="deadlines-card">
            <div className="deadlines-header">
              <h3 className="section-title">Deadlines</h3>
              <button className="icon-btn" title="Filter" type="button">
                <FilterIcon />
              </button>
            </div>

            <ul className="deadlines-list">
              <DeadlineItem day="12" title="Algorithm Analysis Project" course="Data Structures & Algorithms" urgent />
              <DeadlineItem day="15" title="Neural Network Quiz" course="Machine Learning" />
              <DeadlineItem day="18" title="Set Theory Problem Set" course="Discrete Mathematics" />
            </ul>

            <Link href="/calendar" className="view-calendar-link">
              View Full Calendar -&gt;
            </Link>
          </div>

          <div className="registration-cta">
            <div className="cta-icon">
              <BookIcon />
            </div>
            <h3 className="cta-title">Registration Open</h3>
            <p className="cta-desc">
              Spring semester registration is available. Secure your electives early.
            </p>
            <div className="cta-buttons">
              <button className="btn-cta-primary" type="button">Register Now</button>
              <button className="btn-cta-secondary" type="button">Learn More</button>
            </div>
          </div>

          <div className="performance-stats">
            <MiniStat label="GPA" value="3.82" />
            <MiniStat label="RANK" value="#12" />
          </div>
        </aside>
      </div>
    </div>
  );
}

async function resolveCurrentUser(token: string) {
  const storedUser = getStoredUser();

  try {
    const response = await fetch(buildApiUrl("/auth/profile"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return storedUser;
    }

    return response.json();
  } catch {
    return storedUser;
  }
}

async function fetchStudentCourses(token: string, studentId?: string) {
  if (!studentId) {
    return [];
  }

  const response = await fetch(buildApiUrl("/courses/my"), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return [];
  }

  const courses: EnrolledCourse[] = await response.json();
  return courses;
}

function getStoredUser(): DashboardUser | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function buildDisplayCourses(courses: EnrolledCourse[]): DisplayCourse[] {
  if (courses.length === 0) {
    return FALLBACK_COURSES;
  }

  return courses.map((course, index) => {
    const isEvenCourse = index % 2 === 0;

    return {
      id: course.id,
      title: course.title,
      instructor: course.instructor?.name || "Dosen",
      tag: course.category || "MATA KULIAH",
      tagColor: isEvenCourse ? "blue" : "purple",
      progress: COURSE_PROGRESS_FALLBACKS[index % COURSE_PROGRESS_FALLBACKS.length],
      progressColor: isEvenCourse ? "blue" : "purple",
      action: isEvenCourse ? "Lanjutkan Modul" : "Resume Video",
      actionType: isEvenCourse ? "primary" : "secondary",
    };
  });
}

function SummaryCard({
  accentClass,
  iconClass,
  label,
  value,
  unit,
  change,
  warning = false,
}: {
  accentClass: string;
  iconClass: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  warning?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className={`stat-card-accent ${accentClass}`} />
      <div className={`stat-icon-wrap ${iconClass}`}>
        <CheckIcon />
      </div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">
          {value} <span className="stat-unit">{unit}</span>
        </p>
        <p className={`stat-change ${warning ? "warning" : "up"}`}>{change}</p>
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen }: { course: DisplayCourse; onOpen: () => void }) {
  return (
    <div className="course-card">
      <div className="course-card-top">
        <span className={`course-tag ${course.tagColor}`}>{course.tag}</span>
        <button className="course-more-btn" aria-label="Opsi kursus" type="button">
          <MoreIcon />
        </button>
      </div>
      <h4 className="course-name">{course.title}</h4>
      <p className="course-instructor">
        <UserIcon />
        {course.instructor}
      </p>
      <div className="progress-section">
        <div className="progress-label">
          <span className="progress-text">Course Progress</span>
          <span className="progress-pct">{course.progress}%</span>
        </div>
        <div className="progress-track">
          <div className={`progress-fill ${course.progressColor}`} style={{ width: `${course.progress}%` }} />
        </div>
      </div>
      <button className={`course-action-btn ${course.actionType}`} type="button" onClick={onOpen}>
        {course.action}
      </button>
    </div>
  );
}

function DeadlineItem({ day, title, course, urgent = false }: { day: string; title: string; course: string; urgent?: boolean }) {
  return (
    <li className="deadline-item">
      <div className={`deadline-date-block ${urgent ? "urgent" : ""}`}>
        <span className="deadline-month">OCT</span>
        <span className="deadline-day">{day}</span>
      </div>
      <div className="deadline-info">
        <p className="deadline-title">{title}</p>
        <p className="deadline-course">{course}</p>
        {urgent ? <span className="deadline-badge urgent">Due in 2 days</span> : null}
      </div>
    </li>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card-mini">
      <span className="stat-mini-label">{label}</span>
      <span className="stat-mini-value">{value}</span>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16" />
      <path d="M8 12h8" />
      <path d="M12 18h.01" />
    </svg>
  );
}
