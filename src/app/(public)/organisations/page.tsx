import Link from 'next/link';
import { ORG_PROGRAMMES } from '@/lib/utils';

const PAST_TALKS = [
  'Bipolar disorder', 'Schizophrenia', 'PCOS and mental health',
  'Mood and sleep disorders', 'Stress management', 'Coping skills', 'Healthy relationships'
];

export default function OrganisationsPage() {
  return (
    <>
      <section className="pagehead sky" aria-labelledby="org-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>For organisations</span>
            <h1 id="org-h" style={{ '--i': 1 }}>Wellbeing for workplaces and schools</h1>
            <p className="lead" style={{ '--i': 2 }}>Evidence-based programmes that help organisations build safer, healthier and more supportive places to work and learn.</p>
            <div className="acts" style={{ '--i': 3 }}><Link className="btn" href="/contact/?interest=Organisation%20programmes">Talk to us <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
          <dl className="facts"><div><dt>For</dt><dd>Workplaces, schools, colleges</dd></div><div><dt>Format</dt><dd>On site or online</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="progs-h">
        <div className="wrap">
          <div className="head"><span className="label rv">Programmes</span><h2 id="progs-h" className="rv">What we offer organisations</h2><p className="rv">Three new programmes are on the way. Register your interest and we'll tell you as soon as they open.</p></div>
          <div className="cards c3">
            {ORG_PROGRAMMES.map((prog, i) => (
              <article key={prog.id} className={`card t-${['blush','sand','sky'][i]} rv`} style={{ '--i': i }}>
                <span className="soon-tag">Coming soon</span>
                <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  {prog.id === 'posh' && <><path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></>}
                  {prog.id === 'pocso' && <><path d="M22 9 12 5 2 9l10 4 10-4z"/><path d="M6 11v5c3.5 2.5 8.5 2.5 12 0v-5"/><path d="M22 9v5"/></>}
                  {prog.id === 'eap' && <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v1"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M21.5 20v-1a4.5 4.5 0 0 0-3-4.2"/></>}
                </svg></span>
                <h3>{prog.name}</h3>
                <p className="meta">{prog.for}</p>
                <p>{prog.desc}</p>
                <Link className="link" href={`/contact/?interest=Organisation%20programmes&about=${encodeURIComponent(prog.name)}`}>Register interest <span className="arr" aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="workshops-h">
        <div className="wrap">
          <div className="head"><h2 id="workshops-h" className="rv">Workshops and talks</h2><p className="rv">Evidence-based workshops for schools, colleges, workplaces and community groups on mental health awareness, stress, emotional wellbeing and resilience, tailored to the audience, with feedback collected to measure their impact.</p></div>
          <div className="split">
            <div className="rv" style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              <h3>Upcoming events</h3>
              <div className="soon-box"><span className="ic sand"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M16 3v4M8 3v4M4 11h16"/></svg></span><div><p><b>New workshops and talks are coming soon.</b></p><p className="soft">Want to hear when they're announced, or host one for your school, college or team? Get in touch.</p><p><Link className="link" href="/contact/?interest=Events">Tell me about new events <span className="arr" aria-hidden="true">→</span></Link></p></div></div>
            </div>
            <div className="panelbox rv" style={{ '--i': 1 }}>
              <h3>Past talks</h3>
              <p className="soft">Isha has led public awareness workshops on:</p>
              <ul className="chips">{PAST_TALKS.map((t, i) => <li key={i}>{t}</li>)}</ul>
              <p><Link className="btn" href="/contact/?interest=Events">Plan a workshop <span className="arr" aria-hidden="true">→</span></Link></p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="org-close-h">
        <div className="wrap">
          <div className="band rv">
            <div><h2 id="org-close-h">Planning for your team or school?</h2><p>Tell us about your organisation and what you need, and we'll shape a programme around it.</p></div>
            <div className="acts"><Link className="btn light" href="/contact/?interest=Organisation%20programmes">Get in touch <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}