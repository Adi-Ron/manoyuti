import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function getAdminUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const email = user.email?.trim().toLowerCase();
  const service = createServiceClient();

  const { data: profile } = await service
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle();

  const isEmailAdmin = Boolean(adminEmail && email === adminEmail);
  const isAdmin = profile?.role === 'admin' || isEmailAdmin;

  if (!isAdmin) return null;

  if (isEmailAdmin && profile?.role !== 'admin') {
    await service.from('profiles').upsert(
      {
        id: user.id,
        role: 'admin',
        full_name: profile?.full_name ?? user.user_metadata?.full_name ?? 'Administrator'
      },
      { onConflict: 'id' }
    );
  }

  return { user, profile, email: user.email ?? '' };
}
