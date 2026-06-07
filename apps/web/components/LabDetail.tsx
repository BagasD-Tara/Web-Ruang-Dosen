'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Lab, Task } from '../types';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Award, 
  ListCollapse, 
  BookCheck,
  Upload,
  FileText,
  Trash2,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LabDetailProps {
  lab: Lab;
  tasks: Task[];
  onBack: () => void;
  onSelectTask: (taskId: string) => void;
  onNavigateToRegister: () => void;
  onSubmitLab: (labId: string, fileName: string, fileSize: string, studentNote: string) => void;
}

const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  
  return (
    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        // Toggle code block
        if (line.startsWith('```')) {
          if (inCodeBlock) {
            inCodeBlock = false;
            const blockContent = codeBlockLines.join('\n');
            codeBlockLines = [];
            return (
              <pre key={idx} className="bg-slate-900 text-teal-400 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3 border border-slate-800 shadow-inner">
                <code>{blockContent}</code>
              </pre>
            );
          } else {
            inCodeBlock = true;
            return null;
          }
        }
        
        if (inCodeBlock) {
          codeBlockLines.push(line);
          return null;
        }

        // Headers
        if (line.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-base font-extrabold text-slate-900 pt-3 pb-1 border-b border-slate-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-xs inline-block" />
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith('#### ')) {
          return <h4 key={idx} className="text-sm font-bold text-slate-800 pt-2 pb-1">{line.slice(5)}</h4>;
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-lg font-black text-slate-900 pt-5 pb-2 border-b-2 border-slate-100 flex items-center gap-2">
              {line.slice(3)}
            </h2>
          );
        }

        // Checked item formats (numbered/unordered lists)
        if (line.startsWith('* ')) {
          return (
            <div key={idx} className="flex gap-2.5 pl-4 py-0.5">
              <span className="text-blue-500 font-extrabold">•</span>
              <span className="text-slate-650">{renderInlineFormatting(line.slice(2))}</span>
            </div>
          );
        }
        if (line.match(/^\d+\.\s/)) {
          const match = line.match(/^(\d+)\.\s(.*)/);
          if (match) {
            return (
              <div key={idx} className="flex gap-2.5 pl-4 py-0.5">
                <span className="text-blue-600 font-bold">{match[1]}.</span>
                <span className="text-slate-650">{renderInlineFormatting(match[2])}</span>
              </div>
            );
          }
        }

        if (line.trim() === '') return <div key={idx} className="h-1.5" />;

        return <p key={idx} className="text-slate-650 font-medium py-0.5">{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
};

function renderInlineFormatting(text: string) {
  const regex = /(\*\*.*?\*\*|\x60.*?\x60)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded font-mono text-xs font-semibold border border-slate-200">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

interface LabAssistant {
  name: string;
  role: string;
}

const getLabAssistants = (labId: string): LabAssistant[] => {
  switch (labId) {
    case 'lab-web-pro':
      return [
        { name: 'Rizky Ramadhan', role: 'Asisten Utama (Web)' },
        { name: 'Farhan Fahrezi', role: 'Asisten Pendamping' }
      ];
    case 'lab-jarkom':
      return [
        { name: 'Ahmad Rifai, CCNA', role: 'Asisten Utama (Cisco)' },
        { name: 'Siti Nurhaliza', role: 'Asisten Pendamping' }
      ];
    case 'lab-database':
      return [
        { name: 'Putra Pratama', role: 'Asisten Utama (SQL)' },
        { name: 'Nabila Syarifah', role: 'Asisten Pendamping' }
      ];
    case 'lab-artificial-intel':
    default:
      return [
        { name: 'Fajar Hidayat', role: 'Asisten Utama (Python)' },
        { name: 'Dewi Lestari', role: 'Asisten Pendamping' }
      ];
  }
};

export const LabDetail: React.FC<LabDetailProps> = ({
  lab,
  tasks,
  onBack,
  onSelectTask,
  onNavigateToRegister,
  onSubmitLab,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') || 'tugas'
  );
  const [expandedDemoId, setExpandedDemoId] = useState<number | null>(null);

  const handleSetTab = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const dummyDemos = [
    {
      id: 1,
      quizId: 'quiz-web-01',
      week: 'Minggu 2',
      title: 'Demo ke-1: Pengambilan & Implementasi Dasar',
      material: 'Materi: Pengenalan Sintaks Dasar, Variabel, dan Operator.',
      status: 'selesai' as const,
      score: 95,
      grades: { tryOut: '10%', assignment: '45%', assessment: '45%' }
    },
    {
      id: 2,
      quizId: 'quiz-web-02',
      week: 'Minggu 4',
      title: 'Demo ke-2: Validasi Struktur & Array Pointer',
      material: 'Materi: Pengelolaan Array Multidimensi dan Manipulasi String.',
      status: 'menunggu' as const,
      score: null,
      grades: null
    },
    {
      id: 3,
      quizId: 'quiz-web-03',
      week: 'Minggu 6',
      title: 'Demo ke-3: Review Kompilasi Akhir',
      material: 'Materi: Optimasi Program, Efisiensi Fungsi, dan Final Packaging.',
      status: 'belum' as const,
      score: null,
      grades: null
    }
  ];

  
  // Filter tasks belonging only to this specific lab
  const labTasks = tasks.filter((task) => task.labId === lab.id);
  const completedTasks = labTasks.filter((t) => t.submission && t.submission.status === 'Selesai').length;
  const progressPct = labTasks.length > 0 ? Math.round((completedTasks / labTasks.length) * 100) : 0;

  const getStatusBadge = (task: Task) => {
    if (!task.submission) {
      const now = new Date('2026-05-29T14:50:33Z');
      const isOverdue = task.deadlineRaw.getTime() < now.getTime();
      
      if (isOverdue) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold tracking-wider rounded-lg">
            Terlambat
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold tracking-wider rounded-lg">
          Belum
        </span>
      );
    }

    const status = task.submission.status;
    if (status === 'Selesai') {
      return null;
    } else if (status === 'Menunggu Penilaian') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold tracking-wider rounded-lg">
          Belum Dinilai
        </span>
      );
    }
  };

  const renderLabStatusHeading = () => {
    switch (lab.labStatus) {
      case 'Belum Submit':
        return (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
              ● Belum Submit
            </span>
            <p className="text-[10px] text-slate-550 mt-2 max-w-[170px] mx-auto leading-relaxed">
              Anda belum melakukan submisi laporan hasil praktikum terpadu.
            </p>
          </div>
        );
      case 'Sudah Submit, menunggu penilaian':
        return (
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 mb-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
              ● Sudah Submit
            </span>
            <p className="text-[10px] text-amber-800 mt-2 max-w-[170px] mx-auto leading-relaxed">
              Laporan terunggah. Menunggu koreksi nilai dari Dosen Pengampu.
            </p>
          </div>
        );
      case 'Sudah Dinilai':
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Breadcrumb & Back Button */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="hover:text-slate-600 cursor-pointer transition" onClick={onBack}>Labs</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600">{lab.title}</span>
        </div>

        <button
          onClick={onBack}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition"
          id="btn-back-to-list-lab"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition" /> Kembali
        </button>
      </div>

      {/* Main Lab Showcase Banner */}
      <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-sm overflow-hidden relative">
        <div className={`absolute top-0 left-0 right-0 h-2.5 ${lab.thumbnailColor}`} />
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-blue-100">
                {lab.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight" id="lab-detail-title">
              {lab.title}
            </h1>
            {/* Course Name Terkait */}
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
              Course Terkait: <strong className="text-slate-800 underline font-semibold decoration-blue-550 decoration-2">{lab.courseName}</strong>
            </p>

            {/* Lecturer Info & Assistants Block */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold rounded-full flex items-center justify-center text-sm shadow-sm">
                  {lab.dosen.replace(new RegExp('(Prof\\.|Dr\\.|Eng\\.|M\\.T\\.)', 'g'), '').trim().charAt(0) || 'D'}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Dosen Pengampu Sesi</p>
                  <p className="font-extrabold text-slate-800 text-sm leading-tight">{lab.dosen}</p>
                </div>
              </div>

              {/* Lab Assistants column beside or below */}
              <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-150 pt-3 md:pt-0 md:pl-6">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Asisten Laboratorium Sesi</p>
                <div className="flex flex-wrap gap-2.5">
                  {getLabAssistants(lab.id).map((asdos) => (
                    <div key={asdos.name} className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 pl-2.5 pr-3 py-1.5 rounded-xl transition hover:border-blue-200">
                      <div className="w-6 h-6 bg-blue-100 text-blue-700 font-black rounded-full flex items-center justify-center text-[9px] uppercase border border-blue-200 shadow-xs">
                        {asdos.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800 text-xs leading-tight">{asdos.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold leading-none">{asdos.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider text-slate-400">Deskripsi Laboratorium</h3>
          <p className="text-xs text-slate-650 leading-relaxed max-w-4xl">
            {lab.description}
          </p>
        </div>
      </div>

      {/* CORE DETAILS EXPANSION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="core-details-layout">
        {/* LEFT AREA: CONTENT VIEWPORT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-sm">
              
              {/* Tab Navigation selectors */}
              <div className="flex border-b border-slate-150 pb-1 mb-6">
                <button
                  onClick={() => handleSetTab('tugas')}
                  className={`pb-3 px-4 font-bold text-xs uppercase tracking-wider transition-all border-b-2 -mb-[5px] flex items-center gap-2 ${
                    activeTab === 'tugas'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-400 hover:text-slate-650'
                  }`}
                  id="tab-btn-tugas"
                >
                  <Calendar size={14} /> Tugas ({lab.isRegistered ? labTasks.length : 0})
                </button>
                <button
                  onClick={() => handleSetTab('demo')}
                  className={`pb-3 px-4 font-bold text-xs uppercase tracking-wider transition-all border-b-2 -mb-[5px] flex items-center gap-2 ${
                    activeTab.startsWith('demo')
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-400 hover:text-slate-650'
                  }`}
                  id="tab-btn-demo"
                >
                  <BookOpen size={14} /> Demo ({lab.isRegistered ? dummyDemos.length : 0})
                </button>
              </div>

              {/* Gate: If not registered, show CTA instead of content */}
              {!lab.isRegistered ? (
                <div className="py-10 flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <Lock size={24} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-700 text-base">Akses Terkunci</p>
                    <p className="text-xs text-slate-400 font-medium mt-1 max-w-xs mx-auto">Daftarkan diri Anda terlebih dahulu untuk mengakses tugas dan demo praktikum laboratorium ini.</p>
                  </div>
                  <button
                    onClick={onNavigateToRegister}
                    className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-100 uppercase tracking-wider"
                    id="btn-register-lab-locked"
                  >
                    Daftar Lab Sekarang
                  </button>
                </div>
              ) : (
                <>
              {/* TAB VALUE: ASSIGNMENT TASKS LISTING */}
              {activeTab === 'tugas' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    {labTasks.length === 0 ? (
                      <div className="p-12 text-center text-slate-400">
                        Tugas praktikum belum diposting untuk laboratorium ini.
                      </div>
                    ) : (
                      labTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-slate-150 rounded-2xl hover:border-blue-150 transition group hover:shadow-xs"
                        >
                          <div className="space-y-1.5 max-w-md">
                            <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-blue-700 transition">
                              {task.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                              <Calendar size={12} /> Deadline: {task.deadline}
                            </p>
                          </div>

                          <div className="mt-3 sm:mt-0 flex items-center gap-3 shrink-0">
                            {task.submission && task.submission.grade !== null && (
                              <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold">
                                <Award size={13} />
                                <span>Nilai: {task.submission.grade}</span>
                              </div>
                            )}

                            {getStatusBadge(task)}

                            <button
                              onClick={() => onSelectTask(task.id)}
                              className="p-1 px-3 py-1.5 hover:bg-slate-55 rounded-lg text-xs font-bold text-blue-600 flex items-center gap-0.5 border border-slate-200 hover:border-blue-200 transition"
                              id={`btn-open-task-${task.id}`}
                            >
                              Buka Tugas <ChevronRight size={13} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB VALUE: DEMO LISTING */}
              {activeTab.startsWith('demo') && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl mb-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <AlertCircle size={13} className="text-blue-600" />
                      Informasi Demo Sesi Praktikum
                    </h4>
                    <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                      Demo praktikum dilakukan tatap muka atau virtual dengan asisten laboratorium untuk memverifikasi pengerjaan modul Anda. Silakan hubungi asisten dosen masing-masing untuk memesan slot waktu demo.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {dummyDemos.map((demo) => (
                      <div key={demo.id} className="border border-slate-150 bg-white rounded-2xl hover:border-blue-150 transition group hover:shadow-xs overflow-hidden">
                        {/* Summary Header */}
                        <div 
                          className="flex flex-col sm:flex-row justify-between sm:items-center p-4 cursor-pointer"
                          onClick={() => setExpandedDemoId(expandedDemoId === demo.id ? null : demo.id)}
                        >
                          <div className="space-y-1.5">
                            <h4 className="font-extrabold text-sm text-slate-950 leading-tight">
                              {demo.title}
                            </h4>
                            <p className="text-[11px] text-slate-550 font-medium">
                              {demo.material}
                            </p>
                          </div>

                          <div className="mt-3 sm:mt-0 flex items-center gap-3 shrink-0">
                            {/* Badge matching Tugas style */}
                            {demo.status === 'selesai' && demo.score !== null && (
                              <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold">
                                <Award size={13} />
                                <span>Nilai: {demo.score}</span>
                              </div>
                            )}
                            {demo.status === 'menunggu' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold tracking-wider rounded-lg">
                                Belum Dinilai
                              </span>
                            )}
                            {demo.status === 'belum' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold tracking-wider rounded-lg">
                                Belum Dinilai
                              </span>
                            )}
                            <div className="p-1 rounded-full bg-slate-50 text-slate-400 group-hover:text-blue-600 transition">
                              {expandedDemoId === demo.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </div>

                        {/* Dropdown Content */}
                        {expandedDemoId === demo.id && (
                          <div className="bg-white border-t border-slate-100 p-4">
                            <div className="flex justify-center mt-2">
                              <button
                                onClick={() => router.push(`${pathname}?tab=demo/${demo.title}`)}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md shadow-blue-900/20 flex items-center justify-center gap-2"
                              >
                                Mulai Kuis Demo
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </>
              )}
            </div>
          </div>

          {/* RIGHT AREA: REGULASI CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Regulasi Praktikum</h4>
                <div className="text-slate-550 text-xs space-y-2.5 leading-relaxed font-semibold">
                  <p>1. Batas keterlambatan pengumpulan laporan adalah <strong className="text-slate-800">3 hari kerja</strong> setelah deadline. Setiap hari keterlambatan dikenakan pemotongan 10% dari total nilai.</p>
                  <p>2. Dilarang keras menjiplak laporan teman sejawat. Sistem deteksi plagiarisme otomatis aktif dan akan diberlakukan sanksi.</p>
                  <p>3. Laporan wajib dikumpulkan dalam format <strong className="text-slate-800">.pdf atau .zip</strong>. Berkas di luar format tersebut tidak akan diproses.</p>
                  <p>4. Mahasiswa wajib hadir pada sesi demo praktikum sesuai jadwal yang ditetapkan oleh asisten laboratorium.</p>
                  <p>5. Nilai tugas yang sudah diinputkan bersifat final dan tidak dapat digugat setelah periode penilaian berakhir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
