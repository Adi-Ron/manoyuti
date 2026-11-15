export interface Service {
  id: string;
  name: string;
  length: string;
  fee: string;
  icon: string;
}

export interface TrainingProgramme {
  id: string;
  name: string;
  for: string;
  format: string;
  icon: string;
  desc?: string;
}

export interface OrgProgramme {
  id: string;
  name: string;
  for: string;
  icon: string;
  desc?: string;
}

export interface ResearchArea {
  id: string;
  name: string;
  icon: string;
  desc?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  reading_time: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingRequest {
  service_type: 'individual' | 'couples' | 'fertility' | 'assessment' | 'unsure';
  format: 'Online (video)' | 'In person, Bengaluru';
  preferred_days: string[];
  preferred_times: string[];
  earliest_date?: string;
  name: string;
  email: string;
  phone?: string;
  is_returning: boolean;
  note?: string;
  consent: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  preferred_time?: string;
}

export interface TrainingRegistration {
  programme: string;
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  year?: string;
  message?: string;
}

export interface OrganisationEnquiry {
  organisation_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  programme_interest: string[];
  audience_size?: string;
  preferred_format?: 'On site' | 'Online' | 'Hybrid';
  message?: string;
}

export interface CareerApplication {
  role: string;
  name: string;
  email: string;
  phone?: string;
  cv_url?: string;
  cover_letter?: string;
}

export interface NewsletterSubscription {
  email: string;
  source?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface JourneyStep {
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  stats: { label: string; value: string }[];
  tags?: string[];
  quote?: string;
}