import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

interface PerceptionRow {
  id: string;
  response_text: string;
  image_seed: number | null;
  created_at: string;
}

export default async function AdminPerceptionPage() {
  let rows: PerceptionRow[] = [];
  let missing = false;
  let failed = false;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('perception_responses')
      .select('id,response_text,image_seed,created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      if (error.code === '42P01' || error.message.toLowerCase().includes('does not exist')) {
        missing = true;
      } else {
        failed = true;
      }
    }
    rows = (data ?? []) as PerceptionRow[];
  } catch {
    failed = true;
  }

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Perception responses</h1>
          <p>Anonymous reflections shared with consent. Not scored, not diagnostic.</p>
        </div>
      </div>

      <div className="admin-panel">
        {missing ? (
          <p className="admin-note">
            The <code>perception_responses</code> table is not set up yet. Run{' '}
            <code>supabase/admin-and-perception.sql</code> in the Supabase SQL editor.
          </p>
        ) : failed ? (
          <p className="admin-note">Could not load responses. Check the Supabase connection and schema.</p>
        ) : rows.length === 0 ? (
          <p className="admin-empty">No responses shared yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Received</th>
                  <th>Inkblot</th>
                  <th>Response</th>
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
                    <td>{row.image_seed ?? '—'}</td>
                    <td><div style={{ maxWidth: '52ch', whiteSpace: 'pre-wrap' }}>{row.response_text}</div></td>
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
