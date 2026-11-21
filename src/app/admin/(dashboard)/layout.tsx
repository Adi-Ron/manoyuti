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
      <a className="admin-skip" href="#admin-content">Skip to workspace</a>
      <aside className="admin-sidebar">
        <Link href="/admin" className="brand" aria-label="Manoyuti admin home">
          <span className="mk" aria-hidden="true"><span></span></span>
          <span><b>Manoyuti</b><small>Practice workspace</small></span>
        </Link>

        <div className="admin-nav-section"><p className="admin-eyebrow">Your workspace</p><AdminNav /></div>

        <div className="admin-side-foot">
          <span className="admin-eyebrow">Signed in</span>
          <p className="admin-user-email" title={admin.email}>{admin.email}</p>
          <div className="admin-session-actions"><Link href="/">View website <span aria-hidden="true">↗</span></Link><form action={signOut}><button type="submit">Sign out</button></form></div>
        </div>
      </aside>

      <main id="admin-content" className="admin-main" tabIndex={-1}><div className="admin-workspace-bar"><span>Manoyuti / Practice management</span><span className="admin-private"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Private workspace</span></div><div className="admin-content">{children}</div></main>
    </div>
  );
}
