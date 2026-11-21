import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

interface RecentBooking {
  id: string;
  name: string;
  email: string;
  service_type: string;
  created_at: string;
  status: string;
}

async function countRows(table: string, status: string) {
  try {
    const supabase = createServiceClient();
    const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true }).eq('status', status);
    return error ? null : count ?? 0;
  } catch {
    return null;
  }
}

const serviceLabel: Record<string, string> = {
  individual: 'Individual therapy',
  couples: 'Couples therapy',
  assessment: 'Psychological assessment',
  fertility: 'Fertility counselling',
  unsure: 'Not sure yet'
};

export default async function AdminOverviewPage() {
  const [bookings, messages] = await Promise.all([
    countRows('booking_requests', 'pending'),
    countRows('contact_messages', 'new')
  ]);

  let recent: RecentBooking[] = [];
  let recentFailed = false;
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('booking_requests')
      .select('id,name,email,service_type,created_at,status')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(6);
    recent = (data ?? []) as RecentBooking[];
    recentFailed = Boolean(error);
  } catch {
    recentFailed = true;
  }

  const value = (n: number | null) => (n === null ? '—' : n.toLocaleString('en-IN'));

  return (
    <>
      <div className="admin-top">
        <div>
          <span className="admin-eyebrow">Your practice, at a glance</span>
          <h1>A little clarity for your day.</h1>
          <p>New session requests and unread messages, ready when you are.</p>
        </div>
        <Link className="btn" href="/admin/bookings">Manage appointments</Link>
      </div>

      <section className="admin-grid admin-grid-focused" aria-label="Needs your attention">
        <Link className="admin-card admin-stat" href="/admin/bookings">
          <span>Pending booking requests</span>
          <b>{value(bookings)}</b><small>View requests <span aria-hidden="true">↗</span></small>
        </Link>
        <Link className="admin-card admin-stat" href="/admin/messages">
          <span>New contact messages</span>
          <b>{value(messages)}</b><small>Open inbox <span aria-hidden="true">↗</span></small>
        </Link>

      </section>

      {[bookings, messages].some(count => count === null) && <p className="admin-data-note" role="status">Some counts are unavailable. Open bookings or messages to check the connection.</p>}

      <div className="admin-panel">
        <div className="admin-panel-head"><div><h2>Waiting for your reply</h2><p>Your latest pending requests. Confirm a time from the bookings page.</p></div><Link className="admin-text-link" href="/admin/bookings">View all requests <span aria-hidden="true">→</span></Link></div>
        {recentFailed ? <p className="admin-note" role="status">Booking requests could not be loaded. Please refresh or check the database connection.</p> : recent.length === 0 ? (
          <div className="admin-empty"><span className="admin-empty-symbol" aria-hidden="true">✳</span><h3>All caught up.</h3><p>You’re up to date. New requests will appear here when someone reaches out.</p></div>
        ) : (
          <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Waiting for your reply">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">Name</th>
                  <th scope="col">Service</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(row => (
                  <tr key={row.id}>
                    <td>{new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}</td>
                    <td>
                      {row.name}
                      <div className="note"><a href={`mailto:${row.email}`}>{row.email}</a></div>
                    </td>
                    <td>{serviceLabel[row.service_type] ?? row.service_type}</td>
                    <td><span className={`admin-badge ${row.status}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <section className="admin-quick-links" aria-labelledby="admin-shortcuts"><h2 id="admin-shortcuts">Keep things moving</h2><div><Link href="/admin/bookings"><strong>Arrange a session <span aria-hidden="true">→</span></strong><span>Review availability and contact a client.</span></Link><Link href="/admin/messages"><strong>Make a connection <span aria-hidden="true">→</span></strong><span>Read programme enquiries and messages.</span></Link></div></section>

    </>
  );
}
