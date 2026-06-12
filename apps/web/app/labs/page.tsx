'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../store';
import { LabList } from '../../components/LabList';
import { slugify } from '../../utils/slugify';

function LabsContent() {
  const { labs, tasks, student } = useAppStore();
  const router = useRouter();

  const handleSelectLab = (labId: string) => {
    const lab = labs.find((l) => l.id === labId);
    if (lab) {
      router.push(`/labs/${slugify(lab.title)}`);
    }
  };

  const handleNavigateToRegister = (labId: string) => {
    const lab = labs.find((l) => l.id === labId);
    if (lab) {
      router.push(`/labs/${slugify(lab.title)}?view=register`);
    }
  };

  const [mode, setMode] = React.useState<'student' | 'lecturer'>('student');

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'LECTURER') {
          setMode('lecturer');
        }
      } catch (e) {}
    }
  }, []);

  return (
    <LabList
      labs={labs}
      tasks={tasks}
      student={student}
      onSelectLab={handleSelectLab}
      onNavigateToRegister={handleNavigateToRegister}
      mode={mode}
    />
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
      <LabsContent />
    </Suspense>
  );
}
