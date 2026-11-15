'use client';

import { useState } from 'react';
import { Service, TrainingProgramme, OrgProgramme, ResearchArea } from '@/lib/types';

interface ServicesProps {
  therapy: readonly Service[];
  training: readonly TrainingProgramme[];
  org: readonly OrgProgramme[];
  research: readonly ResearchArea[];
}

const allServices = [
  { id: 'individual', name: 'Individual therapy', desc: 'Anxiety, depression, trauma, OCD, stress, grief, sleep, addiction', more: '50 min · ₹1,500 · Online across India or in person in Bengaluru. CBT, DBT, ACT, EMDR, SFBT, REBT and mindfulness-based therapies matched to your needs.', category: 'therapy' },
  { id: 'couples', name: 'Couples therapy', desc: 'Communication breakdown, recurring conflict, trust, life transitions', more: '60–75 min · ₹3,000 · Both partners attend; sometimes we add individual sessions. A neutral space to understand each other again.', category: 'therapy' },
  { id: 'fertility', name: 'Fertility counselling', desc: 'IVF support, pregnancy loss, family-building decisions', more: '60 min · ₹2,000 · Emotional support alongside your medical care, for individuals and couples.', category: 'therapy' },
  { id: 'assessment', name: 'Psychological assessment', desc: 'Standardised mood, anxiety & other assessments with written report', more: '₹999 · Validated tools, written report and recommendations you can share with your care team.', category: 'therapy' },
  { id: 'clinical-internship', name: 'Clinical Internship', desc: 'For BA/MA psychology students', more: 'Case history taking, assessments, observation, report writing, supervised exposure to therapy techniques. Live online, small batches.', category: 'training' },
  { id: 'therapy-skills-certificate', name: 'Therapy Skills Certificate', desc: 'For MA students & early-career practitioners', more: 'Practical CBT, ACT and SFBT skills through role-plays, case discussions and supervision. Live online, small batches.', category: 'training' },
  { id: 'qualitative-research-masterclass', name: 'Qualitative Research Masterclass', desc: 'For postgraduate students & researchers', more: 'Research design, interviews, focus groups, thematic analysis and coding in NVivo. Live online, small batches.', category: 'training' },
  { id: 'dissertation-mentoring', name: 'Dissertation Mentoring', desc: 'For UG, PG & PhD students', more: 'One-to-one support from research question to final write-up. Part of Resilio Training.', category: 'training' },
  { id: 'research-tools-workshop', name: 'Research Tools Workshop', desc: 'For students & researchers', more: 'Survey design in Qualtrics and data analysis in R, SPSS and JAMOVI. Live online, small batches.', category: 'training' },
  { id: 'organisational', name: 'Organisational programmes', desc: 'POSH, POCSO, EAP & wellbeing workshops', more: 'For workplaces, schools & colleges. Evidence-based workshops with feedback collected to measure impact. On site or online.', category: 'org' }
];

export function Services({ therapy, training, org, research }: ServicesProps) {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setOpenCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return (
    <section id="approach" className="section">
      <div className="wrap">
        <div className="rv">
          <span className="eyebrow">Our services</span>
          <h2>Support shaped around <em>you.</em></h2>
          <p className="mut">Evidence-based therapy, research-backed training, and organisational programmes. Select a card to read more.</p>
        </div>
        <div className="cards" style={{ perspective: 1000 }}>
          {allServices.map((svc, i) => (
            <button
              key={svc.id}
              className="card svc rv"
              style={{
                textAlign: 'left',
                transform: `rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))`,
                transition: 'transform .2s, box-shadow .3s',
                willChange: 'transform',
                boxShadow: 'calc(var(--ry,0deg)*-2) calc(24px + var(--rx,0deg)*2) 44px -26px rgba(43,37,32,.5)'
              }}
              onClick={() => toggleCard(svc.id)}
              onMouseMove={(e) => {
                if (reduceMotion) return;
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
                (e.currentTarget as HTMLElement).style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.setProperty('--rx', '0deg');
                (e.currentTarget as HTMLElement).style.setProperty('--ry', '0deg');
              }}
            >
              <span className="n" style={{ font: 'italic 1.1rem Newsreader,serif', color: 'var(--bronze)', display: 'block', marginBottom: 34, transform: 'translateZ(30px)' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ transform: 'translateZ(20px)' }}>{svc.name}<span className="plus" style={{ float: 'right', color: 'var(--bronze)', transition: '.4s', transform: openCards.has(svc.id) ? 'rotate(45deg)' : 'none' }}>+</span></h3>
              <p style={{ color: 'var(--mut)', margin: 0, fontSize: '.95rem' }}>{svc.desc}</p>
              <p className="more" style={{ display: openCards.has(svc.id) ? 'block' : 'none', marginTop: 12, color: 'var(--ink)' }}>{svc.more}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}