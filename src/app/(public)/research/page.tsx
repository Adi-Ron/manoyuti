'use client';

import Link from 'next/link';

const RESEARCH_PILLARS = [
  {
    id: 'womens-health',
    title: 'Women’s health & wellbeing',
    tag: 'Hormones & mental health',
    lead: 'How hormonal conditions and reproductive transitions affect mood, self-image, and the support women need.',
    details: [
      'PCOS, mood, and body image',
      'Perinatal mental health and fertility stress',
      'Coping and support in the Indian context'
    ]
  },
  {
    id: 'health-psychology',
    title: 'Living with long-term illness',
    tag: 'Health psychology',
    lead: 'Understanding the emotional side of illness, from everyday coping to communication and safety in healthcare.',
    details: [
      'Stress, lifestyle, and emotional wellbeing',
      'Communication and psychological safety in healthcare',
      'Mindfulness and coping with chronic pain'
    ]
  },
  {
    id: 'intervention-dev',
    title: 'Developing better support',
    tag: 'Intervention design',
    lead: 'Creating and testing practical psychological support that fits people’s lives, communities, and cultural context.',
    details: [
      'Culturally adapted CBT and ACT for young adults',
      'Brief psychoeducation for schools and colleges',
      'Feasibility, engagement, and therapeutic outcomes'
    ]
  },
  {
    id: 'methods-lab',
    title: 'Understanding lived experience',
    tag: 'Qualitative & mixed methods',
    lead: 'Bringing people’s stories and research data together to understand what matters, and why.',
    details: [
      'Interviews and reflexive thematic analysis',
      'Screening tools and psychometric validation',
      'Survey design and mixed-method analysis'
    ]
  }
];

const MENTORING_TRACKS = [
  {
    title: 'PhD Proposal & Thesis Mentoring',
    audience: 'PhD Applicants & Doctoral Scholars',
    desc: 'One-to-one support to refine your research question, review the literature, and design a thoughtful, ethical study.',
    tag: 'Doctoral Track',
    link: '/contact/?interest=Research%20mentoring'
  },
  {
    title: 'PG & UG Dissertation Guidance',
    audience: 'Masters & Bachelors Students',
    desc: 'Guidance through your dissertation, from ethics and participant recruitment to analysis and writing.',
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

      <section className="care-section care-research-section" aria-labelledby="research-areas">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Areas of inquiry</span>
            <h2 id="research-areas">What we are exploring</h2>
            <p>Questions about everyday life, studied with care. Explore the four areas that guide our work.</p>
          </div>
          <div className="research-area-grid">
            {RESEARCH_PILLARS.map(area => (
              <article key={area.id} className="research-area">
                <span className="research-area-tag">{area.tag}</span>
                <h3>{area.title}</h3>
                <p>{area.lead}</p>
                <details className="research-topics">
                  <summary><span>View focus topics <span className="research-topic-count">{area.details.length}</span></span><span className="research-topics-toggle" aria-hidden="true">+</span></summary>
                  <ul>{area.details.map(point => <li key={point}>{point}</li>)}</ul>
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
