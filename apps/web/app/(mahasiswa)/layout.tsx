import { Suspense } from "react";
import { AppShell } from "@/app/components/layout/AppShell";

export default function MahasiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AppShell mode="student">{children}</AppShell>
    </Suspense>
  );
}