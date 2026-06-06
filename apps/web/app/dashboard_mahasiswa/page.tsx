"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function DashboardMahasiswaPage() {
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    overallProgress: 68,
    completedModules: 24,
    pendingAssignments: 3,
  });
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Ambil data user dari localStorage
        let currentUser = JSON.parse(localStorage.getItem("user") || "null");
        if (currentUser) setUser(currentUser);

        // Fetch profil terbaru dari /auth/profile
        try {
          const profileRes = await fetch("http://localhost:3001/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setUser(profileData);
            currentUser = profileData;
          }
        } catch (e) {
          console.error("Failed to fetch profile", e);
        }

        // Fetch semua courses yang di-enroll mahasiswa
        try {
          const coursesRes = await fetch("http://localhost:3001/courses", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (coursesRes.ok) {
            const allCourses = await coursesRes.json();
            // Filter hanya kursus yang memiliki enrollment mahasiswa ini
            const myCourses = allCourses.filter((c: any) =>
              c.enrollments?.some((e: any) => e.studentId === currentUser?.id)
            );
            setEnrolledCourses(myCourses.slice(0, 4));
          }
        } catch (e) {
          console.error("Failed to fetch courses", e);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Fungsi utilitas untuk mendapatkan inisial nama
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Data mock untuk tampilan awal
  const mockCourses = [
    {
      id: "1",
      title: "Data Structures & Algorithms",
      instructor: "Prof. Alan Turing",
      tag: "COMPUTER SCIENCE",
      tagColor: "blue" as const,
      progress: 82,
      progressColor: "blue" as const,
      action: "Continue Module",
      actionType: "primary" as const,
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Grace Hopper",
      tag: "DATA SCIENCE",
      tagColor: "purple" as const,
      progress: 45,
      progressColor: "purple" as const,
      action: "Resume Video",
      actionType: "secondary" as const,
    },
  ];

  const displayCourses =
    enrolledCourses.length > 0
      ? enrolledCourses.map((c, i) => ({
          id: c.id,
          title: c.title,
          instructor: c.instructor?.name || "Dosen",
          tag: c.category || "MATA KULIAH",
          tagColor: (i % 2 === 0 ? "blue" : "purple") as "blue" | "purple",
          progress: Math.floor(Math.random() * 60) + 30,
          progressColor: (i % 2 === 0 ? "blue" : "purple") as "blue" | "purple",
          action: i % 2 === 0 ? "Lanjutkan Modul" : "Resume Video",
          actionType: (i % 2 === 0 ? "primary" : "secondary") as "primary" | "secondary",
        }))
      : mockCourses;

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Memuat...
      </div>
    );
  }

  // SVG circumference for the ring (radius = 30, so C = 2*PI*30 ≈ 188.4)
  const RADIUS = 30;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC - (CIRC * stats.overallProgress) / 100;

  return (
    <div className="app-wrapper">
      {/* ============================================================
          SIDEBAR
      ============================================================ */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="logo-text">Ruang<span>Dosen</span></span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-item">
            <Link href="/dashboard_mahasiswa" className="nav-link active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Dashboard
            </Link>
          </div>

          <div className={`nav-item ${coursesOpen ? "open" : ""}`}>
            <div className="nav-link" onClick={() => setCoursesOpen(!coursesOpen)} style={{ cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              Courses
              <svg className="nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {coursesOpen ? <line x1="5" y1="12" x2="19" y2="12" /> : <polyline points="6 9 12 15 18 9" />}
              </svg>
            </div>
            <div className="sub-nav">
              {enrolledCourses.map((c) => (
                <Link key={c.id} href="#" className="sub-nav-link">{c.title}</Link>
              ))}
              <Link href="#" className="sub-nav-link">+ Explore Courses</Link>
            </div>
          </div>

          <div className="nav-item">
            <Link href="#" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Calendar
            </Link>
          </div>

          <div className="nav-item">
            <Link href="#" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Resources
            </Link>
          </div>
        </nav>

        {/* User card at bottom */}
        <div className="sidebar-footer">
          <div
            className="user-card"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            <div className="user-avatar">{getInitials(user?.name)}</div>
            <div className="user-info">
              <p className="user-name">{user?.name || "Mahasiswa"}</p>
              <p className="user-role">{user?.role === "STUDENT" ? "Mahasiswa" : user?.role || "Akademik"}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <title>Logout</title>
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </div>
        </div>
      </aside>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="top-bar">
          <div className="search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Cari kursus, tugas, materi..." id="dashboard-search" />
          </div>
          <div className="top-bar-right">
            <button className="icon-btn" id="notif-btn" title="Notifikasi">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="notif-dot"></span>
            </button>

            <button className="icon-btn" id="settings-btn" title="Pengaturan">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M21 12h-2M5 12H3M12 3V1M12 23v-2" />
              </svg>
            </button>

            <button className="avatar-btn" id="profile-btn" title="Profil">
              {getInitials(user?.name)}
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content">

          {/* ---- WELCOME BANNER ---- */}
          <section className="welcome-banner">
            <div className="banner-decoration">
              <div className="banner-circle banner-circle-1"></div>
              <div className="banner-circle banner-circle-2"></div>
              <div className="banner-circle banner-circle-3"></div>
              <div className="banner-dots"></div>
            </div>
            <div className="banner-content">
              <p className="banner-greeting">Selamat Datang Kembali</p>
              <h2 className="banner-title">Halo, {user?.name || "Alex"}! 👋</h2>
              <p className="banner-subtitle">
                Perjalanan akademikmu <strong>terlihat luar biasa</strong> semester ini.
              </p>
            </div>
            <div className="banner-actions">
              <button className="btn-primary-white" id="export-report-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Ekspor Laporan
              </button>
              <button className="btn-outline-white" id="view-courses-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                Lihat Kursus
              </button>
            </div>
          </section>

          {/* ---- STAT CARDS ---- */}
          <section className="stat-overview">
            {/* Overall Progress (circular ring) */}
            <div className="stat-card progress-card">
              <div className="stat-card-accent accent-blue"></div>
              <p className="stat-label">OVERALL PROGRESS</p>
              <div className="progress-ring-wrap">
                <div className="progress-ring-info">
                  <p className="stat-value">
                    {stats.overallProgress}<span className="stat-unit">%</span>
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
                    <circle className="ring-bg" cx="36" cy="36" r={RADIUS} />
                    <circle
                      className="ring-fill"
                      cx="36"
                      cy="36"
                      r={RADIUS}
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                      stroke="url(#ringGradient)"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                    />
                  </svg>
                  <div className="ring-label">{stats.overallProgress}%</div>
                </div>
              </div>
            </div>

            {/* Completed Modules */}
            <div className="stat-card">
              <div className="stat-card-accent accent-green"></div>
              <div className="stat-icon-wrap green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">COMPLETED</p>
                <p className="stat-value">
                  {stats.completedModules} <span className="stat-unit">Modules</span>
                </p>
                <p className="stat-change up">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  +4 minggu ini
                </p>
              </div>
            </div>

            {/* Pending Assignments */}
            <div className="stat-card">
              <div className="stat-card-accent accent-orange"></div>
              <div className="stat-icon-wrap orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">PENDING</p>
                <p className="stat-value">
                  {stats.pendingAssignments} <span className="stat-unit">Assignments</span>
                </p>
                <p className="stat-change warning">Tenggat dalam 2 hari</p>
              </div>
            </div>
          </section>

          {/* ---- MAIN BODY ---- */}
          <div className="main-body-layout">

            {/* Active Courses */}
            <section>
              <div className="section-header">
                <h3 className="section-title">Active Courses</h3>
                <Link href="#" className="view-all-link" id="view-all-courses-link">
                  View All
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>

              <div className="course-grid">
                {displayCourses.map((course) => (
                  <div className="course-card" key={course.id}>
                    <div className="course-card-top">
                      <span className={`course-tag ${course.tagColor}`}>{course.tag}</span>
                      <button className="course-more-btn" aria-label="Opsi kursus">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="course-name">{course.title}</h4>
                    <p className="course-instructor">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      {course.instructor}
                    </p>
                    <div className="progress-section">
                      <div className="progress-label">
                        <span className="progress-text">Course Progress</span>
                        <span className="progress-pct">{course.progress}%</span>
                      </div>
                      <div className="progress-track">
                        <div
                          className={`progress-fill ${course.progressColor}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className={`course-action-btn ${course.actionType}`}>
                      {course.action}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* RIGHT PANEL */}
            <aside className="right-panel">

              {/* Deadlines */}
              <div className="deadlines-card">
                <div className="deadlines-header">
                  <h3 className="section-title">Deadlines</h3>
                  <button className="icon-btn" id="filter-deadlines-btn" title="Filter">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="18" x2="12" y2="18" />
                    </svg>
                  </button>
                </div>

                <ul className="deadlines-list">
                  <li className="deadline-item">
                    <div className="deadline-date-block urgent">
                      <span className="deadline-month">OCT</span>
                      <span className="deadline-day">12</span>
                    </div>
                    <div className="deadline-info">
                      <p className="deadline-title">Algorithm Analysis Project</p>
                      <p className="deadline-course">Data Structures &amp; Algorithms</p>
                      <span className="deadline-badge urgent">Due in 2 days</span>
                    </div>
                  </li>
                  <li className="deadline-item">
                    <div className="deadline-date-block">
                      <span className="deadline-month">OCT</span>
                      <span className="deadline-day">15</span>
                    </div>
                    <div className="deadline-info">
                      <p className="deadline-title">Neural Network Quiz</p>
                      <p className="deadline-course">Machine Learning</p>
                    </div>
                  </li>
                  <li className="deadline-item">
                    <div className="deadline-date-block">
                      <span className="deadline-month">OCT</span>
                      <span className="deadline-day">18</span>
                    </div>
                    <div className="deadline-info">
                      <p className="deadline-title">Set Theory Problem Set</p>
                      <p className="deadline-course">Discrete Mathematics</p>
                    </div>
                  </li>
                </ul>

                <Link href="#" className="view-calendar-link" id="view-calendar-link">
                  View Full Calendar →
                </Link>
              </div>

              {/* Registration CTA */}
              <div className="registration-cta">
                <div className="cta-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 17H2a3 3 0 000 6h20M1 4l10 7 10-7V20" />
                  </svg>
                </div>
                <h3 className="cta-title">Registration Open</h3>
                <p className="cta-desc">
                  Spring semester registration is available. Secure your electives early.
                </p>
                <div className="cta-buttons">
                  <button className="btn-cta-primary" id="register-now-btn">Register Now</button>
                  <button className="btn-cta-secondary" id="learn-more-btn">Learn More</button>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="performance-stats">
                <div className="stat-card-mini">
                  <span className="stat-mini-label">GPA</span>
                  <span className="stat-mini-value">3.82</span>
                </div>
                <div className="stat-card-mini">
                  <span className="stat-mini-label">RANK</span>
                  <span className="stat-mini-value">#12</span>
                </div>
              </div>

            </aside>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <p><strong>Ruang Dosen</strong> &copy; 2024 Platform Akademik. All rights reserved.</p>
          <div className="footer-links">
            <Link href="#">Kebijakan Privasi</Link>
            <Link href="#">Syarat Layanan</Link>
            <Link href="#">Pusat Bantuan</Link>
            <Link href="#">Hubungi Support</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
