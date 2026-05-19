const ExcelJS = require('exceljs');
const wb = new ExcelJS.Workbook();

// === COLORS ===
const BLUE = '0EA5E9', DARK = '1E293B', WHITE = 'FFFFFF', GREEN = '065F46', GREENTEXT = '6EE7B7';
const YELLOW_BG = '78350F', YELLOW_T = 'FCD34D', GRAY_BG = '374151', GRAY_T = '9CA3AF';
const RED_BG = '7F1D1D', RED_T = 'FCA5A5', LOWBLUE_BG = '1E3A5F', LOWBLUE_T = '93C5FD';
const ARIEL_BG = '312E81', ARIEL_T = 'A5B4FC', TIO_BG = '1E3A5F', TIO_T = '7DD3FC';
const SINTA_BG = '4A1D6A', SINTA_T = 'D8B4FE', DIMAS_BG = '3B3117', DIMAS_T = 'FCD34D';
const ALL_BG = '1C3D3D', ALL_T = '5EEAD4';
const SPRINT_BG = '1A2744', SPRINT_T = '38BDF8';

const ownerColor = { Ariel: [ARIEL_BG, ARIEL_T], Tio: [TIO_BG, TIO_T], Sinta: [SINTA_BG, SINTA_T], Dimas: [DIMAS_BG, DIMAS_T], Semua: [ALL_BG, ALL_T] };
const prioColor = { High: [RED_BG, RED_T], Medium: [YELLOW_BG, YELLOW_T], Low: [LOWBLUE_BG, LOWBLUE_T] };
const statusColor = { Selesai: [GREEN, GREENTEXT], Belum: [GRAY_BG, GRAY_T], Sedang: [YELLOW_BG, YELLOW_T] };

const COLS = ['Task','Priority','Owner','Status','Start Date','End Date','Deskripsi Jobdesk','Kendala yang Dialami'];

const tasks = [
  { sprint: 'Sprint 1 — Fondasi & Endpoint Pertama (1 Mei – 7 Mei)' },
  ['Setup project & Prisma Schema','High','Ariel','Selesai','28 Apr','30 Apr','Clone repo, npm install, buat .env, desain semua tabel di schema.prisma, prisma generate & migrate','—'],
  ['POST /auth/register','High','Ariel','Selesai','1 Mei','1 Mei','Daftar akun baru. Hash password pakai bcrypt, cek email duplikat, simpan ke DB, return tanpa password','—'],
  ['POST /auth/login','High','Ariel','Selesai','1 Mei','1 Mei','Login akun. Verifikasi email & password, generate JWT Token (expire 24h), return token + data user','—'],
  ['POST /quizzes','Medium','Tio','Belum','1 Mei','7 Mei','Buat kuis baru (title, courseId, xpReward, minScore). Validasi courseId ada di DB sebelum simpan','—'],
  ['POST /courses','Medium','Sinta','Belum','1 Mei','7 Mei','Buat mata kuliah baru (title, description, instructorId). Validasi instructorId role-nya LECTURER','—'],
  ['POST /assignments','Medium','Dimas','Belum','1 Mei','7 Mei','Buat tugas baru (title, description, courseId). Validasi courseId ada di DB sebelum simpan','—'],

  { sprint: 'Sprint 2 — CRUD Lengkap & Keamanan API (8 Mei – 14 Mei)' },
  ['JWT Strategy + RolesGuard','High','Ariel','Belum','8 Mei','10 Mei','Buat JwtStrategy dan RolesGuard agar endpoint dilindungi berdasarkan role (STUDENT/LECTURER/ADMIN)','—'],
  ['Seed data (user & course dummy)','Medium','Ariel','Belum','10 Mei','11 Mei','Buat file seed.ts berisi data dummy user dan course. Agar tim bisa test tanpa buat manual','—'],
  ['CRUD Quiz (GET, PUT, DELETE)','Medium','Tio','Belum','8 Mei','14 Mei','GET semua kuis (filter by courseId), GET by ID, PUT update, DELETE hapus','—'],
  ['CRUD Course (GET, PUT, DELETE)','Medium','Sinta','Belum','8 Mei','14 Mei','GET semua matkul (include relasi), GET by ID, PUT update, DELETE hapus','—'],
  ['CRUD Assignment (GET, PUT, DELETE)','Medium','Dimas','Belum','8 Mei','14 Mei','GET semua tugas (filter by courseId), GET by ID, PUT update, DELETE hapus','—'],

  { sprint: 'Sprint 3 — Fitur Lanjutan & Modul Baru (15 Mei – 21 Mei)' },
  ['Admin: Kelola User (CRUD)','High','Ariel','Belum','15 Mei','17 Mei','GET semua user, GET by ID, PUT ubah role, DELETE hapus. Hanya ADMIN','—'],
  ['Endpoint Profile (GET, PUT)','Medium','Ariel','Belum','17 Mei','18 Mei','GET profil user dari token, PUT update nama dan password sendiri','—'],
  ['QuizQuestion + Auto Scoring','Medium','Tio','Belum','15 Mei','21 Mei','CRUD soal kuis (pilihan ganda). Submit jawaban, hitung skor otomatis, tambah XP','—'],
  ['CRUD Material (upload materi)','Medium','Sinta','Belum','15 Mei','21 Mei','CRUD materi per matkul (teks/video/dokumen). Filter by courseId','—'],
  ['Submit Assignment + CRUD Lab','Medium','Dimas','Belum','15 Mei','21 Mei','Mahasiswa submit jawaban tugas. CRUD PracticalLab (session, instruksi, linked course)','—'],

  { sprint: 'Sprint 4 — Polish, Statistik & Testing (22 Mei – 28 Mei)' },
  ['Admin: Statistik + Pengumuman','Medium','Ariel','Belum','22 Mei','24 Mei','Dashboard statistik (total user, course, quiz). Endpoint pengumuman global','—'],
  ['Leaderboard XP','Low','Tio','Belum','22 Mei','25 Mei','Ranking mahasiswa berdasarkan XP tertinggi. Filter per course','—'],
  ['Search, Filter & Pagination','Low','Sinta','Belum','22 Mei','25 Mei','Search by keyword, filter by instructor, pagination di semua GET list','—'],
  ['Grading Assignment','Low','Dimas','Belum','22 Mei','25 Mei','Dosen kasih nilai ke submission tugas mahasiswa','—'],
  ['Testing semua endpoint (Postman)','High','Semua','Belum','26 Mei','28 Mei','Test semua endpoint, dokumentasi request/response, fix bug','—'],

  { sprint: 'Sprint 5 — Integrasi Frontend ↔ Backend (29 Mei – 4 Jun)' },
  ['Integrasi Auth (Login/Register)','High','Ariel','Belum','29 Mei','31 Mei','Sambungkan form Login/Register FE ke API. Handle JWT di localStorage','—'],
  ['Integrasi Quiz & Leaderboard','Medium','Tio','Belum','29 Mei','4 Jun','Halaman kuis FE fetch dari API. Submit jawaban, leaderboard XP','—'],
  ['Integrasi Course & Material','Medium','Sinta','Belum','29 Mei','4 Jun','Halaman matkul dan materi FE fetch dari API. Search & filter berfungsi','—'],
  ['Integrasi Assignment & Lab','Medium','Dimas','Belum','29 Mei','4 Jun','Halaman tugas dan lab FE fetch dari API. Form submit berfungsi','—'],

  { sprint: 'Sprint 6 — Deploy & Final Testing (5 Jun – 11 Jun)' },
  ['Deploy backend ke cloud','High','Ariel','Belum','5 Jun','7 Jun','Deploy NestJS ke Railway/Render. Setup PostgreSQL online','—'],
  ['Deploy frontend ke Vercel','Medium','Semua','Belum','7 Jun','9 Jun','Deploy Next.js ke Vercel. Sambungkan ke backend production','—'],
  ['Final testing end-to-end','High','Semua','Belum','9 Jun','11 Jun','Test semua fitur dari link online. Fix bug, cek responsive','—'],

  { sprint: 'Sprint 7 — Dokumentasi & Presentasi (12 Jun – 14 Jun)' },
  ['Dokumentasi & laporan akhir','Medium','Semua','Belum','12 Jun','13 Jun','Laporan akhir, screenshot, dokumentasi API, slide presentasi','—'],
  ['DEADLINE / PRESENTASI','High','Semua','Belum','14 Jun','TBD','Pengumpulan akhir dan presentasi','—'],
];

function styleHeader(ws) {
  const hr = ws.getRow(1);
  hr.height = 28;
  COLS.forEach((_, i) => {
    const c = hr.getCell(i + 1);
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE } };
    c.font = { bold: true, color: { argb: WHITE }, size: 10 };
    c.alignment = { vertical: 'middle' };
    c.border = { bottom: { style: 'thin', color: { argb: '334155' } } };
  });
}

function addBadge(cell, text, bg, fg) {
  cell.value = text;
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
  cell.font = { bold: true, color: { argb: fg }, size: 9 };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
}

function addRows(ws, data) {
  data.forEach(item => {
    if (item.sprint) {
      const r = ws.addRow([`🏁 ${item.sprint}`]);
      ws.mergeCells(r.number, 1, r.number, 8);
      r.height = 28;
      const c = r.getCell(1);
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SPRINT_BG } };
      c.font = { bold: true, color: { argb: SPRINT_T }, size: 11 };
      c.alignment = { vertical: 'middle' };
    } else {
      const r = ws.addRow(item);
      r.height = 32;
      r.eachCell((c, i) => {
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
        c.font = { color: { argb: 'E2E8F0' }, size: 10 };
        c.alignment = { vertical: 'middle', wrapText: true };
        c.border = { bottom: { style: 'thin', color: { argb: '334155' } } };
      });
      // Priority badge
      const p = prioColor[item[1]];
      if (p) addBadge(r.getCell(2), item[1], p[0], p[1]);
      // Owner badge
      const o = ownerColor[item[2]];
      if (o) addBadge(r.getCell(3), item[2], o[0], o[1]);
      // Status badge
      const s = statusColor[item[3]];
      if (s) addBadge(r.getCell(4), item[3] === 'Selesai' ? '✅ Selesai' : item[3] === 'Sedang' ? '🔄 Sedang' : '⬜ Belum', s[0], s[1]);
    }
  });
}

// ====== SHEET 1: Sprint Board ======
const ws1 = wb.addWorksheet('Sprint Board');
ws1.columns = [
  { header: COLS[0], width: 32 }, { header: COLS[1], width: 12 },
  { header: COLS[2], width: 12 }, { header: COLS[3], width: 14 },
  { header: COLS[4], width: 12 }, { header: COLS[5], width: 12 },
  { header: COLS[6], width: 50 }, { header: COLS[7], width: 25 },
];
styleHeader(ws1);
addRows(ws1, tasks);

// ====== SHEET 2: Per Anggota ======
const ws2 = wb.addWorksheet('Per Anggota');
ws2.columns = ws1.columns.map(c => ({ ...c }));
styleHeader(ws2);

['Ariel','Tio','Sinta','Dimas'].forEach(name => {
  const personTasks = tasks.filter(t => Array.isArray(t) && t[2] === name);
  const done = personTasks.filter(t => t[3] === 'Selesai').length;
  const total = personTasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const hr = ws2.addRow([`👤 ${name} — ${done}/${total} selesai (${pct}%)`]);
  ws2.mergeCells(hr.number, 1, hr.number, 8);
  hr.height = 28;
  hr.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SPRINT_BG } };
  hr.getCell(1).font = { bold: true, color: { argb: SPRINT_T }, size: 11 };
  hr.getCell(1).alignment = { vertical: 'middle' };

  addRows(ws2, personTasks);
});

// ====== SHEET 3: Overview ======
const ws3 = wb.addWorksheet('Overview');
ws3.columns = [{ width: 25 },{ width: 15 },{ width: 15 },{ width: 15 },{ width: 15 },{ width: 20 }];

const titleRow = ws3.addRow(['📊 MILESTONE TRACKER — RUANG DOSEN']);
ws3.mergeCells(titleRow.number, 1, titleRow.number, 6);
titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: WHITE } };
titleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
titleRow.height = 36;

const subRow = ws3.addRow(['Backend LMS Ruang Dosen • Metode Scrum • Deadline 14 Juni 2026']);
ws3.mergeCells(subRow.number, 1, subRow.number, 6);
subRow.getCell(1).font = { size: 10, color: { argb: '94A3B8' } };
subRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } };
subRow.getCell(1).alignment = { horizontal: 'center' };

ws3.addRow([]);

// Summary stats
const allTasks = tasks.filter(t => Array.isArray(t));
const totalT = allTasks.length;
const doneT = allTasks.filter(t => t[3] === 'Selesai').length;
const pctAll = Math.round((doneT / totalT) * 100);

const statsHeader = ws3.addRow(['Metrik','Nilai']);
statsHeader.eachCell(c => { c.font = { bold: true, color: { argb: WHITE }, size: 10 }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE } }; });

[['Total Sprint', '7'], ['Total Task', String(totalT)], ['Task Selesai', String(doneT)],
 ['Progress', `${pctAll}%`], ['Sprint Aktif', 'Sprint 1'], ['Deadline', '14 Juni 2026'],
 ['Metode', 'Scrum'], ['Tim', 'Ariel (Lead), Tio, Sinta, Dimas']].forEach(r => {
  const row = ws3.addRow(r);
  row.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } }; c.font = { color: { argb: 'E2E8F0' }, size: 10 }; c.border = { bottom: { style: 'thin', color: { argb: '334155' } } }; });
});

ws3.addRow([]);
ws3.addRow([]);

// Sprint timeline
const timeHeader = ws3.addRow(['Sprint','Periode','Status','Jumlah Task','Selesai','Progress']);
timeHeader.eachCell(c => { c.font = { bold: true, color: { argb: WHITE }, size: 10 }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE } }; });

const sprintNames = ['Sprint 1','Sprint 2','Sprint 3','Sprint 4','Sprint 5','Sprint 6','Sprint 7'];
const sprintPeriods = ['1-7 Mei','8-14 Mei','15-21 Mei','22-28 Mei','29 Mei-4 Jun','5-11 Jun','12-14 Jun'];

let taskIdx = 0;
sprintNames.forEach((name, i) => {
  const sprintTasks = [];
  let found = false;
  for (let j = 0; j < tasks.length; j++) {
    if (tasks[j].sprint && tasks[j].sprint.includes(name.replace('Sprint ', 'Sprint '))) { found = true; continue; }
    if (found && tasks[j].sprint) break;
    if (found && Array.isArray(tasks[j])) sprintTasks.push(tasks[j]);
  }
  const done = sprintTasks.filter(t => t[3] === 'Selesai').length;
  const total = sprintTasks.length;
  const pct = total > 0 ? Math.round((done/total)*100) : 0;
  const status = pct === 100 ? '✅ Selesai' : pct > 0 ? '🔄 Sedang' : '⬜ Belum';

  const row = ws3.addRow([name, sprintPeriods[i], status, total, done, `${pct}%`]);
  row.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } }; c.font = { color: { argb: 'E2E8F0' }, size: 10 }; c.border = { bottom: { style: 'thin', color: { argb: '334155' } } }; });
});

ws3.addRow([]);
ws3.addRow([]);

// Notes section
const notesHeader = ws3.addRow(['📝 Catatan & Log Meeting']);
ws3.mergeCells(notesHeader.number, 1, notesHeader.number, 6);
notesHeader.getCell(1).font = { bold: true, color: { argb: SPRINT_T }, size: 12 };
notesHeader.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SPRINT_BG } };

const notesCols = ws3.addRow(['Tanggal','Catatan']);
notesCols.eachCell(c => { c.font = { bold: true, color: { argb: WHITE }, size: 10 }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BLUE } }; });

[['4 Mei 2026','Project setup selesai. Auth module (register + login) sudah jadi dan tested.'],
 ['',''],['',''],['',''],['','']].forEach(r => {
  const row = ws3.addRow(r);
  row.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK } }; c.font = { color: { argb: 'E2E8F0' }, size: 10 }; c.border = { bottom: { style: 'thin', color: { argb: '334155' } } }; });
});

// Save
wb.xlsx.writeFile('d:/projectAslabBackend/Milestone_Ruang_Dosen.xlsx').then(() => console.log('DONE'));
