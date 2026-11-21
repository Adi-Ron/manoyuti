import { unstable_noStore as noStore } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/service';

export const DEFAULT_SETTINGS = {
  availability_label: 'Next available',
  availability_value: 'Tomorrow, 10:30',
  availability_hint: 'Tap to reserve',
  phone_display: '+91-9936724392',
  phone_e164: '+919936724392',
  email: 'ishatiwari1706@gmail.com',
  whatsapp_number: '919936724392',
  crisis_text: 'Need urgent support? Call Tele-MANAS',
  crisis_phone: '14416',
  location: 'Bengaluru, Karnataka · sessions online across India',
  session_fee: '₹1,500 · 50 min',
  clients_count: '1000',
  research_count: '15',
  hero_stat4_label: 'Session format',
  hero_stat4_value: 'Online & In-person',
  hero_lead:
    'Psychotherapy, psychology research and training in Bengaluru and online across India, led by psychologist Isha Tiwari.',
  cta_title: 'Taking the first step is often the hardest',
  cta_text: "Send a booking request, call or WhatsApp. We'll reply within 24 hours."
};

export type SiteSettings = { [K in keyof typeof DEFAULT_SETTINGS]: string };

export interface SettingField {
  key: keyof SiteSettings;
  label: string;
  hint?: string;
  type?: 'text' | 'textarea';
  span?: 'full' | 'half';
}

export const SETTINGS_GROUPS: { title: string; description?: string; fields: SettingField[] }[] = [
  {
    title: 'Hero availability',
    description: 'The badge and timing indicator displayed over the hero illustration.',
    fields: [
      { key: 'availability_label', label: 'Status label', hint: 'For example: Next available', span: 'half' },
      { key: 'availability_value', label: 'Main timing line', hint: 'For example: Tomorrow, 10:30', span: 'half' },
      { key: 'availability_hint', label: 'Action hint', hint: 'For example: Tap to reserve', span: 'full' }
    ]
  },
  {
    title: 'Hero copy and metrics',
    description: 'Headline introduction and statistics shown on the homepage.',
    fields: [
      { key: 'hero_lead', label: 'Hero introduction copy', type: 'textarea', span: 'full' },
      { key: 'clients_count', label: 'Clients supported (number)', hint: 'Used in the animated metric counter', span: 'half' },
      { key: 'research_count', label: 'Research projects (number)', hint: 'Used in the animated metric counter', span: 'half' },
      { key: 'session_fee', label: 'Individual session fee line', hint: 'For example: ₹1,500 · 50 min', span: 'full' },
      { key: 'hero_stat4_label', label: '4th metric label', hint: 'e.g. Session format, Clinical experience, or Consultation mode', span: 'half' },
      { key: 'hero_stat4_value', label: '4th metric value', hint: 'e.g. Online & In-person, 8+ Years, or Bengaluru & Online', span: 'half' }
    ]
  },
  {
    title: 'Contact details',
    description: 'Shown in the top bar, footer, contact page, and WhatsApp actions.',
    fields: [
      { key: 'phone_display', label: 'Phone (display)', hint: 'e.g. +91-9936724392', span: 'half' },
      { key: 'phone_e164', label: 'Phone (dial link)', hint: 'e.g. +919936724392', span: 'half' },
      { key: 'email', label: 'Email address', hint: 'e.g. ishat1706@gmail.com', span: 'half' },
      { key: 'whatsapp_number', label: 'WhatsApp number', hint: 'Digits only with country code (e.g. 919936724392)', span: 'half' },
      { key: 'location', label: 'Location line', type: 'textarea', span: 'full' }
    ]
  },
  {
    title: 'Crisis support',
    description: 'Shown in the top announcement bar and emergency support notices.',
    fields: [
      { key: 'crisis_text', label: 'Crisis line text', hint: 'e.g. Need urgent support? Call Tele-MANAS', span: 'half' },
      { key: 'crisis_phone', label: 'Crisis phone number', hint: 'e.g. 14416', span: 'half' }
    ]
  },
  {
    title: 'Closing call to action',
    description: 'The prominent closing invitation banner across site pages.',
    fields: [
      { key: 'cta_title', label: 'Banner heading', hint: 'Main headline for the booking and contact callout', span: 'full' },
      { key: 'cta_text', label: 'Supporting text', type: 'textarea', span: 'full' }
    ]
  }
];

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  const settings: SiteSettings = { ...DEFAULT_SETTINGS };

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('site_settings').select('key,value');
    if (error || !data) return settings;

    for (const row of data) {
      if (
        typeof row.key === 'string' &&
        row.key in settings &&
        typeof row.value === 'string' &&
        row.value.trim()
      ) {
        (settings as Record<string, string>)[row.key] = row.value.replace(/Resilio by IshIra|Resilio|RESILIO/g, 'Manoyuti');
      }
    }
  } catch {
    return settings;
  }

  return settings;
}

export async function getSiteSettingsWithStatus(): Promise<{ settings: SiteSettings; missing: boolean }> {
  const settings: SiteSettings = { ...DEFAULT_SETTINGS };

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('site_settings').select('key,value');
    if (error) return { settings, missing: true };
    if (!data) return { settings, missing: false };

    for (const row of data) {
      if (
        typeof row.key === 'string' &&
        row.key in settings &&
        typeof row.value === 'string' &&
        row.value.trim()
      ) {
        (settings as Record<string, string>)[row.key] = row.value.replace(/Resilio by IshIra|Resilio|RESILIO/g, 'Manoyuti');
      }
    }
    return { settings, missing: false };
  } catch {
    return { settings, missing: true };
  }
}
