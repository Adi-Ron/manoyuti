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

  const paintProgress = (progress: number, current: number) => {
    let activeHeight = 8;
    const blocks = isoRef.current?.querySelectorAll<HTMLElement>('.blk');
    blocks?.forEach((block, i) => {
      const local = Math.max(0, Math.min(1, progress * steps.length - i));
      const height = 8 + local * ((HF[i] ?? HF[HF.length - 1]) - 8);
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
  };

  useEffect(() => {
    let raf = 0;
    let wheelLockedUntil = 0;
    let touchStartY = 0;
    let touchHandled = false;
    let finalStageHeld = false;

    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const distance = r.height - window.innerHeight;
      const mobile = window.innerWidth <= 860;
      const p = mobile
        ? (activeRef.current + 0.5) / steps.length
        : distance > 0 ? Math.max(0, Math.min(1, -r.top / distance)) : 0;
      const cur = mobile
        ? activeRef.current
        : Math.min(steps.length - 1, Math.floor(p * steps.length));
      paintProgress(p, cur);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const scrollToStage = (index: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const distance = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top + ((index + 0.5) / steps.length) * distance,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    };

    const getCurrentStage = () => {
      const el = sectionRef.current;
      if (!el) return 0;
      if (window.innerWidth <= 860) return activeRef.current;
      const top = window.scrollY + el.getBoundingClientRect().top;
      const distance = el.offsetHeight - window.innerHeight;
      const progress = distance > 0 ? Math.max(0, Math.min(1, (window.scrollY - top) / distance)) : 0;
      return Math.min(steps.length - 1, Math.floor(progress * steps.length));
    };

    const getJourneyRect = () => {
      return sectionRef.current?.getBoundingClientRect();
    };

    const isInJourney = () => {
      const rect = getJourneyRect();
      return Boolean(rect && rect.top < window.innerHeight && rect.bottom > 0);
    };

    const isApproachingJourney = (direction: number) => {
      const rect = getJourneyRect();
      if (!rect || isInJourney()) return false;
      const range = window.innerHeight * 2;
      return direction > 0
        ? rect.top >= 0 && rect.top <= range
        : rect.bottom <= window.innerHeight && rect.bottom >= -range;
    };

    const advance = (direction: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const stage = getCurrentStage();

      if (direction > 0 && stage < steps.length - 1) {
        finalStageHeld = false;
        if (window.innerWidth <= 860) {
          paintProgress((stage + 1.5) / steps.length, stage + 1);
        } else {
          scrollToStage(stage + 1);
        }
      } else if (direction > 0 && !finalStageHeld) {
        finalStageHeld = true;
        if (window.innerWidth > 860) {
          const top = window.scrollY + el.getBoundingClientRect().top;
          const distance = el.offsetHeight - window.innerHeight;
          window.scrollTo({
            top: top + distance * 0.99,
            behavior: reduceMotion ? 'auto' : 'smooth'
          });
        }
      } else if (direction < 0 && stage > 0) {
        finalStageHeld = false;
        if (window.innerWidth <= 860) {
          paintProgress((stage - 0.5) / steps.length, stage - 1);
        } else {
          scrollToStage(stage - 1);
        }
      } else {
        const top = window.scrollY + el.getBoundingClientRect().top;
        const target = direction > 0
          ? top + el.offsetHeight
          : Math.max(0, top - window.innerHeight);
        window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth > 860 || document.body.style.position === 'fixed') return;
      if (!event.deltaY) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      if (!isInJourney() && !isApproachingJourney(direction)) return;
      event.preventDefault();

      const now = performance.now();
      if (now < wheelLockedUntil) return;
      wheelLockedUntil = now + 650;
      if (!isInJourney()) {
        const rect = getJourneyRect();
        if (rect) window.scrollTo({ top: window.scrollY + rect.top, behavior: 'auto' });
        return;
      }
      advance(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (window.innerWidth > 860 || document.body.style.position === 'fixed') return;
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchHandled = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (window.innerWidth > 860 || document.body.style.position === 'fixed') return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined || Math.abs(currentY - touchStartY) < 40) return;
      const direction = touchStartY - currentY > 0 ? 1 : -1;
      const inJourney = isInJourney();
      const approaching = isApproachingJourney(direction);
      if (!inJourney && !approaching) return;
      event.preventDefault();
      if (touchHandled) return;
      touchHandled = true;
      if (!inJourney) {
        const rect = getJourneyRect();
        if (rect) window.scrollTo({ top: window.scrollY + rect.top, behavior: 'auto' });
        return;
      }
      advance(direction);
    };

    const onTouchEnd = () => {
      touchHandled = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion, steps.length]);

  const goStage = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.innerWidth <= 860) {
      paintProgress((i + 0.5) / steps.length, i);
      return;
    }
    const r = el.getBoundingClientRect();
    const distance = r.height - window.innerHeight;
    window.scrollTo({
      top: window.scrollY + r.top + ((i + 0.5) / steps.length) * distance,
      behavior: reduceMotion ? 'auto' : 'smooth'
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
