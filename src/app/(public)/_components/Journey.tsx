'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { JourneyStep } from '@/lib/types';

interface JourneyProps {
  steps: readonly JourneyStep[];
}

const HF = [30, 76, 122, 168];

export function Journey({ steps }: JourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  const paintProgress = useCallback((progress: number, current: number) => {
    let activeHeight = 8;
    const mobile = window.innerWidth <= 1020;
    const blocks = isoRef.current?.querySelectorAll<HTMLElement>('.blk');
    blocks?.forEach((block, i) => {
      const local = Math.max(0, Math.min(1, progress * steps.length - i));
      const target = HF[i] ?? HF[HF.length - 1];
      // Start the next mobile platform at the previous step's height so the
      // marker never drops back to ground level at a stage boundary.
      const base = mobile && i > 0 && i <= current ? (HF[i - 1] ?? HF[HF.length - 1]) : 8;
      const height = base + local * (target - base);
      if (i === current) activeHeight = height;
      block.style.setProperty('--h', height.toFixed(1));
      block.classList.toggle('cur', i === current);
    });

    if (pinRef.current) {
      pinRef.current.style.transform = `translate3d(${current * 112 - 224 + 55}px, 0px, ${activeHeight + 4}px) rotateZ(40deg) rotateX(-58deg)`;
      pinRef.current.textContent = String(current + 1);
    }
    if (barRef.current) barRef.current.style.width = `${progress * 100}%`;
    if (current !== activeRef.current) {
      activeRef.current = current;
      setActive(current);
    }
  }, [steps.length]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el || document.body.style.position === 'fixed') return;
      // The sticky panel uses svh on phones, so browser toolbar changes do not
      // change the distance between stages while a swipe is in progress.
      const viewport = stickyRef.current?.clientHeight || window.innerHeight;
      const distance = el.offsetHeight - viewport;
      const progress = distance > 0
        ? Math.max(0, Math.min(1, -el.getBoundingClientRect().top / distance))
        : 0;
      const current = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      paintProgress(reduceMotion ? (current + 1) / steps.length : progress, current);
    };
    const scheduleUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    update();
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion, steps.length, paintProgress]);

  const goStage = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const viewport = stickyRef.current?.clientHeight || window.innerHeight;
    const distance = Math.max(0, el.offsetHeight - viewport);
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top + ((index + 0.5) / steps.length) * distance,
      behavior: reduceMotion ? 'instant' : 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="scene weight"
      data-scene="weight"
      aria-label="The therapeutic journey"
    >
      <div className="jst" ref={stickyRef}>
        <div className="jg">
          <div>
            <span className="eyebrow">The journey</span>
            <div id="jtx" key={active} aria-live="polite">
              <span className="eyebrow" style={{ color: 'var(--sage)' }}>
                Stage {active + 1} of {steps.length}
              </span>
              <h2>{steps[active].title}</h2>
              <p className="mut">{steps[active].desc}</p>
            </div>
            <div className="jtabs">
              {steps.map((step, i) => (
                <button
                  key={step.title}
                  onClick={() => goStage(i)}
                  className={i === active ? 'on' : ''}
                  aria-current={i === active ? 'step' : undefined}
                >
                  {i + 1}. {step.title}
                </button>
              ))}
            </div>
            <div className="jbar"><i ref={barRef} /></div>
            <p className="mut journey-hint" style={{ fontSize: '.85rem', marginTop: '14px' }}>
              Scroll to climb, or select a step.
            </p>
          </div>
          <div className="jscene">
            <div className="iso" ref={isoRef}>
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="blk"
                  style={{ left: `${i * 112 - 224}px`, '--h': 8 }}
                  onClick={() => goStage(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to stage ${i + 1}: ${step.title}`}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goStage(i);
                    }
                  }}
                >
                  <div className="t" />
                  <div className="f" />
                  <div className="r" />
                </div>
              ))}
              <div className="pin" ref={pinRef}>1</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
