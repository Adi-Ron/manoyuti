'use client';

import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/Toast';

const PROMPTS = [
  'What do you see first? There is no right answer.',
  'Notice what your mind reaches for, and how your body responds.',
  'Some people see faces, others landscapes. Either is fine.',
  'Stay with that first impression for three slow breaths.'
];

type Stage = 'write' | 'consent' | 'done';
type Outcome = 'shared' | 'private' | null;

export function Perception() {
  const inkRef = useRef<HTMLButtonElement>(null);
  const { showToast } = useToast();
  const [seed, setSeed] = useState(4);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [text, setText] = useState('');
  const [stage, setStage] = useState<Stage>('write');
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const tb = document.getElementById('tb') as HTMLElement | null;
    const dm = document.getElementById('dm') as HTMLElement | null;
    if (!tb || !dm) return;

    const handleScroll = () => {
      const pr = document.getElementById('perception');
      if (!pr) return;
      const r = pr.getBoundingClientRect();
      const q = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      dm.setAttribute('scale', Math.round(40 + q * 150).toString());
      tb.setAttribute('baseFrequency', `${(0.008 + q * 0.01).toFixed(4)} ${(0.012 + q * 0.012).toFixed(4)}`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const morph = () => {
    const nextSeed = Math.floor(Math.random() * 90) + 1;
    setSeed(nextSeed);
    setPrompt(PROMPTS[nextSeed % PROMPTS.length]);
    setText('');
    setStage('write');
    setOutcome(null);
    if (inkRef.current) {
      inkRef.current.style.transform = 'scale(.94)';
      window.setTimeout(() => {
        if (inkRef.current) inkRef.current.style.transform = 'scale(1)';
      }, 170);
    }
  };

  const askConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      showToast('Write a few words about what you see first.');
      return;
    }
    setStage('consent');
  };

  const share = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/perception', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response_text: text.trim(),
          image_seed: seed,
          consent: true
        })
      });
      if (!res.ok) throw new Error('Request failed');
      setStage('done');
      setOutcome('shared');
      showToast('Thank you for sharing your response.');
    } catch {
      showToast('We could not save your response. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const keepPrivate = () => {
    setStage('done');
    setOutcome('private');
  };

  const reset = () => {
    setText('');
    setStage('write');
    setOutcome(null);
  };

  return (
    <section id="perception" className="section">
      <div className="wrap">
        <div className="perception-head">
          <span className="eyebrow">Perception</span>
          <h2>What does your mind <em>reach for?</em></h2>
          <p className="mut">
            An ambiguous shape, a first impression. Tap the inkblot for another, then write what you see.
            There is no right answer.
          </p>
        </div>

        <div className="perception-grid">
          <div className="perception-visual">
            <button
              ref={inkRef}
              className="ink"
              id="inkw"
              aria-label="Show a new inkblot"
              onClick={morph}
            >
              <svg viewBox="0 0 800 520" role="img" aria-label="Symmetrical abstract inkblot">
                <defs>
                  <filter id="ik" x="-25%" y="-25%" width="150%" height="150%">
                    <feTurbulence id="tb" type="fractalNoise" baseFrequency={`.008 .012`} numOctaves="3" seed={seed} result="n" />
                    <feDisplacementMap id="dm" in="SourceGraphic" in2="n" scale="40" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#46594c" />
                    <stop offset="1" stopColor="#2b2520" />
                  </linearGradient>
                </defs>
                <g id="half" filter="url(#ik)" fill="url(#ig)">
                  <ellipse cx="300" cy="260" rx="120" ry="170" />
                  <circle cx="220" cy="140" r="70" />
                  <circle cx="330" cy="410" r="60" />
                  <ellipse cx="385" cy="250" rx="30" ry="120" />
                </g>
                <use href="#half" transform="translate(800 0) scale(-1 1)" />
              </svg>
            </button>
            <p id="pr" className="perception-prompt">{prompt}</p>
            <button className="btn line perception-shuffle" type="button" onClick={morph}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Show another shape</span>
            </button>
          </div>

          <div className="perception-panel">
            {stage === 'write' && (
              <form onSubmit={askConsent} className="perception-form">
                <div className="perception-form-head">
                  <span className="label">Your response</span>
                  <h3>What do you see?</h3>
                </div>
                <div className="perception-field">
                  <label htmlFor="p-response">In your own words</label>
                  <textarea
                    id="p-response"
                    name="response"
                    value={text}
                    maxLength={1200}
                    onChange={e => setText(e.target.value)}
                    placeholder="A face, a landscape, a feeling… there is no right answer."
                    rows={5}
                  />
                </div>
                <div className="perception-actions">
                  <button className="btn perception-submit-btn" type="submit" disabled={text.trim().length < 3}>
                    <span>Continue</span>
                    <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <div className="perception-count" aria-live="polite">
                    <span className="count-curr">{text.length}</span>
                    <span className="count-max"> / 1200</span>
                  </div>
                </div>
              </form>
            )}

            {stage === 'consent' && (
              <div className="perception-form">
                <div className="perception-form-head">
                  <span className="label">One last thing</span>
                  <h3>Would you like to share this with us?</h3>
                </div>
                <p className="perception-copy">
                  Your response is completely anonymous and stored securely. We study these reflections only to understand how
                  people experience ambiguous imagery — never for diagnosis.
                </p>
                <blockquote className="perception-quote">“{text.trim()}”</blockquote>
                <div className="perception-actions">
                  <button className="btn" type="button" onClick={share} disabled={saving}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{saving ? 'Saving…' : 'Yes, share anonymously'}</span>
                  </button>
                  <button className="btn line" type="button" onClick={keepPrivate} disabled={saving}>
                    Keep private
                  </button>
                </div>
                <button className="perception-edit" type="button" onClick={() => setStage('write')}>
                  ← Edit my response
                </button>
              </div>
            )}

            {stage === 'done' && (
              <div className="perception-form" aria-live="polite">
                <div className="perception-form-head">
                  <span className="label">{outcome === 'shared' ? 'Thank you' : 'Private'}</span>
                  <h3>{outcome === 'shared' ? 'Your reflection was saved.' : 'Kept entirely private.'}</h3>
                </div>
                <p className="perception-copy">
                  {outcome === 'shared'
                    ? 'Stored securely and anonymously, with no identity attached. We deeply appreciate this glimpse into how your mind perceives.'
                    : 'Nothing was stored or transmitted. Your words stayed solely with you.'}
                </p>
                <div className="perception-actions">
                  <button className="btn" type="button" onClick={reset}>
                    Try another reflection
                  </button>
                  <button className="btn line" type="button" onClick={morph}>
                    Show new shape
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="perception-source">
          Inspired by Hermann Rorschach&apos;s 1921 <em>Psychodiagnostik</em> — originally a perceptual-diagnostic
          experiment that asked, &ldquo;What might this be?&rdquo; This is a reflective exercise, not the Rorschach
          test, and nothing here is scored or diagnostic.{' '}
          <a href="https://www.britannica.com/biography/Hermann-Rorschach" target="_blank" rel="noopener noreferrer">
            Read about Hermann Rorschach
          </a>
          .
        </p>
      </div>
    </section>
  );
}
