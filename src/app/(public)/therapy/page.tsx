import Link from 'next/link';
import { SERVICES, CONCERNS, APPROACHES, JOURNEY_STEPS, FAQ_DATA } from '@/lib/utils';

const THERAPY_CARDS = [
  { id: 'individual', name: 'Individual therapy', meta: ['50 minutes', '₹1,500'], desc: 'One-to-one sessions for adults and young adults, for anxiety and panic, depression and low mood, trauma, OCD, stress and burnout, grief, self-esteem, sleep difficulties and addiction.', link: '/booking/?service=individual', linkText: 'Book individual therapy', icon: 'user', tint: 't-sage' },
  { id: 'couples', name: 'Couples therapy', meta: ['60–75 minutes', '₹3,000'], desc: 'A neutral, supportive space for partners to understand each other again: communication breakdown, recurring conflict, trust after betrayal, life transitions and emotional distance.', link: '/booking/?service=couples', linkText: 'Book couples therapy', icon: 'users', tint: 't-blush' },
  { id: 'assessment', name: 'Psychological assessments', meta: ['Written report', '₹999'], desc: 'Standardised assessments of mood, anxiety and other areas using validated tools, with a written report and recommendations you can share with your care team.', link: '/booking/?service=assessment', linkText: 'Book an assessment', icon: 'file-text', tint: 't-sky' },
  { id: 'fertility', name: 'Fertility counselling', meta: ['60 minutes', '₹2,000'], desc: 'Emotional support for individuals and couples facing fertility concerns, IVF and other treatments, pregnancy loss, or difficult decisions about building a family, alongside your medical care.', link: '/booking/?service=fertility', linkText: 'Book fertility counselling', icon: 'heart', tint: 't-sand' },
  { id: 'group', name: 'Group therapy and support circles', meta: ['Small groups', 'Fee on request'], desc: 'Small, facilitated groups on stress management, coping skills and building healthy relationships, with support from people who understand what you are going through.', link: '/contact/?interest=Therapy&about=Group%20therapy', linkText: 'Ask about groups', icon: 'users', tint: 't-sage' },
  { id: 'workshops', name: 'Workshops for organisations', meta: ['Tailored', 'Fee on request'], desc: 'Evidence-based workshops for schools, colleges and workplaces on mental health awareness, stress, emotional wellbeing and resilience, with feedback collected to measure impact.', link: '/organisations/', linkText: 'Programmes for organisations', icon: 'briefcase', tint: 't-blush' },
];

const HOW_CARDS = [
  { icon: 'shield', name: 'Evidence first', desc: 'CBT, DBT, ACT, EMDR, SFBT, REBT and mindfulness-based therapies, matched to what you need.' },
  { icon: 'heart', name: 'You, not a template', desc: 'Every plan is shaped around your needs, your goals and your pace.', tint: 'blush' },
  { icon: 'globe', name: 'Online across India', desc: 'Secure video sessions wherever you are, at times that fit around work and family.', tint: 'sky' },
  { icon: 'map-pin', name: 'In person in Bengaluru', desc: 'A calm, private room for those who prefer to meet face to face.', tint: 'sand' },
];

export default function TherapyPage() {
  return (
    <>
      <section className="pagehead" aria-labelledby="th-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Therapy and counselling</span>
            <h1 id="th-h" style={{ '--i': 1 }}>Support that fits your life</h1>
            <p className="lead" style={{ '--i': 2 }}>Whether you are facing a difficult season or want to understand yourself better, we offer care in a form that suits you, online and in person in Bengaluru.</p>
            <div className="acts" style={{ '--i': 3 }}>
              <Link className="btn" href="/booking/">Book a session <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn line" href="https://wa.me/919936724392" target="_blank" rel="noopener noreferrer">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21l1.7-4A8.5 8.5 0 1 1 8 19.8z" /><path d="M9 10h.01M12.5 10h.01M16 10h.01" />
                </svg> WhatsApp us
              </Link>
            </div>
          </div>
          <dl className="facts">
            <div><dt>Individual therapy</dt><dd>50 min · ₹1,500</dd></div>
            <div><dt>Couples therapy</dt><dd>60–75 min · ₹3,000</dd></div>
            <div><dt>Assessment with report</dt><dd>₹999</dd></div>
          </dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="services-h">
        <div className="wrap">
          <div className="head"><h2 id="services-h" className="rv">Services and fees</h2><p className="rv">All sessions are confidential, within ethical and legal limits, and available online across India.</p></div>
          <div className="cards c3">
            {THERAPY_CARDS.map((card, i) => (
              <article key={card.id} className={`card ${card.tint} rv`} style={{ '--i': i }}>
                <span className="ic">
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon === 'user' && <><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" /></>}
                    {card.icon === 'users' && <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z" />}
                    {card.icon === 'file-text' && <><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><path d="M9 12h6M9 16h4" /></>}
                    {card.icon === 'heart' && <><path d="M12 21v-9" /><path d="M12 12c0-3.5 2.5-6 7-6 0 4-3 6-7 6z" /><path d="M12 14.5c-4 0-7-2-7-5.5 4 0 7 1.5 7 5.5z" /></>}
                    {card.icon === 'briefcase' && <><path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>}
                  </svg>
                </span>
                <h3>{card.name}</h3>
                <p className="meta"><b>{card.meta[0]}</b><b>{card.meta[1]}</b></p>
                <p>{card.desc}</p>
                <Link className="link" href={card.link}>{card.linkText} <span className="arr" aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="concerns-h">
        <div className="wrap grid2">
          <div className="head rv" style={{ margin: 0 }}>
            <h2 id="concerns-h">Concerns we help with</h2>
            <p>If what you're facing isn't listed, get in touch anyway, and we'll talk through whether Resilio is the right fit for you.</p>
          </div>
          <ul className="chips rv" style={{ '--i': 1 }}>
            {CONCERNS.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="ways-h">
        <div className="wrap">
          <div className="head"><h2 id="ways-h" className="rv">How we work</h2><p className="rv">Therapies with strong research behind them, chosen for you rather than from a template.</p></div>
          <div className="cards">
            {HOW_CARDS.map((card, i) => (
              <article key={card.name} className={`card rv`} style={{ '--i': i }}>
                <span className="ic {card.tint ? card.tint : ''}">
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon === 'shield' && <><path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>}
                    {card.icon === 'heart' && <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z" />}
                    {card.icon === 'globe' && <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></>}
                    {card.icon === 'map-pin' && <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>}
                  </svg>
                </span>
                <h3>{card.name}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint-sage" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="head center"><h2 id="journey-h" className="rv">Your first session, step by step</h2><p className="rv">You'll always know what happens next.</p></div>
          <ol className="journey">
            {JOURNEY_STEPS.map((step, i) => (
              <li key={i} className="rv" style={{ '--i': i }}>
                <span className="n">Step {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" aria-labelledby="faq-h">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div className="head rv" style={{ margin: 0 }}>
            <h2 id="faq-h">Questions people ask</h2>
            <p>Can't find your answer? <Link className="link" href="/contact/">Send us a message</Link>.</p>
            <div className="crisis" style={{ marginTop: 12 }}>
              <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/></svg></span>
              <div><h3>Need help right now?</h3><p>Resilio is not an emergency service. In crisis, call Tele-MANAS on <a href="tel:14416">14416</a> (free, 24/7) or go to your nearest hospital.</p></div>
            </div>
          </div>
          <div className="acc rv" style={{ '--i': 1 }}>
            {FAQ_DATA.map((item, i) => (
              <details key={i}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="close-h">
        <div className="wrap">
          <div className="band rv">
            <div><h2 id="close-h">Ready when you are</h2><p>Choose a service, tell us when suits you, and we'll reply within 24 hours to confirm.</p></div>
            <div className="acts">
              <Link className="btn light" href="/booking/">Book a session <span className="arr" aria-hidden="true">→</span></Link>
              <Link className="btn line" href="tel:+919936724392"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg> Call us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}