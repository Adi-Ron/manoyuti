'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MODALITIES = [
  {
    name: 'CBT',
    full: 'Cognitive behavioural therapy',
    desc: 'Practical tools to notice and change unhelpful patterns of thought and behaviour, and to test them against evidence.'
  },
  {
    name: 'DBT',
    full: 'Dialectical behaviour therapy',
    desc: 'Skills for emotion regulation, distress tolerance and steadier relationships, useful when feelings feel overwhelming.'
  },
  {
    name: 'ACT',
    full: 'Acceptance and commitment therapy',
    desc: 'Making room for difficult feelings while taking steps toward the life and values that matter to you.'
  },
  {
    name: 'EMDR',
    full: 'Eye movement desensitisation and reprocessing',
    desc: 'A structured, evidence-informed approach for distressing memories and trauma, delivered at a pace you can tolerate.'
  },
  {
    name: 'SFBT',
    full: 'Solution-focused brief therapy',
    desc: 'Building on what already works and identifying the next small, useful step rather than dwelling on the problem.'
  },
  {
    name: 'REBT',
    full: 'Rational emotive behaviour therapy',
    desc: 'Examining rigid beliefs and replacing them with more flexible, realistic ones that support steadier responses.'
  },
  {
    name: 'Mindfulness',
    full: 'Mindfulness-based approaches',
    desc: 'Attention training and compassion practices that reduce reactivity and help you stay present with what is happening.'
  }
];

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="approach" className="section" aria-labelledby="approach-h">
      <div className="wrap">
        <div className={`head center approach-head ${visible ? 'in' : ''}`}>
          <span className="eyebrow">Our approach</span>
          <h2 id="approach-h">Evidence-based, <em>never one-size-fits-all.</em></h2>
          <p className="mut">
            We draw on therapies with strong research support and choose methods together with you, based on your goals
            and what the evidence suggests.
          </p>
        </div>

        <div className="approach-grid">
          {MODALITIES.map((m, i) => (
            <article
              key={m.name}
              className={`approach-card ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <h3>{m.name}</h3>
              <span className="approach-full">{m.full}</span>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>

        <div className="approach-note-wrap">
          <p className="approach-note">
            <span className="approach-note-lead">Not sure which approach fits? A first session is a conversation, not a commitment.</span>
            <span className="approach-note-actions">
              <Link className="approach-inline-link" href="/booking/">
                <span>Book a session</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <span className="approach-note-sep" aria-hidden="true">or</span>
              <Link className="approach-inline-link" href="/contact/">
                <span>ask us a question</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
