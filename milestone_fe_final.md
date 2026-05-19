# MILESTONE FE — RUANG DOSEN

> Deadline: 14 Juni 2026 · 6 Sprint · 4 Developer

---

# 👑 BAGAS — Core & Auth

## Sprint 1 (1–7 Mei) — Foundation
| Task | Deskripsi |
|------|-----------|
| Setup | Inisialisasi project (Vite/Next.js, ESLint, Prettier, Husky). Pastikan semua dev bisa clone dan jalankan project tanpa error. | 
| Design System | Tentukan warna utama, font, ukuran spacing yang akan dipakai seluruh tim. Buat file tokens agar konsisten. |
| Arsitektur | Buat struktur folder yang rapi (pages/, components/, hooks/, services/) dan aturan routing. Komunikasikan ke semua dev. |
| Halaman Login | Buat halaman login: form input email dan password, tombol "Masuk". Jika input kosong, tampilkan pesan error merah di bawah field. |
| Komponen Modal | Buat komponen pop-up yang bisa dipakai ulang di mana saja. Contoh: "Apakah Anda yakin?" dengan tombol Ya/Batal. Digunakan untuk konfirmasi hapus, submit, dll. |

## Sprint 2 (8–14 Mei) — Halaman Mahasiswa
| Task | Deskripsi |
|------|-----------|
| Halaman Register | Buat halaman daftar akun: form nama, email, password, dan dropdown pilih role (Mahasiswa/Dosen/Admin). Validasi: email harus format benar, password minimal 6 karakter. Setelah berhasil daftar, redirect ke halaman login. |
| Dashboard Mahasiswa | Halaman utama setelah mahasiswa login. Isinya: (1) Daftar matkul yang sedang diambil, (2) Tugas yang belum dikumpulkan + deadline, (3) Kuis yang belum dikerjakan, (4) Total XP mahasiswa saat ini. Semua ditampilkan dalam bentuk card/kotak ringkasan. |
| Komponen StatCard | Buat komponen kotak kecil yang menampilkan angka + label + ikon. Contoh: "5 Kuis Aktif 📝". Komponen ini akan dipakai ulang di dashboard mahasiswa, dosen, dan admin. |
| Halaman Profil | Halaman untuk melihat data diri (nama, email, role, XP). Di bawahnya ada form untuk edit nama dan password. Tombol "Simpan" untuk menyimpan perubahan. |
| Auth Logic | Saat login berhasil, simpan JWT token di localStorage. Setiap berpindah halaman, cek apakah token masih ada — jika tidak, redirect ke halaman login. Buat tombol Logout yang menghapus token dan redirect ke login. |

## Sprint 3 (15–21 Mei) — Halaman Dosen
| Task | Deskripsi |
|------|-----------|
| Dashboard Dosen | Halaman utama setelah dosen login. Isinya: (1) Daftar matkul yang diampu, (2) Jumlah total mahasiswa, (3) Jumlah tugas yang belum dinilai, (4) Jumlah hasil lab yang belum dinilai. Tampilkan dalam bentuk StatCard. |
| Sidebar/Navigasi Role | Buat menu navigasi samping (sidebar) yang isinya berubah tergantung role. Mahasiswa: Dashboard, Course, Kuis, Tugas, Lab, Leaderboard, Profil. Dosen: Dashboard, Matkul Saya, Profil. Admin: Dashboard, Kelola User, Kelola Course, Profil. |
| Routing Dosen | Setup halaman-halaman khusus dosen agar tidak bisa diakses mahasiswa. Contoh: /dosen/dashboard, /dosen/courses. |

## Sprint 4 (22–28 Mei) — Admin & Polish
| Task | Deskripsi |
|------|-----------|
| Dashboard Admin | Halaman utama admin. Tampilkan statistik keseluruhan sistem: total user (berapa mahasiswa, dosen, admin), total matkul, total kuis, total tugas. Semua dalam bentuk StatCard. |
| Kelola User | Halaman tabel berisi semua user di sistem. Kolom: Nama, Email, Role, Tanggal Daftar. Fitur: (1) Filter by role (dropdown), (2) Tombol ubah role → dropdown pilih role baru, (3) Tombol hapus → muncul modal konfirmasi "Yakin hapus user ini?". |
| Kelola Course (Admin) | Halaman tabel semua mata kuliah di sistem. Kolom: Judul, Dosen Pengampu, Jumlah Mahasiswa. Tombol hapus dengan modal konfirmasi. Ini beda dari halaman course mahasiswa — ini untuk admin mengawasi. |
| Role Guard | Buat pengecekan otomatis: jika mahasiswa coba akses /dosen/dashboard, redirect ke dashboard mahasiswa. Jika dosen coba akses /admin, redirect ke dashboard dosen. Pastikan setiap role hanya bisa akses halaman miliknya. |
| Polish | Pastikan semua halaman auth & dashboard terlihat bagus di HP, tablet, dan laptop. Tambahkan animasi loading saat data sedang dimuat. Tampilkan pesan error yang jelas jika ada masalah. |

## Sprint 5 (29 Mei–4 Jun) — Integrasi ke API
| Task | Deskripsi |
|------|-----------|
| Auth API | Ganti data dummy login/register. Sambungkan ke `POST /auth/login` dan `POST /auth/register` dari backend. Tampilkan error dari server (misal: "Email sudah terdaftar") di form. |
| Token Management | Setiap request ke API, kirim JWT token di header `Authorization: Bearer <token>`. Jika server merespons 401 (token expired), otomatis redirect ke login. |
| Profile API | Sambungkan halaman profil ke `GET /auth/profile` (ambil data) dan `PUT /auth/profile` (simpan perubahan). |
| Dashboard API | Sambungkan ketiga dashboard ke endpoint statistik masing-masing dari backend. |
| Admin API | Sambungkan kelola user ke `GET /admin/users`, `PUT /admin/users/:id` (ubah role), `DELETE /admin/users/:id` (hapus). |

## Sprint 6 (5–14 Jun) — Testing & Deploy
| Task | Deskripsi |
|------|-----------|
| Test | Test alur lengkap: register → login → lihat dashboard → edit profil → logout. Test admin: ubah role user, hapus user. |
| Deploy | Deploy ke Vercel, setup environment variables, bantu screenshot untuk laporan & presentasi. |

---

# 🟢 ZIA — Course Material

## Sprint 1 (1–7 Mei) — Foundation
| Task | Deskripsi |
|------|-----------|
| Komponen Card | Buat komponen card yang bisa dipakai ulang untuk menampilkan: CourseCard (judul matkul + dosen), MateriCard (judul materi + tipe), TugasCard (judul tugas + deadline). |
| Halaman Daftar Course | Buat halaman yang menampilkan semua mata kuliah dalam bentuk grid card. Ada search bar untuk cari by nama dan filter. |
| Data Mock | Isi halaman dengan data dummy dulu (belum dari API). Minimal 3-5 course contoh. |
| Routing | Setup routing: /courses (daftar) → /courses/:id (detail) → /courses/:id/materi/:matId (viewer materi). |
| Koordinasi | Pastikan warna, font, dan spacing card sesuai dengan design token dari Bagas. |

## Sprint 2 (8–14 Mei) — Halaman Mahasiswa
| Task | Deskripsi |
|------|-----------|
| Halaman Detail Course | Halaman yang muncul saat mahasiswa klik salah satu course. Di atas: header berisi judul matkul, nama dosen, dan deskripsi. Di bawahnya: 4 tab/section yaitu "Materi", "Kuis", "Tugas", "Lab". Setiap tab menampilkan list item terkait menggunakan card dari Sprint 1. |
| Enroll | Di halaman daftar course, setiap card yang belum diambil punya tombol "Enroll". Saat diklik, muncul modal konfirmasi "Daftar ke matkul ini?". Setelah konfirmasi, card pindah ke halaman "Course Saya". |
| Halaman Course Saya | Halaman terpisah yang hanya menampilkan matkul yang sudah di-enroll oleh mahasiswa ini. Tampilkan dalam grid card. |
| Viewer Materi | Halaman untuk membaca/menonton materi. Jika tipe TEKS: render konten teks/markdown di halaman. Jika tipe VIDEO: tampilkan video player (embed YouTube atau player HTML5). Jika tipe DOKUMEN: tombol download file. |

## Sprint 3 (15–21 Mei) — Halaman Dosen
| Task | Deskripsi |
|------|-----------|
| Matkul Saya (Dosen) | Halaman daftar matkul yang dosen ini ampu. Setiap card menampilkan judul matkul dan jumlah mahasiswa yang enroll. Klik card → masuk ke halaman kelola matkul tersebut. |
| Form Buat/Edit Matkul | Halaman form dengan input: Judul (wajib), Deskripsi (opsional). Tombol "Simpan". Jika mode edit, form sudah terisi data lama. |
| Form Buat/Edit Materi | Halaman form: pilih tipe materi (dropdown: Teks/Video/Dokumen), input judul, lalu input konten (textarea untuk teks, URL untuk video, upload untuk dokumen). Tombol "Simpan". |
| Hapus Matkul & Materi | Di halaman kelola, setiap item punya tombol hapus (ikon tong sampah). Saat diklik, muncul modal "Yakin hapus? Data tidak bisa dikembalikan." dengan tombol Hapus (merah) dan Batal. |
| Daftar Mahasiswa | Halaman tabel berisi mahasiswa yang enroll di matkul ini. Kolom: Nama, Email, Tanggal Bergabung. Ini agar dosen tahu siapa saja yang ikut matkulnya. |

## Sprint 4 (22–28 Mei) — Polish
| Task | Deskripsi |
|------|-----------|
| Responsive | Pastikan daftar course tampil 3 kolom di desktop, 2 di tablet, 1 di HP. Viewer materi juga harus nyaman dibaca di HP. |
| Empty State | Jika belum ada course/materi/mahasiswa, jangan tampilkan halaman kosong. Tampilkan ilustrasi + teks seperti "Belum ada materi. Tambahkan materi pertama!" |
| Loading | Saat data sedang dimuat dari API, tampilkan skeleton loading (kotak abu-abu berkedip) agar user tahu halaman sedang proses. |
| Error | Jika API gagal, tampilkan pesan "Terjadi kesalahan. Coba lagi nanti." — jangan biarkan halaman blank. |
| Search & Filter | Pastikan search bar di daftar course benar-benar berfungsi: ketik "Algoritma" → hanya muncul course yang mengandung kata itu. |

## Sprint 5 (29 Mei–4 Jun) — Integrasi ke API
| Task | Deskripsi |
|------|-----------|
| Course API | Ganti data mock. Ambil daftar course dari `GET /courses`. Enroll via `POST /courses/:id/enroll`. Course saya via `GET /courses/my`. |
| Detail API | Ambil detail course + isi (materi, kuis, tugas, lab) dari `GET /courses/:id`. |
| Material API | Ambil konten materi dari `GET /materials/:id`. |
| CRUD Course | Sambungkan form buat → `POST /courses`, edit → `PUT /courses/:id`, hapus → `DELETE /courses/:id`. |
| CRUD Material | Sambungkan form buat → `POST /materials`, edit → `PUT /materials/:id`, hapus → `DELETE /materials/:id`. |

## Sprint 6 (5–14 Jun) — Testing & Deploy
| Task | Deskripsi |
|------|-----------|
| Test | Test alur: lihat daftar → enroll → masuk detail → baca materi. Test dosen: buat matkul → tambah materi → edit → hapus. |
| Bug Fix | Fix semua bug yang ditemukan dari testing. |

---

# 🟠 AZZAH — Quiz System

## Sprint 1 (1–7 Mei) — Foundation
| Task | Deskripsi |
|------|-----------|
| Halaman Daftar Kuis | Buat halaman yang menampilkan semua kuis dalam card. Setiap card: judul kuis, status (Aktif/Selesai/Terkunci), jumlah soal, XP reward. |
| Info Kuis | Di card, tampilkan juga: total soal, nilai maksimum, dan XP yang bisa didapat jika lulus. |
| Komponen ChoiceButton | Buat komponen tombol pilihan ganda (A, B, C, D). Saat diklik, tombol berubah warna (highlight) menandakan terpilih. Hanya satu yang bisa dipilih per soal. |
| Routing | Setup: /quiz (daftar) → /quiz/:id/start (mulai kerjakan) → /quiz/:id/review (hasil). |
| Timer | Buat komponen CountdownTimer yang menampilkan sisa waktu (mm:ss). Saat waktu habis, otomatis panggil fungsi callback (nanti dipakai untuk auto-submit). |

## Sprint 2 (8–14 Mei) — Halaman Mahasiswa
| Task | Deskripsi |
|------|-----------|
| Halaman Mengerjakan Kuis | Halaman inti kuis. Tampilkan 1 soal per halaman. Di atas: judul kuis + timer countdown. Di tengah: pertanyaan + 4 pilihan jawaban (pakai ChoiceButton). Di bawah: tombol "Sebelumnya" dan "Selanjutnya". Di soal terakhir: tombol "Submit". |
| State Jawaban | Simpan jawaban yang dipilih mahasiswa di state. Jika mahasiswa kembali ke soal sebelumnya, pilihan yang sudah dipilih tetap ter-highlight (tidak hilang). |
| Timer Integrasi | Pasang CountdownTimer di pojok kanan atas halaman kuis. Jika waktu habis sebelum mahasiswa klik Submit, sistem otomatis mengirim semua jawaban yang sudah dipilih. Tampilkan notifikasi "Waktu habis! Jawaban otomatis dikirim." |
| Submit Kuis | Saat tombol Submit diklik, tampilkan modal konfirmasi: "Kirim jawaban? Anda tidak bisa mengubah setelah ini." Jika ada soal yang belum dijawab, tampilkan peringatan: "2 soal belum dijawab. Tetap kirim?" |
| Halaman Hasil Kuis | Halaman yang muncul setelah submit. Isinya: (1) Skor total misal "85/100", (2) Badge besar "🎉 LULUS" (hijau) atau "❌ TIDAK LULUS" (merah), (3) XP yang didapat misal "+100 XP" dengan animasi, (4) Review per soal: pertanyaan, jawaban kamu, jawaban benar — warna hijau jika benar, merah jika salah. |

## Sprint 3 (15–21 Mei) — Halaman Dosen
| Task | Deskripsi |
|------|-----------|
| Form Buat/Edit Kuis | Halaman form: input judul kuis, XP reward (angka), skor minimum untuk lulus (angka, default 70), time limit dalam menit (angka), pilih course (dropdown). Tombol "Simpan". |
| Halaman Kelola Soal | Setelah kuis dibuat, dosen masuk ke halaman ini. Tampilkan daftar semua soal di kuis ini. Setiap soal: nomor, pertanyaan (dipotong jika terlalu panjang), tombol Edit dan Hapus. Di atas ada tombol "Tambah Soal Baru". |
| Form Tambah/Edit Soal | Form: input pertanyaan (textarea), 4 input untuk opsi A/B/C/D, lalu radio button untuk menandai mana jawaban yang benar. Tombol "Simpan Soal". |
| Halaman Leaderboard | Halaman ranking mahasiswa berdasarkan total XP. Tabel: Posisi (1, 2, 3...), Nama Mahasiswa, Total XP. Posisi 1-3 diberi emoji medali 🥇🥈🥉. Ini membuat mahasiswa termotivasi untuk mengerjakan lebih banyak kuis agar naik ranking. |
| Statistik Kuis | Halaman untuk dosen melihat performa kuis yang dibuatnya. Tampilkan: berapa mahasiswa yang sudah mengerjakan, rata-rata skor, skor tertinggi, skor terendah. |

## Sprint 4 (22–28 Mei) — Polish
| Task | Deskripsi |
|------|-----------|
| Responsive | Halaman mengerjakan kuis harus nyaman di HP (soal + pilihan ganda tidak terlalu kecil). Leaderboard juga harus rapi di layar kecil. |
| Animasi XP | Di halaman hasil, saat XP muncul, buat animasi: angka "+100 XP" muncul dari bawah ke atas dengan efek fade-in. Buat terasa rewarding seperti di game. |
| Timer Polish | Saat sisa waktu < 1 menit, teks timer berubah jadi merah + efek kedip (pulse). Ini memberi peringatan visual ke mahasiswa. |
| Empty State | Jika belum ada kuis di course: tampilkan "Belum ada kuis untuk matkul ini." Jika belum pernah mengerjakan kuis: "Kamu belum mengerjakan kuis apapun." |
| Validasi | Jika mahasiswa klik Submit tapi semua soal kosong → tolak, tampilkan "Jawab minimal 1 soal sebelum submit." |

## Sprint 5 (29 Mei–4 Jun) — Integrasi ke API
| Task | Deskripsi |
|------|-----------|
| Quiz List | Ganti data mock daftar kuis. Ambil dari `GET /quizzes?courseId=xxx`. |
| Quiz Start | Ambil soal-soal kuis dari `GET /quizzes/:id/questions` saat mahasiswa mulai kerjakan. |
| Quiz Submit | Kirim jawaban ke `POST /quizzes/:id/submit`. Backend akan menghitung skor dan XP otomatis. Tampilkan hasilnya dari response. |
| Quiz CRUD | Sambungkan form kuis & soal dosen ke `POST/PUT/DELETE /quizzes` dan `/quiz-questions`. |
| Leaderboard | Ambil data ranking dari `GET /leaderboard`. |

## Sprint 6 (5–14 Jun) — Testing & Deploy
| Task | Deskripsi |
|------|-----------|
| Test | Test alur: daftar kuis → mulai → kerjakan soal → timer jalan → submit → lihat hasil + XP. Test dosen: buat kuis → tambah soal → edit → hapus. Cek leaderboard update setelah kuis selesai. |
| Bug Fix | Fix semua bug yang ditemukan. |

---

# 🔴 DEVANO — Practical Labs + Assignment

## Sprint 1 (1–7 Mei) — Foundation
| Task | Deskripsi |
|------|-----------|
| Arsitektur | Desain arsitektur awal Praktikum (WebSocket/SSE vs polling). |
| Workspace | Scaffold halaman workspace: layout editor + terminal + output. |
| Editor | Integrasi Monaco Editor / CodeMirror ke workspace. |
| Dosen UI | Scaffold halaman dosen: layout panel parameter praktikum. |
| Setup | Setup WebSocket client hook. |

> **Catatan**: Monaco Editor, Terminal, dan WebSocket **dibatalkan** mulai Sprint 2. Practical Labs selanjutnya menggunakan pendekatan sederhana: instruksi tertulis + upload hasil.

## Sprint 2 (8–14 Mei) — Halaman Mahasiswa
| Task | Deskripsi |
|------|-----------|
| Halaman Daftar Lab | Halaman yang menampilkan semua sesi praktikum di suatu course. Setiap card: judul lab, status (Belum Submit / Sudah Submit / Sudah Dinilai + nilai). Warna status berbeda: abu = belum, kuning = sudah submit, hijau = sudah dinilai. |
| Halaman Detail Lab | Saat mahasiswa klik card lab, masuk ke halaman ini. Tampilkan: judul lab, nama course terkait, lalu instruksi praktikum lengkap (teks panjang dari dosen). Instruksi ditampilkan dengan formatting rapi agar mudah diikuti. |
| Form Submit Lab | Di bawah instruksi lab, ada form submit: (1) Upload file hasil praktikum (laporan/screenshot), (2) Textarea untuk catatan tambahan, (3) Tombol "Submit Hasil". Setelah submit, status berubah jadi "Sudah Submit, menunggu penilaian." |
| Halaman Detail Tugas | Halaman yang muncul saat mahasiswa klik tugas. Tampilkan: judul tugas, deskripsi/instruksi lengkap, deadline (tanggal + sisa hari). Jika sudah lewat deadline, tampilkan badge merah "Terlambat". |
| Form Submit Tugas | Di bawah instruksi tugas, ada form: (1) Upload file jawaban, (2) Textarea catatan, (3) Tombol "Kumpulkan Tugas". Setelah submit, tampilkan konfirmasi "Tugas berhasil dikumpulkan!" |

## Sprint 3 (15–21 Mei) — Halaman Dosen
| Task | Deskripsi |
|------|-----------|
| Form Buat/Edit Lab | Halaman form: input judul lab, instruksi praktikum (textarea panjang — dosen menulis langkah-langkah praktikum di sini), pilih course (dropdown). Tombol "Simpan". Jika mode edit, form sudah terisi data lama. |
| Hapus Lab | Di halaman daftar lab (dosen), setiap item punya tombol hapus. Saat diklik, muncul modal konfirmasi "Yakin hapus praktikum ini? Semua submission mahasiswa juga akan terhapus." Tombol Hapus (merah) dan Batal. |
| Daftar Submission Lab | Halaman tabel berisi mahasiswa yang sudah submit hasil lab. Kolom: Nama Mahasiswa, Waktu Submit, File (link download), Status (Belum Dinilai / Sudah Dinilai). Tombol "Beri Nilai" di setiap baris. |
| Grading Lab | Saat dosen klik "Beri Nilai", muncul form: input nilai (angka 0-100), textarea komentar (opsional), tombol "Simpan Nilai". Setelah simpan, status berubah jadi "Sudah Dinilai". |
| Form Buat/Edit Tugas | Halaman form: input judul tugas, deskripsi/instruksi (textarea), deadline (date picker), pilih course (dropdown). Tombol "Simpan". |
| Hapus Tugas | Di halaman daftar tugas (dosen), setiap item punya tombol hapus. Modal konfirmasi: "Yakin hapus tugas ini? Semua submission mahasiswa juga akan terhapus." |
| Daftar Submission Tugas | Halaman tabel: Nama Mahasiswa, Tanggal Submit, File, Status Penilaian. Tombol "Beri Nilai" per baris. Sama pattern-nya dengan submission lab. |
| Grading Tugas | Form grading: input nilai (0-100), komentar, tombol simpan. Sama pattern dengan grading lab. |

## Sprint 4 (22–28 Mei) — Polish
| Task | Deskripsi |
|------|-----------|
| Responsive | Pastikan halaman detail lab, detail tugas, dan form submit nyaman di HP. Tabel submission juga harus bisa di-scroll horizontal di layar kecil. |
| Empty State | Tampilkan pesan ramah jika kosong: "Belum ada praktikum untuk matkul ini", "Belum ada tugas", "Belum ada mahasiswa yang mengumpulkan." |
| Loading | Skeleton loading saat data dimuat. Spinner saat file sedang di-upload. |
| Upload Polish | Validasi file sebelum upload: cek ukuran (maks 10MB), cek tipe file (PDF, ZIP, JPG, PNG). Jika tidak sesuai, tampilkan error. Tampilkan progress bar saat upload berlangsung. |
| Error Handling | Jika upload gagal (koneksi putus), tampilkan "Upload gagal. Coba lagi." dengan tombol retry. Jika form tidak lengkap, highlight field yang kosong dengan border merah. |

## Sprint 5 (29 Mei–4 Jun) — Integrasi ke API
| Task | Deskripsi |
|------|-----------|
| Lab API | Ambil daftar lab dari `GET /labs?courseId=xxx`. Detail lab dari `GET /labs/:id`. |
| Lab Submit | Kirim hasil via `POST /labs/:id/submit` (multipart form data untuk file). |
| Lab CRUD | Form buat → `POST /labs`, edit → `PUT /labs/:id`, hapus → `DELETE /labs/:id`. |
| Lab Grading | Kirim nilai via `PUT /lab-submissions/:id/grade`. |
| Assignment API | Sambungkan semua assignment: daftar, detail, submit, buat, edit, hapus, grading ke API backend. |

## Sprint 6 (5–14 Jun) — Testing & Deploy
| Task | Deskripsi |
|------|-----------|
| Test Lab | Test: daftar lab → baca instruksi → upload hasil → dosen lihat submission → dosen kasih nilai → mahasiswa lihat nilai. |
| Test Assignment | Test: lihat tugas → upload jawaban → dosen lihat → dosen kasih nilai. |
| Test CRUD | Test dosen: buat lab/tugas baru → edit → hapus. Pastikan modal konfirmasi muncul sebelum hapus. |
| Bug Fix | Fix semua bug. |
