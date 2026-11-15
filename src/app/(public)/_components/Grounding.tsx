'use client';

import { useState } from 'react';

interface GroundingProps {
  steps: string[];
}

export function Grounding({ steps }: GroundingProps) {
  const [doneCount, setDoneCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleStep = (index: number) => {
    if (doneCount > index) return;
    setDoneCount(index + 1);
    if (index === steps.length - 1) {
      setMessage('You are here, in this moment. Well done.');
    }
  };

  return (
    <section id="ground" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap two">
        <div className="rv">
          <span className="eyebrow">Grounding</span>
          <h2>Return to the <em>present.</em></h2>
          <p className="mut">When thoughts race, the senses can anchor you. Work through each step and tick it off.</p>
        </div>
        <div className="card rv">
          <ul className="g" id="g" style={{ listStyle: 'none', margin: '20px 0 0', padding: 0 }}>
            {steps.map((step, i) => (
              <li key={i}>
                <button
                  onClick={() => handleStep(i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    font: 'inherit',
                    color: doneCount > i ? 'var(--mut)' : 'var(--ink)',
                    background: 'none',
                    border: 0,
                    borderTop: '1px solid var(--line)',
                    padding: '16px 2px',
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '.3s'
                  }}
                  className={doneCount > i ? 'done' : ''}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `1px solid ${doneCount > i ? 'var(--sage)' : 'var(--bronze)'}`,
                      background: doneCount > i ? 'var(--sage)' : 'transparent',
                      boxShadow: doneCount > i ? 'inset 0 0 0 4px var(--paper)' : 'none',
                      transition: '.4s'
                    }}
                  />
                  {step}
                </button>
              </li>
            ))}
          </ul>
          <div className="bar" style={{ height: 3, background: 'var(--line)', marginTop: 8 }}>
            <i style={{ display: 'block', height: '100%', width: `${doneCount * 20}%`, background: 'var(--bronze)', transition: 'width .6s' }} />
          </div>
          <p id="gm" className="mut" style={{ margin: '14px 0 0', minHeight: '1.7em' }}>{message}</p>
        </div>
      </div>
    </section>
  );
}