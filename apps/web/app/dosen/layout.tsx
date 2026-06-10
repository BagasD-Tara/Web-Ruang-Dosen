import React, { Suspense } from 'react';
import { DosenDashboardLayout } from '@/components/layout/DosenDashboardLayout';

export default function LecturerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DosenDashboardLayout>{children}</DosenDashboardLayout>
    </Suspense>
  );
}
