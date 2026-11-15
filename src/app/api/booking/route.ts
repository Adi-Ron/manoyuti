import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service_type, format, preferred_days, preferred_times, earliest_date, name, email, phone, is_returning, note, consent } = body;

    if (!service_type || !format || !preferred_days?.length || !preferred_times?.length || !name || !email || !consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('booking_requests').insert({
      service_type, format, preferred_days, preferred_times, earliest_date, name, email, phone, is_returning, note, consent
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Booking request received' });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}