'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface BookingRow {
  id: string; service_type: string; format: string; preferred_days: string[] | null;
  preferred_times: string[] | null; earliest_date: string | null; name: string; email: string;
  phone: string | null; is_returning: boolean | null; note: string | null; status: string;
  created_at: string; scheduled_at?: string | null; session_location?: string | null;
  confirmation_sent_at?: string | null; confirmation_sending_at?: string | null; request_notified_at?: string | null;
}
const services: Record<string, string> = { individual: 'Individual therapy', couples: 'Couples therapy', assessment: 'Psychological assessment', fertility: 'Fertility counselling', unsure: 'Help finding the right support' };
const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
const appointmentFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

export function BookingList({ rows, setupReady, mailReady, today }: { rows: BookingRow[]; setupReady: boolean; mailReady: boolean; today: string }) {
  const [filter, setFilter] = useState('pending');
  const filtered = rows.filter(row => filter === 'all' || row.status === filter);
  return <>
    <div className="booking-tools" role="group" aria-label="Filter appointment requests">{[['pending','Awaiting confirmation'],['confirmed','Confirmed'],['all','All requests']].map(([value,label]) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label} <span>{rows.filter(r => value === 'all' || r.status === value).length}</span></button>)}</div>
    <p className="admin-hint" role="status">{filtered.length} {filtered.length === 1 ? 'request' : 'requests'} · Latest 200 requests · All appointment times are in IST.</p>
    {filtered.length === 0 ? <div className="admin-empty"><h2>{filter === 'pending' ? 'You’re all caught up.' : 'No requests here yet.'}</h2><p>{filter === 'pending' ? 'New session requests will appear here when someone reaches out.' : 'Choose another filter to see your requests.'}</p></div> : <div className="booking-list">{filtered.map(row => <BookingCard key={row.id} row={row} setupReady={setupReady} mailReady={mailReady} today={today} />)}</div>}
  </>;
}

function BookingCard({ row, setupReady, mailReady, today }: { row: BookingRow; setupReady: boolean; mailReady: boolean; today: string }) {
  const id = useId();
  const router = useRouter();
  const initial = row.scheduled_at ? new Date(new Date(row.scheduled_at).getTime() + 330 * 60000).toISOString() : '';
  const [date, setDate] = useState(initial.slice(0,10));
  const [time, setTime] = useState(initial.slice(11,16));
  const [location, setLocation] = useState(row.session_location || '');
  const [sending, setSending] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [feedback, setFeedback] = useState<{ state: 'success' | 'error'; text: string } | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [therapistNotified, setTherapistNotified] = useState(false);
  const when = [row.preferred_days?.join(', '), row.preferred_times?.join(', ')].filter(Boolean).join(' · ');
  const confirmed = !!row.confirmation_sent_at || confirmationSent;

  async function send(kind: 'confirm' | 'notify', event?: React.FormEvent) {
    event?.preventDefault();
    if (sending || notifying) return;
    kind === 'confirm' ? setSending(true) : setNotifying(true);
    setFeedback(null);
    try {
      const response = await fetch(`/api/admin/bookings/${row.id}/${kind}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: kind === 'confirm' ? JSON.stringify({ date, time, location }) : '{}' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not complete this action. Please try again.');
      if (kind === 'confirm') setConfirmationSent(true); else setTherapistNotified(true);
      setFeedback({ state: 'success', text: kind === 'confirm' ? 'Appointment confirmed. The email server accepted the client’s confirmation.' : 'The email server accepted the therapist notification.' });
      router.refresh();
    } catch (error) { setFeedback({ state: 'error', text: error instanceof Error ? error.message : 'Could not connect. Please try again.' }); }
    finally { setSending(false); setNotifying(false); }
  }

  return <article className="booking-card" aria-labelledby={`${id}-name`}>
    <header className="booking-card-head"><div><span className="admin-eyebrow">Received {dateFormat.format(new Date(row.created_at))}{row.is_returning ? ' · Returning client' : ''}</span><h2 id={`${id}-name`}>{row.name}</h2><a href={`mailto:${row.email}`}>{row.email}</a>{row.phone && <span> · <a href={`tel:${row.phone}`}>{row.phone}</a></span>}</div><span className={`admin-badge ${confirmed ? 'confirmed' : row.status}`}>{confirmed ? 'confirmed' : row.status}</span></header>
    <div className="booking-card-body"><dl className="booking-meta"><div><dt>Support</dt><dd>{services[row.service_type] || row.service_type}</dd></div><div><dt>Format</dt><dd>{row.format}</dd></div><div><dt>Preferred availability</dt><dd>{when || 'Flexible'}{row.earliest_date && <small>From {dateFormat.format(new Date(`${row.earliest_date}T00:00:00+05:30`))}</small>}</dd></div></dl>
      {row.note && <div className="booking-note"><strong>Client’s note</strong><p>{row.note}</p></div>}
      <div className="booking-email-status"><small>{row.request_notified_at || therapistNotified ? 'Therapist notification accepted by email server.' : 'Therapist notification not yet recorded.'}</small>{!row.request_notified_at && !therapistNotified && <button type="button" className="admin-text-link" disabled={!setupReady || !mailReady || sending || notifying} onClick={() => send('notify')}>{notifying ? 'Sending…' : 'Send therapist notification'}</button>}</div>
      {confirmed ? <div className="booking-confirmed"><strong>Confirmed session</strong><p>{row.scheduled_at ? appointmentFormat.format(new Date(row.scheduled_at)) : `${date} at ${time}`} IST</p><p>{row.session_location || location}</p><small>Client confirmation accepted by the email server.</small></div> : ['pending','confirmed'].includes(row.status) && <form className="booking-confirm-form" onSubmit={event => send('confirm', event)} aria-busy={sending}>
        <h3>Arrange this session</h3><p className="admin-hint">Choose the time agreed with the client. Confirmation includes these details.</p>
        <div className="booking-fields"><div className="booking-field"><label htmlFor={`${id}-date`}>Session date</label><input id={`${id}-date`} type="date" required min={today} value={date} onChange={e => setDate(e.target.value)} disabled={!setupReady || confirmed} /></div><div className="booking-field"><label htmlFor={`${id}-time`}>Time (IST)</label><input id={`${id}-time`} type="time" required value={time} onChange={e => setTime(e.target.value)} disabled={!setupReady || confirmed} /></div><div className="booking-field booking-field-full"><label htmlFor={`${id}-location`}>{row.format === 'Online (video)' ? 'Secure meeting link' : 'Session address'}</label><input id={`${id}-location`} type={row.format === 'Online (video)' ? 'url' : 'text'} required minLength={5} maxLength={500} placeholder={row.format === 'Online (video)' ? 'https://meet.google.com/…' : 'Full address, including room or floor'} value={location} onChange={e => setLocation(e.target.value)} disabled={!setupReady || confirmed} /></div></div>
        <div className="booking-form-footer"><button className="btn" type="submit" disabled={sending || notifying || !setupReady || !mailReady}>{sending ? 'Sending confirmation…' : 'Confirm & email client'}</button><small>An email will be sent to {row.email}.</small></div>
      </form>}
      {feedback && <p className="booking-feedback" data-state={feedback.state} role={feedback.state === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
    </div>
  </article>;
}
