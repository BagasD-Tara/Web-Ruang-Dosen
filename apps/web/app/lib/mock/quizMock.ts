
import type {
  Quiz,
  QuizQuestion,
  LeaderboardEntry,
  QuizStats,
} from "@/app/types/quiz";

// ─── Data Quiz ────────────────────────────────────────────────────────────────

export const MOCK_QUIZZES: Record<string, Quiz> = {
  "quiz-1": {
    id: "quiz-1",
    title: "Kuis 1: Pengenalan Neural Networks",
    moduleId: "module-1",
    moduleTitle: "Module 1: Foundations",
    courseId: "course-1",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 45,
    xpReward: 100,
    minimumScore: 70,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  "quiz-2": {
    id: "quiz-2",
    title: "Kuis 2: Convolutional Networks",
    moduleId: "module-2",
    moduleTitle: "Module 2: Next Foundations",
    courseId: "course-1",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 40,
    xpReward: 120,
    minimumScore: 70,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  "quiz-3": {
    id: "quiz-3",
    title: "Kuis 3: Training Workflow",
    moduleId: "module-3",
    moduleTitle: "Module 3: Training Workflow",
    courseId: "course-1",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 35,
    xpReward: 100,
    minimumScore: 70,
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-01T08:00:00Z",
  },
  "quiz-4": {
    id: "quiz-4",
    title: "Kuis 1: HTML & CSS Fundamentals",
    moduleId: "module-4",
    moduleTitle: "Module 1: UI Fundamentals",
    courseId: "course-2",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 35,
    xpReward: 100,
    minimumScore: 70,
    createdAt: "2024-02-05T08:00:00Z",
    updatedAt: "2024-02-05T08:00:00Z",
  },
  "quiz-5": {
    id: "quiz-5",
    title: "Kuis 2: React Components",
    moduleId: "module-5",
    moduleTitle: "Module 2: React Components",
    courseId: "course-2",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 45,
    xpReward: 150,
    minimumScore: 70,
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-02-10T08:00:00Z",
  },
  "quiz-6": {
    id: "quiz-6",
    title: "Kuis 1: Pengenalan Struktur Data",
    moduleId: "module-6",
    moduleTitle: "Modul 1: Pengenalan Struktur Data",
    courseId: "course-3",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 45,
    xpReward: 100,
    minimumScore: 70,
    createdAt: "2024-03-01T08:00:00Z",
    updatedAt: "2024-03-01T08:00:00Z",
  },
  "quiz-7": {
    id: "quiz-7",
    title: "Kuis 2: Algoritma Pencarian & Pengurutan",
    moduleId: "module-7",
    moduleTitle: "Modul 2: Algoritma Pencarian & Pengurutan",
    courseId: "course-3",
    status: "aktif",
    totalQuestions: 5,
    durationMinutes: 40,
    xpReward: 120,
    minimumScore: 70,
    createdAt: "2024-03-10T08:00:00Z",
    updatedAt: "2024-03-10T08:00:00Z",
  },
};

// ─── Soal per Quiz ────────────────────────────────────────────────────────────

export const MOCK_QUESTIONS_MAP: Record<string, QuizQuestion[]> = {
  "quiz-1": [
    {
      id: "q1-1", quizId: "quiz-1", order: 1, points: 20,
      questionText: "Apa yang dimaksud dengan neural network dalam machine learning?",
      options: [
        { id: "q1-1-a", label: "A", text: "Model komputasi yang terinspirasi dari struktur otak manusia", isCorrect: true },
        { id: "q1-1-b", label: "B", text: "Algoritma pengurutan data yang cepat" },
        { id: "q1-1-c", label: "C", text: "Database yang menyimpan data neural" },
        { id: "q1-1-d", label: "D", text: "Protokol jaringan komputer" },
      ],
      explanation: "Neural network adalah model komputasi yang terinspirasi dari cara kerja neuron di otak manusia, terdiri dari layer input, hidden, dan output.",
    },
    {
      id: "q1-2", quizId: "quiz-1", order: 2, points: 20,
      questionText: "Fungsi aktivasi yang paling umum digunakan di hidden layer adalah?",
      options: [
        { id: "q1-2-a", label: "A", text: "Sigmoid" },
        { id: "q1-2-b", label: "B", text: "ReLU", isCorrect: true },
        { id: "q1-2-c", label: "C", text: "Softmax" },
        { id: "q1-2-d", label: "D", text: "Linear" },
      ],
      explanation: "ReLU (Rectified Linear Unit) f(x) = max(0, x) paling populer karena sederhana, efisien, dan mengatasi vanishing gradient.",
    },
    {
      id: "q1-3", quizId: "quiz-1", order: 3, points: 20,
      questionText: "Proses update bobot pada neural network disebut?",
      options: [
        { id: "q1-3-a", label: "A", text: "Forward propagation" },
        { id: "q1-3-b", label: "B", text: "Backpropagation", isCorrect: true },
        { id: "q1-3-c", label: "C", text: "Normalization" },
        { id: "q1-3-d", label: "D", text: "Regularization" },
      ],
      explanation: "Backpropagation menghitung gradien loss terhadap bobot menggunakan chain rule, lalu optimizer mengupdate bobot tersebut.",
    },
    {
      id: "q1-4", quizId: "quiz-1", order: 4, points: 20,
      questionText: "Apa tujuan dari learning rate dalam training neural network?",
      options: [
        { id: "q1-4-a", label: "A", text: "Menentukan jumlah epoch" },
        { id: "q1-4-b", label: "B", text: "Mengontrol seberapa besar update pada bobot setiap iterasi", isCorrect: true },
        { id: "q1-4-c", label: "C", text: "Menentukan ukuran dataset" },
        { id: "q1-4-d", label: "D", text: "Mengatur jumlah layer" },
      ],
      explanation: "Learning rate terlalu besar menyebabkan training tidak stabil, terlalu kecil menyebabkan konvergensi lambat.",
    },
    {
      id: "q1-5", quizId: "quiz-1", order: 5, points: 20,
      questionText: "Overfitting terjadi ketika?",
      options: [
        { id: "q1-5-a", label: "A", text: "Model terlalu sederhana untuk menangkap pola data" },
        { id: "q1-5-b", label: "B", text: "Model terlalu kompleks dan hafal data training tapi buruk di data baru", isCorrect: true },
        { id: "q1-5-c", label: "C", text: "Data training terlalu sedikit" },
        { id: "q1-5-d", label: "D", text: "Learning rate terlalu kecil" },
      ],
      explanation: "Overfitting: model performa baik di training set tapi buruk di validation/test set. Solusi: dropout, regularization, lebih banyak data.",
    },
  ],

  "quiz-2": [
    {
      id: "q2-1", quizId: "quiz-2", order: 1, points: 20,
      questionText: "CNN (Convolutional Neural Network) paling cocok untuk?",
      options: [
        { id: "q2-1-a", label: "A", text: "Analisis teks sekuensial" },
        { id: "q2-1-b", label: "B", text: "Pemrosesan gambar dan video", isCorrect: true },
        { id: "q2-1-c", label: "C", text: "Prediksi time series" },
        { id: "q2-1-d", label: "D", text: "Clustering data tabular" },
      ],
      explanation: "CNN dirancang untuk memproses data grid seperti gambar, menggunakan operasi convolution untuk mendeteksi fitur lokal.",
    },
    {
      id: "q2-2", quizId: "quiz-2", order: 2, points: 20,
      questionText: "Operasi pooling pada CNN berfungsi untuk?",
      options: [
        { id: "q2-2-a", label: "A", text: "Menambah dimensi feature map" },
        { id: "q2-2-b", label: "B", text: "Mereduksi dimensi spatial dan mengurangi parameter", isCorrect: true },
        { id: "q2-2-c", label: "C", text: "Menghitung loss function" },
        { id: "q2-2-d", label: "D", text: "Mengupdate bobot kernel" },
      ],
      explanation: "Max pooling dan average pooling mereduksi ukuran feature map, mengurangi komputasi dan overfitting.",
    },
    {
      id: "q2-3", quizId: "quiz-2", order: 3, points: 20,
      questionText: "Berapa jumlah parameter yang diperlukan kernel 3x3 dengan 32 filter dari 64 channel input?",
      options: [
        { id: "q2-3-a", label: "A", text: "576" },
        { id: "q2-3-b", label: "B", text: "18.432", isCorrect: true },
        { id: "q2-3-c", label: "C", text: "9.216" },
        { id: "q2-3-d", label: "D", text: "36.864" },
      ],
      explanation: "3 × 3 × 64 (input channels) × 32 (filter) = 18.432 parameter bobot (belum termasuk bias).",
    },
    {
      id: "q2-4", quizId: "quiz-2", order: 4, points: 20,
      questionText: "Padding 'same' pada convolution bertujuan untuk?",
      options: [
        { id: "q2-4-a", label: "A", text: "Mempercepat komputasi" },
        { id: "q2-4-b", label: "B", text: "Mempertahankan ukuran spatial output sama dengan input", isCorrect: true },
        { id: "q2-4-c", label: "C", text: "Mengurangi jumlah filter" },
        { id: "q2-4-d", label: "D", text: "Meningkatkan depth feature map" },
      ],
      explanation: "Padding 'same' menambahkan zero-padding agar ukuran output spatial sama dengan input, memudahkan arsitektur network.",
    },
    {
      id: "q2-5", quizId: "quiz-2", order: 5, points: 20,
      questionText: "Arsitektur CNN terkenal yang memenangkan ImageNet 2012 adalah?",
      options: [
        { id: "q2-5-a", label: "A", text: "VGGNet" },
        { id: "q2-5-b", label: "B", text: "AlexNet", isCorrect: true },
        { id: "q2-5-c", label: "C", text: "ResNet" },
        { id: "q2-5-d", label: "D", text: "GoogLeNet" },
      ],
      explanation: "AlexNet oleh Alex Krizhevsky dkk memenangkan ImageNet 2012 dengan selisih signifikan, menandai era deep learning modern.",
    },
  ],

  "quiz-3": [
    {
      id: "q3-1", quizId: "quiz-3", order: 1, points: 20,
      questionText: "Apa yang dimaksud dengan epoch dalam training neural network?",
      options: [
        { id: "q3-1-a", label: "A", text: "Jumlah layer dalam network" },
        { id: "q3-1-b", label: "B", text: "Satu kali iterasi melalui seluruh dataset training", isCorrect: true },
        { id: "q3-1-c", label: "C", text: "Ukuran batch data" },
        { id: "q3-1-d", label: "D", text: "Kecepatan learning rate" },
      ],
      explanation: "1 epoch = model melihat seluruh dataset training sekali. Training biasanya membutuhkan banyak epoch.",
    },
    {
      id: "q3-2", quizId: "quiz-3", order: 2, points: 20,
      questionText: "Teknik untuk mencegah overfitting dengan menonaktifkan neuron secara acak adalah?",
      options: [
        { id: "q3-2-a", label: "A", text: "Batch normalization" },
        { id: "q3-2-b", label: "B", text: "Dropout", isCorrect: true },
        { id: "q3-2-c", label: "C", text: "Weight decay" },
        { id: "q3-2-d", label: "D", text: "Data augmentation" },
      ],
      explanation: "Dropout secara acak menonaktifkan sebagian neuron selama training, memaksa network belajar representasi yang lebih robust.",
    },
    {
      id: "q3-3", quizId: "quiz-3", order: 3, points: 20,
      questionText: "Tujuan dari train/validation/test split adalah?",
      options: [
        { id: "q3-3-a", label: "A", text: "Mempercepat training" },
        { id: "q3-3-b", label: "B", text: "Mengevaluasi model secara objektif dan mencegah data leakage", isCorrect: true },
        { id: "q3-3-c", label: "C", text: "Mengurangi ukuran dataset" },
        { id: "q3-3-d", label: "D", text: "Meningkatkan jumlah data" },
      ],
      explanation: "Train untuk belajar, validation untuk tuning hyperparameter, test untuk evaluasi final yang tidak bias.",
    },
    {
      id: "q3-4", quizId: "quiz-3", order: 4, points: 20,
      questionText: "Batch size yang lebih kecil dalam SGD cenderung menghasilkan?",
      options: [
        { id: "q3-4-a", label: "A", text: "Gradient yang lebih akurat dan training lebih stabil" },
        { id: "q3-4-b", label: "B", text: "Update yang lebih noisy tapi bisa generalisasi lebih baik", isCorrect: true },
        { id: "q3-4-c", label: "C", text: "Training yang lebih lambat tanpa keuntungan" },
        { id: "q3-4-d", label: "D", text: "Overfitting yang lebih parah" },
      ],
      explanation: "Batch kecil → gradient noisy → efek regularisasi → generalisasi lebih baik. Trade-off: training lebih lambat per epoch.",
    },
    {
      id: "q3-5", quizId: "quiz-3", order: 5, points: 20,
      questionText: "Early stopping adalah teknik untuk?",
      options: [
        { id: "q3-5-a", label: "A", text: "Mempercepat training dengan memotong epoch" },
        { id: "q3-5-b", label: "B", text: "Menghentikan training saat validation loss mulai meningkat untuk mencegah overfitting", isCorrect: true },
        { id: "q3-5-c", label: "C", text: "Mengurangi learning rate secara otomatis" },
        { id: "q3-5-d", label: "D", text: "Menghapus neuron yang tidak aktif" },
      ],
      explanation: "Early stopping memantau validation loss dan menghentikan training saat loss naik, menyimpan bobot terbaik.",
    },
  ],

  "quiz-4": [
    {
      id: "q4-1", quizId: "quiz-4", order: 1, points: 20,
      questionText: "Tag HTML yang digunakan untuk heading terbesar adalah?",
      options: [
        { id: "q4-1-a", label: "A", text: "<h6>" },
        { id: "q4-1-b", label: "B", text: "<heading>" },
        { id: "q4-1-c", label: "C", text: "<h1>", isCorrect: true },
        { id: "q4-1-d", label: "D", text: "<title>" },
      ],
      explanation: "<h1> adalah heading dengan hierarki tertinggi dalam HTML.",
    },
    {
      id: "q4-2", quizId: "quiz-4", order: 2, points: 20,
      questionText: "Property CSS untuk jarak di dalam elemen (antara border dan konten) adalah?",
      options: [
        { id: "q4-2-a", label: "A", text: "margin" },
        { id: "q4-2-b", label: "B", text: "padding", isCorrect: true },
        { id: "q4-2-c", label: "C", text: "border" },
        { id: "q4-2-d", label: "D", text: "spacing" },
      ],
      explanation: "Padding = ruang di dalam border. Margin = ruang di luar border.",
    },
    {
      id: "q4-3", quizId: "quiz-4", order: 3, points: 20,
      questionText: "Untuk mengaktifkan Flexbox pada container, property yang digunakan adalah?",
      options: [
        { id: "q4-3-a", label: "A", text: "display: block" },
        { id: "q4-3-b", label: "B", text: "display: grid" },
        { id: "q4-3-c", label: "C", text: "display: flex", isCorrect: true },
        { id: "q4-3-d", label: "D", text: "display: inline" },
      ],
      explanation: "display: flex mengaktifkan Flexbox pada container, child elements menjadi flex items.",
    },
    {
      id: "q4-4", quizId: "quiz-4", order: 4, points: 20,
      questionText: "Selector CSS untuk menarget elemen berdasarkan ID adalah?",
      options: [
        { id: "q4-4-a", label: "A", text: ".nama-id" },
        { id: "q4-4-b", label: "B", text: "#nama-id", isCorrect: true },
        { id: "q4-4-c", label: "C", text: "@nama-id" },
        { id: "q4-4-d", label: "D", text: "*nama-id" },
      ],
      explanation: "# untuk ID selector, . untuk class selector.",
    },
    {
      id: "q4-5", quizId: "quiz-4", order: 5, points: 20,
      questionText: "Atribut HTML untuk teks alternatif gambar (penting untuk aksesibilitas) adalah?",
      options: [
        { id: "q4-5-a", label: "A", text: "title" },
        { id: "q4-5-b", label: "B", text: "src" },
        { id: "q4-5-c", label: "C", text: "alt", isCorrect: true },
        { id: "q4-5-d", label: "D", text: "name" },
      ],
      explanation: "Atribut alt wajib untuk aksesibilitas — screen reader membacanya, dan muncul jika gambar gagal dimuat.",
    },
  ],

  "quiz-5": [
    {
      id: "q5-1", quizId: "quiz-5", order: 1, points: 20,
      questionText: "Cara mendeklarasikan variabel yang tidak bisa diubah nilainya di JavaScript adalah?",
      options: [
        { id: "q5-1-a", label: "A", text: "var x = 10" },
        { id: "q5-1-b", label: "B", text: "let x = 10" },
        { id: "q5-1-c", label: "C", text: "const x = 10", isCorrect: true },
        { id: "q5-1-d", label: "D", text: "static x = 10" },
      ],
      explanation: "const tidak bisa di-reassign. Untuk objek/array, referensinya tidak bisa diubah tapi propertinya bisa.",
    },
    {
      id: "q5-2", quizId: "quiz-5", order: 2, points: 20,
      questionText: "React Hook yang digunakan untuk menyimpan state lokal komponen adalah?",
      options: [
        { id: "q5-2-a", label: "A", text: "useEffect" },
        { id: "q5-2-b", label: "B", text: "useState", isCorrect: true },
        { id: "q5-2-c", label: "C", text: "useContext" },
        { id: "q5-2-d", label: "D", text: "useRef" },
      ],
      explanation: "useState mengembalikan [state, setState]. Setiap kali setState dipanggil, komponen re-render.",
    },
    {
      id: "q5-3", quizId: "quiz-5", order: 3, points: 20,
      questionText: "useEffect dengan dependency array kosong [] akan berjalan?",
      options: [
        { id: "q5-3-a", label: "A", text: "Setiap kali komponen re-render" },
        { id: "q5-3-b", label: "B", text: "Hanya sekali setelah komponen pertama kali mount", isCorrect: true },
        { id: "q5-3-c", label: "C", text: "Tidak pernah berjalan" },
        { id: "q5-3-d", label: "D", text: "Setiap 1 detik" },
      ],
      explanation: "[] berarti tidak ada dependency → effect hanya berjalan sekali saat mount, mirip componentDidMount.",
    },
    {
      id: "q5-4", quizId: "quiz-5", order: 4, points: 20,
      questionText: "Props di React bersifat?",
      options: [
        { id: "q5-4-a", label: "A", text: "Mutable — bisa diubah oleh child component" },
        { id: "q5-4-b", label: "B", text: "Immutable — tidak bisa diubah oleh komponen yang menerimanya", isCorrect: true },
        { id: "q5-4-c", label: "C", text: "Optional — tidak perlu didefinisikan" },
        { id: "q5-4-d", label: "D", text: "Global — bisa diakses dari mana saja" },
      ],
      explanation: "Props adalah read-only. Jika perlu mengubah data, gunakan state atau callback yang dikirim dari parent.",
    },
    {
      id: "q5-5", quizId: "quiz-5", order: 5, points: 20,
      questionText: "Key prop pada list React digunakan untuk?",
      options: [
        { id: "q5-5-a", label: "A", text: "Styling element list" },
        { id: "q5-5-b", label: "B", text: "Membantu React mengidentifikasi elemen mana yang berubah saat reconciliation", isCorrect: true },
        { id: "q5-5-c", label: "C", text: "Mengurutkan elemen list" },
        { id: "q5-5-d", label: "D", text: "Mengakses elemen list dari parent" },
      ],
      explanation: "Key membantu React Virtual DOM reconciliation — mengidentifikasi elemen yang perlu diupdate, ditambah, atau dihapus.",
    },
  ],

  "quiz-6": [
    {
      id: "q6-1", quizId: "quiz-6", order: 1, points: 20,
      questionText: "Apa yang dimaksud dengan variabel dalam bahasa pemrograman?",
      options: [
        { id: "q6-1-a", label: "A", text: "Tempat untuk menyimpan data di memori yang dapat berubah-ubah nilainya", isCorrect: true },
        { id: "q6-1-b", label: "B", text: "Instruksi untuk melakukan perulangan kode" },
        { id: "q6-1-c", label: "C", text: "Tipe data yang hanya menyimpan angka bulat" },
        { id: "q6-1-d", label: "D", text: "Sebuah fungsi yang tidak mengembalikan nilai" },
      ],
      explanation: "Variabel adalah lokasi penyimpanan data di memori dengan nama tertentu, nilainya bisa berubah selama program berjalan.",
    },
    {
      id: "q6-2", quizId: "quiz-6", order: 2, points: 20,
      questionText: "Struktur data yang menggunakan prinsip LIFO adalah?",
      options: [
        { id: "q6-2-a", label: "A", text: "Queue" },
        { id: "q6-2-b", label: "B", text: "Stack", isCorrect: true },
        { id: "q6-2-c", label: "C", text: "Array" },
        { id: "q6-2-d", label: "D", text: "Linked List" },
      ],
      explanation: "Stack — Last In First Out, seperti tumpukan piring.",
    },
    {
      id: "q6-3", quizId: "quiz-6", order: 3, points: 20,
      questionText: "Tipe data primitif di bawah ini adalah?",
      options: [
        { id: "q6-3-a", label: "A", text: "Array" },
        { id: "q6-3-b", label: "B", text: "Object" },
        { id: "q6-3-c", label: "C", text: "Integer", isCorrect: true },
        { id: "q6-3-d", label: "D", text: "Function" },
      ],
      explanation: "Integer adalah tipe data primitif yang menyimpan bilangan bulat.",
    },
    {
      id: "q6-4", quizId: "quiz-6", order: 4, points: 20,
      questionText: "Kompleksitas waktu linear search adalah?",
      options: [
        { id: "q6-4-a", label: "A", text: "O(1)" },
        { id: "q6-4-b", label: "B", text: "O(log n)" },
        { id: "q6-4-c", label: "C", text: "O(n)", isCorrect: true },
        { id: "q6-4-d", label: "D", text: "O(n²)" },
      ],
      explanation: "Linear search memeriksa setiap elemen satu per satu → O(n).",
    },
    {
      id: "q6-5", quizId: "quiz-6", order: 5, points: 20,
      questionText: "Struktur data paling efisien untuk queue adalah?",
      options: [
        { id: "q6-5-a", label: "A", text: "Stack" },
        { id: "q6-5-b", label: "B", text: "Linked List", isCorrect: true },
        { id: "q6-5-c", label: "C", text: "Binary Tree" },
        { id: "q6-5-d", label: "D", text: "Hash Table" },
      ],
      explanation: "Linked List efisien untuk queue karena enqueue dan dequeue O(1) dengan pointer head dan tail.",
    },
  ],

  "quiz-7": [
    {
      id: "q7-1", quizId: "quiz-7", order: 1, points: 20,
      questionText: "Algoritma sorting dengan kompleksitas rata-rata O(n log n) adalah?",
      options: [
        { id: "q7-1-a", label: "A", text: "Bubble Sort" },
        { id: "q7-1-b", label: "B", text: "Selection Sort" },
        { id: "q7-1-c", label: "C", text: "Merge Sort", isCorrect: true },
        { id: "q7-1-d", label: "D", text: "Insertion Sort" },
      ],
      explanation: "Merge Sort selalu O(n log n) menggunakan divide and conquer.",
    },
    {
      id: "q7-2", quizId: "quiz-7", order: 2, points: 20,
      questionText: "Binary Search hanya bisa diterapkan pada data yang?",
      options: [
        { id: "q7-2-a", label: "A", text: "Berukuran kecil" },
        { id: "q7-2-b", label: "B", text: "Sudah terurut", isCorrect: true },
        { id: "q7-2-c", label: "C", text: "Berupa bilangan bulat" },
        { id: "q7-2-d", label: "D", text: "Disimpan di linked list" },
      ],
      explanation: "Binary search membutuhkan data terurut karena membagi array menjadi dua untuk menentukan posisi pencarian.",
    },
    {
      id: "q7-3", quizId: "quiz-7", order: 3, points: 20,
      questionText: "Worst-case Quick Sort adalah?",
      options: [
        { id: "q7-3-a", label: "A", text: "O(n log n)" },
        { id: "q7-3-b", label: "B", text: "O(n²)", isCorrect: true },
        { id: "q7-3-c", label: "C", text: "O(n)" },
        { id: "q7-3-d", label: "D", text: "O(log n)" },
      ],
      explanation: "Worst-case terjadi saat pivot selalu elemen terkecil/terbesar → O(n²).",
    },
    {
      id: "q7-4", quizId: "quiz-7", order: 4, points: 20,
      questionText: "Insertion Sort paling cocok untuk?",
      options: [
        { id: "q7-4-a", label: "A", text: "Data acak dalam jumlah besar" },
        { id: "q7-4-b", label: "B", text: "Data yang hampir terurut", isCorrect: true },
        { id: "q7-4-c", label: "C", text: "Data yang sudah terurut terbalik" },
        { id: "q7-4-d", label: "D", text: "Data dengan banyak duplikat" },
      ],
      explanation: "Insertion Sort O(n) untuk data hampir terurut — sangat efisien dalam kasus ini.",
    },
    {
      id: "q7-5", quizId: "quiz-7", order: 5, points: 20,
      questionText: "Heap Sort memiliki kompleksitas waktu?",
      options: [
        { id: "q7-5-a", label: "A", text: "O(n²)" },
        { id: "q7-5-b", label: "B", text: "O(n log n)", isCorrect: true },
        { id: "q7-5-c", label: "C", text: "O(n)" },
        { id: "q7-5-d", label: "D", text: "O(log n)" },
      ],
      explanation: "Heap Sort selalu O(n log n) — tidak bergantung pada data awal, dan in-place (O(1) extra space).",
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getMockQuizzesByCourse(courseId: string): Quiz[] {
  return Object.values(MOCK_QUIZZES).filter((q) => q.courseId === courseId);
}

export function getMockQuestionsByQuiz(quizId: string): QuizQuestion[] {
  return MOCK_QUESTIONS_MAP[quizId] ?? [];
}

// ─── Backward-compat (dipakai di halaman quiz jika quizId tidak ketemu) ───────

export const MOCK_QUIZ = MOCK_QUIZZES["quiz-1"];
export const MOCK_QUESTIONS = MOCK_QUESTIONS_MAP["quiz-1"];

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, studentId: "s1", studentName: "Siti Aminah", totalXp: 15820, courseCompletion: 95 },
  { rank: 2, studentId: "s2", studentName: "Adrian Wijaya", totalXp: 12450, courseCompletion: 92 },
  { rank: 3, studentId: "s3", studentName: "Rian Pratama", totalXp: 11200, courseCompletion: 88 },
  { rank: 4, studentId: "s4", studentName: "Dewi Putri", totalXp: 9840, courseCompletion: 85 },
  { rank: 5, studentId: "s5", studentName: "Budi Kusuma", totalXp: 8720, courseCompletion: 80 },
  { rank: 6, studentId: "s6", studentName: "Yusuf Darmawan", totalXp: 7950, courseCompletion: 78, isCurrentUser: true },
  { rank: 7, studentId: "s7", studentName: "Fara Salsabila", totalXp: 6400, courseCompletion: 65 },
];

// ─── Statistik Quiz (dosen) ───────────────────────────────────────────────────

export const MOCK_QUIZ_STATS: Record<string, QuizStats> = {
  "quiz-1": {
    quizId: "quiz-1",
    quizTitle: "Kuis 1: Pengenalan Neural Networks",
    totalParticipants: 38,
    totalEnrolled: 45,
    averageScore: 76,
    highestScore: 100,
    lowestScore: 40,
    studentResults: [
      { studentId: "s1", studentName: "Siti Aminah", nim: "20210001", initials: "SA", avatarColor: "#3B82F6", durationSeconds: 920, status: "selesai", score: 100 },
      { studentId: "s2", studentName: "Adrian Wijaya", nim: "20210002", initials: "AW", avatarColor: "#8B5CF6", durationSeconds: 1100, status: "selesai", score: 88 },
      { studentId: "s3", studentName: "Rian Pratama", nim: "20210003", initials: "RP", avatarColor: "#F59E0B", durationSeconds: 1320, status: "selesai", score: 76 },
      { studentId: "s4", studentName: "Dewi Putri", nim: "20210004", initials: "DP", avatarColor: "#10B981", durationSeconds: 0, status: "terkunci", score: null },
      { studentId: "s5", studentName: "Budi Kusuma", nim: "20210005", initials: "BK", avatarColor: "#EF4444", durationSeconds: 1680, status: "selesai", score: 60 },
    ],
  },
};
