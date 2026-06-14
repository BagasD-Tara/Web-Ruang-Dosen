# 📝 Detail Judul & Deskripsi Commit / Pull Request GitHub

Berikut adalah teks lengkap yang dapat Anda gunakan saat melakukan Pull Request dari branch `fix-all-by-aril` ke `develop`.

---

## 📌 Judul Pull Request / Commit
`feat(frontend-polish): Fix Assignment Submissions Count, Integrate Real Student Grades, and Enhance Dashboard & Calendar UI`

---

## 📖 Deskripsi Pull Request

### **🙏 Permohonan Maaf & Pendahuluan**
> Sebelum menjelaskan detail perubahan, kami memohon maaf yang sebesar-besarnya atas beberapa kendala teknis, adanya nilai-nilai yang sempat ter-hardcode (seperti jumlah submission tugas yang selalu tampil `0`), kegagalan senyap (*silent failure*) pada menu pengelolaan dosen, serta error kompilasi TypeScript pada pengujian ketat (*strict null checks*) di versi sebelumnya.
> 
> Pull Request ini diajukan untuk menyelesaikan seluruh kendala tersebut dengan mengintegrasikan API backend secara penuh ke komponen frontend, memperbaiki fungsionalitas kuis dan tugas mahasiswa, serta memoles tampilan antarmuka (UI) agar siap dipindahkan (*push*) ke branch `develop`.

---

### **🎨 Rincian Penambahan & Perubahan pada Frontend (Web)**

Berikut adalah detail penambahan dan pembaruan antarmuka (UI/UX) pada sisi frontend beserta alasan teknisnya secara rinci:

#### **1. Integrasi Status dan Nilai Tugas Mahasiswa (`CourseDetailView.tsx`)**
* **Yang Ditambah/Diubah**: 
  * Menambahkan state `assignmentSubmissions` dan efek samping (`useEffect`) untuk memanggil API endpoint baru `GET /assignments/:id/my-submission`.
  * Memperbarui antarmuka di dalam tab **Tugas** (Assignment) dengan menampilkan *badge* status dinamis berdasarkan status pengumpulan riil mahasiswa:
    * **Belum Dikerjakan (Badge Abu-abu)**: Ditampilkan jika mahasiswa belum mengunggah file tugas.
    * **Menunggu Penilaian (Badge Kuning)**: Ditampilkan setelah mahasiswa mengunggah jawaban namun dosen belum memberi nilai.
    * **Sudah Dinilai (Badge Hijau + Skor)**: Menampilkan tulisan *"Sudah Dinilai"* beserta skor riil mahasiswa (misal: `Skor: 85/100`) jika dosen sudah menilai di sistem.
* **Alasan Detail**: 
  * Sebelumnya, halaman detail mata kuliah mahasiswa hanya menampilkan link tugas biasa tanpa informasi apakah tugas tersebut sudah dikerjakan, sedang diperiksa, atau berapa nilai yang didapat. Perubahan ini memberikan umpan balik instan kepada mahasiswa mengenai status akademik mereka tanpa perlu membuka navigasi lain.

#### **2. Perbaikan Penghitung Pengumpulan Tugas Dosen (`courseAdapter.ts`)**
* **Yang Diubah**:
  * Mengubah pemetaan data tugas dosen pada fungsi `mapApiAssignmentsToLecturerAssessments` agar tidak lagi menggunakan nilai hardcode `submittedCount: 0`.
  * Sekarang sistem membaca data agregat `assignment._count?.submissions ?? 0` langsung dari respons database backend.
* **Alasan Detail**:
  * Pada versi sebelumnya, dosen selalu melihat angka *"0 Submissions"* di dashboard manajemen kelas meskipun seluruh mahasiswa sekelas sudah mengumpulkan tugas tersebut. Hal ini membingungkan dosen dan menghambat proses penilaian. Dengan pembaruan ini, dosen dapat memantau jumlah tugas masuk secara akurat dan real-time.

#### **3. Sinkronisasi Model Data & TypeScript Tipe (`courseApi.ts` & `course.ts`)**
* **Yang Ditambah/Diubah**:
  * Memperbarui interface `ApiAssignment` agar mendukung properti kontaminasi `_count` yang dikirim oleh backend.
  * Menambahkan field `submissionStatus` dan `score` pada tipe data global `CourseContentItem`.
  * Membuat fungsi penolong API `fetchMyAssignmentSubmissionApi(assignmentId, token)` di modul `courseApi.ts`.
* **Alasan Detail**:
  * Penyelarasan tipe data ini wajib dilakukan agar kompilator TypeScript (`tsc`) tidak memunculkan error *Strict Null Checks* saat proses build aplikasi diluncurkan di server produksi.

#### **4. Desain Autentikasi Premium (Halaman Login & Register)**
* **Yang Ditambah/Diubah**:
  * Mengembangkan antarmuka modern menggunakan perpaduan CSS custom (`login.css`).
  * Menerapkan efek *glassmorphism* pada panel form login/register, latar belakang gradien biru-ungu yang halus, serta micro-animations pada input field saat aktif (*focus state*).
  * Membuat halaman pendaftaran baru (`/register`) yang terhubung langsung ke API `POST /auth/register` dengan opsi pemilihan role (Mahasiswa, Dosen, Admin).
* **Alasan Detail**:
  * Halaman masuk awal yang menarik secara visual sangat penting bagi kenyamanan pengguna (*user experience*). Halaman sebelumnya masih berupa struktur dasar HTML kaku. Desain premium baru ini memberikan impresi pertama yang profesional bagi platform Ruang Dosen.

#### **5. Kalender Akademik & Event Kustom (`CalendarWorkspace.tsx`)**
* **Yang Ditambah/Diubah**:
  * Membuat komponen kalender bulanan interaktif lengkap dengan navigasi antar-bulan (Chevron).
  * Mengintegrasikan API perkuliahan untuk memetakan tanggal tenggat waktu (*deadline*) tugas mahasiswa secara otomatis ke kalender dalam bentuk bar warna **Merah**.
  * Menambahkan fitur agenda personal, di mana pengguna dapat mengeklik tanggal tertentu untuk membuat, memilih warna kategori (Biru, Ungu, Hijau, Kuning), dan menghapus agenda pribadi. Data agenda personal disimpan di dalam `localStorage` spesifik per ID akun.
* **Alasan Detail**:
  * Pengguna memerlukan satu layar terpadu untuk melihat semua deadline penting tanpa harus mengecek satu per satu kelas yang mereka ikuti. Adanya agenda personal juga memudahkan pengguna untuk menjadwalkan kegiatan belajarnya sendiri di platform.

#### **6. Penyatuan Shell Tata Letak Dashboard (Admin, Dosen, Mahasiswa)**
* **Yang Ditambah/Diubah**:
  * Menghapus duplikasi komponen layout lama dan memigrasikan seluruh struktur dashboard ke sistem layout tunggal berbasis `AppShell` dan menu navigasi samping (`SideNavBar`).
  * Memperbarui tampilan visual StatCard ringkasan (warna gradien ungu-merah untuk admin, gradien biru untuk dosen/mahasiswa).
* **Alasan Detail**:
  * Konsistensi navigasi sidebar mempermudah transisi antarmuka jika admin atau dosen berganti peran. Selain itu, penggunaan layout terpusat memangkas ukuran kode dan mempercepat loading aplikasi.

---

### **💻 Perubahan Pendukung pada Sisi Backend (API)**
- **Seeding Database Baru (`seed.ts`)**: Menambahkan user dengan domain resmi `@ruangdosen.ac.id` dan password default `password123`.
- **Endpoint Baru**:
  - `GET /assignments/:id/my-submission` untuk mengambil data nilai dan status tugas mahasiswa bersangkutan.
- **Query Optimization**: Mengintegrasikan select `_count` submission di `course.service.ts` agar backend efisien mengirim total tugas terkumpul tanpa membebani performa database.
