import { redirect } from 'next/navigation';

export default function RootPage() {
  // Arahkan pengunjung dari halaman utama (/) langsung ke halaman login (/login)
  redirect('/login');
}
