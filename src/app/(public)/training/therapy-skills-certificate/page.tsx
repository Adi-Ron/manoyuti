import { ProgrammeDetail } from '../_components/ProgrammeDetail';

const PROGRAMME = {
  id: 'therapy-skills-certificate',
  name: 'Therapy Skills Certificate',
  desc: 'Practical mastery of CBT, ACT, and Solution-Focused Brief Therapy (SFBT) through evidence-based role-plays, real case discussions, and close clinical supervision.',
  for: 'MA students and early-career practitioners',
  format: 'Live online, small batch',
  learn: [
    'Core CBT techniques: thought records, behavioral experiments, and Socratic questioning',
    'ACT processes: defusion, committed action, and values clarification',
    'SFBT: miracle questions, scaling conversations, and exception-finding',
    'Live supervised role-plays with structured peer and faculty feedback'
  ]
};

const CONTENT = {
  "category": "Clinical Skills",
  "action": "Register interest",
  "facts": [
    {
      "label": "Eligible Cohort",
      "value": PROGRAMME.for
    },
    {
      "label": "Format",
      "value": PROGRAMME.format
    },
    {
      "label": "Modalities",
      "value": "CBT · ACT · SFBT"
    }
  ],
  "curriculumLabel": "Curriculum Core",
  "curriculumTitle": "Techniques you will practice",
  "curriculumNote": "Each module alternates between conceptual grounding, demonstration recordings, and supervised live role-play with structured written feedback.",
  "registrationLabel": "Upcoming Cohort",
  "registrationTitle": "Cohort Registration",
  "registrationFacts": [
    {
      "label": "Start Date",
      "value": "Upcoming Cohort (Announced soon)"
    },
    {
      "label": "Duration",
      "value": "6-week intensive programme"
    },
    {
      "label": "Supervision",
      "value": "Weekly 1-on-1 feedback"
    },
    {
      "label": "Certificate",
      "value": "Therapy Skills Certificate"
    }
  ],
  "registrationAction": "Register your interest",
  "registrationNote": "We will email you the syllabus and exact dates as soon as registrations open.",
  "benefits": [
    {
      "title": "Supervision by Active Clinicians",
      "description": "Feedback from psychologists who practice these exact modalities with real clients."
    },
    {
      "title": "Safe Practice Environment",
      "description": "Role-play in a psychologically safe space before you meet real clients."
    },
    {
      "title": "Multiple Modalities",
      "description": "CBT, ACT, and SFBT in one programme—flexibility to match diverse client needs."
    },
    {
      "title": "Ethical & Cultural Grounding",
      "description": "Every technique is taught within RCI ethical guidelines and Indian cultural context."
    }
  ],
  "benefitsTitle": "Why practice therapy skills with us"
};

export default function TherapySkillsPage() {
  return <ProgrammeDetail programme={PROGRAMME} content={CONTENT} />;
}
