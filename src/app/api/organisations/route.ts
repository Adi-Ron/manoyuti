import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organisation_name, contact_name, email, phone, programme_interest, audience_size, preferred_format, message } = body;

    if (!organisation_name || !contact_name || !email || !programme_interest?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('organisation_enquiries').insert({
      organisation_name, contact_name, email, phone, programme_interest, audience_size, preferred_format, message
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Enquiry received' });
  } catch (error) {
    console.error('Organisation enquiry error:', error);
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 });
  }
}