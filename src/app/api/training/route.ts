import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { programme, name, email, phone, institution, year, message } = body;

    if (!programme || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('training_registrations').insert({
      programme, name, email, phone, institution, year, message
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Registration received' });
  } catch (error) {
    console.error('Training registration error:', error);
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 });
  }
}