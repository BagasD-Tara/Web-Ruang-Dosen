# Ruang Dosen - Changelog (Sprint / fe-dashboard)

Dokumen ini berisi rangkuman seluruh perubahan yang telah dilakukan pada direktori `apps/api` (Backend) dan `apps/web` (Frontend) sejak awal melakukan *pull* dari branch `origin/develop` hingga saat ini.

---

## 🌐 Perubahan pada Frontend (`apps/web`)

1. **Halaman Login Baru (`app/login`)**
   - Mengimplementasikan desain statis `login.html` menjadi komponen Next.js (`page.tsx`).
   - Menyertakan validasi form dasar dan integrasi visual.

2. **Dashboard Dosen (`app/dashboard_dosen`)**
   - Membuat tampilan antarmuka (UI) interaktif untuk Dashboard Dosen.
   - Fitur utama meliputi:
     - Ringkasan statistik (Mata Kuliah Aktif, Total Mahasiswa, Tugas Pending, Proyek Riset).
     - Daftar Mata Kuliah yang diampu beserta indikator perkembangan silabus (Syllabus Completion).
     - Panel *Recent Submissions* untuk melihat tugas mahasiswa yang baru dikirim dan statusnya (Perlu Ditinjau / Sudah Dinilai).
   - Pemisahan styling khusus pada `dashboard.css` dengan variabel tema (*design tokens*).

3. **Dashboard Admin (`app/dashboard_admin`)**
   - Menduplikasi dan mengadaptasi *layout* Dashboard Dosen khusus untuk kebutuhan Administrator.
   - Fitur utama meliputi:
     - Ringkasan statistik platform (*Total Mata Kuliah, Total Dosen, Total Mahasiswa, Tugas Pending*).
     - Warna aksen merah (*red/purple gradient*) untuk membedakan secara visual dari Dashboard Dosen.
     - Akses manajemen global (Dosen, Mahasiswa, Seluruh Mata Kuliah).

4. **Dashboard Mahasiswa (`app/dashboard_mahasiswa`)**
   - Membuat antarmuka Dashboard Mahasiswa yang mencakup ringkasan metrik (Overall Progress, Completed Modules, Pending Assignments).
   - Menampilkan daftar Mata Kuliah Aktif beserta progres belajar (*progress bar*).
   - Menambahkan panel *Deadlines* dan statistik mini (GPA dan Peringkat).

5. **Penyelarasan Desain Sidebar Navigasi (Seluruh Dashboard)**
   - Menyamakan struktur navigasi sidebar di ketiga dashboard (Dosen, Admin, Mahasiswa) menjadi lebih minimalis (Dashboard, Courses, Calendar, Resources).
   - Memperbarui gaya indikator menu aktif (*blue edge line* dan latar biru muda) tanpa label kategori yang terkesan penuh.

6. **Routing Halaman Utama (`app/page.tsx`)**
   - Memperbarui halaman utama (root `/`) agar secara otomatis me-redirect pengunjung langsung ke halaman `/login`.

---

## ⚙️ Perubahan pada Backend (`apps/api`)

1. **Perbaikan E2E Tests (`test/admin.e2e-spec.ts`)**
   - Memperbaiki error TypeScript (*Strict Null Checks* - `Object is possibly 'null'`) pada file `admin.e2e-spec.ts`.
   - Menambahkan *non-null assertion* (`!`) pada `adminRecord!.id` dan `studentRecord!.id` untuk memastikan pengujian E2E dapat di-compile dengan sukses.

2. **Pembaruan Dependensi (`package.json` & `package-lock.json`)**
   - Menyelesaikan masalah kerentanan (vulnerability) dari proses `npm install` dengan melakukan pembaruan versi (bump version) pada library NestJS.
   - Menambahkan script `dev` untuk kemudahan menjalankan server development.

   **Detail Perubahan `apps/api/package.json`**:
   
   *Sebelum:*
   ```json
     "scripts": {
       "build": "nest build",
       "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
   ```
   *Sesudah:*
   ```json
     "scripts": {
       "dev": "npm run start:dev",
       "build": "nest build",
       "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
   ```

   *Sebelum:*
   ```json
     "dependencies": {
       "@nestjs/common": "^11.0.1",
       "@nestjs/core": "^11.0.1",
       "@nestjs/jwt": "^11.0.2",
       "@nestjs/passport": "^11.0.5",
       "@nestjs/platform-express": "^11.0.1",
       "@nestjs/swagger": "^11.4.3",
   ```
   *Sesudah:*
   ```json
     "dependencies": {
       "@nestjs/common": "^11.0.1",
       "@nestjs/core": "^11.0.1",
       "@nestjs/jwt": "^11.0.2",
       "@nestjs/passport": "^11.0.5",
       "@nestjs/platform-express": "^11.1.24",
       "@nestjs/swagger": "^11.4.3",
   ```

   **Detail Perubahan `package-lock.json` (Root)**:
   - Terjadi pembaruan otomatis referensi dependencies turunan dari `platform-express` yang menambal kerentanan (seperti *multer* dan *cors*):
   
   *Sebelum:*
   ```json
       "node_modules/@nestjs/platform-express": {
         "version": "11.0.1",
         "resolved": "https://registry.npmjs.org/@nestjs/platform-express/-/platform-express-11.0.1.tgz",
         "dependencies": {
           "cors": "^2.8.5",
           "multer": "^1.4.4"
         }
       }
   ```
   *Sesudah:*
   ```json
       "node_modules/@nestjs/platform-express": {
         "version": "11.1.24",
         "resolved": "https://registry.npmjs.org/@nestjs/platform-express/-/platform-express-11.1.24.tgz",
         "dependencies": {
           "cors": "^2.8.5",
           "multer": "1.4.5-lts.1"
         }
       }
   ```

---

*Catatan: Seluruh perubahan di atas belum di-commit (uncommitted changes) dan masih berada pada branch lokal `fe-dashboard`.*
