'use client';

import { useEffect, useRef, useState } from 'react';
import { JourneyStep } from '@/lib/types';

interface JourneyProps {
  steps: readonly JourneyStep[];
}

const HF = [30, 76, 122, 168];

export function Journey({ steps }: JourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const distance = r.height - window.innerHeight;
      const p = distance > 0 ? Math.max(0, Math.min(1, -r.top / distance)) : 0;
      const cur = Math.min(steps.length - 1, Math.floor(p * steps.length));

      let activeHeight = 8;
      const blocks = isoRef.current?.querySelectorAll<HTMLElement>('.blk');
      blocks?.forEach((block, i) => {
        const local = Math.max(0, Math.min(1, p * steps.length - i));
        const h = 8 + local * (HF[i] - 8);
        if (i === cur) activeHeight = h;
        block.style.setProperty('--h', h.toFixed(1));
        block.classList.toggle('cur', i === cur);
      });

      if (pinRef.current) {
        pinRef.current.style.transform = `translate3d(${cur * 112 - 224 + 55}px, 0px, ${activeHeight + 4}px) rotateZ(40deg) rotateX(-58deg)`;
        pinRef.current.textContent = String(cur + 1);
      }
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;

      if (cur !== activeRef.current) {
        activeRef.current = cur;
        setActive(cur);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion, steps.length]);

  const goStage = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const distance = r.height - window.innerHeight;
    window.scrollTo({
      top: window.scrollY + r.top + ((i + 0.5) / steps.length) * distance,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="scene weight"
      data-scene="weight"
      aria-label="The therapeutic journey"
      style={{ height: '240vh', background: 'linear-gradient(var(--bg), var(--bg2))', padding: 0 }}
    >
      <div className="jst">
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
            <p className="mut" style={{ fontSize: '.85rem', marginTop: '14px' }}>
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
