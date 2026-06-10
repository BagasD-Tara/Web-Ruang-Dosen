'use client';

import { AppShell } from '@/app/components/layout/AppShell';

export default function DosenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell mode="lecturer">{children}</AppShell>;
}
