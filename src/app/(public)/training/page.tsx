'use client';

import Link from 'next/link';
import { TRAINING_PROGRAMMES } from '@/lib/utils';

const WHY_TRAINING_POINTS = [
  {
    num: '01',
    title: 'Learn from active practitioners',
    desc: 'Led by practising psychologists and university faculty members who have trained 20+ clinical interns and supervised 15+ academic research projects.'
  },
  {
    num: '02',
    title: 'Small groups, personal feedback',
    desc: 'Strictly capped batch sizes ensure every student receives personalized feedback on case formulations, mock intakes, and ethical documentation.'
  },
  {
    num: '03',
    title: 'Join from wherever you are',
    desc: 'Interactive live video workshops with real-time case discussions, downloadable clinical templates, and hands-on role-plays.'
  },
  {
    num: '04',
    title: 'Document your learning',
    desc: 'Completion certificates record curriculum hours, practical learning and supervised case discussions.'
  }
];

export default function TrainingPage() {
  return (
    <>
      <section className="care-hero" aria-labelledby="training-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <span className="care-kicker">Clinical & academic training</span>
            <h1 id="training-title">Learn with guidance. Grow with practice.</h1>
            <p className="care-lead">Small-group psychology training that connects classroom learning with clinical skills, thoughtful research and ethical practice.</p>
            <Link className="care-button" href="#programmes">Find your programme <span aria-hidden="true">↓</span></Link>
          </div>
          <dl className="care-facts">
            <div><dt>Learning together</dt><dd>Small, supportive cohorts</dd></div>
            <div><dt>Format</dt><dd>Live online across India</dd></div>
            <div><dt>Guidance</dt><dd>Practising psychologists & faculty</dd></div>
          </dl>
        </div>
      </section>

      <section id="programmes" className="care-section" aria-labelledby="programmes-title">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Find your next step</span>
            <h2 id="programmes-title">Programmes for curious minds</h2>
            <p>Explore internships, practical workshops and research mentoring for students and early-career practitioners.</p>
          </div>
          <div className="care-grid">
            {TRAINING_PROGRAMMES.map(prog => (
              <article key={prog.id} className="care-card">
                <span className="care-kicker">{prog.for}</span>
                <h3><Link href={`/training/${prog.id}/`}>{prog.name}</Link></h3>
                <p>{prog.desc || 'Build clinical skills through case discussions, role-plays and supervised practice.'}</p>
                <div className="care-card-footer">
                  <span className="care-card-meta">Live online · Certificate included</span>
                  <Link href={`/training/${prog.id}/`} className="care-link">View programme <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="learning-title">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">The learning experience</span>
            <h2 id="learning-title">Space to ask, practise and reflect</h2>
            <p>Supportive faculty, real case discussions and personal feedback help you build confidence at your own stage of learning.</p>
          </div>
          <div className="care-grid">
            {WHY_TRAINING_POINTS.map(point => (
              <article key={point.num} className="care-card care-card-quiet"><h3>{point.title}</h3><p>{point.desc}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section" aria-labelledby="cohort-title">
        <div className="wrap care-callout">
          <div><span className="care-kicker">Upcoming cohorts</span><h2 id="cohort-title">Not sure where to begin?</h2><p>Tell us what you would like to learn. We can help you explore the right programme and share upcoming dates.</p></div>
          <Link className="care-button" href="/contact/?interest=Academy">Ask about training <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
