'use client';

import { useState } from 'react';
import { FAQItem } from '@/lib/types';

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap two" style={{ alignItems: 'start' }}>
        <div className="rv">
          <span className="eyebrow">Questions</span>
          <h2>Before you <em>begin.</em></h2>
        </div>
        <div className="faq rv" style={{ borderTop: '1px solid var(--line)' }}>
          {items.map((item, i) => (
            <div key={i}>
              <button
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 0,
                  borderBottom: '1px solid var(--line)',
                  padding: '22px 0',
                  font: '400 1.35rem Newsreader,serif',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 20,
                  transition: '.3s'
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--sage)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
              >
                {item.q}
                <span style={{ color: 'var(--bronze)', transition: '.4s', transform: openIndex === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div className={openIndex === i ? 'open' : ''} style={{ display: openIndex === i ? 'block' : 'none', padding: '18px 0 6px', color: 'var(--mut)', maxWidth: '62ch' }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}