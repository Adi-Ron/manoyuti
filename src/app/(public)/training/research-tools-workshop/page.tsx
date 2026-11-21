import { ProgrammeDetail } from '../_components/ProgrammeDetail';

const PROGRAMME = {
  id: 'research-tools-workshop',
  name: 'Research Tools Workshop',
  desc: 'Practical survey experimentation in Qualtrics and hands-on psychological data analysis using R, SPSS, and JAMOVI.',
  for: 'Bachelors, Masters students and independent researchers',
  format: 'Live online, hands-on workshop',
  learn: [
    'Building sophisticated survey logic, piping, and randomization in Qualtrics',
    'Data cleaning, reverse scoring, and reliability testing (Cronbach’s alpha)',
    'Running ANOVA, regression, mediation, and moderation models in SPSS/JAMOVI',
    'Foundational data visualization and reproducible script reporting in R'
  ]
};

const CONTENT = {
  "category": "Data Science & Statistics",
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
      "label": "Platforms",
      "value": "Qualtrics, SPSS, JAMOVI & R"
    }
  ],
  "curriculumLabel": "Skills & Applications",
  "curriculumTitle": "What you will build & analyze",
  "curriculumNote": "No prior coding knowledge needed. We start from ground zero and walk you through every test with downloadable practice datasets.",
  "registrationLabel": "Upcoming Workshop",
  "registrationTitle": "Workshop Registration",
  "registrationFacts": [
    {
      "label": "Start Date",
      "value": "Upcoming Cohort (Announced soon)"
    },
    {
      "label": "Format",
      "value": "Live hands-on screen-share"
    },
    {
      "label": "Datasets",
      "value": "Practice data provided"
    },
    {
      "label": "Certificate",
      "value": "Statistical Skills Certificate"
    }
  ],
  "registrationAction": "Register your interest",
  "registrationNote": "We will email you the syllabus and exact dates as soon as registrations open.",
  "benefits": [
    {
      "title": "Practical, Not Math Proofs",
      "description": "Focus on understanding assumptions, clicking the right options, and reading output."
    },
    {
      "title": "Modern Free Tools",
      "description": "Learn JAMOVI and R alongside SPSS so you are not dependent on expensive licenses."
    },
    {
      "title": "APA 7 Table Formatting",
      "description": "Learn to convert raw software outputs into clean, publication-ready APA tables."
    },
    {
      "title": "Re-usable Scripts",
      "description": "Keep complete syntax templates that you can reuse for future research projects."
    }
  ],
  "benefitsTitle": "Why learn statistical tools with us"
};

export default function ResearchToolsPage() {
  return <ProgrammeDetail programme={PROGRAMME} content={CONTENT} />;
}
