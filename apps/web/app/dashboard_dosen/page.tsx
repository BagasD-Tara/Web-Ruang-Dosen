"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/api/apiConfig";
import { DosenDashboardLayout } from "@/components/layout/DosenDashboardLayout";
import "./dashboard.css";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeCourses: 0,
    totalStudents: 0,
    pendingSubmissions: 8, // Mocked for now
    researchProjects: 3, // Mocked for now
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

        let currentUser = JSON.parse(localStorage.getItem("user") || "null");
        if (currentUser) setUser(currentUser);

        try {
          const profileRes = await fetch(buildApiUrl("/auth/profile"), {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setUser(profileData);
            currentUser = profileData;
          }
        } catch (e) {
          console.error("Failed to fetch profile", e);
        }

        const coursesRes = await fetch(buildApiUrl("/courses"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (coursesRes.ok) {
          const allCourses = await coursesRes.json();
          const myCourses = allCourses.filter(
            (c: any) => c.instructor?.id === currentUser?.id || c.instructorId === currentUser?.id
          );
          
          setCourses(myCourses);

          const totalStudents = myCourses.reduce(
            (acc: number, curr: any) => acc + (curr._count?.enrollments || 0),
            0
          );

          setStats((prev) => ({
            ...prev,
            activeCourses: myCourses.length,
            totalStudents: totalStudents,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Memuat...</div>;
  }

  return (
    <DosenDashboardLayout>
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
            <h2 className="banner-title">Halo, {user?.name || "Dosen"}! 👋</h2>
            <p className="banner-subtitle">Anda memiliki <strong>{stats.pendingSubmissions} tugas mahasiswa</strong> yang menunggu untuk ditinjau hari ini.</p>
          </div>
          <div className="banner-actions">
            <button className="btn-primary-white" id="review-submissions-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Tinjau Tugas
            </button>
            <button className="btn-outline-white" id="view-schedule-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Jadwal Hari Ini
            </button>
          </div>
        </section>

        {/* ---- STAT CARDS ---- */}
        <section className="stat-overview">
          <div className="stat-card">
            <div className="stat-card-accent accent-blue"></div>
            <div className="stat-icon-wrap blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
            <div className="stat-body">
              <p className="stat-label">Mata Kuliah Aktif</p>
              <p className="stat-value">{stats.activeCourses}</p>
              <p className="stat-change neutral">Semester Berjalan</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-accent accent-green"></div>
            <div className="stat-icon-wrap green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="stat-body">
              <p className="stat-label">Total Mahasiswa</p>
              <p className="stat-value">{stats.totalStudents}</p>
              <p className="stat-change up">
                Di semua mata kuliah
              </p>
            </div>
          </div>

          <div className="stat-card alert-card">
            <div className="stat-card-accent accent-orange"></div>
            <div className="stat-icon-wrap orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div className="stat-body">
              <p className="stat-label">Tugas Pending</p>
              <p className="stat-value">{stats.pendingSubmissions}</p>
              <p className="stat-change" style={{ color: "var(--orange)" }}>Perlu ditinjau segera</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-accent accent-purple"></div>
            <div className="stat-icon-wrap purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="stat-body">
              <p className="stat-label">Proyek Riset</p>
              <p className="stat-value">{stats.researchProjects}</p>
              <p className="stat-change neutral">Data statis</p>
            </div>
          </div>
        </section>

        {/* ---- MAIN BODY ---- */}
        <div className="main-body-layout">
          {/* Course Management */}
          <section className="course-management">
            <div className="section-header">
              <h3 className="section-title">Manajemen Mata Kuliah</h3>
              <Link href="/dosen/courses" className="view-all-link">
                Lihat Semua
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </Link>
            </div>

            <div className="course-grid">
              {courses.length > 0 ? (
                courses.map((course, index) => {
                  const isPurple = index % 2 !== 0;
                  return (
                    <div className="course-card" key={course.id}>
                      <div className="course-card-top">
                        <div className={`course-icon-wrap ${isPurple ? "purple" : "blue"}`}>
                          {isPurple ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                            </svg>
                          )}
                        </div>
                        <span className="course-badge">{course.id.substring(0, 8).toUpperCase()}</span>
                      </div>
                      <h4 className="course-name">{course.title}</h4>
                      <div className="course-meta">
                        <span>{course.description ? course.description.substring(0, 20) + "..." : "Tanpa deskripsi"}</span>
                        <span className="course-meta-dot"></span>
                        <span>{course._count?.enrollments || 0} Mahasiswa</span>
                      </div>
                      <div className="progress-section">
                        <div className="progress-label">
                          <span className="progress-text">Penyelesaian Silabus</span>
                          <span className="progress-pct">{isPurple ? "40%" : "65%"}</span>
                        </div>
                        <div className="progress-track">
                          <div className={`progress-fill ${isPurple ? "purple" : "blue"}`} style={{ width: isPurple ? "40%" : "65%" }}></div>
                        </div>
                      </div>
                      <div className="course-actions">
                        <Link href={`/dosen/courses/${course.id}`} className="btn-outline" style={{ textDecoration: 'none', textAlign: 'center' }}>Kelola Modul</Link>
                        <Link href={`/dosen/courses/${course.id}`} className="btn-filled" style={{ textDecoration: 'none', textAlign: 'center' }}>Detail</Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "30px", textAlign: "center", border: "1px dashed var(--border)", borderRadius: "var(--radius-lg)" }}>
                  <p style={{ color: "var(--text-muted)", marginBottom: "10px" }}>Anda belum memiliki mata kuliah yang diampu.</p>
                  <button className="btn-filled">Buat Mata Kuliah Baru</button>
                </div>
              )}
            </div>
          </section>

          {/* Recent Submissions Panel */}
          <aside className="submissions-panel">
            <div className="panel-header">
              <div className="section-header">
                <h3 className="section-title">
                  Tugas Terbaru
                </h3>
                <Link href="#" className="view-all-link">
                  Lihat Semua
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
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
                  <span className="status-badge status-review">Perlu Ditinjau</span>
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
                  <span className="status-badge status-review">Perlu Ditinjau</span>
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
                  <span className="status-badge status-graded">Sudah Dinilai</span>
                </div>
              </div>
            </div>

            <div className="panel-footer">
              <Link href="#" className="view-all-btn" id="view-all-submissions-btn">
                Lihat Semua Tugas
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </DosenDashboardLayout>
  );
}

