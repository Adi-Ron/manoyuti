import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin';
import { createServiceClient } from '@/lib/supabase/service';
import { sendTherapistBookingNotification } from '@/lib/booking-mail';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const origin = request.headers.get('origin');
    if (origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    if (!await getAdminUser()) return NextResponse.json({ error: 'Please sign in as the therapist.' }, { status: 401 });
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.id)) return NextResponse.json({ error: 'Invalid booking request.' }, { status: 400 });
    const db = createServiceClient();
    const { data: booking, error } = await db.from('booking_requests').select('*').eq('id', params.id).maybeSingle();
    if (error) return NextResponse.json({ error: 'This booking could not be loaded. Please try again later.' }, { status: 503 });
    if (!booking) return NextResponse.json({ error: 'This booking was not found.' }, { status: 404 });
    if (!['request_notified_at', 'request_notification_sending_at'].every(key => key in booking)) return NextResponse.json({ error: 'Run supabase/booking-confirmation.sql before sending notifications.' }, { status: 503 });
    if (booking.request_notified_at) return NextResponse.json({ success: true });
    const now = new Date().toISOString();
    const expired = new Date(Date.now() - 120000).toISOString();
    const { data: claimed, error: claimError } = await db.from('booking_requests').update({ request_notification_sending_at: now })
      .eq('id', params.id).is('request_notified_at', null)
      .or(`request_notification_sending_at.is.null,request_notification_sending_at.lt.${expired}`).select('id').maybeSingle();
    if (claimError) return NextResponse.json({ error: 'Notification tracking is unavailable. Please check setup before retrying.' }, { status: 503 });
    if (!claimed) return NextResponse.json({ error: 'This notification is being sent. Refresh before trying again.' }, { status: 409 });
    const delivery = await sendTherapistBookingNotification(booking);
    const { error: saveError } = await db.from('booking_requests').update({
      request_notified_at: delivery.status === 'sent' ? new Date().toISOString() : null,
      request_notification_sending_at: null
    }).eq('id', params.id).eq('request_notification_sending_at', now);
    if (saveError) return NextResponse.json({ error: 'The email result could not be saved. Please check before resending.' }, { status: 503 });
    if (delivery.status !== 'sent') return NextResponse.json({ error: delivery.status === 'unavailable' ? 'Email is not configured. Please configure the email provider before retrying.' : 'Email acceptance could not be confirmed. Check the provider and delivery before retrying to avoid a duplicate.' }, { status: 503 });
    return NextResponse.json({ success: true });
  } catch {
    console.error('Therapist notification could not be completed');
    return NextResponse.json({ error: 'Could not send the notification. Please try again.' }, { status: 500 });
  }
}

