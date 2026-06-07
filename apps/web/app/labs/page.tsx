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

  return (
    <LabList
      labs={labs}
      tasks={tasks}
      student={student}
      onSelectLab={handleSelectLab}
      onNavigateToRegister={handleNavigateToRegister}
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
