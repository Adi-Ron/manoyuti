import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin';
import { signOut } from '../actions';
import { AdminNav } from './AdminNav';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="brand" aria-label="Resilio admin home">
          <span className="mk" aria-hidden="true"><span></span></span>
          <span><b>Resilio</b><small>admin</small></span>
        </Link>

        <AdminNav />

        <div className="admin-side-foot">
          <p title={admin.email}>{admin.email}</p>
          <Link href="/">View site</Link>
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
