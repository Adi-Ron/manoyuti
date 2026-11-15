'use client';

import { useEffect, useState } from 'react';

const PHASES = [
  { name: 'Breathe in', seconds: 4, scale: 1.45 },
  { name: 'Hold', seconds: 4, scale: 1.45 },
  { name: 'Breathe out', seconds: 6, scale: 1 }
];

const ROUNDS = 5;

interface BreathState {
  phase: number;
  secondsLeft: number;
  round: number;
  cycles: number;
  running: boolean;
  done: boolean;
}

function initialState(cycles = 0): BreathState {
  return {
    phase: 0,
    secondsLeft: PHASES[0].seconds,
    round: 1,
    cycles,
    running: false,
    done: false
  };
}

export function Pause() {
  const [state, setState] = useState<BreathState>(() => initialState());
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!state.running) return;

    const id = window.setInterval(() => {
      setState(prev => {
        if (!prev.running) return prev;

        if (prev.secondsLeft > 1) {
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        }

        const nextPhase = prev.phase + 1;
        if (nextPhase < PHASES.length) {
          return { ...prev, phase: nextPhase, secondsLeft: PHASES[nextPhase].seconds };
        }

        if (prev.round >= ROUNDS) {
          return { ...initialState(prev.cycles + 1), done: true };
        }

        return { ...prev, phase: 0, secondsLeft: PHASES[0].seconds, round: prev.round + 1 };
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [state.running]);

  const toggle = () => {
    setState(prev =>
      prev.running ? initialState(prev.cycles) : { ...initialState(prev.cycles), running: true }
    );
  };

  const phase = PHASES[state.phase];
  const scale = !state.running || reduceMotion ? 1 : phase.scale;
  const duration = !state.running ? 1200 : phase.name === 'Hold' ? 0 : phase.seconds * 1000;

  const status = state.running
    ? `${phase.name} · ${state.secondsLeft}s · round ${state.round} of ${ROUNDS}`
    : state.done
      ? 'Well done. Notice how you feel now.'
      : state.cycles > 0
        ? 'Begin again whenever you like.'
        : 'Tap the circle to begin.';

  const buttonLabel = state.running ? 'Stop' : state.done ? 'Again' : 'Begin';

  return (
    <section id="pause" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap two">
        <div className="rv">
          <span className="eyebrow">A moment to settle</span>
          <h2>One minute. <em>No effort.</em></h2>
          <p className="mut">Slow, extended exhalations signal safety to the nervous system. Follow the circle: in for four, hold for four, out for six.</p>
          <p className="mut" style={{ fontSize: '.9rem' }}>
            Cycles completed: <b style={{ color: 'var(--ink)' }}>{state.cycles}</b>
          </p>
        </div>
        <div className="card rv">
          <div id="bw">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="ring"
                style={{
                  transform: `scale(${scale})`,
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${i * 120}ms`
                }}
              />
            ))}
            <button
              id="bc"
              aria-label={state.running ? 'Stop guided breathing' : 'Start guided breathing'}
              onClick={toggle}
              style={{
                transform: `scale(${scale})`,
                transitionDuration: `${duration}ms`
              }}
            >
              {buttonLabel}
            </button>
          </div>
          <p id="bt" aria-live="polite">{status}</p>
        </div>
      </div>
    </section>
  );
}
