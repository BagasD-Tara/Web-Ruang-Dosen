import { redirect } from 'next/navigation';

export default function Home() {
  // Arahkan pengunjung dari halaman utama (/) langsung ke halaman login (/login)
  redirect('/login');
}
