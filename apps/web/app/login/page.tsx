"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/api/apiConfig";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Panggil endpoint API login
      const response = await fetch(buildApiUrl("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal login. Periksa email dan password Anda.");
      }

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Simpan token ke cookie untuk diakses oleh Server Components (berlaku 1 hari)
      document.cookie = `token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
      
      alert("Login Berhasil! Selamat datang " + data.user.name);
      router.push("/dashboard_dosen");
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="navbar">
        <div className="brand">Ruang Dosen</div>
        <nav className="nav-links">
          <Link href="#">Help</Link>
          <Link href="#">About</Link>
          <button className="btn-support">Contact Support</button>
        </nav>
      </header>

      <main className="login-container">
        {/* Bagian Kiri - Gambar */}
        <div className="image-section">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Gedung Kampus"
            className="campus-image"
          />
        </div>

        {/* Bagian Kanan - Form Login */}
        <div className="form-section">
          <div className="form-wrapper">
            <h1>Masuk ke Ruang Dosen</h1>
            <p className="subtitle">
              Silakan masukkan akun akademis Anda untuk melanjutkan.
            </p>

            {/* Tampilkan pesan error jika ada */}
            {error && (
              <div style={{ color: "red", backgroundColor: "#FEE2E2", padding: "10px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email">Email / NIM</label>
                <input
                  type="text"
                  id="email"
                  placeholder="contoh: dosen@kampus.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password / PIC</label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <svg
                    className="toggle-password"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Ingat Saya
                </label>
                <Link href="#" className="forgot-password">
                  Lupa Password?
                </Link>
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <p className="register-link">
              Belum punya akun?{" "}
              <Link href="#">Daftar di sini</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
