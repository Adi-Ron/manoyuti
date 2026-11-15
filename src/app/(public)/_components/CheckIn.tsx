'use client';

import { useState } from 'react';
import { CHECK_IN_OPTIONS, CHECK_IN_RESPONSES } from '@/lib/utils';

interface CheckInProps {
  options: typeof CHECK_IN_OPTIONS;
  responses: typeof CHECK_IN_RESPONSES;
}

export function CheckIn({ options, responses }: CheckInProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  if (selected === null) {
    return (
      <section id="checkin" className="section">
        <div className="wrap">
          <div className="card rv" style={{ maxWidth: 860, margin: 'auto' }}>
            <span className="eyebrow">Daily check-in</span>
            <h2>How are you <em>today?</em></h2>
            <p className="mut">A private check-in. Nothing is stored or sent.</p>
            <div className="scale" id="scale" role="group" aria-label="How are you today">
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  aria-pressed={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    alignItems: 'center',
                    padding: '18px 8px',
                    borderRadius: 8,
                    border: '1px solid var(--line)',
                    background: 'var(--bg)',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    font: 'inherit',
                    transition: '.3s'
                  }}
                >
                  <b style={{ font: '500 1.6rem Newsreader,serif' }}>{opt.value}</b>
                  <small style={{ color: 'var(--mut)', fontSize: '.78rem' }}>{opt.short}</small>
                </button>
              ))}
            </div>
            <p id="cr" style={{ minHeight: '3.4em', color: 'var(--mut)' }}>Select a number to see a gentle next step.</p>
          </div>
        </div>
      </section>
    );
  }

  const response = responses[selected - 1];
  const actionType = options[selected - 1].action;

  return (
    <section id="checkin" className="section">
      <div className="wrap">
        <div className="card rv" style={{ maxWidth: 860, margin: 'auto' }}>
          <span className="eyebrow">Daily check-in</span>
          <h2>How are you <em>today?</em></h2>
          <p className="mut">A private check-in. Nothing is stored or sent.</p>
          <div className="scale" id="scale" role="group" aria-label="How are you today">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                aria-pressed={opt.value === selected}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  alignItems: 'center',
                  padding: '18px 8px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  background: opt.value === selected ? 'var(--sage)' : 'var(--bg)',
                  color: opt.value === selected ? 'var(--paper)' : 'var(--ink)',
                  cursor: 'pointer',
                  font: 'inherit',
                  transition: '.3s'
                }}
              >
                <b style={{ font: '500 1.6rem Newsreader,serif' }}>{opt.value}</b>
                <small style={{ color: opt.value === selected ? '#dfe8e1' : 'var(--mut)', fontSize: '.78rem' }}>{opt.short}</small>
              </button>
            ))}
          </div>
          <p id="cr" style={{ minHeight: '3.4em', color: 'var(--mut)' }}>{response}</p>
          <div className="row" id="cra" style={{ margin: 0 }}>
            <a className="btn" href="#pause">Take a pause</a>
            <a className="btn" href="#contact">{actionType === 'crisis' ? 'Speak to someone' : 'Book a consultation'}</a>
          </div>
        </div>
      </div>
    </section>
  );
}