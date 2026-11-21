'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQ_DATA } from '@/lib/utils';

interface TherapyService {
  id: string;
  name: string;
  laymanTagline: string;
  forWhom: string;
  whatHappens: string;
  duration: string;
  fee: string;
  tag?: string;
  link: string;
}

const SERVICES_LAYMAN: TherapyService[] = [
  {
    id: 'individual',
    name: 'Individual therapy',
    laymanTagline: 'A private space to talk things through, understand yourself, and find a steadier way forward.',
    forWhom: 'Anxiety, low mood, burnout, difficult experiences, or disrupted sleep.',
    whatHappens: 'Time to talk, understand patterns, and practise tools from approaches such as CBT, ACT, and mindfulness.',
    duration: '50 minutes',
    fee: '₹1,500 per session',
    tag: 'Most Requested',
    link: '/booking/?service=individual'
  },
  {
    id: 'couples',
    name: 'Couples & relationship counselling',
    laymanTagline: 'Time to understand each other, work through tension, and make space for better conversations.',
    forWhom: 'Repeated arguments, emotional distance, life changes, or rebuilding trust.',
    whatHappens: 'We listen to both perspectives and help you explore patterns, needs, and ways to communicate.',
    duration: '60–75 minutes',
    fee: '₹3,000 per session',
    tag: 'Both Partners',
    link: '/booking/?service=couples'
  },
  {
    id: 'fertility',
    name: 'Fertility & family planning care',
    laymanTagline: 'Steady emotional support through fertility treatment, loss, and decisions about family.',
    forWhom: 'Fertility treatment, pregnancy loss, family planning, and the feelings that come with them.',
    whatHappens: 'Space for grief, uncertainty, and relationship changes, alongside your medical care.',
    duration: '60 minutes',
    fee: '₹2,000 per session',
    tag: 'Specialized Care',
    link: '/booking/?service=fertility'
  },
  {
    id: 'assessment',
    name: 'Psychological assessments & reports',
    laymanTagline: 'A clearer understanding of what you’re experiencing, with a written report and recommendations.',
    forWhom: 'Questions about mood, anxiety, attention, personality, or cognitive patterns in adults.',
    whatHappens: 'We use standardised assessment tools to explore your concerns and provide a written report with recommendations.',
    duration: 'Comprehensive evaluation',
    fee: '₹999 (Includes formal report)',
    tag: 'Diagnostic Clarity',
    link: '/booking/?service=assessment'
  }
];

const CONCERN_CATEGORIES = [
  {
    category: 'Mood & Emotional Wellbeing',
    items: [
      'Anxiety & panic attacks',
      'Persistent sadness, emptiness or numbness',
      'Burnout & emotional exhaustion',
      'Anger, irritability & mood swings',
      'Grief, loss & bereavement'
    ]
  },
  {
    category: 'Overthinking & Intrusive Thoughts',
    items: [
      'OCD & unwanted intrusive thoughts',
      'Perfectionism & fear of failure',
      'Difficulty falling or staying asleep',
      'Low self-worth & imposter syndrome',
      'Brain fog & sustained high stress'
    ]
  },
  {
    category: 'Relationships & Social Life',
    items: [
      'Repeated arguments with your partner',
      'Fear of abandonment or fear of intimacy',
      'Setting healthy boundaries with family',
      'Social anxiety & fear of being judged',
      'Coping with breakups or separation'
    ]
  },
  {
    category: 'Life Transitions & Identity',
    items: [
      'Navigating college-to-career transitions',
      'PCOS & women’s hormonal mood shifts',
      'Unresolved childhood experiences & trauma',
      'Health anxiety & medical illness coping',
      'Reconnecting with meaning and purpose'
    ]
  }
];

const HOW_WE_WORK_STEPS = [
  {
    num: '01',
    title: 'Grounded in clinical science',
    desc: 'We draw on evidence-based approaches and explain why a particular tool may help.'
  },
  {
    num: '02',
    title: 'Your experience comes first',
    desc: 'Your background, relationships, strengths, and preferences help shape the way we work together.'
  },
  {
    num: '03',
    title: 'Care for your privacy',
    desc: 'We protect what you share and explain confidentiality, including its limits, before we begin.'
  },
  {
    num: '04',
    title: 'Skills for everyday life',
    desc: 'Together, we practise manageable skills you can use between sessions.'
  }
];

const FIRST_SESSION_GUIDE = [
  {
    num: '01',
    heading: 'Send a consultation request',
    detail: 'Share the support you’re looking for and the times that work for you. We reply within 24 hours to arrange a session.'
  },
  {
    num: '02',
    heading: 'Complete your intake note',
    detail: 'We send a short intake form before we meet, so you can share a little about yourself in your own time.'
  },
  {
    num: '03',
    heading: 'Meet for your first session',
    detail: 'Meet Isha Tiwari online or in person in Bengaluru. There’s time to talk about what brings you in and ask questions.'
  },
  {
    num: '04',
    heading: 'Agree on a sustainable plan',
    detail: 'Together, we discuss your goals and a session frequency that works for your life and budget.'
  }
];

export default function TherapyPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="care-page care-therapy">
      <section className="pagehead care-hero" aria-labelledby="th-h">
        <div className="wrap">
          <div className="txt">
            <span className="care-kicker">Therapy at Manoyuti</span>
            <h1 id="th-h">A little space to feel more like yourself.</h1>
            <p className="lead">Whatever brings you here, you can take it at your own pace. Thoughtful psychological care, online across India and in person in Bengaluru.</p>
            <div className="care-actions"><Link className="clean-btn-primary" href="/booking/">Request a session <span aria-hidden="true">→</span></Link><a className="care-text-link" href="#services-h">Explore our services</a></div>
          </div>
          <aside className="care-hero-note" aria-label="A gentle reminder">
            <span className="care-note-mark" aria-hidden="true">✳</span>
            <p>You don’t need to have the right words. We can start with how things feel today.</p>
            <span className="care-note-caption">Online & in-person · At your pace</span>
          </aside>
        </div>
      </section>

      <section className="care-section" aria-labelledby="services-h">
        <div className="wrap">
          <header className="care-section-head"><span className="care-kicker">Find your starting point</span><h2 id="services-h">Care for what you’re carrying</h2><p>Choose the support that feels closest to what you need. If you’re unsure, we’ll help you find a place to begin.</p></header>
          <div className="care-service-grid">
            {SERVICES_LAYMAN.map(svc => (
              <article key={svc.id} id={svc.id} className={`care-service care-service-${svc.id}`} aria-labelledby={`service-${svc.id}`}>
                <div className="care-service-top"><span className="care-service-duration">{svc.duration}</span><span className="care-service-symbol" aria-hidden="true">{svc.id === 'couples' ? '↔' : svc.id === 'assessment' ? '◌' : svc.id === 'fertility' ? '❧' : '✳'}</span></div>
                <h3 id={`service-${svc.id}`}>{svc.name}</h3><p className="care-service-intro">{svc.laymanTagline}</p>
                <dl className="care-service-details"><div><dt>This may help with</dt><dd>{svc.forWhom}</dd></div><div><dt>In our sessions</dt><dd>{svc.whatHappens}</dd></div></dl>
                <footer className="care-service-footer"><strong>{svc.fee}</strong><Link className="care-text-link" href={svc.link}>Request a session <span aria-hidden="true">→</span><span className="sr-only">: {svc.name}</span></Link></footer>
              </article>
            ))}
          </div>
          <p className="care-footnote">Not sure which to choose? <Link href="/booking/?service=unsure">Start with “I’m not sure yet.”</Link></p>
        </div>
      </section>

      <section className="care-section care-section-tint care-concerns-section" aria-labelledby="concerns-h"><div className="wrap care-split">
        <header className="care-section-head"><span className="care-kicker">There is room for all of it</span><h2 id="concerns-h">You don’t have to carry it alone.</h2><p>You don’t need a diagnosis or a crisis to seek support. Everyday difficulties deserve care, too.</p><Link className="care-text-link" href="/contact/">Ask us a question <span aria-hidden="true">→</span></Link></header>
        <div className="care-concerns">{CONCERN_CATEGORIES.map(cat => <div key={cat.category} className="care-concern"><h3>{cat.category}</h3><ul>{cat.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
      </div></section>

      <section className="care-section" aria-labelledby="ways-h"><div className="wrap"><header className="care-section-head"><span className="care-kicker">A partnership, at your pace</span><h2 id="ways-h">What you can expect from us</h2></header><div className="care-values">{HOW_WE_WORK_STEPS.map(card => <article key={card.num}><h3>{card.title}</h3><p>{card.desc}</p></article>)}</div></div></section>

      <section className="care-section care-section-blue" aria-labelledby="journey-h"><div className="wrap"><header className="care-section-head"><span className="care-kicker">The first step can be small</span><h2 id="journey-h">From reaching out to settling in</h2><p>A clear picture of what happens next, so there’s a little less to wonder about.</p></header><ol className="care-timeline">{FIRST_SESSION_GUIDE.map(step => <li key={step.num}><span className="care-step-number" aria-hidden="true">{step.num}</span><div><h3>{step.heading}</h3><p>{step.detail}</p></div></li>)}</ol></div></section>

      <section className="care-section care-faq-section" aria-labelledby="faq-h"><div className="wrap care-split"><header className="care-section-head"><span className="care-kicker">A few things you may wonder</span><h2 id="faq-h">Before we begin</h2><p>Questions are welcome. If you need to know something else, <Link href="/contact/">get in touch</Link>.</p><aside className="care-crisis"><h3>Need immediate support?</h3><p>Manoyuti is not an emergency service. In a crisis, call <a href="tel:14416">Tele-MANAS on 14416</a> or visit your nearest hospital.</p></aside></header><div className="care-faq">{FAQ_DATA.map((item, i) => <div key={item.q} className="care-faq-item"><h3><button type="button" aria-expanded={activeFaq === i} aria-controls={`care-answer-${i}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}><span>{item.q}</span><span aria-hidden="true">{activeFaq === i ? '−' : '+'}</span></button></h3><div id={`care-answer-${i}`} hidden={activeFaq !== i}><p>{item.a}</p></div></div>)}</div></div></section>
      <section className="care-closing"><div className="wrap"><div><span className="care-kicker">Whenever you feel ready</span><h2>We can take the next step together.</h2><p>Tell us a little about what you need. We’ll reply within 24 hours.</p></div><Link className="clean-btn-primary" href="/booking/">Request a session <span aria-hidden="true">→</span></Link></div></section>
    </div>
  );
}
