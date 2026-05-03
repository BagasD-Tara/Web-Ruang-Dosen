# Ruang Dosen — Backend API

Backend API untuk aplikasi **Ruang Dosen** menggunakan NestJS, Prisma ORM, dan PostgreSQL.

---

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT + Bcrypt

---

## Setup

```bash
# 1. Install dependencies (dari root folder)
npm install

# 2. Buat file .env di folder apps/api/
# Isi:
# DATABASE_URL="postgresql://postgres:PASSWORDMU@localhost:5432/ruang_dosen"
# JWT_SECRET="ruang-dosen-secret-key-2024"
# PORT=3001

# 3. Generate Prisma & Migrasi
cd apps/api
npx prisma generate
npx prisma migrate dev

# 4. Jalankan server
npx nest start
```

Server berjalan di `http://localhost:3001`

---

## Modul yang Sudah Dikerjakan

### Auth Module — oleh Ariel
**Branch:** `fitur/backend-api-auth-ariel`

Modul autentikasi (gerbang masuk aplikasi). Terdiri dari dua endpoint:

#### 1. Register — `POST /auth/register`
Endpoint untuk mendaftarkan akun baru ke dalam sistem.

**Yang dilakukan endpoint ini:**
- Menerima data `name`, `email`, `password`, dan `role` (STUDENT / LECTURER / ADMIN)
- Mengecek apakah email sudah pernah dipakai. Jika sudah, mengembalikan error 409 (Conflict) dengan pesan "Email sudah terdaftar"
- Mengacak (hash) password menggunakan bcrypt dengan salt rounds 10 agar password tidak tersimpan mentah di database
- Menyimpan data user baru ke tabel User di PostgreSQL via Prisma
- Mengembalikan data user yang baru terdaftar tanpa menyertakan field password

**Contoh Request:**
```json
POST /auth/register
{
  "name": "Dosen Test",
  "email": "dosen@test.com",
  "password": "password123",
  "role": "LECTURER"
}
```

**Contoh Response (Sukses):**
```json
{
  "id": "29dc4f7d-...",
  "name": "Dosen Test",
  "email": "dosen@test.com",
  "role": "LECTURER",
  "xp": 0,
  "createdAt": "2026-05-01T...",
  "updatedAt": "2026-05-01T..."
}
```

#### 2. Login — `POST /auth/login`
Endpoint untuk masuk ke akun dan mendapatkan JWT Token.

**Yang dilakukan endpoint ini:**
- Menerima data `email` dan `password`
- Mencari user di database berdasarkan email. Jika tidak ditemukan, mengembalikan error 401 dengan pesan "Email tidak ditemukan"
- Mencocokkan password yang dikirim dengan password hash di database menggunakan bcrypt.compare. Jika tidak cocok, mengembalikan error 401 dengan pesan "Password salah"
- Jika cocok, membuat JWT Token yang berisi ID user (sub) dan Role user. Token berlaku selama 24 jam
- Mengembalikan access_token beserta data user

**Contoh Request:**
```json
POST /auth/login
{
  "email": "dosen@test.com",
  "password": "password123"
}
```

**Contoh Response (Sukses):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "29dc4f7d-...",
    "name": "Dosen Test",
    "email": "dosen@test.com",
    "role": "LECTURER"
  }
}
```

### File yang dikerjakan:
| File | Keterangan |
|------|-----------|
| `src/auth/auth.service.ts` | Logika register (hash bcrypt) dan login (compare + JWT sign) |
| `src/auth/auth.controller.ts` | Route POST /auth/register dan POST /auth/login |
| `src/auth/auth.module.ts` | Konfigurasi JwtModule (secret, expire 24h) dan PrismaService |

---

## Database Schema (Prisma)

Tabel yang tersedia di database:

| Tabel | Keterangan |
|-------|-----------|
| User | Data pengguna (nama, email, password hash, role, xp) |
| Course | Mata Kuliah |
| Material | Materi pembelajaran (teks/video/dokumen) |
| Quiz | Kuis gamifikasi dengan XP reward |
| QuizQuestion | Soal-soal kuis (pilihan ganda, JSON options) |
| Assignment | Tugas dari dosen |
| PracticalLab | Sesi praktikum digital |

Lihat detail lengkap di file `prisma/schema.prisma`.

---

## Struktur Folder

```
apps/api/
├── prisma/
│   ├── schema.prisma      # Desain tabel database
│   └── prisma.service.ts   # Service koneksi database
├── src/
│   ├── auth/               # Modul Auth (Ariel) ✅
│   ├── course/             # Modul Course (Sinta)
│   ├── quiz/               # Modul Quiz (Tio)
│   ├── assignment/         # Modul Assignment (Dimas)
│   ├── material/           # Modul Material (Sinta)
│   ├── lab/                # Modul Practical Lab (Dimas)
│   └── main.ts             # Entry point
└── .env                    # Environment variables (tidak di-push)
```
