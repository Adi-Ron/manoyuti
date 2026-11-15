import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number, suffix = ''): string {
  return Math.round(n).toLocaleString('en-IN') + suffix;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CONTACT_EMAIL = 'ishat1706@gmail.com';
export const CONTACT_PHONE = '+91-9936724392';
export const WHATSAPP_URL = 'https://wa.me/919936724392';
export const CRISIS_PHONE = '14416';
export const CRISIS_URL = 'tel:14416';

export const SERVICES = [
  { id: 'individual', name: 'Individual therapy', length: '50 min', fee: '₹1,500', icon: 'user' },
  { id: 'couples', name: 'Couples therapy', length: '60–75 min', fee: '₹3,000', icon: 'users' },
  { id: 'fertility', name: 'Fertility counselling', length: '60 min', fee: '₹2,000', icon: 'heart' },
  { id: 'assessment', name: 'Psychological assessment', length: 'Written report', fee: '₹999', icon: 'file-text' },
] as const;

export const TRAINING_PROGRAMMES = [
  { id: 'clinical-internship', name: 'Clinical Internship Programme', for: 'BA and MA psychology students', format: 'Live online, small batch', icon: 'graduation-cap', desc: 'Case history taking, assessments, observation, report writing and supervised exposure to therapy techniques.' },
  { id: 'therapy-skills-certificate', name: 'Therapy Skills Certificate', for: 'MA students and early-career practitioners', format: 'Live online, small batch', icon: 'award', desc: 'Practical CBT, ACT and SFBT skills through role-plays, case discussions and supervision.' },
  { id: 'qualitative-research-masterclass', name: 'Qualitative Research Masterclass', for: 'Postgraduate students and researchers', format: 'Live online, small batch', icon: 'book-open', desc: 'Research design, interviews, focus groups, thematic analysis and coding in NVivo.' },
  { id: 'dissertation-mentoring', name: 'Dissertation Mentoring', for: 'UG, PG and PhD students', format: 'Live online, small batch', icon: 'pen-tool', desc: 'One-to-one support from research question to final write-up.' },
  { id: 'research-tools-workshop', name: 'Research Tools Workshop', for: 'Students and researchers', format: 'Live online, small batch', icon: 'cpu', desc: 'Survey design in Qualtrics and data analysis in R, SPSS and JAMOVI.' },
] as const;

export const ORG_PROGRAMMES = [
  { id: 'posh', name: 'POSH awareness and training', for: 'Workplaces', icon: 'shield', desc: 'Clear, practical sessions on prevention, policy and respectful workplace conduct.' },
  { id: 'pocso', name: 'POCSO child-safety programmes', for: 'Schools', icon: 'users', desc: 'Child-safety awareness for staff and caregivers, grounded in the POCSO framework.' },
  { id: 'eap', name: 'EAP and employee wellness', for: 'Workplaces', icon: 'heart', desc: 'Employee assistance and wellbeing workshops that support sustainable performance.' },
] as const;

export const RESEARCH_AREAS = [
  { id: 'womens-health', name: "Women's health and infertility", icon: 'heart', desc: 'Emotional wellbeing across fertility treatment, pregnancy and family-building decisions.' },
  { id: 'health-psychology', name: 'Health psychology and well-being', icon: 'activity', desc: 'How psychological factors shape health behaviour, adjustment and recovery.' },
  { id: 'cognitive-neuroscience', name: 'Cognitive psychology and neuroscience', icon: 'brain', desc: 'Attention, memory and emotion, and what brain research tells us about them.' },
  { id: 'victimology', name: 'Victimology and trauma', icon: 'shield', desc: 'The impact of violence and trauma, and pathways to safety and recovery.' },
  { id: 'intervention-dev', name: 'Intervention development', icon: 'lightbulb', desc: 'Designing and testing psychological interventions for real-world settings.' },
  { id: 'psychology-tech', name: 'Psychology meets technology', icon: 'cpu', desc: 'Digital tools, measurement and responsible innovation in mental health.' },
] as const;

export const CONCERNS = [
  'Anxiety and panic',
  'Depression and low mood',
  'Stress and burnout',
  'Trauma',
  'OCD',
  'Grief and loss',
  'Relationship difficulties',
  'Self-esteem',
  'Sleep difficulties',
  'Addiction',
  'Fertility concerns and IVF',
  'Pregnancy loss',
  'Mood disorders',
];

export const APPROACHES = [
  'CBT', 'DBT', 'ACT', 'EMDR', 'SFBT', 'REBT', 'Mindfulness-based therapies'
];

export const FAQ_DATA = [
  {
    q: 'Is what I share confidential?',
    a: 'Yes. What you share stays between you and your therapist, within ethical and legal limits. We explain those limits, such as a serious risk to your safety, in the first session.'
  },
  {
    q: 'Online or in person?',
    a: 'Both. Sessions run online anywhere in India, and in person in Bengaluru.'
  },
  {
    q: 'How long, and how often?',
    a: 'Individual sessions are 50 minutes and couples sessions 60 to 75. Most people start weekly or fortnightly; you decide together in the first session.'
  },
  {
    q: 'Which approaches do you use?',
    a: 'Therapies with strong research support, including CBT, DBT, ACT, EMDR, SFBT, REBT and mindfulness-based therapies, chosen for your needs rather than from a template.'
  },
  {
    q: 'Can you prescribe medication?',
    a: 'No. Psychologists do not prescribe. If medication might help, we can work alongside a psychiatrist, as Isha often does on complex cases.'
  },
  {
    q: "What if I'm not sure therapy is for me?",
    a: "That's a common feeling. Book a first session or send a message: we'll talk through what's going on and whether therapy, an assessment or something else would help most."
  },
  {
    q: 'What training programmes do you offer?',
    a: 'Clinical Internship, Therapy Skills Certificate, Qualitative Research Masterclass, Dissertation Mentoring, and Research Tools Workshop. All live online in small batches with certificates on completion.'
  },
  {
    q: 'Do you work with organisations?',
    a: 'Yes. POSH awareness and training, POCSO child-safety programmes, EAP and employee wellness, and custom wellbeing workshops for schools, colleges and workplaces.'
  }
];

export const JOURNEY_STEPS = [
  { title: 'Send a request', desc: 'Book online, call or WhatsApp. We reply within 24 hours to confirm a time.' },
  { title: 'Fill in a short form', desc: 'A brief intake form helps your therapist prepare, so you don\'t have to repeat your story from the start.' },
  { title: 'Meet your therapist', desc: 'Talk about what brings you here and what you hope will change, and ask anything about how therapy and confidentiality work.' },
  { title: 'Agree on a plan', desc: 'Together you choose the approach, the goals and how often to meet. You leave knowing what happens next, and why.' }
];

export const GROUNDING_STEPS = [
  'Name five things you can see',
  'Notice four things you can touch',
  'Listen for three sounds',
  'Find two things you can smell',
  'Take one slow, deep breath'
];

export const CHECK_IN_OPTIONS = [
  { value: 1, label: 'Struggling', short: 'Struggling', action: 'crisis' },
  { value: 2, label: 'Low', short: 'Low', action: 'crisis' },
  { value: 3, label: 'Okay', short: 'Okay', action: 'pause' },
  { value: 4, label: 'Good', short: 'Good', action: 'pause' },
  { value: 5, label: 'Well', short: 'Well', action: 'pause' }
];

export const CHECK_IN_RESPONSES = [
  'Thank you for being honest. If you feel unsafe, please contact emergency services or a crisis line now. Speaking with a clinician can help.',
  'It\'s okay to have low days. A short pause or a conversation with someone you trust can help.',
  'Steady is good. A brief pause now can help keep it that way.',
  'Glad to hear it. Notice what is helping and keep it close.',
  'Wonderful. Consider what you\'d like to carry forward from today.'
];