'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import type { SiteSettings } from '@/lib/site-settings';

const TRUST_ITEMS = [
  { icon: 'lock', text: 'Confidential' },
  { icon: 'globe', text: 'Online across India' },
  { icon: 'map-pin', text: 'In person in Bengaluru' },
  { icon: 'clock', text: 'Reply within 24 hours' }
];

export function Hero({ settings }: { settings: SiteSettings }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sc = scRef.current;
    const stage = stageRef.current;
    if (!sc || !stage) return;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      sc.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 18}deg)`;
    };
    const onScroll = () => {
      stage.style.transform = `translateY(${Math.min(window.scrollY, 800) * -0.06}px)`;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-labelledby="home-h">
      <div className="wrap">
        <div className="hg">
          <div className="txt">
            <span className="eyebrow" style={{ '--i': 0 }}>Psychotherapy · Research · Training</span>
            <h1 id="home-h" style={{ '--i': 1 }}>Evidence,<br /> held with <em>care.</em></h1>
            <p className="lead mut" style={{ '--i': 2 }}>
              {settings.hero_lead}
            </p>
            <div className="acts" style={{ '--i': 3 }}>
              <Link className="btn" href="/booking/">Book a session <span className="arr" aria-hidden="true">→</span></Link>
            </div>
            <p className="trust" style={{ '--i': 4 }}>
              {TRUST_ITEMS.map((item, i) => (
                <span key={i}>
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    {item.icon === 'lock' && <><path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>}
                    {item.icon === 'globe' && <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />}
                    {item.icon === 'map-pin' && <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>}
                    {item.icon === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
                  </svg>
                  {item.text}
                </span>
              ))}
            </p>
          </div>
          <div className="stage" id="stage" ref={stageRef}>
            <div className="sc" id="sc" ref={scRef}>
              <div className="l a1" style={{ '--z': '0px' }} />
              <div className="l a1b" style={{ '--z': '14px' }} />
              <div className="l a2" style={{ '--z': '46px' }} />
              <button
                className="l sun"
                style={{ '--z': '80px' }}
                id="sun"
                aria-label="A moment of calm"
                onClick={() => showToast('Take a slow breath. You’re in the right place.')}
              />
              <div className="l a3" style={{ '--z': '110px' }} />
              <div className="l floor" style={{ '--z': '20px' }} />
              <button
                className="l chip"
                style={{ '--z': '150px' }}
                id="chip"
                onClick={() => {
                  goContact();
                  showToast('Add your details and we’ll confirm that slot.');
                }}
              >
                <small>{settings.availability_label}</small>
                <b>{settings.availability_value}</b>
                <small>{settings.availability_hint}</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
