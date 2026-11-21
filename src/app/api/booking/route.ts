import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { BookingValidationError, validateBooking } from '@/lib/booking-validation';
import { sendTherapistBookingNotification } from '@/lib/booking-mail';

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 20000) {
      return NextResponse.json({ error: 'Please keep your booking request brief.' }, { status: 413 });
    }
    let body: unknown;
    try { body = JSON.parse(raw); } catch {
      return NextResponse.json({ error: 'Please send a valid booking request.' }, { status: 400 });
    }
    const booking = validateBooking(body);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Online requests are temporarily unavailable. Please contact us by email or phone.' }, { status: 503 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase.from('booking_requests').insert(booking).select('id').single();

    if (error) throw error;

    // A failed notification must never turn a saved request into an apparent
    // failure that encourages the client to create duplicate bookings.
    let notification: 'sent' | 'unavailable' | 'failed' = 'failed';
    if (data?.id) {
      try {
        const claimTime = new Date().toISOString();
        const { data: claimed, error: claimError } = await supabase.from('booking_requests')
          .update({ request_notification_sending_at: claimTime })
          .eq('id', data.id).is('request_notified_at', null).is('request_notification_sending_at', null)
          .select('id').maybeSingle();
        if (claimError || !claimed) {
          notification = 'unavailable';
          console.error('Booking saved; notification tracking unavailable. Check booking-confirmation SQL setup.');
        } else {
          notification = (await sendTherapistBookingNotification({ ...booking, id: data.id })).status;
          const { error: trackingError } = await supabase.from('booking_requests').update({
            request_notification_sending_at: null,
            ...(notification === 'sent' ? { request_notified_at: new Date().toISOString() } : {})
          }).eq('id', data.id).eq('request_notification_sending_at', claimTime);
          if (trackingError) console.error('Booking notification result could not be recorded. Check delivery before retrying.');
        }
      }
      catch { console.error('Booking notification could not be sent'); }
    }
    return NextResponse.json({ success: true, booking_id: data?.id, notification, message: notification === 'sent' ? 'Booking request received and therapist notified' : 'Booking request saved. Email notification is unavailable; please contact us directly if you need a reply sooner.' });
  } catch (error) {
    if (error instanceof BookingValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    console.error('Booking request could not be saved');
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
