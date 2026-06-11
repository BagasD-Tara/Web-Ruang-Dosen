import { AppShell } from "@/app/components/layout/AppShell";

export default function MahasiswaLayout({ children }: { children: React.ReactNode }) {
  return <AppShell mode="student">{children}</AppShell>;
}