# 📋 Catatan Evaluasi & Technical Debt (Buku Dosa)

Dokumen ini berisi catatan celah teknis (Technical Debt) dan temuan *bug* minor yang ditemukan setelah sebuah Sprint selesai. Catatan ini dikumpulkan agar tidak terlupakan dan **wajib dieksekusi pada Sprint 5 (Support Integrasi & Bug Fixing)** sebelum rilis ke Production.

---

## 🛑 Temuan Evaluasi: Sprint 1 & 2

### 1. Pintu "Buat Kelas" Belum Digembok (Tingkat: 🔴 TINGGI)
*   **Modul:** Course (Tugas Tio - Sprint 1)
*   **Lokasi File:** `apps/api/src/course/course.controller.ts` -> `POST /courses`
*   **Masalah:** Endpoint pembuatan mata kuliah belum dilindungi autentikasi. Saat ini siapapun bisa menembak API tersebut tanpa token JWT.
*   **Solusi di Sprint 5:** Tambahkan baris kode `@UseGuards(JwtAuthGuard)` tepat di atas *method* `create()`.

### 2. Absennya Pipa Validasi DTO / Class-Validator (Tingkat: 🟡 RENDAH)
*   **Modul:** Auth (Tugas Ariel - Sprint 1)
*   **Lokasi File:** `apps/api/src/auth/auth.controller.ts` -> `POST /register`
*   **Masalah:** Sistem menerima input *role* apa saja (misal: "HACKER") dari sisi *Controller*, dan mendelegasikan pemblokiran ke Prisma sehingga memicu *Error 500 Server Error* alih-alih *Error 400 Bad Request*.
*   **Solusi di Sprint 5 (Opsional):** Install library `class-validator` dan `class-transformer`, lalu buat *Data Transfer Object* (DTO) untuk meregulasi dan memfilter input JSON agar pesan error lebih elegan.

### 3. Logika Update Profil JSON Kosong (Tingkat: ⚪ BISA DIABAIKAN)
*   **Modul:** Auth (Tugas Ariel - Sprint 2)
*   **Lokasi File:** `apps/api/src/auth/auth.service.ts` -> `updateProfile()`
*   **Masalah:** Jika user menembak API dengan JSON kosong `{}`, sistem tetap memproses *query* ke database meski pada akhirnya tidak ada satu pun field yang diubah.
*   **Solusi di Sprint 5 (Opsional):** Tambahkan pengecekan `if (!data.name && !data.password) throw new BadRequestException('Tidak ada data yang diubah')` sebelum mengeksekusi Prisma.

---
*(Catatan ini akan terus ditambahkan oleh sistem setiap kali sebuah Sprint selesai dievaluasi).*
