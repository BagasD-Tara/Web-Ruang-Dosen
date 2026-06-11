// ============================================================
// MOCK DATA DOSEN — Quiz, Soal, Stats
// Hapus file ini dan ganti dengan API call saat backend ready
// ============================================================

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  moduleId: string;
  moduleTitle?: string;
  totalQuestions?: number;
  xpReward: number;
  minimumScore: number;
  durationMinutes: number;
  status: "draft" | "terkunci" | "selesai";
}

export interface QuizOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: QuizOption[];
  explanation?: string;
  points: number;
  required: boolean;
  shuffle: boolean;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  nim: string;
  durationSeconds: number | null;
  status: "selesai" | "terkunci" | "belum";
  score: number | null;
  avatarColor: string;
  initials: string;
}

export interface QuizStats {
  quizId: string;
  quizTitle: string;
  moduleTitle: string;
  totalParticipants: number;
  totalEnrolled: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  studentResults: StudentResult[];
}

// ─── Helper ───────────────────────────────────────────────────────────────────

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

// ─── Data Quiz ────────────────────────────────────────────────────────────────

let quizzesStore: Quiz[] = [
  // Course: Advanced Machine Learning
  {
    id: "dq-1",
    title: "Kuis 1: Konsep Dasar & Arsitektur Perceptron",
    courseId: "1",
    moduleId: "dmod-1",
    moduleTitle: "Modul 1: Pengenalan Neural Network",
    totalQuestions: 5,
    xpReward: 100,
    minimumScore: 70,
    durationMinutes: 60,
    status: "selesai",
  },
  {
    id: "dq-2",
    title: "Kuis 2: Backpropagation & Optimization",
    courseId: "1",
    moduleId: "dmod-1",
    moduleTitle: "Modul 1: Pengenalan Neural Network",
    totalQuestions: 5,
    xpReward: 120,
    minimumScore: 75,
    durationMinutes: 45,
    status: "selesai",
  },
  {
    id: "dq-3",
    title: "Kuis 3: Convolutional Neural Networks",
    courseId: "1",
    moduleId: "dmod-2",
    moduleTitle: "Modul 2: Deep Learning Architecture",
    totalQuestions: 5,
    xpReward: 150,
    minimumScore: 70,
    durationMinutes: 50,
    status: "draft",
  },
  {
    id: "dq-4",
    title: "Kuis 4: Transfer Learning & Fine-Tuning",
    courseId: "1",
    moduleId: "dmod-2",
    moduleTitle: "Modul 2: Deep Learning Architecture",
    totalQuestions: 5,
    xpReward: 130,
    minimumScore: 70,
    durationMinutes: 45,
    status: "terkunci",
  },

  // Course: Web Development Frontend
  {
    id: "dq-5",
    title: "Kuis 1: HTML & CSS Fundamentals",
    courseId: "web-dev",
    moduleId: "dmod-3",
    moduleTitle: "Modul 1: Dasar Web",
    totalQuestions: 5,
    xpReward: 100,
    minimumScore: 70,
    durationMinutes: 40,
    status: "selesai",
  },
  {
    id: "dq-6",
    title: "Kuis 2: JavaScript & DOM Manipulation",
    courseId: "web-dev",
    moduleId: "dmod-3",
    moduleTitle: "Modul 1: Dasar Web",
    totalQuestions: 5,
    xpReward: 120,
    minimumScore: 70,
    durationMinutes: 45,
    status: "selesai",
  },
  {
    id: "dq-7",
    title: "Kuis 3: React Components & Hooks",
    courseId: "web-dev",
    moduleId: "dmod-4",
    moduleTitle: "Modul 2: React Framework",
    totalQuestions: 5,
    xpReward: 150,
    minimumScore: 75,
    durationMinutes: 50,
    status: "draft",
  },
];

// ─── Data Soal ────────────────────────────────────────────────────────────────

let questionsStore: QuizQuestion[] = [
  // Soal untuk dq-1
  {
    id: "dq1-q1", quizId: "dq-1", points: 20, required: true, shuffle: false,
    questionText: "Apa fungsi aktivasi yang menghasilkan output antara 0 dan 1?",
    options: [
      { label: "A", text: "Sigmoid", isCorrect: true },
      { label: "B", text: "ReLU", isCorrect: false },
      { label: "C", text: "Tanh", isCorrect: false },
      { label: "D", text: "Linear", isCorrect: false },
    ],
    explanation: "Sigmoid memetakan nilai apapun ke rentang 0–1, cocok untuk output probabilitas.",
  },
  {
    id: "dq1-q2", quizId: "dq-1", points: 20, required: true, shuffle: false,
    questionText: "Perceptron termasuk jenis neural network apa?",
    options: [
      { label: "A", text: "Recurrent Neural Network", isCorrect: false },
      { label: "B", text: "Single-layer feedforward network", isCorrect: true },
      { label: "C", text: "Convolutional Neural Network", isCorrect: false },
      { label: "D", text: "Transformer", isCorrect: false },
    ],
    explanation: "Perceptron adalah jaringan feedforward satu lapis — model neural network paling sederhana.",
  },
  {
    id: "dq1-q3", quizId: "dq-1", points: 20, required: true, shuffle: false,
    questionText: "Apa yang dimaksud dengan bias dalam neural network?",
    options: [
      { label: "A", text: "Nilai error dari prediksi model", isCorrect: false },
      { label: "B", text: "Parameter tambahan yang memungkinkan fungsi aktivasi bergeser", isCorrect: true },
      { label: "C", text: "Jumlah neuron dalam satu layer", isCorrect: false },
      { label: "D", text: "Kecepatan pembelajaran model", isCorrect: false },
    ],
    explanation: "Bias memungkinkan model belajar pola yang tidak melewati titik asal (origin).",
  },
  {
    id: "dq1-q4", quizId: "dq-1", points: 20, required: true, shuffle: false,
    questionText: "Apa output dari fungsi aktivasi ReLU untuk input negatif?",
    options: [
      { label: "A", text: "Nilai input itu sendiri", isCorrect: false },
      { label: "B", text: "Nilai absolut dari input", isCorrect: false },
      { label: "C", text: "0", isCorrect: true },
      { label: "D", text: "-1", isCorrect: false },
    ],
    explanation: "ReLU: f(x) = max(0, x). Semua nilai negatif menjadi 0.",
  },
  {
    id: "dq1-q5", quizId: "dq-1", points: 20, required: true, shuffle: false,
    questionText: "Layer yang langsung menerima input data disebut?",
    options: [
      { label: "A", text: "Hidden layer", isCorrect: false },
      { label: "B", text: "Output layer", isCorrect: false },
      { label: "C", text: "Input layer", isCorrect: true },
      { label: "D", text: "Activation layer", isCorrect: false },
    ],
    explanation: "Input layer menerima data mentah dan meneruskannya ke hidden layer.",
  },

  // Soal untuk dq-2
  {
    id: "dq2-q1", quizId: "dq-2", points: 20, required: true, shuffle: false,
    questionText: "Backpropagation menggunakan algoritma apa untuk menghitung gradien?",
    options: [
      { label: "A", text: "Forward propagation", isCorrect: false },
      { label: "B", text: "Chain rule dari kalkulus", isCorrect: true },
      { label: "C", text: "Dynamic programming", isCorrect: false },
      { label: "D", text: "Greedy algorithm", isCorrect: false },
    ],
    explanation: "Chain rule memungkinkan gradien dihitung dari layer output mundur ke input layer.",
  },
  {
    id: "dq2-q2", quizId: "dq-2", points: 20, required: true, shuffle: false,
    questionText: "Vanishing gradient problem paling sering terjadi pada?",
    options: [
      { label: "A", text: "Network dengan sedikit layer", isCorrect: false },
      { label: "B", text: "Network yang sangat dalam dengan fungsi sigmoid/tanh", isCorrect: true },
      { label: "C", text: "Network dengan ReLU di semua layer", isCorrect: false },
      { label: "D", text: "Network dengan batch normalization", isCorrect: false },
    ],
    explanation: "Sigmoid/tanh menghasilkan gradien kecil yang makin kecil saat dipropagasi mundur di network dalam.",
  },
  {
    id: "dq2-q3", quizId: "dq-2", points: 20, required: true, shuffle: false,
    questionText: "Optimizer Adam merupakan kombinasi dari?",
    options: [
      { label: "A", text: "SGD dan RMSProp", isCorrect: false },
      { label: "B", text: "Momentum dan RMSProp", isCorrect: true },
      { label: "C", text: "AdaGrad dan SGD", isCorrect: false },
      { label: "D", text: "Nesterov dan AdaDelta", isCorrect: false },
    ],
    explanation: "Adam = Adaptive Moment Estimation, menggabungkan momentum (1st moment) dan RMSProp (2nd moment).",
  },
  {
    id: "dq2-q4", quizId: "dq-2", points: 20, required: true, shuffle: false,
    questionText: "Learning rate scheduler berguna untuk?",
    options: [
      { label: "A", text: "Menambah jumlah epoch", isCorrect: false },
      { label: "B", text: "Menyesuaikan learning rate selama training agar konvergensi lebih baik", isCorrect: true },
      { label: "C", text: "Mengurangi jumlah parameter", isCorrect: false },
      { label: "D", text: "Meningkatkan batch size", isCorrect: false },
    ],
    explanation: "Learning rate yang besar di awal lalu dikurangi membantu model konvergen dengan stabil.",
  },
  {
    id: "dq2-q5", quizId: "dq-2", points: 20, required: true, shuffle: false,
    questionText: "Weight initialization yang buruk dapat menyebabkan?",
    options: [
      { label: "A", text: "Training lebih cepat", isCorrect: false },
      { label: "B", text: "Symmetry breaking yang gagal", isCorrect: false },
      { label: "C", text: "Vanishing atau exploding gradient", isCorrect: true },
      { label: "D", text: "Overfitting", isCorrect: false },
    ],
    explanation: "Inisialisasi bobot yang terlalu kecil/besar menyebabkan gradien menghilang atau meledak.",
  },

  // Soal untuk dq-3
  {
    id: "dq3-q1", quizId: "dq-3", points: 20, required: true, shuffle: false,
    questionText: "Operasi utama dalam CNN yang mengekstrak fitur lokal adalah?",
    options: [
      { label: "A", text: "Pooling", isCorrect: false },
      { label: "B", text: "Fully connected", isCorrect: false },
      { label: "C", text: "Convolution", isCorrect: true },
      { label: "D", text: "Normalization", isCorrect: false },
    ],
    explanation: "Convolution mengaplikasikan filter/kernel untuk mendeteksi fitur lokal seperti tepi, tekstur.",
  },
  {
    id: "dq3-q2", quizId: "dq-3", points: 20, required: true, shuffle: false,
    questionText: "Max pooling berfungsi untuk?",
    options: [
      { label: "A", text: "Menambah dimensi feature map", isCorrect: false },
      { label: "B", text: "Mengambil nilai maksimum dari setiap region untuk reduksi dimensi", isCorrect: true },
      { label: "C", text: "Menghitung rata-rata nilai pixel", isCorrect: false },
      { label: "D", text: "Menormalisasi nilai feature map", isCorrect: false },
    ],
    explanation: "Max pooling mengurangi spatial size sambil mempertahankan fitur paling dominan.",
  },
  {
    id: "dq3-q3", quizId: "dq-3", points: 20, required: true, shuffle: false,
    questionText: "Berapa jumlah parameter kernel 3×3 dengan 64 filter dari 32 channel input?",
    options: [
      { label: "A", text: "9.216", isCorrect: false },
      { label: "B", text: "18.432", isCorrect: true },
      { label: "C", text: "4.608", isCorrect: false },
      { label: "D", text: "36.864", isCorrect: false },
    ],
    explanation: "3 × 3 × 32 (input) × 64 (filter) = 18.432 parameter bobot.",
  },
  {
    id: "dq3-q4", quizId: "dq-3", points: 20, required: true, shuffle: false,
    questionText: "Padding 'same' pada convolution bertujuan untuk?",
    options: [
      { label: "A", text: "Mempercepat komputasi", isCorrect: false },
      { label: "B", text: "Mempertahankan ukuran spatial output sama dengan input", isCorrect: true },
      { label: "C", text: "Mengurangi jumlah parameter", isCorrect: false },
      { label: "D", text: "Meningkatkan depth feature map", isCorrect: false },
    ],
    explanation: "Padding 'same' menambahkan zero-padding agar ukuran spatial output = input.",
  },
  {
    id: "dq3-q5", quizId: "dq-3", points: 20, required: true, shuffle: false,
    questionText: "Batch Normalization diletakkan di?",
    options: [
      { label: "A", text: "Sebelum input layer", isCorrect: false },
      { label: "B", text: "Setelah fungsi aktivasi", isCorrect: false },
      { label: "C", text: "Antara linear transformation dan fungsi aktivasi", isCorrect: true },
      { label: "D", text: "Hanya di output layer", isCorrect: false },
    ],
    explanation: "BatchNorm biasanya diletakkan setelah linear/conv layer dan sebelum aktivasi.",
  },

  // Soal untuk dq-5
  {
    id: "dq5-q1", quizId: "dq-5", points: 20, required: true, shuffle: false,
    questionText: "Tag HTML yang digunakan untuk heading terbesar adalah?",
    options: [
      { label: "A", text: "<h6>", isCorrect: false },
      { label: "B", text: "<heading>", isCorrect: false },
      { label: "C", text: "<h1>", isCorrect: true },
      { label: "D", text: "<title>", isCorrect: false },
    ],
    explanation: "<h1> adalah heading dengan hierarki tertinggi (terbesar) dalam HTML.",
  },
  {
    id: "dq5-q2", quizId: "dq-5", points: 20, required: true, shuffle: false,
    questionText: "Property CSS untuk mengatur jarak di dalam elemen adalah?",
    options: [
      { label: "A", text: "margin", isCorrect: false },
      { label: "B", text: "padding", isCorrect: true },
      { label: "C", text: "border", isCorrect: false },
      { label: "D", text: "gap", isCorrect: false },
    ],
    explanation: "Padding = ruang di dalam border elemen. Margin = ruang di luar border.",
  },
  {
    id: "dq5-q3", quizId: "dq-5", points: 20, required: true, shuffle: false,
    questionText: "Untuk mengaktifkan Flexbox pada container, property yang digunakan adalah?",
    options: [
      { label: "A", text: "display: block", isCorrect: false },
      { label: "B", text: "display: grid", isCorrect: false },
      { label: "C", text: "display: flex", isCorrect: true },
      { label: "D", text: "position: flex", isCorrect: false },
    ],
    explanation: "display: flex mengaktifkan Flexbox sehingga child elements menjadi flex items.",
  },
  {
    id: "dq5-q4", quizId: "dq-5", points: 20, required: true, shuffle: false,
    questionText: "CSS selector untuk menarget elemen berdasarkan ID adalah?",
    options: [
      { label: "A", text: ".nama", isCorrect: false },
      { label: "B", text: "#nama", isCorrect: true },
      { label: "C", text: "@nama", isCorrect: false },
      { label: "D", text: "*nama", isCorrect: false },
    ],
    explanation: "# untuk ID selector, . untuk class selector dalam CSS.",
  },
  {
    id: "dq5-q5", quizId: "dq-5", points: 20, required: true, shuffle: false,
    questionText: "Atribut HTML untuk teks alternatif gambar adalah?",
    options: [
      { label: "A", text: "title", isCorrect: false },
      { label: "B", text: "src", isCorrect: false },
      { label: "C", text: "alt", isCorrect: true },
      { label: "D", text: "name", isCorrect: false },
    ],
    explanation: "Atribut alt wajib untuk aksesibilitas — screen reader membacanya jika gambar gagal dimuat.",
  },

  // Soal untuk dq-6
  {
    id: "dq6-q1", quizId: "dq-6", points: 20, required: true, shuffle: false,
    questionText: "Cara mendeklarasikan variabel yang tidak bisa diubah nilainya di JavaScript?",
    options: [
      { label: "A", text: "var x = 10", isCorrect: false },
      { label: "B", text: "let x = 10", isCorrect: false },
      { label: "C", text: "const x = 10", isCorrect: true },
      { label: "D", text: "static x = 10", isCorrect: false },
    ],
    explanation: "const tidak bisa di-reassign. Untuk objek/array, referensinya tetap tapi propertinya bisa berubah.",
  },
  {
    id: "dq6-q2", quizId: "dq-6", points: 20, required: true, shuffle: false,
    questionText: "Metode DOM yang digunakan untuk memilih elemen berdasarkan ID?",
    options: [
      { label: "A", text: "document.querySelector()", isCorrect: false },
      { label: "B", text: "document.getElementById()", isCorrect: true },
      { label: "C", text: "document.getElement()", isCorrect: false },
      { label: "D", text: "document.findById()", isCorrect: false },
    ],
    explanation: "getElementById() langsung mencari elemen dengan ID tertentu, lebih spesifik dari querySelector.",
  },
  {
    id: "dq6-q3", quizId: "dq-6", points: 20, required: true, shuffle: false,
    questionText: "Event listener untuk mendeteksi klik pada elemen adalah?",
    options: [
      { label: "A", text: "'press'", isCorrect: false },
      { label: "B", text: "'tap'", isCorrect: false },
      { label: "C", text: "'click'", isCorrect: true },
      { label: "D", text: "'select'", isCorrect: false },
    ],
    explanation: "Event 'click' dipicu saat user mengklik elemen, baik dengan mouse maupun keyboard (Enter).",
  },
  {
    id: "dq6-q4", quizId: "dq-6", points: 20, required: true, shuffle: false,
    questionText: "Arrow function di JavaScript ditulis dengan sintaks?",
    options: [
      { label: "A", text: "function => {}", isCorrect: false },
      { label: "B", text: "() => {}", isCorrect: true },
      { label: "C", text: "fn() -> {}", isCorrect: false },
      { label: "D", text: "lambda() {}", isCorrect: false },
    ],
    explanation: "Arrow function: const fn = () => {}. Lebih ringkas dan tidak punya 'this' sendiri.",
  },
  {
    id: "dq6-q5", quizId: "dq-6", points: 20, required: true, shuffle: false,
    questionText: "Method array JavaScript untuk membuat array baru dari transformasi elemen adalah?",
    options: [
      { label: "A", text: "filter()", isCorrect: false },
      { label: "B", text: "reduce()", isCorrect: false },
      { label: "C", text: "map()", isCorrect: true },
      { label: "D", text: "forEach()", isCorrect: false },
    ],
    explanation: "map() mengembalikan array baru hasil transformasi setiap elemen, tanpa mengubah array asli.",
  },

  // Soal untuk dq-7
  {
    id: "dq7-q1", quizId: "dq-7", points: 20, required: true, shuffle: false,
    questionText: "React Hook yang digunakan untuk menyimpan state lokal komponen adalah?",
    options: [
      { label: "A", text: "useEffect", isCorrect: false },
      { label: "B", text: "useState", isCorrect: true },
      { label: "C", text: "useContext", isCorrect: false },
      { label: "D", text: "useRef", isCorrect: false },
    ],
    explanation: "useState mengembalikan [state, setState]. Setiap setState dipanggil, komponen re-render.",
  },
  {
    id: "dq7-q2", quizId: "dq-7", points: 20, required: true, shuffle: false,
    questionText: "useEffect dengan dependency array kosong [] akan berjalan?",
    options: [
      { label: "A", text: "Setiap kali komponen re-render", isCorrect: false },
      { label: "B", text: "Hanya sekali setelah komponen pertama kali mount", isCorrect: true },
      { label: "C", text: "Tidak pernah berjalan", isCorrect: false },
      { label: "D", text: "Setiap 1 detik", isCorrect: false },
    ],
    explanation: "[] berarti tidak ada dependency → effect hanya berjalan sekali saat mount.",
  },
  {
    id: "dq7-q3", quizId: "dq-7", points: 20, required: true, shuffle: false,
    questionText: "Props di React bersifat?",
    options: [
      { label: "A", text: "Mutable — bisa diubah oleh child", isCorrect: false },
      { label: "B", text: "Immutable — tidak bisa diubah oleh penerima", isCorrect: true },
      { label: "C", text: "Optional — tidak perlu didefinisikan", isCorrect: false },
      { label: "D", text: "Global — bisa diakses dari mana saja", isCorrect: false },
    ],
    explanation: "Props adalah read-only. Gunakan state atau callback dari parent untuk mengubah data.",
  },
  {
    id: "dq7-q4", quizId: "dq-7", points: 20, required: true, shuffle: false,
    questionText: "Key prop pada list React digunakan untuk?",
    options: [
      { label: "A", text: "Styling element list", isCorrect: false },
      { label: "B", text: "Membantu React mengidentifikasi elemen yang berubah saat reconciliation", isCorrect: true },
      { label: "C", text: "Mengurutkan elemen list", isCorrect: false },
      { label: "D", text: "Mengakses elemen dari parent", isCorrect: false },
    ],
    explanation: "Key membantu Virtual DOM reconciliation — mengidentifikasi elemen yang perlu diupdate/dihapus.",
  },
  {
    id: "dq7-q5", quizId: "dq-7", points: 20, required: true, shuffle: false,
    questionText: "Untuk berbagi state antar komponen yang tidak berhubungan langsung, digunakan?",
    options: [
      { label: "A", text: "useState", isCorrect: false },
      { label: "B", text: "Props drilling", isCorrect: false },
      { label: "C", text: "useContext atau state management library", isCorrect: true },
      { label: "D", text: "useEffect", isCorrect: false },
    ],
    explanation: "Context API atau Redux/Zustand digunakan untuk state yang perlu diakses banyak komponen.",
  },
];

// ─── Data Stats ───────────────────────────────────────────────────────────────

const statsStore: Record<string, QuizStats> = {
  "dq-1": {
    quizId: "dq-1",
    quizTitle: "Kuis 1: Konsep Dasar & Arsitektur Perceptron",
    moduleTitle: "Modul 1: Pengenalan Neural Network",
    totalParticipants: 42,
    totalEnrolled: 48,
    averageScore: 82.5,
    highestScore: 100,
    lowestScore: 45,
    studentResults: [
      { studentId: "s-1", studentName: "Arief Cahyono", nim: "22041110001", durationSeconds: 2450, status: "selesai", score: 100, avatarColor: "#3B82F6", initials: "AC" },
      { studentId: "s-2", studentName: "Budi Santoso", nim: "22041110002", durationSeconds: 3100, status: "selesai", score: 85, avatarColor: "#10B981", initials: "BS" },
      { studentId: "s-3", studentName: "Siti Aminah", nim: "22041110003", durationSeconds: 1800, status: "selesai", score: 95, avatarColor: "#EC4899", initials: "SA" },
      { studentId: "s-4", studentName: "Dian Pratama", nim: "22041110004", durationSeconds: 3600, status: "selesai", score: 75, avatarColor: "#F59E0B", initials: "DP" },
      { studentId: "s-5", studentName: "Gilang Ramadhan", nim: "22041110005", durationSeconds: null, status: "terkunci", score: null, avatarColor: "#6B7280", initials: "GR" },
      { studentId: "s-6", studentName: "Hana Kurniawati", nim: "22041110006", durationSeconds: 2900, status: "selesai", score: 90, avatarColor: "#8B5CF6", initials: "HK" },
      { studentId: "s-7", studentName: "Irfan Maulana", nim: "22041110007", durationSeconds: null, status: "belum", score: null, avatarColor: "#EF4444", initials: "IM" },
      { studentId: "s-8", studentName: "Joko Widodo", nim: "22041110008", durationSeconds: 2100, status: "selesai", score: 80, avatarColor: "#14B8A6", initials: "JW" },
      { studentId: "s-9", studentName: "Kartika Sari", nim: "22041110009", durationSeconds: 3300, status: "selesai", score: 70, avatarColor: "#F97316", initials: "KS" },
      { studentId: "s-10", studentName: "Lukman Hakim", nim: "22041110010", durationSeconds: 1500, status: "selesai", score: 45, avatarColor: "#6366F1", initials: "LH" },
    ],
  },
  "dq-2": {
    quizId: "dq-2",
    quizTitle: "Kuis 2: Backpropagation & Optimization",
    moduleTitle: "Modul 1: Pengenalan Neural Network",
    totalParticipants: 38,
    totalEnrolled: 48,
    averageScore: 76.3,
    highestScore: 100,
    lowestScore: 40,
    studentResults: [
      { studentId: "s-1", studentName: "Arief Cahyono", nim: "22041110001", durationSeconds: 2200, status: "selesai", score: 100, avatarColor: "#3B82F6", initials: "AC" },
      { studentId: "s-2", studentName: "Budi Santoso", nim: "22041110002", durationSeconds: 2700, status: "selesai", score: 80, avatarColor: "#10B981", initials: "BS" },
      { studentId: "s-3", studentName: "Siti Aminah", nim: "22041110003", durationSeconds: 1600, status: "selesai", score: 90, avatarColor: "#EC4899", initials: "SA" },
      { studentId: "s-4", studentName: "Dian Pratama", nim: "22041110004", durationSeconds: null, status: "belum", score: null, avatarColor: "#F59E0B", initials: "DP" },
      { studentId: "s-5", studentName: "Gilang Ramadhan", nim: "22041110005", durationSeconds: null, status: "terkunci", score: null, avatarColor: "#6B7280", initials: "GR" },
      { studentId: "s-6", studentName: "Hana Kurniawati", nim: "22041110006", durationSeconds: 3100, status: "selesai", score: 75, avatarColor: "#8B5CF6", initials: "HK" },
      { studentId: "s-7", studentName: "Irfan Maulana", nim: "22041110007", durationSeconds: 2400, status: "selesai", score: 40, avatarColor: "#EF4444", initials: "IM" },
      { studentId: "s-8", studentName: "Joko Widodo", nim: "22041110008", durationSeconds: 1900, status: "selesai", score: 85, avatarColor: "#14B8A6", initials: "JW" },
    ],
  },
  "dq-5": {
    quizId: "dq-5",
    quizTitle: "Kuis 1: HTML & CSS Fundamentals",
    moduleTitle: "Modul 1: Dasar Web",
    totalParticipants: 30,
    totalEnrolled: 35,
    averageScore: 88.0,
    highestScore: 100,
    lowestScore: 60,
    studentResults: [
      { studentId: "s-11", studentName: "Maya Indah", nim: "22041120001", durationSeconds: 1200, status: "selesai", score: 100, avatarColor: "#3B82F6", initials: "MI" },
      { studentId: "s-12", studentName: "Naufal Rizky", nim: "22041120002", durationSeconds: 1500, status: "selesai", score: 95, avatarColor: "#10B981", initials: "NR" },
      { studentId: "s-13", studentName: "Olivia Putri", nim: "22041120003", durationSeconds: 2100, status: "selesai", score: 85, avatarColor: "#EC4899", initials: "OP" },
      { studentId: "s-14", studentName: "Pandu Wibowo", nim: "22041120004", durationSeconds: 2800, status: "selesai", score: 60, avatarColor: "#F59E0B", initials: "PW" },
      { studentId: "s-15", studentName: "Qori Rahmah", nim: "22041120005", durationSeconds: null, status: "belum", score: null, avatarColor: "#6B7280", initials: "QR" },
    ],
  },
  "dq-6": {
    quizId: "dq-6",
    quizTitle: "Kuis 2: JavaScript & DOM Manipulation",
    moduleTitle: "Modul 1: Dasar Web",
    totalParticipants: 28,
    totalEnrolled: 35,
    averageScore: 79.5,
    highestScore: 100,
    lowestScore: 40,
    studentResults: [
      { studentId: "s-11", studentName: "Maya Indah", nim: "22041120001", durationSeconds: 1800, status: "selesai", score: 100, avatarColor: "#3B82F6", initials: "MI" },
      { studentId: "s-12", studentName: "Naufal Rizky", nim: "22041120002", durationSeconds: 2200, status: "selesai", score: 80, avatarColor: "#10B981", initials: "NR" },
      { studentId: "s-13", studentName: "Olivia Putri", nim: "22041120003", durationSeconds: 2500, status: "selesai", score: 75, avatarColor: "#EC4899", initials: "OP" },
      { studentId: "s-14", studentName: "Pandu Wibowo", nim: "22041120004", durationSeconds: 3200, status: "selesai", score: 40, avatarColor: "#F59E0B", initials: "PW" },
      { studentId: "s-15", studentName: "Qori Rahmah", nim: "22041120005", durationSeconds: null, status: "terkunci", score: null, avatarColor: "#6B7280", initials: "QR" },
    ],
  },
};

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getQuizById(id: string): Promise<Quiz> {
  await delay();
  const quiz = quizzesStore.find((q) => q.id === id);
  if (!quiz) throw new Error(`Quiz ${id} tidak ditemukan`);
  return { ...quiz };
}

export async function getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
  await delay();
  return quizzesStore.filter((q) => q.courseId === courseId).map((q) => ({ ...q }));
}

export async function createQuiz(data: Omit<Quiz, "id">): Promise<Quiz> {
  await delay();
  const newQuiz: Quiz = {
    ...data,
    id: `dq-${Date.now()}`,
    status: data.status || "draft",
    totalQuestions: 0,
  };
  quizzesStore.push(newQuiz);
  return { ...newQuiz };
}

export async function updateQuiz(id: string, data: Partial<Quiz>): Promise<Quiz> {
  await delay();
  quizzesStore = quizzesStore.map((q) => q.id === id ? { ...q, ...data } : q);
  return getQuizById(id);
}

export async function publishQuiz(id: string): Promise<Quiz> {
  await delay();
  quizzesStore = quizzesStore.map((q) => q.id === id ? { ...q, status: "selesai" } : q);
  return getQuizById(id);
}

export async function deleteQuiz(quizId: string): Promise<void> {
  await delay();
  quizzesStore = quizzesStore.filter((q) => q.id !== quizId);
}

export async function getQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
  await delay();
  return questionsStore.filter((q) => q.quizId === quizId).map((q) => ({ ...q }));
}

export async function createQuestion(quizId: string, data: Partial<QuizQuestion>): Promise<QuizQuestion> {
  await delay();
  const newQuestion: QuizQuestion = {
    id: `dq-q-${Date.now()}`,
    quizId,
    questionText: data.questionText || "",
    options: data.options || [
      { label: "A", text: "", isCorrect: false },
      { label: "B", text: "", isCorrect: false },
      { label: "C", text: "", isCorrect: false },
      { label: "D", text: "", isCorrect: false },
    ],
    explanation: data.explanation || "",
    points: data.points || 10,
    required: data.required ?? true,
    shuffle: data.shuffle ?? false,
  };
  questionsStore.push(newQuestion);

  // Update totalQuestions di quiz
  quizzesStore = quizzesStore.map((q) =>
    q.id === quizId
      ? { ...q, totalQuestions: (q.totalQuestions ?? 0) + 1 }
      : q
  );

  return { ...newQuestion };
}

export async function updateQuestion(questionId: string, data: Partial<QuizQuestion>): Promise<QuizQuestion> {
  await delay();
  questionsStore = questionsStore.map((q) =>
    q.id === questionId ? { ...q, ...data } : q
  );
  const updated = questionsStore.find((q) => q.id === questionId);
  if (!updated) throw new Error(`Soal ${questionId} tidak ditemukan`);
  return { ...updated };
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await delay();
  const question = questionsStore.find((q) => q.id === questionId);
  questionsStore = questionsStore.filter((q) => q.id !== questionId);

  // Update totalQuestions di quiz
  if (question) {
    quizzesStore = quizzesStore.map((q) =>
      q.id === question.quizId
        ? { ...q, totalQuestions: Math.max(0, (q.totalQuestions ?? 1) - 1) }
        : q
    );
  }
}

export async function getQuizStats(quizId: string): Promise<QuizStats> {
  await delay();
  return statsStore[quizId] ?? {
    quizId,
    quizTitle: "Kuis tidak ditemukan",
    moduleTitle: "-",
    totalParticipants: 0,
    totalEnrolled: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    studentResults: [],
  };
}