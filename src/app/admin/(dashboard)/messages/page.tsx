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
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>From</th>
                  <th>Interest</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
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
                    </td>
                    <td>
                      {row.interest}
                      {row.preferred_time && <div className="note">Best time: {row.preferred_time}</div>}
                    </td>
                    <td><div style={{ maxWidth: '42ch', whiteSpace: 'pre-wrap' }}>{row.message}</div></td>
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
