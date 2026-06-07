import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect immediately to the labs page since the root is not part of this module
  redirect('/labs');
}
