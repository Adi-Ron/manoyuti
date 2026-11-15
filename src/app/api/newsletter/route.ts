import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('newsletter_subscriptions').insert({
      email, source
    });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}