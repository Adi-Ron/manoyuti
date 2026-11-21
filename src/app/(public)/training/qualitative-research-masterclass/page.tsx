import { ProgrammeDetail } from '../_components/ProgrammeDetail';

const PROGRAMME = {
  id: 'qualitative-research-masterclass',
  name: 'Qualitative Research Masterclass',
  desc: 'Master qualitative study design, semi-structured interview protocols, focus groups, reflexive thematic analysis, and hands-on coding in NVivo.',
  for: 'Postgraduate students, PhD scholars and researchers',
  format: 'Live online masterclass, small batch',
  learn: [
    'Designing qualitative epistemologies and interview schedules',
    'Conducting ethical, in-depth semi-structured interviews',
    'Reflexive thematic analysis following Braun & Clarke (2019)',
    'Practical node coding, hierarchy building, and queries in NVivo'
  ]
};

const CONTENT = {
  "category": "Research Methodology",
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
      "label": "Software",
      "value": "NVivo & Qualitative Suites"
    }
  ],
  "curriculumLabel": "Curriculum Core",
  "curriculumTitle": "What you will master",
  "curriculumNote": "Includes raw transcript datasets, sample coding codebooks, and step-by-step guidance on writing publishable qualitative results sections.",
  "registrationLabel": "Upcoming Masterclass",
  "registrationTitle": "Cohort Registration",
  "registrationFacts": [
    {
      "label": "Start Date",
      "value": "Upcoming Cohort (Announced soon)"
    },
    {
      "label": "Duration",
      "value": "Weekend Intensive (Live)"
    },
    {
      "label": "Format",
      "value": "Live hands-on screen-share"
    },
    {
      "label": "Certificate",
      "value": "Methodology Certificate"
    }
  ],
  "registrationAction": "Register your interest",
  "registrationNote": "We will email you the syllabus and exact dates as soon as registrations open.",
  "benefits": [
    {
      "title": "Hands-on NVivo Practice",
      "description": "Work with real transcripts, code structures, and theme matrices directly."
    },
    {
      "title": "Reflexive Rigour",
      "description": "Learn how to establish trustworthiness, credibility, and audit trails."
    },
    {
      "title": "Publication-Ready Writing",
      "description": "Turn raw interview quotations into compelling narrative qualitative synthesis."
    },
    {
      "title": "Supervised by Doctoral Faculty",
      "description": "Receive guidance from researchers who actively publish qualitative studies."
    }
  ],
  "benefitsTitle": "Why master qualitative methods with us"
};

export default function QualitativeResearchPage() {
  return <ProgrammeDetail programme={PROGRAMME} content={CONTENT} />;
}
