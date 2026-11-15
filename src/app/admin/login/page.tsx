import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin sign in'
};

export default async function AdminLoginPage() {
  const admin = await getAdminUser();
  if (admin) redirect('/admin');
  return <LoginForm />;
}
