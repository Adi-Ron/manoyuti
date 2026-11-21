import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { ContactValidationError, validateContact } from '@/lib/contact-validation';

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 30000) {
      return NextResponse.json({ error: 'Please keep your message brief.' }, { status: 413 });
    }
    let body: unknown;
    try { body = JSON.parse(raw); } catch {
      return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 });
    }
    const message = validateContact(body);
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Online messages are temporarily unavailable. Please contact us by email or phone.' }, { status: 503 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('contact_messages').insert(message);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch (error) {
    if (error instanceof ContactValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    console.error('Contact message could not be saved');
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
