# Daftar Fitur Ruang Dosen — Penjelasan Lengkap

> Total: 35 fitur · 3 Pilar Inti + Pendukung

---

## 📚 PILAR 1 — Course Material (8 fitur)
> Mata kuliah dan materi pembelajaran. Ini adalah wadah utama di aplikasi — semua kuis, tugas, dan praktikum hidup di dalam sebuah Course.

### 1. Buat Mata Kuliah Baru
Dosen bisa membuat mata kuliah baru di sistem. Data yang diisi: judul matkul (contoh: "Algoritma dan Struktur Data") dan deskripsi singkat tentang matkul tersebut. Setelah dibuat, matkul ini muncul di daftar dan siap diisi materi, kuis, tugas, dan praktikum.

### 2. Edit & Hapus Mata Kuliah
Dosen bisa mengubah judul atau deskripsi matkul yang sudah dibuat. Jika matkul sudah tidak diperlukan, dosen juga bisa menghapusnya. Saat dihapus, semua isi di dalamnya (materi, kuis, tugas, lab) ikut terhapus. Maka sebelum hapus, sistem menampilkan konfirmasi peringatan.

### 3. Mahasiswa Enroll ke Mata Kuliah
Mahasiswa bisa "mendaftar" atau "mengambil" mata kuliah tertentu. Sebelum enroll, mahasiswa hanya bisa melihat judul dan deskripsi matkul. Setelah enroll, mahasiswa mendapat akses penuh ke semua materi, kuis, tugas, dan praktikum di dalam matkul tersebut.

### 4. Lihat Daftar Mata Kuliah yang Tersedia
Halaman yang menampilkan semua mata kuliah di sistem dalam bentuk card/kotak. Mahasiswa bisa melihat judul, dosen pengampu, dan deskripsi singkat. Ada fitur pencarian untuk mencari matkul berdasarkan nama.

### 5. Lihat Mata Kuliah yang Sudah Diambil
Halaman khusus yang hanya menampilkan matkul yang sudah di-enroll oleh mahasiswa tersebut. Berbeda dari daftar lengkap — ini adalah "rak buku pribadi" mahasiswa.

### 6. Upload Materi Pembelajaran
Dosen bisa menambahkan materi ke dalam matkul. Ada 3 tipe materi: (1) **Teks** — artikel atau catatan yang langsung ditulis, (2) **Video** — link video pembelajaran (YouTube atau lainnya), (3) **Dokumen** — file PDF, PPT, atau dokumen lain yang bisa didownload mahasiswa.

### 7. Edit & Hapus Materi
Dosen bisa mengubah isi materi yang sudah diupload (misalnya memperbaiki typo atau mengganti link video). Jika materi sudah tidak relevan, dosen bisa menghapusnya dengan konfirmasi terlebih dahulu.

### 8. Baca / Tonton Materi
Mahasiswa bisa membuka dan mempelajari materi. Jika tipe teks: konten ditampilkan langsung di halaman dengan formatting rapi. Jika tipe video: video player muncul dan bisa ditonton langsung. Jika tipe dokumen: tersedia tombol download untuk menyimpan file.

---

## 🎮 PILAR 2 — Interactive Quizzes (9 fitur + Timer)
> Kuis interaktif dengan gamifikasi. Mahasiswa mengerjakan soal pilihan ganda, dinilai otomatis oleh sistem, dan mendapat poin XP jika lulus. XP dikumpulkan untuk menentukan ranking di leaderboard.

### 1. Buat Kuis Baru
Dosen membuat kuis di dalam mata kuliah. Data yang diisi: judul kuis, XP reward (berapa poin yang didapat jika lulus, contoh: 100 XP), skor minimum untuk lulus (contoh: 70 dari 100), dan time limit (berapa menit waktu pengerjaan). Setelah dibuat, dosen perlu menambahkan soal ke dalamnya.

### 2. Tambah Soal Pilihan Ganda
Dosen menambahkan soal ke dalam kuis. Setiap soal berisi: pertanyaan, 4 opsi jawaban (A, B, C, D), dan penanda jawaban mana yang benar. Dosen bisa menambahkan banyak soal ke satu kuis.

### 3. Edit & Hapus Kuis dan Soal
Dosen bisa mengubah detail kuis (judul, XP, skor minimum) dan mengubah isi soal (pertanyaan, opsi, jawaban benar). Kuis dan soal juga bisa dihapus jika tidak diperlukan lagi.

### 4. Mengerjakan Kuis
Mahasiswa masuk ke kuis dan mengerjakan soal satu per satu. Tampilan: 1 soal per halaman, 4 tombol pilihan jawaban, tombol Next/Previous untuk navigasi antar soal, dan timer countdown di pojok atas yang menghitung mundur waktu tersisa.

### 5. Submit Jawaban Kuis
Setelah selesai (atau waktu habis), mahasiswa mengirim semua jawabannya. Sistem menampilkan konfirmasi terlebih dahulu. Jika ada soal yang belum dijawab, sistem memberi peringatan. Jika waktu habis sebelum submit, jawaban otomatis dikirim.

### 6. Auto-Scoring (Penilaian Otomatis)
Setelah mahasiswa submit, sistem backend **otomatis mencocokkan** jawaban mahasiswa dengan jawaban benar yang sudah ditentukan dosen. Sistem menghitung berapa soal yang benar dan menghasilkan skor total. Tidak perlu dosen menilai manual — semua otomatis.

### 7. Tampilkan Hasil + XP
Setelah dinilai otomatis, mahasiswa langsung melihat hasilnya: skor yang didapat (misal 85/100), badge LULUS atau TIDAK LULUS, dan berapa XP yang didapatkan. Di bawahnya ada review per soal — mahasiswa bisa lihat soal mana yang benar dan mana yang salah beserta jawaban yang seharusnya.

### 8. XP Masuk ke Akun Mahasiswa
XP (Experience Points) adalah poin reward seperti di game. Setiap kali mahasiswa **lulus** kuis (skor ≥ minimum), XP reward kuis tersebut otomatis ditambahkan ke total XP mahasiswa. Contoh: total XP awal 300, lulus kuis dengan reward 100 XP → total XP jadi 400. XP ini ditampilkan di dashboard dan profil mahasiswa, dan digunakan untuk menentukan ranking di leaderboard.

### 9. Leaderboard (Ranking Global)
Halaman yang menampilkan peringkat semua mahasiswa berdasarkan total XP dari yang tertinggi ke terendah. Posisi 1-3 mendapat medali (🥇🥈🥉). Tujuannya: menciptakan kompetisi sehat — mahasiswa yang melihat temannya di atas akan termotivasi untuk mengerjakan lebih banyak kuis agar naik peringkat.

### + Timer Kuis
Setiap kuis punya batas waktu pengerjaan. Saat mahasiswa mulai kuis, timer countdown berjalan. Jika waktu hampir habis (< 1 menit), timer berubah merah dan berkedip sebagai peringatan. Jika waktu benar-benar habis, jawaban yang sudah dipilih otomatis dikirim.

---

## 🔬 PILAR 3 — Practical Labs (6 fitur)
> Sesi praktikum digital. Dosen memberikan instruksi praktikum, mahasiswa mengerjakan secara mandiri lalu mengupload hasilnya (laporan/file), dan dosen memberikan penilaian.

### 1. Buat Sesi Praktikum
Dosen membuat sesi praktikum baru di dalam mata kuliah. Data yang diisi: judul praktikum (contoh: "Praktikum 1 — Sorting Algorithm") dan instruksi lengkap berisi langkah-langkah yang harus dilakukan mahasiswa.

### 2. Instruksi Praktikum
Instruksi yang ditulis dosen ditampilkan dengan formatting rapi agar mudah diikuti mahasiswa. Isinya bisa berupa langkah-langkah (step 1, step 2, dst), penjelasan teori singkat, dan apa yang harus dikumpulkan sebagai hasil.

### 3. Edit & Hapus Praktikum
Dosen bisa mengubah judul atau instruksi praktikum. Jika praktikum dihapus, semua hasil submission mahasiswa di dalamnya juga ikut terhapus. Sistem menampilkan konfirmasi peringatan sebelum menghapus.

### 4. Mahasiswa Lihat Instruksi & Submit Hasil
Mahasiswa membuka halaman praktikum, membaca instruksi lengkap, lalu mengerjakan secara mandiri (di luar sistem). Setelah selesai, mahasiswa mengupload file hasil (laporan PDF, screenshot, atau file lainnya) dan bisa menambahkan catatan.

### 5. Dosen Lihat Daftar Submission
Dosen bisa melihat tabel berisi semua mahasiswa yang sudah mengumpulkan hasil praktikum. Informasi yang ditampilkan: nama mahasiswa, waktu submit, file yang dikumpulkan (bisa didownload), dan status penilaian (belum dinilai / sudah dinilai).

### 6. Dosen Kasih Nilai Praktikum
Dosen memberikan nilai (0-100) ke hasil praktikum setiap mahasiswa. Bisa juga menambahkan komentar/feedback. Setelah dinilai, mahasiswa bisa melihat nilainya di halaman praktikum tersebut.

---

## 🔐 PENDUKUNG — Autentikasi (4 fitur)
> Sistem masuk dan keluar aplikasi. Tanpa ini, tidak ada yang bisa mengakses fitur apapun.

### 1. Register (Daftar Akun)
Pengguna baru bisa mendaftar dengan mengisi: nama lengkap, email, password, dan memilih role (Mahasiswa / Dosen / Admin). Password disimpan dalam bentuk terenkripsi (aman). Jika email sudah pernah dipakai, sistem menolak dan memberikan pesan error.

### 2. Login (Masuk)
Pengguna masuk ke akun dengan email dan password. Jika cocok, sistem memberikan JWT Token (semacam kartu identitas digital) yang berlaku 24 jam. Token ini digunakan untuk mengakses semua fitur selanjutnya. Jika email atau password salah, sistem menampilkan pesan error yang jelas.

### 3. Lihat Profil
Pengguna bisa melihat data dirinya: nama, email, role, dan total XP (khusus mahasiswa). Data ini diambil dari token yang tersimpan.

### 4. Edit Profil
Pengguna bisa mengubah nama dan password miliknya sendiri. Email dan role tidak bisa diubah sendiri (role hanya bisa diubah oleh admin).

---

## 📝 PENDUKUNG — Assignment / Tugas (5 fitur)
> Sistem tugas yang dosen berikan ke mahasiswa. Mirip dengan praktikum, tapi lebih umum — bisa berupa esai, laporan, atau file apapun.

### 1. Buat Tugas Baru
Dosen membuat tugas di dalam mata kuliah. Data: judul tugas, deskripsi/instruksi lengkap, dan deadline (tanggal batas pengumpulan).

### 2. Edit & Hapus Tugas
Dosen bisa mengubah judul, deskripsi, atau deadline tugas. Tugas juga bisa dihapus dengan konfirmasi peringatan terlebih dahulu (semua submission mahasiswa ikut terhapus).

### 3. Mahasiswa Submit Jawaban Tugas
Mahasiswa melihat instruksi tugas, mengerjakan, lalu mengupload file jawaban sebelum deadline. Jika sudah lewat deadline, sistem menampilkan peringatan "Terlambat".

### 4. Dosen Lihat Daftar Submission
Dosen melihat tabel berisi mahasiswa yang sudah mengumpulkan tugas. Informasi: nama, tanggal submit, file (bisa didownload), status penilaian.

### 5. Dosen Kasih Nilai Tugas
Dosen memberikan nilai (0-100) ke tugas setiap mahasiswa. Bisa menambahkan komentar/feedback. Mahasiswa bisa melihat nilainya setelah dosen selesai menilai.

---

## 🛡️ PENDUKUNG — Admin (2 fitur)
> Fitur khusus untuk admin yang mengelola keseluruhan sistem.

### 1. Kelola Semua User
Admin bisa melihat daftar seluruh pengguna di sistem (mahasiswa, dosen, admin). Admin bisa mengubah role seseorang (misal: menaikkan mahasiswa jadi dosen) dan menghapus akun yang tidak diperlukan.

### 2. Statistik Keseluruhan
Admin bisa melihat ringkasan angka keseluruhan sistem: total jumlah user (berapa mahasiswa, berapa dosen, berapa admin), total mata kuliah, total kuis, dan total tugas. Ini untuk memantau kesehatan dan penggunaan sistem secara keseluruhan.
