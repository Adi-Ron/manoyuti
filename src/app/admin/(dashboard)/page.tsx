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

async function countRows(table: string) {
  try {
    const supabase = createServiceClient();
    const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true });
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
  const [bookings, messages, perception, newsletter] = await Promise.all([
    countRows('booking_requests'),
    countRows('contact_messages'),
    countRows('perception_responses'),
    countRows('newsletter_subscriptions')
  ]);

  let recent: RecentBooking[] = [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from('booking_requests')
      .select('id,name,email,service_type,created_at,status')
      .order('created_at', { ascending: false })
      .limit(6);
    recent = (data ?? []) as RecentBooking[];
  } catch {
    recent = [];
  }

  const value = (n: number | null) => (n === null ? '—' : n.toLocaleString('en-IN'));

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Overview</h1>
          <p>Everything that needs your attention, in one place.</p>
        </div>
        <Link className="btn" href="/admin/settings">Edit site content</Link>
      </div>

      <div className="admin-grid">
        <Link className="admin-card admin-stat" href="/admin/bookings">
          <b>{value(bookings)}</b>
          <span>Booking requests</span>
        </Link>
        <Link className="admin-card admin-stat" href="/admin/messages">
          <b>{value(messages)}</b>
          <span>Contact messages</span>
        </Link>
        <Link className="admin-card admin-stat" href="/admin/perception">
          <b>{value(perception)}</b>
          <span>Perception responses</span>
        </Link>
        <div className="admin-card admin-stat">
          <b>{value(newsletter)}</b>
          <span>Newsletter subscribers</span>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Recent booking requests</h2>
        {recent.length === 0 ? (
          <p className="admin-empty">No booking requests yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(row => (
                  <tr key={row.id}>
                    <td>{new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td>
                      {row.name}
                      <div className="note">{row.email}</div>
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

      {perception === null && (
        <div className="admin-panel">
          <p className="admin-note">
            The perception table is not set up yet. Run <code>supabase/admin-and-perception.sql</code> in the Supabase
            SQL editor to enable perception responses and editable site settings.
          </p>
        </div>
      )}
    </>
  );
}
