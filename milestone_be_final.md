# MILESTONE BE — RUANG DOSEN (FINAL)

> Deadline: 14 Juni 2026 · 6 Sprint · 4 Developer
> Ariel (⭐⭐⭐⭐⭐), Sinta (⭐⭐), Tio (⭐⭐), Dimas (⭐)

---

# 🔵 ARIEL — Auth, Scoring, Admin, Enrollment

## Sprint 1 (1–9 Mei) — Endpoint Pertama [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| Membuat Endpoint Register & Login | Tugas kamu minggu ini bikin dua endpoint sekaligus. Yang pertama Register, yaitu API buat nerima pendaftaran akun baru (nama, email, password, role). Password yang masuk harus diacak dulu pakai bcrypt biar aman, baru disimpen ke database. Yang kedua Login, yaitu API buat ngecek email dan password. Kalau cocok, sistem kasih JWT Token (semacam kartu identitas digital) yang nanti dipake user buat akses fitur-fitur lain. |

## Sprint 2 (10–16 Mei) — JWT Guard, Profile, Enrollment [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| JWT Guard Middleware | Keamanan adalah prioritas utama. Tugas kamu adalah membuat sebuah Middleware (satpam) bernama JWT Guard. Middleware ini bertugas mencegat setiap request yang masuk ke API (kecuali endpoint login dan register) untuk memeriksa keberadaan token di header `Authorization: Bearer <token>`. Lakukan proses decode pada token tersebut untuk mengekstrak `userId` dan `role`. Jika token tidak dikirim, kadaluarsa, atau tidak valid, tolak request tersebut dengan status 401 Unauthorized. |
| Endpoint Get Profil (GET /auth/profile) | Aplikasi membutuhkan fitur agar pengguna bisa melihat informasi akun mereka sendiri. Buat endpoint `GET /auth/profile` yang bertugas mengambil data profil dari database. Kamu tidak perlu meminta ID dari parameter URL, melainkan ekstrak `userId` langsung dari token JWT yang sedang login. Query tabel User dan kembalikan data berupa nama, email, role, jumlah XP, dan tanggal pendaftaran. |
| Endpoint Edit Profil (PUT /auth/profile) | Pengguna harus bisa memperbarui informasi akun mereka. Buat endpoint `PUT /auth/profile` yang menerima data nama baru dan/atau password baru. Jika pengguna mengubah password, pastikan kamu melakukan proses hash menggunakan bcrypt sebelum menyimpannya ke database. Peraturan ketat: field email dan role sama sekali tidak boleh diubah melalui endpoint ini untuk alasan keamanan. Kembalikan data profil yang sudah berhasil diperbarui. |
| Endpoint Enroll Matkul (POST /courses/:id/enroll) | Mahasiswa membutuhkan fitur untuk mendaftar masuk ke dalam kelas. Buat endpoint `POST /courses/:id/enroll`. Sebelum memproses pendaftaran, lakukan dua validasi penting: Pertama, pastikan `courseId` yang dituju benar-benar ada di tabel Course (jika tidak, return 404). Kedua, pastikan mahasiswa tersebut belum pernah mendaftar di kelas ini sebelumnya (jika sudah, return 400). Jika lolos, buat baris data baru di tabel Enrollment. |

## Sprint 3 (17–23 Mei) — Auto-Scoring + XP + Leaderboard
| Task | Deskripsi |
|------|-----------|
| Endpoint Submit Kuis (POST /quizzes/:id/submit) | Ini adalah endpoint dengan logika paling rumit. Buat `POST /quizzes/:id/submit` untuk menerima pengumpulan jawaban kuis mahasiswa. Langkah pengerjaannya: (1) Tarik semua soal beserta kunci jawaban (`correctAnswer`) dari kuis tersebut di database. (2) Lakukan perulangan untuk mencocokkan jawaban mahasiswa dengan kunci jawaban. (3) Hitung skor menggunakan rumus `(jumlah benar / total soal) x 100`. (4) Tentukan status lulus berdasarkan `passingScore` kuis. (5) Jika lulus, tambahkan poin XP ke user tersebut. (6) Kembalikan response JSON berisi skor akhir, status lulus, perolehan XP, dan rincian benar/salah tiap soal. |
| Endpoint Leaderboard (GET /leaderboard) | Sistem gamifikasi membutuhkan papan peringkat. Buat endpoint `GET /leaderboard` yang bertugas mengambil semua data pengguna dari tabel User yang memiliki role 'STUDENT'. Urutkan data tersebut berdasarkan jumlah XP dari yang paling tinggi ke yang paling rendah. Kembalikan array data yang berisi posisi peringkat, nama mahasiswa, dan jumlah XP-nya. Sistem frontend nanti akan otomatis menambahkan visualisasi medali. |

## Sprint 4 (24–28 Mei) — Admin Endpoints
| Task | Deskripsi |
|------|-----------|
| Endpoint Daftar User (GET /admin/users) | Admin memerlukan data seluruh pengguna terdaftar. Buat endpoint `GET /admin/users` yang me-return daftar semua pengguna (id, nama, email, role, xp). Sediakan fitur filter opsional melalui query parameter `?role=STUDENT` agar admin bisa memilah data. Proteksi ketat: Hanya pengguna dengan token ber-role 'ADMIN' yang boleh mengakses API ini (tolak dengan 403 Forbidden jika bukan). |
| Endpoint Ubah Role (PUT /admin/users/:id) | Admin memegang kendali penuh atas hak akses. Buat endpoint `PUT /admin/users/:id` yang berfungsi khusus untuk mengubah role seorang pengguna (misalnya dari STUDENT menjadi LECTURER). Endpoint ini menerima payload berisi `role` baru dan langsung mengupdatenya di tabel User. Sekali lagi, pastikan endpoint ini hanya bisa dieksekusi oleh ADMIN. |
| Endpoint Hapus User (DELETE /admin/users/:id) | Admin harus bisa menghapus akun. Buat endpoint `DELETE /admin/users/:id`. Terapkan validasi agar Admin tidak bisa menghapus akunnya sendiri. Hal paling krusial: terapkan metode 'Cascade Delete' di level database agar saat pengguna dihapus, seluruh riwayat data yang terkait dengannya (seperti Enrollment dan Submission) ikut terhapus bersih. |
| Endpoint Statistik Admin (GET /admin/statistics) | Halaman utama Admin membutuhkan ringkasan data. Buat endpoint `GET /admin/statistics` yang bertugas menjalankan serangkaian query `COUNT` ke berbagai tabel. Return sebuah objek JSON yang berisi: total pengguna, total mahasiswa, total dosen, total admin, total mata kuliah, total kuis, dan total tugas. |

## Sprint 5 (29 Mei–4 Jun) — Support Integrasi FE
| Task | Deskripsi |
|------|-----------|
| Setup Keamanan CORS | Aplikasi frontend dan backend kita akan berjalan di domain server yang berbeda. Agar browser tidak memblokir komunikasi ini, kamu harus membuka jalur CORS. Tambahkan konfigurasi `app.enableCors({ origin: '*' })` atau arahkan spesifik ke URL Vercel milik Frontend di file `main.ts`. |
| Standby Bug Fixing | Ini adalah fase kritis integrasi. Tugas utama kamu di minggu ini adalah bersiap siaga (standby). Jika tim Frontend melaporkan adanya error (bug) dari endpoint buatanmu atau format JSON yang tidak sesuai, kamu harus memprioritaskan perbaikan (hotfix) tersebut secepat mungkin agar UI bisa dirender. |

## Sprint 6 (5–14 Jun) — Deploy & Final
| Task | Deskripsi |
|------|-----------|
| Deployment Server Backend | Lakukan rilis (deployment) kode NestJS ke server cloud Render. Langkah-langkahnya: Push kode final ke GitHub, hubungkan repository tersebut ke layanan Render, dan salin semua nilai Environment Variables yang ada di `.env` lokal (terutama JWT_SECRET dan DATABASE_URL) ke pengaturan Render. |
| Deployment Database PostgreSQL | Pindahkan database dari localhost ke layanan cloud Neon. Dapatkan link koneksi database online tersebut, lalu jalankan perintah `prisma migrate deploy` dari terminal server untuk membentuk tabel di cloud. Update `DATABASE_URL` dengan link Neon ini. |
| Final API Testing Online | Lakukan pengujian menyeluruh menggunakan aplikasi Postman yang mengarah ke URL server Render (bukan lagi localhost). Fokuskan pengujian pada logika rumit seperti auto-scoring kuis dan fitur admin. |

---

# 🟢 SINTA — Course CRUD, Material CRUD

## Sprint 1 (1–9 Mei) — Endpoint Pertama [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| Membuat Endpoint Mata Kuliah Baru | Course itu Mata Kuliah. Ini wadah utama di aplikasi kita. Semua materi, kuis, tugas, praktikum, semuanya ada di dalam Course. Tanpa Course, fitur-fitur lain gak punya tempat. Tugas kamu minggu ini bikin API-nya supaya Dosen bisa bikin Mata Kuliah baru. Data yang disimpen itu nama matkulnya, deskripsi singkat, dan ID dosennya siapa. |

## Sprint 2 (10–16 Mei) — Course CRUD Lengkap
| Task | Deskripsi |
|------|-----------|
| Endpoint Semua Matkul (GET /courses) | Halaman utama aplikasi menampilkan semua kelas yang tersedia. Buat endpoint `GET /courses` untuk menarik data dari tabel Course. Data yang dikembalikan berupa array berisi: id course, judul, deskripsi, nama dosen pengampu (Join ke tabel User berdasarkan `instructorId`), dan total jumlah mahasiswa yang terdaftar (hitung COUNT dari tabel Enrollment). |
| Endpoint Detail Matkul (GET /courses/:id) | Halaman detail membutuhkan data lengkap. Buat endpoint `GET /courses/:id` yang me-return seluruh informasi course, di-join (include) langsung dengan array daftar Material, daftar Quiz, daftar Assignment, dan daftar Lab yang bereferensi ke course ini. Ini krusial agar cukup memanggil satu API saja untuk memuat 4 tab informasi sekaligus. |
| Endpoint Edit Matkul (PUT /courses/:id) | Dosen harus bisa memperbarui informasi kelasnya. Buat endpoint `PUT /courses/:id` yang menerima perubahan pada judul dan/atau deskripsi course. Validasi mutlak: Pastikan pengguna yang melakukan request adalah dosen pembuat course tersebut (cek kesamaan `userId` di token dengan `instructorId`). Tolak request dengan 403 Forbidden jika orang lain yang mencoba. |
| Endpoint Hapus Matkul (DELETE /courses/:id) | Dosen atau Admin dapat menghapus kelas yang ditutup. Buat endpoint `DELETE /courses/:id`. Implementasikan mekanisme Cascade Delete agar saat course dihapus, semua data materi, kuis, tugas, praktikum, dan daftar pendaftaran mahasiswa di course tersebut otomatis ikut menguap dari database secara bersih. |

## Sprint 3 (17–23 Mei) — Material CRUD + My Courses
| Task | Deskripsi |
|------|-----------|
| Endpoint Upload Materi (POST /materials) | Dosen perlu mengunggah bahan ajar. Buat endpoint `POST /materials` yang menerima input: judul materi, tipe materi (pilihan wajib: TEXT, VIDEO, atau DOCUMENT), isi konten (teks panjang/URL video/link dokumen), dan `courseId`. Lakukan validasi agar hanya dosen pemilik course yang bisa mengunggah. Simpan datanya ke tabel Material. |
| Endpoint Detail Materi (GET /materials/:id) | Mahasiswa perlu membaca/menonton materi. Buat endpoint `GET /materials/:id` yang me-return detail materi tersebut (judul, tipe, dan kontennya). Data dari API ini akan dipakai oleh sistem UI untuk menentukan cara merender layar (teks, pemutar video, atau tombol unduh). |
| Endpoint Edit Materi (PUT /materials/:id) | Buat endpoint `PUT /materials/:id` yang menerima perubahan pada judul, tipe, maupun isi konten materi. Tetap pasang validasi kepemilikan agar hanya dosen pembuat course yang berhak mengubahnya, lalu simpan perubahan ke database. |
| Endpoint Hapus Materi (DELETE /materials/:id) | Dosen bisa menghapus materi usang. Buat endpoint `DELETE /materials/:id` untuk menghapus materi tertentu. Berikan proteksi agar hanya dosen pemilik course (atau Admin) yang bisa mengakses API penghapusan ini. |
| Endpoint Matkul Saya (GET /courses/my) | Mahasiswa butuh halaman khusus untuk melihat kelas yang diikutinya. Buat endpoint `GET /courses/my`. Ekstrak `userId` dari token JWT mahasiswa tersebut, lakukan query ke tabel Enrollment untuk mencari ID course apa saja yang dia ikuti, lalu join dengan data detail Course-nya. Return array berisi course-course tersebut. |

## Sprint 4 (24–28 Mei) — Testing
| Task | Deskripsi |
|------|-----------|
| Testing API via Postman | Buka aplikasi Postman dan uji semua endpoint Course dan Material satu per satu. Lakukan simulasi lengkap: buat matkul, lihat daftar matkul, edit matkul, upload materi, dan hapus matkul. Cek juga apakah mekanisme cascade delete bekerja (saat matkul dihapus, materi ikut hilang). |
| Bug Fixing | Perbaiki segala error yang muncul saat testing. Pastikan bentuk JSON response API kamu rapi dan konsisten, serta pesan error HTTP (seperti 400, 403, 404) dikeluarkan dengan tepat saat ada validasi yang gagal. |

## Sprint 5 (29 Mei–4 Jun) — Support Integrasi
| Task | Deskripsi |
|------|-----------|
| Integrasi API Frontend | Standby untuk memantau kinerja API buatanmu saat dikoneksikan ke antarmuka aplikasi. Pastikan struktur data JSON yang kamu kirimkan bisa dibaca dengan baik oleh program web dan tidak ada parameter (kolom) yang hilang atau bernilai null secara tidak wajar. |

## Sprint 6 (5–14 Jun) — Final
| Task | Deskripsi |
|------|-----------|
| Testing Lingkungan Produksi | Ubah URL di Postman milikmu ke link server yang sudah di-deploy online oleh tim. Uji kembali semua endpoint buatanmu untuk memastikan fungsinya tidak rusak saat dijalankan di server cloud dan terkoneksi ke database production. |
| Pembuatan Dokumentasi | Rapikan dokumentasi untuk endpoint Course dan Material. Catat apa URL-nya, method HTTP-nya, contoh JSON payload request yang harus dikirim, dan contoh JSON response yang akan dikembalikan oleh server. |

---

# 🟠 TIO — Quiz CRUD, Question CRUD, Lab CRUD

## Sprint 1 (1–9 Mei) — Endpoint Pertama [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| Membuat Endpoint Kuis Baru | Kuis itu ujian singkat yang Dosen buat buat ngetes Mahasiswa. Di aplikasi kita, kuis ini ada sistem poin XP-nya (kayak di game). Jadi kalau Mahasiswa lulus, dia dapet poin. Tugas kamu minggu ini itu bikin API-nya supaya Dosen bisa bikin kuis baru. Data yang disimpen itu judul kuisnya, kuis ini buat matkul apa, berapa poin XP-nya, dan berapa nilai minimum buat lulus. |

## Sprint 2 (10–16 Mei) — Quiz CRUD Lengkap [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| Endpoint Daftar Kuis (GET /quizzes) | Buat endpoint `GET /quizzes` untuk mengambil daftar semua kuis. Sediakan opsi filter berdasarkan `courseId` (contoh: parameter `?courseId=123`). Return array berupa id kuis, judul, hadiah XP, standar nilai lulus (passing score), batas waktu, dan jumlah total soal yang ada di dalam kuis tersebut (dihitung pakai fungsi COUNT). |
| Endpoint Detail Kuis (GET /quizzes/:id) | Mahasiswa membutuhkan detail informasi kuis (seperti batas waktu pengerjaan dan skor kelulusan) beserta daftar soalnya sebelum mereka mulai mengerjakan. Tugas kamu adalah membuat API `GET /quizzes/:id` untuk mengambil data tersebut. Hal yang paling krusial dalam pembuatan API ini adalah kamu dilarang keras mengembalikan field `correctAnswer` (kunci jawaban) di dalam data response JSON agar mahasiswa tidak bisa berbuat curang. |
| Endpoint Edit Kuis (PUT /quizzes/:id) | Dosen dapat mengubah peraturan kuis. Buat endpoint `PUT /quizzes/:id` yang menerima input perubahan judul, xpReward, passingScore, dan batas waktu kuis. Selalu berikan validasi keamanan bahwa yang mengedit kuis haruslah dosen pembuat kuis itu sendiri. |
| Endpoint Hapus Kuis (DELETE /quizzes/:id) | Buat endpoint `DELETE /quizzes/:id` untuk menghapus kuis. Pastikan di level database sudah diatur mekanisme Cascade Delete, sehingga jika satu kuis dihapus, puluhan data soal yang menempel pada kuis tersebut di tabel QuizQuestion akan ikut terhapus secara otomatis secara utuh. |

## Sprint 3 (17–23 Mei) — Quiz Question CRUD
| Task | Deskripsi |
|------|-----------|
| Endpoint Tambah Soal (POST /quiz-questions) | Dosen perlu memasukkan butir soal pilihan ganda. Buat endpoint `POST /quiz-questions` yang menerima payload berupa: teks pertanyaan, teks opsi A, opsi B, opsi C, opsi D, jawaban yang benar (misal bernilai "A"), dan `quizId`. Simpan data soal ini ke dalam database tabel QuizQuestion. |
| Endpoint Daftar Soal Ujian (GET /quizzes/:id/questions) | Buat endpoint spesifik `GET /quizzes/:id/questions` yang bertugas me-return list soal beserta opsi A-D untuk dikerjakan mahasiswa. Sekali lagi, terapkan proteksi berlapis agar field `correctAnswer` (kunci jawaban yang benar) TIDAK IKUT DIKIRIMKAN dalam response API ini dengan alasan apapun. |
| Endpoint Edit Soal (PUT /quiz-questions/:id) | Dosen bisa saja salah mengetik butir soal. Buat endpoint `PUT /quiz-questions/:id` untuk menerima perbaikan teks pertanyaan, perbaikan opsi A-D, atau koreksi kunci jawaban yang benar. Simpan perubahannya di database dengan syarat user tersebut adalah dosen pemilik kuis. |
| Endpoint Hapus Soal (DELETE /quiz-questions/:id) | Buat endpoint `DELETE /quiz-questions/:id` untuk menghapus spesifik satu soal pilihan ganda dari database kuis jika soal tersebut dirasa tidak valid. |

## Sprint 4 (24–28 Mei) — Lab CRUD
| Task | Deskripsi |
|------|-----------|
| Endpoint Buat Praktikum (POST /labs) | Sesi praktikum membutuhkan lembar kerja khusus. Buat endpoint `POST /labs` yang bisa menerima data judul lab, instruksi panjang berupa teks tahapan praktikum, dan ID course-nya. Pastikan ada validasi role agar hanya dosen yang diizinkan mem-posting kegiatan praktikum ini. Simpan record-nya ke tabel Lab. |
| Endpoint Daftar Praktikum (GET /labs) | Buat endpoint `GET /labs` untuk melihat daftar tugas praktikum yang terbuka. Sediakan dukungan query parameter `?courseId=xxx` agar sistem mampu menyeleksi dan hanya merender daftar praktikum untuk mata kuliah tertentu saja. Return judul dan tanggal pembuatan lab. |
| Endpoint Detail Praktikum (GET /labs/:id) | Mahasiswa perlu membaca panduan teknis sebelum melakukan praktikum. Buat endpoint `GET /labs/:id` yang akan mengekstrak judul dan teks instruksi tata cara praktikum secara utuh dari database untuk ditampilkan di halaman pengerjaan mahasiswa. |
| Endpoint Edit & Hapus Lab (PUT & DELETE /labs/:id) | Buat sepasang endpoint `PUT /labs/:id` untuk memperbarui judul atau instruksi lab, serta `DELETE /labs/:id` untuk membatalkan kegiatan lab tersebut. Berlakukan hukum Cascade Delete agar jika Lab ditiadakan, seluruh riwayat pengumpulan tugas mahasiswa terkait Lab tersebut lenyap. |

## Sprint 5 (29 Mei–4 Jun) — Support Integrasi
| Task | Deskripsi |
|------|-----------|
| Integrasi Modul Kuis & Lab | Pantau kinerja API-mu secara aktif saat terkoneksi ke web aplikasi. Pastikan deretan data soal kuis berhasil ter-mapping dengan benar menjadi daftar pertanyaan pilihan ganda, dan pastikan teks instruksi panjang pada Lab sukses dirender dengan struktur yang utuh tanpa ada karakter yang rusak atau terpotong. |

## Sprint 6 (5–14 Jun) — Final
| Task | Deskripsi |
|------|-----------|
| Testing Logika Produksi | Lakukan pengujian Postman yang mengarah ke server Render cloud. Lakukan simulasi berturut-turut: Buat kuis → Tambah soal → Tarik data soal (tanpa kunci jawaban) untuk membuktikan integritas logika kuis telah berjalan sempurna layaknya aplikasi sungguhan. |
| Penulisan API Docs | Bangun dokumentasi yang jelas untuk modul Quiz dan Lab. Sediakan contoh-contoh struktur payload JSON untuk memperlihatkan bagaimana cara membuat kuis baru dan menambahkan butir soal, agar modul ini mudah diwariskan ke programmer lain di masa depan. |

---

# 🔴 DIMAS — Assignment CRUD, Submission, Grading

## Sprint 1 (1–9 Mei) — Endpoint Pertama [SELESAI ✅]
| Task | Deskripsi |
|------|-----------|
| Membuat Endpoint Tugas Baru | Assignment itu Tugas yang Dosen kasih ke Mahasiswa. Dosen nulis instruksi tugasnya apa, terus Mahasiswa bisa lihat dan ngerjain. Untuk minggu ini kamu cukup bikin API-nya supaya Dosen bisa posting tugas baru aja dulu. Fitur mahasiswa ngumpulin jawaban nanti di minggu berikutnya. Data yang disimpen itu judul tugasnya, instruksi detail, dan ini tugas buat matkul apa. |

## Sprint 2 (10–16 Mei) — Assignment CRUD Lengkap
| Task | Deskripsi |
|------|-----------|
| Endpoint Daftar Tugas (GET /assignments) | Buat endpoint `GET /assignments` untuk mengambil seluruh data tugas yang pernah dipublikasikan oleh dosen. Wajib sertakan kapabilitas filter `?courseId=xxx` agar API bisa mengelompokkan tugas berdasarkan kelas tertentu saja. Kembalikan id tugas, judul, deskripsi singkat, dan tanggal deadline. |
| Endpoint Detail Tugas (GET /assignments/:id) | Mahasiswa butuh membaca rincian lengkap pengerjaan tugas. Buat endpoint `GET /assignments/:id` untuk me-return seluruh informasi instruksi tugas dan batas waktu pengerjaannya. Keakuratan format data deadline ini sangat krusial agar sistem front-end mampu menyeleksinya dengan jam komputer saat ini demi menampilkan peringatan "Terlambat". |
| Endpoint Edit Tugas (PUT /assignments/:id) | Dosen mungkin perlu merevisi instruksi, mengoreksi salah ketik, atau memperpanjang tenggat waktu pengumpulan. Buat endpoint `PUT /assignments/:id` yang bisa menerima judul, teks deskripsi panjang, dan tanggal deadline yang baru. Terapkan validasi hak akses berjenjang agar hanya dosen pemilik tugas yang bisa mengeksekusinya. |
| Endpoint Hapus Tugas (DELETE /assignments/:id) | Buat endpoint `DELETE /assignments/:id` untuk membatalkan secara sepihak sebuah penugasan. Lakukan konfigurasi database sedemikian rupa sehingga menjalankan skenario Cascade Delete: saat instruksi tugas dihapus, seluruh lampiran file jawaban mahasiswa yang terkait akan otomatis dibersihkan dari sistem. |

## Sprint 3 (17–23 Mei) — Submission & Grading Tugas
| Task | Deskripsi |
|------|-----------|
| Endpoint Kumpul Tugas (POST /assignments/:id/submit) | Mahasiswa mutlak butuh jalur pengumpulan jawaban. Buat endpoint `POST /assignments/:id/submit` yang memproses upload file dokumen tugas dan catatan tambahan opsional. Simpan entri pengumpulan ini ke tabel Submission dengan status bendera 'PENDING'. Lakukan dua validasi pencegahan: Pastikan mahasiswa memang terdaftar di kelas tugas tersebut, dan pastikan ia belum pernah submit file sebelumnya untuk mencegah pengumpulan ganda. |
| Endpoint Lihat Jawaban (GET /assignments/:id/submissions) | Dosen pengampu perlu mengumpulkan dan mengevaluasi lembar pekerjaan mahasiswa. Buat endpoint khusus dosen untuk menarik tabel daftar pendaftar yang sudah submit, lengkap dengan metrik tanggal pengumpulan, link download file pekerjaan, status penilaian ('PENDING' atau 'GRADED'), dan rincian angka nilainya jika ada. |
| Endpoint Penilaian Dosen (PUT /assignment-submissions/:id/grade) | Setelah membaca pekerjaan mahasiswa, Dosen perlu merekam nilai akhir. Buat endpoint `PUT /assignment-submissions/:id/grade` yang siap menerima data parameter nilai matematis (0-100) dikombinasikan dengan teks panjang yang berisi catatan revisi/feedback. API ini harus secara aktif memutar status mahasiswa dari 'PENDING' menjadi 'GRADED' usai sukses memproses penyimpanan. |

## Sprint 4 (24–28 Mei) — Submission & Grading Lab
| Task | Deskripsi |
|------|-----------|
| Endpoint Kumpul Praktikum (POST /labs/:id/submit) | Konsep pengumpulan ini sama persis dengan kumpul tugas rutin. Buat endpoint bagi mahasiswa untuk mengirim laporan hasil observasi praktikum dalam bentuk link dokumen atau screenshot. Pastikan ada pengecekan lapis pertama bahwa mahasiswa tersebut tidak berstatus penyusup (memang terdaftar resmi di kelas). Rekam progres ini di database berstatus 'PENDING'. |
| Endpoint Lihat Laporan Lab (GET /labs/:id/submissions) | Asisten atau dosen pengampu diwajibkan mengevaluasi hasil lab. Buat endpoint GET yang me-return kompilasi data kumpulan pekerjaan mahasiswa (berupa nama lengkap, tautan link laporan, stempel waktu penyelesaian, dan status koreksi) spesifik untuk satu kegiatan sesi praktikum tertentu saja. |
| Endpoint Nilai Praktikum (PUT /lab-submissions/:id/grade) | Buat endpoint grading khusus untuk sesi pelaporan lab yang secara aktif menerima persentase skor nilai (0-100) dan teks komentar evaluatif dari dosen penilai. Pencatatan ini langsung menimpa status lama untuk dikonversi menjadi 'GRADED', sehingga hasilnya dapat transparan ditarik oleh akun mahasiswa. |
| Simulasi Penuh Postman | Sebelum API dilepas ke area publik, jadwalkan pengujian paripurna seluruh alur di Postman lokalmu. Mulailah simulasi sebagai dosen membikin tugas → lalu masuk menyamar sebagai mahasiswa men-submit jawaban tugas → kembali beralih sebagai dosen dan tembakkan nilai 85 plus komentar evaluasi → kembali wujud sebagai mahasiswa dan buktikan nilai 85 tersebut berhasil terpanggil. |

## Sprint 5 (29 Mei–4 Jun) — Support Integrasi
| Task | Deskripsi |
|------|-----------|
| Integrasi Sistem Upload & Penilaian | Pastikan proses transisi komunikasi unggah file dari sistem UI berjalan normal dan tidak terhadang error pembatasan ukuran payload. Verifikasi ganda bahwa entri angka nilai serta catatan panjang (feedback komentar dosen) dapat mendarat selamat di database dan kembali muncul dengan rapi ketika ditelusuri di panel nilai mahasiswa. |

## Sprint 6 (5–14 Jun) — Final
| Task | Deskripsi |
|------|-----------|
| Pengujian Online End-to-End | Test menyeluruh seluruh mekanisme pengumpulan tugas dan lab dengan menghubungkannya langsung ke mesin server Render di internet. Prioritas terbesar adalah mengecek keamanan dan keutuhan transmisi unggah dokumen file saat aplikasi beroperasi secara publik dari jaringan luar. |
| Pembuatan Dokumentasi | Segera susun dan lengkapi dokumentasi teknis API untuk modul Assignment, pengumpulan Lab, dan rutinitas Grading. Rincikan pola tipe data form-data apa yang valid dipakai menangani mekanisme pertukaran file, agar hal ini gampang dikloning oleh developer penerusmu. |

---

# 📊 Ringkasan

| Sprint | Periode | Ariel | Sinta | Tio | Dimas |
|--------|---------|-------|-------|-----|-------|
| 1 | 1–9 Mei | Endpoint Register & Login ✅ | Endpoint Kuis Baru ✅ | Endpoint Mata Kuliah Baru ✅ | Endpoint Tugas Baru ✅ |
| 2 | 10–16 Mei | JWT Guard, Profile, Enroll ✅ | Course CRUD | Quiz CRUD ✅ | Assignment CRUD |
| 3 | 17–23 Mei | Scoring + XP + Leaderboard | Material CRUD + My Courses | Question CRUD | Submission & Grading Tugas |
| 4 | 24–28 Mei | Admin endpoints | Testing | Lab CRUD | Submission & Grading Lab |
| 5 | 29 Mei–4 Jun | CORS + Support | Testing integrasi | Testing integrasi | Testing integrasi |
| 6 | 5–14 Jun | Deploy | Final testing | Final testing | Final testing |
