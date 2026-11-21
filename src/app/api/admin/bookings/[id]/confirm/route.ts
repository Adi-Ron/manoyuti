import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin';
import { createServiceClient } from '@/lib/supabase/service';
import { ConfirmationError, confirmBooking } from '@/lib/booking-confirmation';
import { AppointmentValidationError } from '@/lib/appointment-validation';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const origin = request.headers.get('origin');
    if (origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    if (!await getAdminUser()) return NextResponse.json({ error: 'Please sign in as the therapist.' }, { status: 401 });
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.id)) return NextResponse.json({ error: 'Invalid booking request.' }, { status: 400 });
    const text = await request.text();
    if (text.length > 4000) return NextResponse.json({ error: 'Please keep appointment details brief.' }, { status: 413 });
    let body: unknown;
    try { body = JSON.parse(text); } catch { return NextResponse.json({ error: 'Invalid appointment details.' }, { status: 400 }); }
    return NextResponse.json(await confirmBooking(createServiceClient(), params.id, body));
  } catch (error) {
    if (error instanceof ConfirmationError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof AppointmentValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    console.error('Booking confirmation could not be completed');
    return NextResponse.json({ error: 'Could not confirm this appointment. Please try again.' }, { status: 500 });
  }
}
