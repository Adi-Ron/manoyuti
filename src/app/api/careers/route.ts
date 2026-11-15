import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, name, email, phone, cv_url, cover_letter } = body;

    if (!role || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('career_applications').insert({
      role, name, email, phone, cv_url, cover_letter
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Application received' });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}