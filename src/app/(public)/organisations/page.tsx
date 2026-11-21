'use client';

import Link from 'next/link';

const ORG_SOLUTIONS = [
  {
    id: 'posh',
    title: 'POSH & Internal Committee training',
    tag: 'Statutory Compliance',
    forWhom: 'Corporates, Startups, NGOs & Healthcare Institutions',
    desc: 'End-to-end support for the Prevention of Sexual Harassment (POSH) Act, 2013. We train Internal Committees (IC) on lawful inquiry procedures, conduct workforce sensitization, and ensure documentation audit readiness.',
    deliverables: [
      'Interactive workforce awareness workshops',
      'Specialized IC capacity building & case-handling protocols',
      'Policy auditing, annual report advisory, and compliance certificates'
    ]
  },
  {
    id: 'pocso',
    title: 'POCSO & campus safety',
    tag: 'Campus & Child Safety',
    forWhom: 'Schools, Colleges, Universities & Hostels',
    desc: 'Sensitisation on the Protection of Children from Sexual Offences (POCSO) Act. We equip educators, administrative heads, and student counsellors with legally aligned, child-centric safeguarding protocols.',
    deliverables: [
      'Staff and teacher sensitization on red flags & reporting rules',
      'Drafting institution-wide child protection policies',
      'Safe student reporting channels & crisis escalation guidance'
    ]
  },
  {
    id: 'eap',
    title: 'Employee wellbeing & burnout support',
    tag: 'Workplace Resilience',
    forWhom: 'Organizations seeking sustainable performance',
    desc: 'Confidential psychological support for employees, with individual therapy, group sessions and practical guidance for a more supportive workplace.',
    deliverables: [
      'Confidential individual therapy sessions for team members',
      'Managerial training on mental health first aid & empathy',
      'Quarterly wellbeing climate audits & anonymized impact metrics'
    ]
  }
];

const PAST_WORKSHOP_TOPICS = [
  'Preventing Workplace Burnout in High-Stress Environments',
  'Emotional Intelligence for Team Leaders & Managers',
  'PCOS, Hormonal Health & Workplace Ergonomics for Women',
  'Managing Chronic Anxiety, Sleep Hygiene & Screen Fatigue',
  'Navigating Difficult Conversations & Constructive Feedback',
  'Building Empathetic Campus Cultures & Student Psychological Safety'
];

export default function OrganisationsPage() {
  return (
    <>
      <section className="care-hero" aria-labelledby="organisations-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <span className="care-kicker">Workplaces, schools & campuses</span>
            <h1 id="organisations-title">Support the people who make your organisation.</h1>
            <p className="care-lead">Thoughtful psychological programmes that help teams and learning communities feel safer, better supported and more connected.</p>
            <Link className="care-button" href="#solutions">Explore programmes <span aria-hidden="true">↓</span></Link>
          </div>
          <dl className="care-facts">
            <div><dt>Where we work</dt><dd>On-site in Bengaluru & online</dd></div>
            <div><dt>Our focus</dt><dd>Wellbeing, safety & prevention</dd></div>
            <div><dt>Built around you</dt><dd>Your people, goals & context</dd></div>
          </dl>
        </div>
      </section>

      <section id="solutions" className="care-section" aria-labelledby="solutions-title">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Programmes for your community</span>
            <h2 id="solutions-title">Care that fits your setting</h2>
            <p>We shape each programme around your team, institutional needs and learning goals.</p>
          </div>
          <div className="care-grid care-grid-three">
            {ORG_SOLUTIONS.map(solution => (
              <article key={solution.id} className="care-card">
                <span className="care-kicker">{solution.tag}</span>
                <h3>{solution.title}</h3>
                <span className="care-card-meta">{solution.forWhom}</span>
                <p>{solution.desc}</p>
                <ul className="care-list">{solution.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
                <div className="care-card-footer"><Link className="care-link" href={`/contact/?interest=Organisation%20programmes&about=${encodeURIComponent(solution.title)}`}>Discuss this programme <span aria-hidden="true">→</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="workshops-title">
        <div className="wrap care-split">
          <div className="care-section-head">
            <span className="care-kicker">Workshops & conversations</span>
            <h2 id="workshops-title">Make room for wellbeing.</h2>
            <p>Interactive sessions led by psychologist Isha Tiwari, from 90-minute webinars to half-day workshops and retreats.</p>
          </div>
          <ul className="care-list">{PAST_WORKSHOP_TOPICS.map(topic => <li key={topic}>{topic}</li>)}</ul>
        </div>
      </section>

      <section className="care-section" aria-labelledby="proposal-title">
        <div className="wrap care-callout">
          <div><span className="care-kicker">Let’s plan together</span><h2 id="proposal-title">What would help your community?</h2><p>Share your group size, goals and preferred dates. We will reply within 24 hours to discuss a suitable programme, schedule and pricing.</p></div>
          <Link className="care-button" href="/contact/?interest=Organisation%20programmes">Tell us what you need <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
