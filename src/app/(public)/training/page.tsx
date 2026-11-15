import Link from 'next/link';
import { TRAINING_PROGRAMMES } from '@/lib/utils';

const WHY_CARDS = [
  { icon: 'user', name: 'Learn from a practitioner', desc: 'Taught by a psychologist who has trained more than 20 interns and supervised over 15 research projects.' },
  { icon: 'users', name: 'Small batches', desc: 'So every learner gets personal feedback.', tint: 'blush' },
  { icon: 'globe', name: 'Live online', desc: 'Join from anywhere in India.', tint: 'sky' },
  { icon: 'award', name: 'Certificate', desc: 'A certificate of completion for every programme.', tint: 'sand' },
];

export default function TrainingPage() {
  return (
    <>
      <section className="pagehead blush" aria-labelledby="tr-h">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/training/" style={{ '--i': 0 }}>← All programmes</Link>
            <span className="label rose" style={{ '--i': 0 }}>Resilio Training</span>
            <h1 id="tr-h" style={{ '--i': 1 }}>Learn from practice</h1>
            <p className="lead" style={{ '--i': 2 }}>Programmes that connect classroom theory with real clinical and research practice, taught by a practising psychologist and university faculty member.</p>
            <div className="acts" style={{ '--i': 3 }}><Link className="btn" href="#prog-h">See programmes <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
          <dl className="facts"><div><dt>Interns trained by Isha</dt><dd>20+</dd></div><div><dt>Format</dt><dd>Live online, small batches</dd></div><div><dt>Next batches</dt><dd>Coming soon</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="prog-h">
        <div className="wrap">
          <div className="head"><h2 id="prog-h" className="rv">Programmes</h2><p className="rv">New batches are coming soon. Open any programme to see what you'll learn, and register your interest to hear first when dates open.</p></div>
          <div className="cards c3">
            {TRAINING_PROGRAMMES.map((prog, i) => (
              <article key={prog.id} className={`card t-${['sage','blush','sky','sand','sage'][i]} rv`} style={{ '--i': i }}>
                <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 9 12 5 2 9l10 4 10-4z"/><path d="M6 11v5c3.5 2.5 8.5 2.5 12 0v-5"/><path d="M22 9v5"/></svg></span>
                <h3><Link className="stretch plain" href={`/training/${prog.id}/`}>{prog.name}</Link></h3>
                <p className="meta">{prog.for}</p>
                <p>{prog.desc || 'Practical skills through role-plays, case discussions and supervision.'}</p>
                <Link className="link" href={`/training/${prog.id}/`}>About the programme <span className="arr" aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint-sage" aria-labelledby="why-h">
        <div className="wrap">
          <div className="head center"><h2 id="why-h" className="rv">Why learn with us</h2></div>
          <div className="cards">
            {WHY_CARDS.map((card, i) => (
              <article key={card.name} className="card rv" style={{ '--i': i }}>
                <span className={`ic ${card.tint ? card.tint : ''}`}><svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  {card.icon === 'user' && <><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/></>}
                  {card.icon === 'users' && <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5v1"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M21.5 20v-1a4.5 4.5 0 0 0-3-4.2"/></>}
                  {card.icon === 'globe' && <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></>}
                  {card.icon === 'award' && <path d="M5 12l5 5 9-10"/>}
                </svg></span>
                <h3>{card.name}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="orgs-h">
        <div className="wrap split">
          <h2 id="orgs-h" className="rv" style={{ fontSize: 'var(--t-h3)', maxWidth: '24ch' }}>Training for a whole team or school?</h2>
          <div className="prose rv" style={{ '--i': 1 }}><p>Workshops and talks, POSH and POCSO programmes, and EAP and employee wellness now have their own page.</p><p><Link className="link" href="/organisations/">See programmes for organisations <span className="arr" aria-hidden="true">→</span></Link></p></div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="intern-h">
        <div className="wrap">
          <div className="band rv">
            <div><h2 id="intern-h">Looking for an internship or a role?</h2><p>We take clinical and research interns, associate psychologists, and content and outreach volunteers.</p></div>
            <div className="acts"><Link className="btn light" href="/careers/">See opportunities <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}