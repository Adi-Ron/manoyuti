-- Resilio: fix recursive RLS policies
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Problem: the admin policies on `profiles` query `profiles` from inside a
-- policy, and every other admin policy queries `profiles` too. Postgres
-- detects this as infinite recursion and returns HTTP 500 for reads.
--
-- Fix: a SECURITY DEFINER helper that bypasses RLS when checking the role.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- profiles
drop policy if exists "Admins can view all profiles" on profiles;
create policy "Admins can view all profiles"
  on profiles for select
  using (public.is_admin());

-- booking_requests
drop policy if exists "Admins can view all bookings" on booking_requests;
create policy "Admins can view all bookings"
  on booking_requests for select
  using (public.is_admin());

drop policy if exists "Admins can update bookings" on booking_requests;
create policy "Admins can update bookings"
  on booking_requests for update
  using (public.is_admin())
  with check (public.is_admin());

-- contact_messages
drop policy if exists "Admins can view all contacts" on contact_messages;
create policy "Admins can view all contacts"
  on contact_messages for select
  using (public.is_admin());

drop policy if exists "Admins can update contacts" on contact_messages;
create policy "Admins can update contacts"
  on contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());

-- training_registrations
drop policy if exists "Admins can view training regs" on training_registrations;
create policy "Admins can view training regs"
  on training_registrations for select
  using (public.is_admin());

-- organisation_enquiries
drop policy if exists "Admins can view org enquiries" on organisation_enquiries;
create policy "Admins can view org enquiries"
  on organisation_enquiries for select
  using (public.is_admin());

-- blog_posts
drop policy if exists "Admins can manage blogs" on blog_posts;
create policy "Admins can manage blogs"
  on blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

-- career_applications
drop policy if exists "Admins can view applications" on career_applications;
create policy "Admins can view applications"
  on career_applications for select
  using (public.is_admin());

-- newsletter_subscriptions
drop policy if exists "Admins can view subscriptions" on newsletter_subscriptions;
create policy "Admins can view subscriptions"
  on newsletter_subscriptions for select
  using (public.is_admin());

-- Keep own-profile access explicit.
drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Own-profile RLS alone does not protect the role column. Keep role assignment
-- on the trusted server/service role while preserving editable contact details.
revoke update on public.profiles from PUBLIC, anon, authenticated;
revoke update (id, role, created_at, updated_at) on public.profiles from PUBLIC, anon, authenticated;
grant update (full_name, phone) on public.profiles to authenticated;
