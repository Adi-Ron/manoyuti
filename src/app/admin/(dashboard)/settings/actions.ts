'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin';
import { createServiceClient } from '@/lib/supabase/service';
import { SETTINGS_GROUPS } from '@/lib/site-settings';

export async function updateSettings(formData: FormData) {
  const admin = await getAdminUser();
  if (!admin) redirect('/admin/login');

  const fields = SETTINGS_GROUPS.flatMap(group => group.fields);
  const rows = fields.map(field => ({
    key: field.key,
    value: String(formData.get(field.key) ?? '').trim(),
    updated_at: new Date().toISOString()
  }));

  const supabase = createServiceClient();
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });

  if (error) {
    redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect('/admin/settings?saved=1');
}
