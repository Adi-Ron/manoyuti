'use client';

import Link from 'next/link';

const RESEARCH_PILLARS = [
  {
    id: 'womens-health',
    num: '01',
    title: "Women's Health & Hormonal Wellbeing",
    tag: 'Primary Focus',
    lead: 'Investigating how conditions like PCOS, endometriosis, and reproductive transitions shape mood, anxiety, and self-image.',
    details: [
      'Emotional and psychiatric manifestations of Polycystic Ovary Syndrome (PCOS)',
      'Perinatal mental health, postpartum mood shifts, and fertility stress',
      'Body image distress and psychosocial coping strategies among Indian women'
    ]
  },
  {
    id: 'health-psychology',
    num: '02',
    title: 'Health Psychology & Chronic Illness',
    tag: 'Mind-Body Care',
    lead: 'Examining psychological adaptation to medical conditions, treatment adherence, and holistic mind-body recovery.',
    details: [
      'Stress vulnerability, autonomic regulation, and lifestyle intervention design',
      'Doctor-patient communication and psychological safety in clinical settings',
      'Mindfulness and cognitive resilience in long-term chronic pain management'
    ]
  },
  {
    id: 'intervention-dev',
    num: '03',
    title: 'Intervention Development & Feasibility',
    tag: 'Translational Science',
    lead: 'Developing, piloting, and standardizing accessible psychosocial interventions adapted to the Indian cultural context.',
    details: [
      'Culturally adapted CBT and ACT modules for Indian young adults',
      'Brief, high-impact psychoeducational programmes for educational institutions',
      'Measuring clinical feasibility, client retention, and therapeutic outcome metrics'
    ]
  },
  {
    id: 'methods-lab',
    num: '04',
    title: 'Qualitative Methodology & Mixed Methods',
    tag: 'Scientific Rigour',
    lead: 'Giving depth to scientific inquiry through advanced thematic analysis, semi-structured interviews, and mixed-method synthesis.',
    details: [
      'Rigorous thematic coding protocols in NVivo and reflexive qualitative inquiry',
      'Psychometric validation of standardized screening instruments in India',
      'Survey experiment designs using Qualtrics, R, JAMOVI, and SPSS'
    ]
  }
];

const MENTORING_TRACKS = [
  {
    title: 'PhD Proposal & Thesis Mentoring',
    audience: 'PhD Applicants & Doctoral Scholars',
    desc: 'One-to-one scholarly mentorship to formulate airtight research questions, conduct comprehensive literature syntheses, identify genuine research gaps, and design ethically sound methodologies.',
    tag: 'Doctoral Track',
    link: '/contact/?interest=Research%20mentoring'
  },
  {
    title: 'PG & UG Dissertation Guidance',
    audience: 'Masters & Bachelors Students',
    desc: 'Step-by-step guidance through your academic dissertation—from ethical board submissions and participant recruitment to statistical analysis, thematic coding, and thesis write-up.',
    tag: 'Dissertation Track',
    link: '/training/dissertation-mentoring/'
  }
];

export default function ResearchPage() {
  return (
    <>
      <section className="care-hero" aria-labelledby="research-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <span className="care-kicker">Research & academic development</span>
            <h1 id="research-title">Better questions. More human care.</h1>
            <p className="care-lead">We bring psychological science, clinical practice and lived experience together to make care more accessible and meaningful.</p>
            <Link className="care-button" href="/contact/?interest=Research%20collaboration">Explore a collaboration <span aria-hidden="true">→</span></Link>
          </div>
          <dl className="care-facts">
            <div><dt>Experience</dt><dd>15+ supervised studies</dd></div>
            <div><dt>Approach</dt><dd>Qualitative & mixed methods</dd></div>
            <div><dt>Led by</dt><dd>Isha & Ira Tiwari</dd></div>
          </dl>
        </div>
      </section>

      <section className="care-section" aria-labelledby="research-approach">
        <div className="wrap care-split">
          <div className="care-section-head">
            <span className="care-kicker">Our approach</span>
            <h2 id="research-approach">Research and therapy inform each other.</h2>
          </div>
          <div className="care-prose">
            <p>The questions people bring to therapy help us understand what needs further study. Research, in turn, helps us refine the tools we offer in practice.</p>
            <p>Our focus is evidence that works in everyday life, with particular attention to women’s health, the Indian cultural context and people living with long-term health conditions.</p>
          </div>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="research-areas">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Areas of inquiry</span>
            <h2 id="research-areas">What we are exploring</h2>
            <p>Four connected areas guide our research and intervention development.</p>
          </div>
          <div className="care-grid">
            {RESEARCH_PILLARS.map(area => (
              <article key={area.id} className="care-card">
                <span className="care-kicker">{area.tag}</span>
                <h3>{area.title}</h3>
                <p>{area.lead}</p>
                <details className="care-details">
                  <summary>Explore research topics</summary>
                  <ul className="care-list">{area.details.map(point => <li key={point}>{point}</li>)}</ul>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section" aria-labelledby="mentoring-title">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Academic mentorship</span>
            <h2 id="mentoring-title">Support for your next research step</h2>
            <p>One-to-one guidance for students and scholars, from a first proposal to the final write-up.</p>
          </div>
          <div className="care-grid">
            {MENTORING_TRACKS.map(track => (
              <article key={track.title} className="care-card">
                <span className="care-kicker">{track.audience}</span>
                <h3>{track.title}</h3>
                <p>{track.desc}</p>
                <div className="care-card-footer"><Link href={track.link} className="care-link">Ask about mentoring <span aria-hidden="true">→</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="collaboration-title">
        <div className="wrap care-callout">
          <div><span className="care-kicker">Work with us</span><h2 id="collaboration-title">A shared question is a good place to start.</h2><p>We welcome conversations with universities, healthcare institutions and research teams about psychological studies and clinical research.</p></div>
          <Link className="care-button" href="/contact/?interest=Research%20collaboration">Start a conversation <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
