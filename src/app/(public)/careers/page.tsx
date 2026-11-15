import Link from 'next/link';

const ROLES = [
  { name: 'Clinical interns', meta: 'For BA and MA students', desc: 'For BA and MA psychology students: supervised training in assessments, case work and therapy observation.', icon: 'file-text', tint: 't-sage' },
  { name: 'Research interns', meta: 'For students', desc: 'Help with literature reviews, data analysis and the research behind our blog. Ideal for students interested in qualitative or health psychology.', icon: 'book-open', tint: 't-blush' },
  { name: 'Associate psychologists', meta: 'Part-time, online', desc: 'For qualified psychologists with an MA in Clinical or Counselling Psychology.', icon: 'user', tint: 't-sky' },
  { name: 'Content and outreach', meta: 'Volunteers', desc: 'Help us create research-backed posts, run social media and support events.', icon: 'briefcase', tint: 't-sand' },
];

const GETS = [
  'Close mentorship and regular supervision.',
  'Real exposure to clinical, research and outreach work.',
  'A certificate and recommendation letter on completion (internships).'
];

export default function CareersPage() {
  return (
    <>
      <section className="pagehead sky" aria-labelledby="cr-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Careers</span>
            <h1 id="cr-h" style={{ '--i': 1 }}>Grow with Resilio</h1>
            <p className="lead" style={{ '--i': 2 }}>If you value evidence-based practice, ethical care and lifelong learning, we would love to hear from you.</p>
          </div>
          <dl className="facts"><div><dt>Roles</dt><dd>Interns & associates</dd></div><div><dt>Work</dt><dd>Part-time, online</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="open-h">
        <div className="wrap">
          <div className="head"><h2 id="open-h" className="rv">Open opportunities</h2></div>
          <div className="cards">
            {ROLES.map((role, i) => (
              <article key={role.name} className={`card ${role.tint} rv`} style={{ '--i': i }}>
                <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  {role.icon === 'file-text' && <><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6M9 16h4"/></>}
                  {role.icon === 'book-open' && <><path d="M9 3h6"/><path d="M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></>}
                  {role.icon === 'user' && <><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/></>}
                  {role.icon === 'briefcase' && <><path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h14"/><path d="M8 7h8M8 11h6"/></>}
                </svg></span>
                <h3>{role.name}</h3>
                <p className="meta">{role.meta}</p>
                <p>{role.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="get-h">
        <div className="wrap split">
          <div className="rv" style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <h2 id="get-h">What you will get</h2>
            <ul className="ticks lead">{GETS.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
          <div className="panelbox rv" style={{ '--i': 1 }}>
            <h2 style={{ fontSize: 'var(--t-h3)' }}>How to apply</h2>
            <p>Send your CV and a short note on why you want to join Resilio to <a href="mailto:ishat1706@gmail.com">ishat1706@gmail.com</a>, with the role in the subject line.</p>
            <p><Link className="btn" href="/contact/?interest=Careers">Send us a message <span className="arr" aria-hidden="true">→</span></Link></p>
          </div>
        </div>
      </section>
    </>
  );
}