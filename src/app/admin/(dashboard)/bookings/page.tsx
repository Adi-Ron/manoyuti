import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

interface BookingRow {
  id: string;
  service_type: string;
  format: string;
  preferred_days: string[] | null;
  preferred_times: string[] | null;
  earliest_date: string | null;
  name: string;
  email: string;
  phone: string | null;
  is_returning: boolean | null;
  note: string | null;
  status: string;
  created_at: string;
}

const serviceLabel: Record<string, string> = {
  individual: 'Individual therapy',
  couples: 'Couples therapy',
  assessment: 'Psychological assessment',
  fertility: 'Fertility counselling',
  unsure: 'Not sure yet'
};

export default async function AdminBookingsPage() {
  let rows: BookingRow[] = [];
  let failed = false;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) failed = true;
    rows = (data ?? []) as BookingRow[];
  } catch {
    failed = true;
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Booking requests</h1>
          <p>Newest first. Reply by email or phone to confirm a time.</p>
        </div>
      </div>

      <div className="admin-panel">
        {failed ? (
          <p className="admin-note">Could not load bookings. Check the Supabase connection and schema.</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">No booking requests yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>When</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const when = [
                    row.preferred_days?.join(', '),
                    row.preferred_times?.join(', ').toLowerCase(),
                    row.earliest_date ? `from ${row.earliest_date}` : ''
                  ].filter(Boolean).join(' · ');

                  return (
                    <tr key={row.id}>
                      <td>
                        {new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        <div className="note">
                          {new Date(row.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td>
                        {row.name}
                        <div className="note">{row.email}</div>
                        {row.phone && <div className="note">{row.phone}</div>}
                        {row.is_returning && <div className="note">Returning client</div>}
                      </td>
                      <td>
                        {serviceLabel[row.service_type] ?? row.service_type}
                        <div className="note">{row.format}</div>
                      </td>
                      <td>
                        {when || <span className="muted">Flexible</span>}
                        {row.note && <div className="note">{row.note}</div>}
                      </td>
                      <td><span className={`admin-badge ${row.status}`}>{row.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
