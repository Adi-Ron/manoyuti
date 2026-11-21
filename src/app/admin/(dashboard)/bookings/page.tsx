import { createServiceClient } from '@/lib/supabase/service';
import { isBookingMailConfigured } from '@/lib/booking-mail';
import { BookingList, type BookingRow } from './BookingList';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  let rows: BookingRow[] = [];
  let failed = false;
  let setupReady = false;
  try {
    const db = createServiceClient();
    const [bookings, schema] = await Promise.all([
      db.from('booking_requests').select('*').order('created_at', { ascending: false }).limit(200),
      db.from('booking_requests').select('scheduled_at,session_location,confirmation_sent_at,confirmation_sending_at,request_notified_at,request_notification_sending_at', { head: true }).limit(0)
    ]);
    failed = !!bookings.error;
    rows = (bookings.data ?? []) as BookingRow[];
    setupReady = !schema.error;
  } catch { failed = true; }
  const mailReady = isBookingMailConfigured();
  return <>
    <div className="admin-top"><div><span className="admin-eyebrow">From reaching out to meeting</span><h1>Appointments</h1><p>Review requests, agree on a time, and send a personal confirmation.</p></div></div>
    {!setupReady && !failed && <p className="admin-note" role="status">Appointment confirmations need a database update. Run <code>supabase/booking-confirmation.sql</code> in this project's Supabase SQL Editor. Existing requests are safe.</p>}
    {!mailReady && <p className="admin-note" role="status">Email delivery is not configured yet. Requests are saved here; configure the email provider to enable therapist notifications and client confirmations.</p>}
    {failed ? <div className="admin-panel"><p className="admin-note" role="alert">Could not load requests. Refresh the page or check the database connection.</p></div> : <BookingList rows={rows} setupReady={setupReady} mailReady={mailReady} today={new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())} />}
  </>;
}
