-- Resilio: perception responses + editable site settings
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- It is safe to run more than once.

create extension if not exists "uuid-ossp";

-- Shared admin check (also created by fix-rls.sql)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- Anonymous perception responses. Only stored when the visitor consents.
create table if not exists perception_responses (
  id uuid default uuid_generate_v4() primary key,
  response_text text not null,
  image_seed integer,
  consent boolean not null default false,
  created_at timestamptz default now()
);

alter table perception_responses enable row level security;

drop policy if exists "Anyone can insert consented perception" on perception_responses;
create policy "Anyone can insert consented perception"
  on perception_responses for insert
  with check (consent = true);

drop policy if exists "Admins can view perception responses" on perception_responses;
create policy "Admins can view perception responses"
  on perception_responses for select
  using (public.is_admin());

create index if not exists idx_perception_created on perception_responses(created_at desc);

-- Editable public site settings (key/value). Public read, service-role write.
create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

drop policy if exists "Site settings are public" on site_settings;
create policy "Site settings are public"
  on site_settings for select
  using (true);

insert into site_settings (key, value) values
  ('availability_label', 'Next available'),
  ('availability_value', 'Tomorrow, 10:30'),
  ('availability_hint', 'Tap to reserve'),
  ('phone_display', '+91-9936724392'),
  ('phone_e164', '+919936724392'),
  ('email', 'ishat1706@gmail.com'),
  ('whatsapp_number', '919936724392'),
  ('crisis_text', 'Need urgent support? Call Tele-MANAS'),
  ('crisis_phone', '14416'),
  ('location', 'Bengaluru, Karnataka · sessions online across India'),
  ('session_fee', '₹1,500 · 50 min'),
  ('clients_count', '1000'),
  ('research_count', '15'),
  ('hero_stat4_label', 'Session format'),
  ('hero_stat4_value', 'Online & In-person'),
  ('hero_lead', 'Psychotherapy, psychology research and training in Bengaluru and online across India, led by psychologist Isha Tiwari.'),
  ('cta_title', 'Taking the first step is often the hardest'),
  ('cta_text', 'Send a booking request, call or WhatsApp. We''ll reply within 24 hours.')
on conflict (key) do nothing;
