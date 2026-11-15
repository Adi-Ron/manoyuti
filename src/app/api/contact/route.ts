import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message, preferred_time } = body;

    if (!name || !email || !interest || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('contact_messages').insert({
      name, email, phone, interest, message, preferred_time
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}