import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string;
  preferred_time: string | null;
  status: string;
  created_at: string;
}

export default async function AdminMessagesPage() {
  let rows: MessageRow[] = [];
  let failed = false;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) failed = true;
    rows = (data ?? []) as MessageRow[];
  } catch {
    failed = true;
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Messages</h1>
          <p>General enquiries and notes from the contact form.</p>
        </div>
      </div>

      <div className="admin-panel">
        {failed ? (
          <p className="admin-note">Could not load messages. Check the Supabase connection and schema.</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">No messages yet.</p>
        ) : (
          <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Contact messages">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">From</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Message</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id}>
                    <td>
                      {new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                      <div className="note">
                        {new Date(row.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                      </div>
                    </td>
                    <td>
                      {row.name}
                      <div className="note"><a href={`mailto:${row.email}`}>{row.email}</a></div>
                      {row.phone && <div className="note"><a href={`tel:${row.phone}`}>{row.phone}</a></div>}
                    </td>
                    <td>
                      {row.interest}
                      {row.preferred_time && <div className="note">Best time: {row.preferred_time}</div>}
                    </td>
                    <td><div className="admin-message-text">{row.message}</div></td>
                    <td><span className={`admin-badge ${row.status}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
