-- Supabase schema for Resilio
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'student', 'practitioner', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking requests
CREATE TABLE booking_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service_type TEXT NOT NULL CHECK (service_type IN ('individual', 'couples', 'fertility', 'assessment', 'unsure')),
  format TEXT NOT NULL CHECK (format IN ('Online (video)', 'In person, Bengaluru')),
  preferred_days TEXT[],
  preferred_times TEXT[],
  earliest_date DATE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  is_returning BOOLEAN DEFAULT FALSE,
  note TEXT,
  consent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training programme registrations
CREATE TABLE training_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  programme TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  institution TEXT,
  year TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'waitlisted', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organisation enquiries
CREATE TABLE organisation_enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organisation_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  programme_interest TEXT[],
  audience_size TEXT,
  preferred_format TEXT CHECK (preferred_format IN ('On site', 'Online', 'Hybrid')),
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'confirmed', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT DEFAULT 'Isha Tiwari',
  reading_time TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Career applications
CREATE TABLE career_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cv_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'interview', 'offered', 'rejected', 'hired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anonymous perception responses (stored only with consent)
CREATE TABLE perception_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  response_text TEXT NOT NULL,
  image_seed INTEGER,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Editable public site settings (key/value)
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisation_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE perception_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
-- SECURITY DEFINER helper avoids recursive RLS lookups on profiles.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can insert booking" ON booking_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all bookings" ON booking_requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update bookings" ON booking_requests FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all contacts" ON contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update contacts" ON contact_messages FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can register for training" ON training_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view training regs" ON training_registrations FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can enquire org" ON organisation_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view org enquiries" ON organisation_enquiries FOR SELECT USING (public.is_admin());

CREATE POLICY "Published blogs are public" ON blog_posts FOR SELECT USING (published_at IS NOT NULL);
CREATE POLICY "Admins can manage blogs" ON blog_posts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can apply" ON career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view applications" ON career_applications FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can subscribe" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view subscriptions" ON newsletter_subscriptions FOR SELECT USING (public.is_admin());

CREATE POLICY "Anyone can insert consented perception" ON perception_responses FOR INSERT WITH CHECK (consent = true);
CREATE POLICY "Admins can view perception responses" ON perception_responses FOR SELECT USING (public.is_admin());

CREATE POLICY "Site settings are public" ON site_settings FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_booking_status ON booking_requests(status);
CREATE INDEX idx_booking_created ON booking_requests(created_at DESC);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_training_programme ON training_registrations(programme);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_perception_created ON perception_responses(created_at DESC);

-- Default editable settings
INSERT INTO site_settings (key, value) VALUES
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
  ('hero_lead', 'Psychotherapy, psychology research and training in Bengaluru and online across India, led by psychologist Isha Tiwari.'),
  ('cta_title', 'Taking the first step is often the hardest'),
  ('cta_text', 'Send a booking request, call or WhatsApp. We''ll reply within 24 hours.')
ON CONFLICT (key) DO NOTHING;