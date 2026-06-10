"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/api/apiConfig";
import "./dashboard.css";

export default function DashboardAdminPage() {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLecturers: 0,
    totalStudents: 0,
    pendingSubmissions: 8, // Mocked for now
  });
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
          const profileRes = await fetch(buildApiUrl("/auth/profile"), {
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

        // Fetch semua courses (admin melihat semua)
        const coursesRes = await fetch(buildApiUrl("/courses"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (coursesRes.ok) {
          const allCourses = await coursesRes.json();
          setCourses(allCourses.slice(0, 3)); // Tampilkan 3 kursus terbaru

          // Kalkulasi statistik
          const totalStudents = allCourses.reduce(
            (acc: number, curr: any) => acc + (curr._count?.enrollments || 0),
            0
          );

          // Hitung unique lecturers
          const lecturerIds = new Set(
            allCourses
              .filter((c: any) => c.instructor?.id || c.instructorId)
              .map((c: any) => c.instructor?.id || c.instructorId)
          );

          setStats((prev) => ({
            ...prev,
            totalCourses: allCourses.length,
            totalStudents: totalStudents,
            totalLecturers: lecturerIds.size,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Fungsi utilitas untuk mendapatkan inisial nama
  const getInitials = (name: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Memuat...
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* ============================================================
          SIDEBAR
      ============================================================ */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <div className="logo-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="logo-text">
            Ruang<span>Dosen</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-item">
            <Link href="/dashboard_admin" className="nav-link active">
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
              {courses.map((c) => (
                <Link key={c.id} href="#" className="sub-nav-link">{c.title}</Link>
              ))}
              <Link href="#" className="sub-nav-link">+ Add Course</Link>
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
              <p className="user-name">{user?.name || "Admin"}</p>
              <p className="user-role">
                {user?.role === "ADMIN" ? "Administrator" : user?.role || "Admin"}
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
          <div>
            <p className="page-title">Dashboard Admin</p>
            <p className="page-subtitle">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="top-bar-right">
            <div className="search-bar">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="search" placeholder="Cari kursus, pengguna..." />
            </div>

            <button className="icon-btn" id="notif-btn" title="Notifikasi">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="notif-dot"></span>
            </button>

            <button className="icon-btn" id="settings-btn" title="Pengaturan">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
              <p className="banner-greeting">Panel Administrasi</p>
              <h2 className="banner-title">
                Halo, {user?.name || "Admin"}! 👋
              </h2>
              <p className="banner-subtitle">
                Terdapat{" "}
                <strong>{stats.pendingSubmissions} tugas mahasiswa</strong> yang
                menunggu persetujuan hari ini.
              </p>
            </div>
            <div className="banner-actions">
              <button className="btn-primary-white" id="review-submissions-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Tinjau Tugas
              </button>
              <button className="btn-outline-white" id="manage-users-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
                Kelola Pengguna
              </button>
            </div>
          </section>

          {/* ---- STAT CARDS ---- */}
          <section className="stat-overview">
            <div className="stat-card">
              <div className="stat-card-accent accent-blue"></div>
              <div className="stat-icon-wrap blue">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">Total Mata Kuliah</p>
                <p className="stat-value">{stats.totalCourses}</p>
                <p className="stat-change neutral">Seluruh Platform</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-accent accent-purple"></div>
              <div className="stat-icon-wrap purple">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">Total Dosen</p>
                <p className="stat-value">{stats.totalLecturers}</p>
                <p className="stat-change neutral">Terdaftar Aktif</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-accent accent-green"></div>
              <div className="stat-icon-wrap green">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">Total Mahasiswa</p>
                <p className="stat-value">{stats.totalStudents}</p>
                <p className="stat-change up">Di semua mata kuliah</p>
              </div>
            </div>

            <div className="stat-card alert-card">
              <div className="stat-card-accent accent-orange"></div>
              <div className="stat-icon-wrap orange">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <div className="stat-body">
                <p className="stat-label">Tugas Pending</p>
                <p className="stat-value">{stats.pendingSubmissions}</p>
                <p className="stat-change" style={{ color: "var(--orange)" }}>
                  Perlu ditinjau segera
                </p>
              </div>
            </div>
          </section>

          {/* ---- MAIN BODY ---- */}
          <div className="main-body-layout">

            {/* Course Management */}
            <section className="course-management">
              <div className="section-header">
                <h3 className="section-title">Manajemen Mata Kuliah</h3>
                <Link href="#" className="view-all-link">
                  Lihat Semua
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>

              <div className="course-grid">
                {courses.length > 0 ? (
                  courses.map((course, index) => {
                    const colorVariants = ["blue", "purple", "green"];
                    const color = colorVariants[index % colorVariants.length];
                    const progressValues = ["65%", "40%", "80%"];
                    const fillColors = ["blue", "purple", "green"];
                    const progress = progressValues[index % progressValues.length];
                    const fillColor = fillColors[index % fillColors.length];
                    return (
                      <div className="course-card" key={course.id}>
                        <div className="course-card-top">
                          <div className={`course-icon-wrap ${color}`}>
                            {index % 3 === 0 ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                              </svg>
                            ) : index % 3 === 1 ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="20" x2="18" y2="10" />
                                <line x1="12" y1="20" x2="12" y2="4" />
                                <line x1="6" y1="20" x2="6" y2="14" />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                              </svg>
                            )}
                          </div>
                          <span className="course-badge">
                            {course.id.substring(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <h4 className="course-name">{course.title}</h4>
                        <div className="course-meta">
                          <span>
                            {course.instructor?.name ||
                              course.description?.substring(0, 20) + "..." ||
                              "Tanpa deskripsi"}
                          </span>
                          <span className="course-meta-dot"></span>
                          <span>{course._count?.enrollments || 0} Mahasiswa</span>
                        </div>
                        <div className="progress-section">
                          <div className="progress-label">
                            <span className="progress-text">
                              Penyelesaian Silabus
                            </span>
                            <span className="progress-pct">{progress}</span>
                          </div>
                          <div className="progress-track">
                            <div
                              className={`progress-fill ${fillColor}`}
                              style={{ width: progress }}
                            ></div>
                          </div>
                        </div>
                        <div className="course-actions">
                          <button className="btn-outline">Kelola Modul</button>
                          <button className="btn-filled">Detail</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      padding: "30px",
                      textAlign: "center",
                      border: "1px dashed var(--border)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--text-muted)",
                        marginBottom: "10px",
                      }}
                    >
                      Belum ada mata kuliah yang tersedia.
                    </p>
                    <button className="btn-filled">Buat Mata Kuliah Baru</button>
                  </div>
                )}
              </div>
            </section>

            {/* Recent Submissions Panel */}
            <aside className="submissions-panel">
              <div className="panel-header">
                <div className="section-header">
                  <h3 className="section-title">Tugas Terbaru</h3>
                  <Link href="#" className="view-all-link">
                    Lihat Semua
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="panel-body">
                {/* Submission 1 */}
                <div className="submission-item">
                  <div className="submission-top">
                    <div className="submission-student">
                      <div className="student-avatar avatar-blue">BS</div>
                      <span className="student-name">Budi Santoso</span>
                    </div>
                    <span className="submission-time">2j lalu</span>
                  </div>
                  <p className="submission-title">Binary Tree Implementation</p>
                  <div className="submission-footer">
                    <span className="tag tag-blue">Data Structures</span>
                    <span className="status-badge status-review">
                      Perlu Ditinjau
                    </span>
                  </div>
                </div>

                {/* Submission 2 */}
                <div className="submission-item">
                  <div className="submission-top">
                    <div className="submission-student">
                      <div className="student-avatar avatar-green">SA</div>
                      <span className="student-name">Siti Aminah</span>
                    </div>
                    <span className="submission-time">4j lalu</span>
                  </div>
                  <p className="submission-title">Graph Traversal Essay</p>
                  <div className="submission-footer">
                    <span className="tag tag-purple">Algorithm Analysis</span>
                    <span className="status-badge status-review">
                      Perlu Ditinjau
                    </span>
                  </div>
                </div>

                {/* Submission 3 */}
                <div className="submission-item">
                  <div className="submission-top">
                    <div className="submission-student">
                      <div className="student-avatar avatar-orange">RF</div>
                      <span className="student-name">Reza Fahlevi</span>
                    </div>
                    <span className="submission-time">Kemarin</span>
                  </div>
                  <p className="submission-title">Neural Network Basics</p>
                  <div className="submission-footer">
                    <span className="tag tag-pink">Machine Learning</span>
                    <span className="status-badge status-graded">
                      Sudah Dinilai
                    </span>
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <Link
                  href="#"
                  className="view-all-btn"
                  id="view-all-submissions-btn"
                >
                  Lihat Semua Tugas
                </Link>
              </div>
            </aside>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <p>
            <strong>Ruang Dosen</strong> &copy; 2024 Platform Akademik. All
            rights reserved.
          </p>
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
