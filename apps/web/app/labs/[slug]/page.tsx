'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '../../../store';
import { LabDetail } from '../../../components/LabDetail';
import { LabSubmitForm } from '../../../components/LabSubmitForm';
import { TaskDetailAndSubmit } from '../../../components/TaskDetailAndSubmit';
import { QuizWorkspace } from '../../../components/QuizWorkspace';
import { slugify } from '../../../utils/slugify';
import { INITIAL_QUIZZES, INITIAL_QUIZ_ATTEMPTS } from '../../../data';
import { StudentQuizAttempt } from '../../../types';

function LabDynamicContent() {
  const { 
    labs, 
    tasks, 
    student, 
    handleSubmitLabRegistration,
    handleSubmitLab,
    handleSubmitTask,
    handleCancelTaskSubmission
  } = useAppStore();
  
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const slug = params.slug as string;
  const lab = labs.find(l => slugify(l.title) === slug);
  
  // Local state to manage views within this lab's page without causing full Next.js navigations
  // Default is lab-detail, can be overridden by ?view=register or ?taskId=...
  const getInitialView = (): 'lab-detail' | 'register-lab' | 'task-detail' | 'demo-quiz' => {
    const viewQuery = searchParams.get('view');
    const taskIdQuery = searchParams.get('taskId');
    const tabQuery = searchParams.get('tab');
    
    if (viewQuery === 'register') return 'register-lab';
    if (taskIdQuery) return 'task-detail';
    if (tabQuery?.startsWith('demo/') && tabQuery.length > 5) return 'demo-quiz';
    return 'lab-detail';
  };

  const [currentView, setCurrentView] = useState<'lab-detail' | 'register-lab' | 'task-detail' | 'demo-quiz'>(getInitialView());
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(searchParams.get('taskId'));
  const [attempts, setAttempts] = useState<StudentQuizAttempt[]>(INITIAL_QUIZ_ATTEMPTS);

  useEffect(() => {
    const viewQuery = searchParams.get('view');
    const taskIdQuery = searchParams.get('taskId');
    const tabQuery = searchParams.get('tab');
    
    if (viewQuery === 'register') {
      setCurrentView('register-lab');
    } else if (taskIdQuery) {
      setSelectedTaskId(taskIdQuery);
      setCurrentView('task-detail');
    } else if (tabQuery?.startsWith('demo/') && tabQuery.length > 5) {
      setCurrentView('demo-quiz');
    } else {
      setCurrentView('lab-detail');
    }
  }, [searchParams]);

  if (!lab) {
    return (
      <div className="p-8 text-center text-slate-400">
        <h2 className="text-xl font-bold mb-2">Laboratorium Tidak Ditemukan</h2>
        <button 
          onClick={() => router.push('/labs')}
          className="text-blue-600 hover:underline"
        >
          Kembali ke Daftar Laboratorium
        </button>
      </div>
    );
  }

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  switch (currentView) {
    case 'register-lab':
      return (
        <LabSubmitForm
          lab={lab}
          student={student}
          onBack={() => {
            // Clean up the URL by removing query params
            router.replace(`/labs/${slug}`);
            setCurrentView('lab-detail');
          }}
          onSubmitSuccess={(notes: string) => {
            handleSubmitLabRegistration(lab.id, notes);
            router.replace(`/labs/${slug}`);
            setCurrentView('lab-detail');
          }}
        />
      );

    case 'task-detail':
      if (!selectedTask) {
        return <div className="p-8 text-center text-slate-400">Tugas tidak ditemukan.</div>;
      }
      return (
        <TaskDetailAndSubmit
          task={selectedTask}
          labTitle={lab.title}
          onBack={() => {
            router.replace(`/labs/${slug}`);
            setCurrentView('lab-detail');
          }}
          onSubmitTask={(fileName, fileSize, note) => {
            handleSubmitTask(selectedTask.id, fileName, fileSize, note);
          }}
          onCancelSubmission={() => handleCancelTaskSubmission(selectedTask.id)}
        />
      );

    case 'demo-quiz': {
      const tabQuery = searchParams.get('tab') || '';
      const demoTitle = tabQuery.split('demo/')[1] || '';
      let quizId = 'quiz-web-01'; // default
      if (demoTitle.includes('Demo ke-2')) quizId = 'quiz-web-02';
      if (demoTitle.includes('Demo ke-3')) quizId = 'quiz-web-03';

      return (
        <QuizWorkspace
          quizzes={INITIAL_QUIZZES}
          attempts={attempts}
          labs={labs}
          student={student}
          initialQuizId={quizId}
          onAddAttempt={(attempt) => setAttempts([...attempts, attempt])}
          onBackToLab={() => {
            router.push(`/labs/${slug}?tab=demo`);
          }}
        />
      );
    }

    case 'lab-detail':
    default:
      return (
        <LabDetail
          lab={lab}
          tasks={tasks}
          onBack={() => router.push('/labs')}
          onSelectTask={(taskId) => {
            // Instead of just state, update the URL for deep linking
            router.push(`/labs/${slug}?taskId=${taskId}`);
          }}
          onNavigateToRegister={() => {
            router.push(`/labs/${slug}?view=register`);
          }}
          onSubmitLab={handleSubmitLab}
        />
      );
  }
}

export default function LabDynamicPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat data laboratorium...</div>}>
      <LabDynamicContent />
    </Suspense>
  );
}
