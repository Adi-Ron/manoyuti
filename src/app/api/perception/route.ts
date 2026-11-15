import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const responseText = typeof body.response_text === 'string' ? body.response_text.trim() : '';
    const imageSeed = Number.isFinite(body.image_seed) ? Math.trunc(body.image_seed) : null;

    if (body.consent !== true) {
      return NextResponse.json({ error: 'Consent is required to store a response' }, { status: 400 });
    }

    if (responseText.length < 3 || responseText.length > 1200) {
      return NextResponse.json({ error: 'Response must be between 3 and 1200 characters' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from('perception_responses').insert({
      response_text: responseText,
      image_seed: imageSeed,
      consent: true
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Perception error:', error);
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}
