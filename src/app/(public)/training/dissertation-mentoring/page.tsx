import { ProgrammeDetail } from '../_components/ProgrammeDetail';

const PROGRAMME = {
  id: 'dissertation-mentoring',
  name: 'Dissertation Mentoring',
  desc: 'Rigorous one-to-one mentorship from research question formulation to methodology design, statistical analysis, and final dissertation write-up.',
  for: 'UG, PG and PhD scholars',
  format: 'Live online, 1-on-1 sessions',
  learn: [
    'Formulating airtight research questions and systematic literature syntheses',
    'Selecting quantitative, qualitative, or mixed-methods research designs',
    'Statistical analysis in SPSS, JAMOVI or R, and thematic coding in NVivo',
    'Academic drafting, ethical review board applications, and defense prep'
  ]
};

const CONTENT = {
  "category": "Academic Mentoring",
  "action": "Inquire about mentoring",
  "facts": [
    {
      "label": "Eligible Scholars",
      "value": PROGRAMME.for
    },
    {
      "label": "Mentorship Format",
      "value": PROGRAMME.format
    },
    {
      "label": "Supervisors",
      "value": "PhD Scholars & Faculty"
    }
  ],
  "curriculumLabel": "Scholarly Guidance",
  "curriculumTitle": "What we guide you through",
  "curriculumNote": "Get personal feedback on your draft chapters, questionnaire design, participant sampling, and APA 7th edition formatting from published academic researchers.",
  "registrationLabel": "1-on-1 Slots",
  "registrationTitle": "Mentorship Intake",
  "registrationFacts": [
    {
      "label": "Pacing",
      "value": "Flexible weekly or bi-weekly"
    },
    {
      "label": "Duration",
      "value": "Full thesis or chapter blocks"
    },
    {
      "label": "Tools Covered",
      "value": "SPSS, JAMOVI, R, NVivo"
    },
    {
      "label": "Supervision",
      "value": "1-on-1 Zoom sessions"
    }
  ],
  "registrationAction": "Inquire about mentoring",
  "registrationNote": "Tell us about your dissertation topic and target submission date.",
  "benefits": [
    {
      "title": "Active Researchers",
      "description": "Supervised over 15 dissertations with publications in indexed journals."
    },
    {
      "title": "Methodology Rigour",
      "description": "Avoid common statistical flaws, vague hypotheses, or sampling errors."
    },
    {
      "title": "Line-by-Line Feedback",
      "description": "Detailed margin comments on logic, flow, academic tone, and references."
    },
    {
      "title": "Viva Voce Prep",
      "description": "Mock defense sessions to confidently present your thesis to examiners."
    }
  ],
  "benefitsTitle": "Why scholars choose Manoyuti"
};

export default function DissertationMentoringPage() {
  return <ProgrammeDetail programme={PROGRAMME} content={CONTENT} />;
}
