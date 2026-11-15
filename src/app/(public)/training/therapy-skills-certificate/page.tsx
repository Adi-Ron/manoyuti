import Link from 'next/link';

const PROGRAMME = {
  id: 'therapy-skills-certificate',
  name: 'Therapy Skills Certificate',
  desc: 'Practical CBT, ACT and SFBT skills through role-plays, case discussions and supervision.',
  for: 'MA students and early-career practitioners',
  format: 'Live online, small batch',
  learn: [
    'Core CBT, ACT and SFBT techniques',
    'Role-plays with feedback',
    'Case discussions',
    'Supervision of your practice'
  ]
};

export default function TherapySkillsPage() {
  return (
    <>
      <section className="pagehead blush" aria-labelledby="pg-h">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/training/" style={{ '--i': 0 }}>← All programmes</Link>
            <h1 id="pg-h" style={{ '--i': 1 }}>{PROGRAMME.name}</h1>
            <p className="lead" style={{ '--i': 2 }}>{PROGRAMME.desc}</p>
            <div className="acts" style={{ '--i': 3 }}><Link className="btn" href={`/contact/?interest=Academy&about=${encodeURIComponent(PROGRAMME.name)}`}>Register interest <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
          <dl className="facts"><div><dt>For</dt><dd>{PROGRAMME.for}</dd></div><div><dt>Format</dt><dd>{PROGRAMME.format}</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="learn-h">
        <div className="wrap split">
          <div className="rv" style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <h2 id="learn-h">What you'll learn</h2>
            <ul className="ticks lead">{PROGRAMME.learn.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="sum-box green rv" style={{ '--i': 1 }}>
            <h2>Next batch: coming soon</h2>
            <dl className="sum">
              <div><dt>Starts</dt><dd>Dates coming soon</dd></div>
              <div><dt>Duration</dt><dd>To be announced</dd></div>
              <div><dt>Fee</dt><dd>To be announced</dd></div>
              <div><dt>Format</dt><dd>Live online</dd></div>
            </dl>
            <p><Link className="btn light" href={`/contact/?interest=Academy&about=${encodeURIComponent(PROGRAMME.name)}`}>Register interest <span className="arr" aria-hidden="true">→</span></Link></p>
            <p className="small">Register your interest and we'll tell you as soon as dates and fees are confirmed.</p>
          </div>
        </div>
      </section>

      <section className="sec tint-sage" aria-labelledby="why-h">
        <div className="wrap">
          <div className="head center"><h2 id="why-h" className="rv">Why learn with us</h2></div>
          <div className="cards">
            <article className="card rv"><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/></svg></span><h3>Learn from a practitioner</h3><p>Taught by a psychologist who has trained more than 20 interns and supervised over 15 research projects.</p></article>
            <article className="card rv" style={{ '--i': 1 }}><span className="ic blush"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v1"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M21.5 20v-1a4.5 4.5 0 0 0-3-4.2"/></svg></span><h3>Small batches</h3><p>So every learner gets personal feedback.</p></article>
            <article className="card rv" style={{ '--i': 2 }}><span className="ic sky"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg></span><h3>Live online</h3><p>Join from anywhere in India.</p></article>
            <article className="card rv" style={{ '--i': 3 }}><span className="ic sand"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span><h3>Certificate</h3><p>A certificate of completion.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}