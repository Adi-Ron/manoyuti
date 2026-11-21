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
      <section className="care-hero" aria-labelledby="careers-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <span className="care-kicker">Careers at Manoyuti</span>
            <h1 id="careers-title">Grow in a place that values care.</h1>
            <p className="care-lead">For people who believe in thoughtful practice, ethical care and learning from one another. We would love to hear from you.</p>
            <Link className="care-button" href="#opportunities">Explore opportunities <span aria-hidden="true">↓</span></Link>
          </div>
          <dl className="care-facts">
            <div><dt>Opportunities</dt><dd>Internships, associate & volunteer roles</dd></div>
            <div><dt>Ways of working</dt><dd>Part-time & online</dd></div>
            <div><dt>Shared values</dt><dd>Evidence, empathy & ethical practice</dd></div>
          </dl>
        </div>
      </section>

      <section id="opportunities" className="care-section" aria-labelledby="opportunities-title">
        <div className="wrap">
          <div className="care-section-head">
            <span className="care-kicker">Find your place</span>
            <h2 id="opportunities-title">Ways to work with us</h2>
            <p>Explore a role that fits your training, interests and experience.</p>
          </div>
          <div className="care-grid">
            {ROLES.map(role => (
              <article key={role.name} className="care-card">
                <span className="care-kicker">{role.meta}</span>
                <h3>{role.name}</h3>
                <p>{role.desc}</p>
                <div className="care-card-footer"><Link className="care-link" href={`/contact/?interest=Careers&about=${encodeURIComponent(role.name)}`}>Ask about this role <span aria-hidden="true">→</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="growth-title">
        <div className="wrap care-split">
          <div className="care-section-head"><span className="care-kicker">Learning together</span><h2 id="growth-title">Support for the work you want to do.</h2></div>
          <ul className="care-list">{GETS.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="care-section" aria-labelledby="apply-title">
        <div className="wrap care-callout">
          <div><span className="care-kicker">Start a conversation</span><h2 id="apply-title">Tell us a little about yourself.</h2><p>Share the role that interests you and a little about your background. We will reply with the next steps and details for sharing your CV.</p></div>
          <Link className="care-button" href="/contact/?interest=Careers">Get in touch <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
