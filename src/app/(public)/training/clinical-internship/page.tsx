import { ProgrammeDetail } from '../_components/ProgrammeDetail';

const PROGRAMME = {
  id: 'clinical-internship',
  name: 'Clinical Internship Programme',
  desc: 'Case history taking, standardized psychological assessments, session observation, professional report writing, and supervised exposure to evidence-based psychotherapy techniques.',
  for: 'BA and MA psychology students',
  format: 'Live online, small cohort',
  learn: [
    'Structuring and conducting intake clinical case histories',
    'Administering, scoring and interpreting psychometric assessments',
    'Observing live case conceptualizations and ethical report drafting',
    'Supervised exposure to CBT, ACT and mindfulness interventions'
  ]
};

const CONTENT = {
  "category": "Clinical Training",
  "action": "Register interest",
  "facts": [
    {
      "label": "Eligible Cohort",
      "value": PROGRAMME.for
    },
    {
      "label": "Delivery Format",
      "value": PROGRAMME.format
    },
    {
      "label": "Faculty",
      "value": "Isha Tiwari & Supervisors"
    }
  ],
  "curriculumLabel": "Curriculum Core",
  "curriculumTitle": "What you will learn & practice",
  "curriculumNote": "Every module includes supervised breakout practice, actual hospital-grade case vignettes, and line-by-line feedback on your clinical reports.",
  "registrationLabel": "Upcoming Batch",
  "registrationTitle": "Next Cohort Admissions",
  "registrationFacts": [
    {
      "label": "Start Date",
      "value": "Upcoming Cohort (Announced soon)"
    },
    {
      "label": "Duration",
      "value": "4 Weeks Intensive"
    },
    {
      "label": "Batch Size",
      "value": "Max 15 Students"
    },
    {
      "label": "Certification",
      "value": "Verified Clinical Certificate"
    }
  ],
  "registrationAction": "Register your interest",
  "registrationNote": "We will email you the syllabus and exact dates as soon as registrations open.",
  "benefits": [
    {
      "title": "Active Clinicians & Faculty",
      "description": "Taught by university faculty who actively practice and supervise in Bengaluru."
    },
    {
      "title": "Strictly Small Cohorts",
      "description": "Capped sizes ensure that every student gets individual feedback on reports."
    },
    {
      "title": "Interactive Live Online",
      "description": "Join live from any city in India with session recordings and clinical templates."
    },
    {
      "title": "Formal Certification",
      "description": "Verified certificate documenting hours, competencies, and supervised case work."
    }
  ],
  "benefitsTitle": "Why students learn with Manoyuti"
};

export default function ClinicalInternshipPage() {
  return <ProgrammeDetail programme={PROGRAMME} content={CONTENT} />;
}
