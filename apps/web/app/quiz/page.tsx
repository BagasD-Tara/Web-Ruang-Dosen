"use client";

import { useRouter } from 'next/navigation';
import TopNavBar from '../../components/TopNavBar'; 

export default function QuizPage() {
  const router = useRouter();

  // Data dummy (Nanti diganti fetch API)
  const quizzes = [
    {
      id: "q1",
      title: "Kuis 1: Pengenalan Pemrograman",
      status: "aktif",
      duration: 30, // menit
      totalQuestions: 15,
      deadline: "20 Mei 2026, 23:59 WIB",
      maxScore: 100,
    },
    {
      id: "q2",
      title: "Kuis 2: Struktur Data Lanjut",
      status: "selesai",
      duration: 45,
      totalQuestions: 20,
      deadline: "10 Mei 2026, 23:59 WIB",
      maxScore: 100,
      userScore: 85, 
    },
    {
      id: "q3",
      title: "Kuis 3: Algoritma Dinamis",
      status: "terkunci",
      duration: 60,
      totalQuestions: 25,
      deadline: "30 Mei 2026, 23:59 WIB",
      maxScore: 100,
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Memanggil Header yang sudah dibuat di file terpisah */}
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-1 py-12 px-8 w-full max-w-[1280px] mx-auto">
        
        <div className="mb-8">
          <h3 className="text-[32px] font-bold text-gray-900 mb-2">Daftar Kuis</h3>
          <p className="text-gray-500">Selesaikan kuis di bawah ini sesuai dengan tenggat waktu.</p>
        </div>

        {/* List Daftar Kuis */}
        <div className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                  {quiz.status === 'aktif' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Aktif</span>}
                  {quiz.status === 'selesai' && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">Selesai</span>}
                  {quiz.status === 'terkunci' && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">Terkunci</span>}
                </div>
                
                <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1">
                  <span>⏱ {quiz.duration} Menit</span>
                  <span>📝 {quiz.totalQuestions} Soal</span>
                  <span>⭐ Nilai Maks: {quiz.maxScore}</span>
                  <span className="text-red-500">⏳ {quiz.deadline}</span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                {quiz.status === 'selesai' && (
                  <div className="text-sm text-gray-500 mb-2">
                    Nilai: <span className="font-bold text-blue-600 text-lg">{quiz.userScore}</span>
                  </div>
                )}
                
                <button 
                  disabled={quiz.status === 'terkunci'}
                  onClick={() => quiz.status === 'selesai' 
                    ? router.push(`/quiz/${quiz.id}/review`) 
                    : router.push(`/quiz/${quiz.id}/start`)
                  }
                  className={`w-full md:w-auto px-5 py-2 rounded-lg font-semibold text-sm transition-colors
                    ${quiz.status === 'aktif' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                    ${quiz.status === 'selesai' ? 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50' : ''}
                    ${quiz.status === 'terkunci' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                  `}
                >
                  {quiz.status === 'aktif' && 'Mulai Kuis'}
                  {quiz.status === 'selesai' && 'Lihat Review'}
                  {quiz.status === 'terkunci' && 'Terkunci'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}