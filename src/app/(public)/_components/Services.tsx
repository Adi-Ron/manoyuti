'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PillarItem {
  name: string;
  desc: string;
  meta: string;
  href: string;
  badge?: string;
}

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  lightColor: string;
  borderColor: string;
  icon: string;
  items: PillarItem[];
  primaryLink: { href: string; label: string };
}

const PILLARS: Pillar[] = [
  {
    id: 'therapy',
    title: 'Psychotherapy',
    subtitle: 'Evidence-based personal care',
    tagline: 'Individual, couples, and specialized counselling tailored to your goals and lived experience.',
    color: '#446853', // Calming Sage Green
    lightColor: '#EEF4F0',
    borderColor: 'rgba(68, 104, 83, 0.28)',
    icon: 'user-heart',
    primaryLink: { href: '/therapy/', label: 'Explore Therapy Services' },
    items: [
      {
        name: 'Individual Therapy',
        desc: 'Compassionate, evidence-informed sessions for anxiety, depression, OCD, burnout, grief, and sleep.',
        meta: '50 min · ₹1,500',
        href: '/booking/?service=individual',
        badge: 'Online & In-person'
      },
      {
        name: 'Couples Therapy',
        desc: 'A steady, neutral space to rebuild communication, navigate conflict, and restore emotional closeness.',
        meta: '60–75 min · ₹3,000',
        href: '/booking/?service=couples',
        badge: 'For Partners'
      },
      {
        name: 'Fertility & Family Counselling',
        desc: 'Gentle, specialized emotional support alongside medical care for IVF, family planning, or pregnancy loss.',
        meta: '60 min · ₹2,000',
        href: '/booking/?service=fertility',
        badge: 'Specialized'
      },
      {
        name: 'Psychological Assessments',
        desc: 'Standardized, scientific evaluations with validated tools, written reports, and clear recommendations.',
        meta: 'Written report · ₹999',
        href: '/booking/?service=assessment',
        badge: 'Validated'
      }
    ]
  },
  {
    id: 'training',
    title: 'Training & Internships',
    subtitle: 'Bridging theory and clinical craft',
    tagline: 'Small-batch, live online masterclasses and supervised internships for psychology students and practitioners.',
    color: '#B2674F', // Warm Terracotta Clay
    lightColor: '#F9EFEB',
    borderColor: 'rgba(178, 103, 79, 0.28)',
    icon: 'graduation-cap',
    primaryLink: { href: '/training/', label: 'View Training Batches' },
    items: [
      {
        name: 'Clinical Internship',
        desc: 'Case history taking, clinical assessment, report drafting, and supervised exposure for BA/MA psychology students.',
        meta: 'Live Online · Small batches',
        href: '/training/clinical-internship/',
        badge: 'Certificate'
      },
      {
        name: 'Therapy Skills Certificate',
        desc: 'Hands-on training in practical CBT, ACT, and SFBT tools through guided role-play, case formulation, and feedback.',
        meta: 'Live Online · Supervision',
        href: '/training/therapy-skills-certificate/',
        badge: 'Clinical'
      },
      {
        name: 'Qualitative Research Masterclass',
        desc: 'Master semi-structured interviews, thematic analysis, coding workflows, and scientific synthesis.',
        meta: 'Postgrad & Researchers',
        href: '/training/qualitative-research-masterclass/',
        badge: 'Methods'
      }
    ]
  },
  {
    id: 'research',
    title: 'Research & Mentoring',
    subtitle: 'Inquiry that asks better questions',
    tagline: 'Advancing women’s health, cognitive neuroscience, health psychology, and dissertation mentorship.',
    color: '#40627C', // Dusty Slate Blue
    lightColor: '#EEF3F7',
    borderColor: 'rgba(64, 98, 124, 0.28)',
    icon: 'microscope',
    primaryLink: { href: '/research/', label: 'Explore Research Labs' },
    items: [
      {
        name: 'Dissertation & Thesis Mentoring',
        desc: 'One-to-one mentorship from research question formulation and methodology to data analysis and final write-up.',
        meta: 'UG, PG & PhD Scholars',
        href: '/training/dissertation-mentoring/',
        badge: '1-on-1 Guidance'
      },
      {
        name: 'Women’s Health & Health Psychology',
        desc: 'Investigating PCOS, reproductive health, mood disorders, and culturally responsive interventions in India.',
        meta: '15+ Supervised Projects',
        href: '/research/',
        badge: 'Clinical Studies'
      },
      {
        name: 'Research Tools & Stats Workshop',
        desc: 'Practical statistical analysis and survey instrument design in R, SPSS, JAMOVI, and Qualtrics.',
        meta: 'Hands-on Labs',
        href: '/training/research-tools-workshop/',
        badge: 'Data Analysis'
      }
    ]
  },
  {
    id: 'organisations',
    title: 'Organisations & Teams',
    subtitle: 'Healthier cultures for schools & workplaces',
    tagline: 'Evidence-based statutory compliance, leadership wellbeing, and supportive mental health programmes.',
    color: '#987544', // Warm Bronze / Honey
    lightColor: '#F7F2EA',
    borderColor: 'rgba(152, 117, 68, 0.28)',
    icon: 'building',
    primaryLink: { href: '/organisations/', label: 'Programmes for Teams' },
    items: [
      {
        name: 'POSH Compliance & Sensitisation',
        desc: 'Statutory compliance, internal committee training, and respectful workplace culture programmes.',
        meta: 'On-site or Online',
        href: '/organisations/',
        badge: 'Workplaces'
      },
      {
        name: 'POCSO & Child Safety Programmes',
        desc: 'Sensitive, legally grounded frameworks for schools, educators, and institutional staff.',
        meta: 'For Schools & Colleges',
        href: '/organisations/',
        badge: 'Education'
      },
      {
        name: 'Employee Wellbeing & Workshops',
        desc: 'Tailored sessions on stress resilience, burnout prevention, and sustainable emotional health.',
        meta: 'Customized Formats',
        href: '/organisations/',
        badge: 'Impact Measured'
      }
    ]
  }
];

export function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePillar = PILLARS[activeIdx];

  // Pie slice calculations: 4 quadrants (90 degrees each)
  // Slices: 0: top-right (-45 to 45 or 0 to 90), 1: bottom-right, 2: bottom-left, 3: top-left
  // Slices start at angles:
  // 0: 0 to 90 deg, 1: 90 to 180 deg, 2: 180 to 270 deg, 3: 270 to 360 deg
  const renderSlice = (startAngle: number, endAngle: number, index: number) => {
    const size = 300;
    const center = size / 2;
    const radius = 135;
    const innerRadius = 58;

    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(toRad(startAngle));
    const y1 = center + radius * Math.sin(toRad(startAngle));
    const x2 = center + radius * Math.cos(toRad(endAngle));
    const y2 = center + radius * Math.sin(toRad(endAngle));

    const x3 = center + innerRadius * Math.cos(toRad(endAngle));
    const y3 = center + innerRadius * Math.sin(toRad(endAngle));
    const x4 = center + innerRadius * Math.cos(toRad(startAngle));
    const y4 = center + innerRadius * Math.sin(toRad(startAngle));

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    const isSelected = activeIdx === index;
    const pillar = PILLARS[index];

    return (
      <g
        key={pillar.id}
        onClick={() => setActiveIdx(index)}
        style={{ cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
        role="button"
        tabIndex={0}
        aria-label={`Select ${pillar.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveIdx(index);
          }
        }}
      >
        <path
          d={pathData}
          fill={isSelected ? pillar.color : pillar.lightColor}
          stroke="#FAF7F2"
          strokeWidth="3.5"
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: isSelected ? 'scale(1.055)' : 'scale(1)',
            filter: isSelected ? `drop-shadow(0 10px 18px ${pillar.borderColor})` : 'none',
            transition: 'transform 0.35s ease, fill 0.3s ease, filter 0.3s ease'
          }}
        />
        {/* Slice label indicator */}
        <text
          x={center + ((radius + innerRadius) / 2) * Math.cos(toRad((startAngle + endAngle) / 2))}
          y={center + ((radius + innerRadius) / 2) * Math.sin(toRad((startAngle + endAngle) / 2)) + 4}
          textAnchor="middle"
          fill={isSelected ? '#FFFFFF' : pillar.color}
          fontSize="11.5"
          fontWeight="700"
          letterSpacing="0.04em"
          style={{ pointerEvents: 'none', transition: 'fill 0.3s ease' }}
        >
          {String(index + 1).padStart(2, '0')}
        </text>
      </g>
    );
  };

  return (
    <section id="services" className="section" style={{ background: 'var(--bg)', padding: 'clamp(54px, 7vw, 92px) 5vw' }}>
      <div className="wrap">
        <div style={{ maxWidth: 640, marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <span className="eyebrow" style={{ marginBottom: 10, color: 'var(--bronze)' }}>
            Comprehensive Care Architecture
          </span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)', lineHeight: 1.15, margin: '0 0 14px' }}>
            Support shaped around <em>you.</em>
          </h2>
          <p className="mut" style={{ fontSize: '1.08rem', lineHeight: 1.6, margin: 0 }}>
            Explore our four integrated branches of practice. Rotate through the wheel to discover dedicated care, clinical internships, and research collaboration.
          </p>
        </div>

        {/* Interactive Pie Structure & Detail Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 380px) minmax(0, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start'
          }}
          className="pie-layout-grid"
        >
          {/* Left Column: Interactive Wheel & Quadrant Selector */}
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              padding: 'clamp(24px, 3.5vw, 32px)',
              boxShadow: '0 20px 45px -28px rgba(43,37,32,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* SVG Pie Chart */}
            <div style={{ position: 'relative', width: 280, height: 280, margin: '8px auto 20px' }}>
              <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* 4 Quadrants: 0-90, 90-180, 180-270, 270-360 */}
                {renderSlice(0, 90, 0)}
                {renderSlice(90, 180, 1)}
                {renderSlice(180, 270, 2)}
                {renderSlice(270, 360, 3)}

                {/* Center Hub */}
                <circle cx="150" cy="150" r="46" fill="#FAF7F2" stroke="var(--line)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="38" fill={activePillar.lightColor} />
                <text
                  x="150"
                  y="146"
                  textAnchor="middle"
                  fill="var(--espresso)"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  MANOYUTI
                </text>
                <text
                  x="150"
                  y="160"
                  textAnchor="middle"
                  fill={activePillar.color}
                  fontSize="9.5"
                  fontWeight="600"
                >
                  {activePillar.title.split(' ')[0]}
                </text>
              </svg>
            </div>

            <p style={{ fontSize: '.8rem', color: 'var(--mut)', textAlign: 'center', margin: '0 0 16px' }}>
              Tap any segment or branch below to explore details:
            </p>

            {/* Segment Selector Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
              {PILLARS.map((p, i) => {
                const isSelected = activeIdx === i;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIdx(i)}
                    type="button"
                    style={{
                      background: isSelected ? p.color : p.lightColor,
                      color: isSelected ? '#FFFFFF' : 'var(--espresso)',
                      border: `1.5px solid ${isSelected ? p.color : p.borderColor}`,
                      borderRadius: 10,
                      padding: '10px 12px',
                      fontSize: '.825rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span style={{ fontSize: '.72rem', opacity: isSelected ? 0.9 : 0.65 }}>
                      0{i + 1} · Pillar
                    </span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Pillar Details & Items */}
          <div
            style={{
              background: 'var(--paper)',
              border: `1.5px solid ${activePillar.borderColor}`,
              borderRadius: 20,
              padding: 'clamp(28px, 4vw, 42px)',
              boxShadow: `0 24px 50px -32px ${activePillar.borderColor}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient subtle color banner on top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: activePillar.color
              }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    background: activePillar.lightColor,
                    color: activePillar.color,
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontSize: '.78rem',
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    marginBottom: 8
                  }}
                >
                  Branch 0{activeIdx + 1}
                </span>
                <h3 style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)', margin: 0, color: 'var(--espresso)' }}>
                  {activePillar.title}
                </h3>
              </div>
              <Link
                href={activePillar.primaryLink.href}
                className="link"
                style={{ color: activePillar.color, fontWeight: 600, fontSize: '.92rem' }}
              >
                {activePillar.primaryLink.label} <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p style={{ color: 'var(--mut)', fontSize: '1.02rem', lineHeight: 1.55, margin: '0 0 24px', maxWidth: '62ch' }}>
              {activePillar.tagline}
            </p>

            {/* Offerings list */}
            <div style={{ display: 'grid', gap: 14 }}>
              {activePillar.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) auto',
                    gap: 16,
                    alignItems: 'center',
                    transition: 'border-color 0.25s, transform 0.2s',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h4 style={{ margin: 0, fontSize: '1.08rem', color: 'var(--espresso)' }}>
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span
                          style={{
                            background: activePillar.lightColor,
                            color: activePillar.color,
                            fontSize: '.72rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 6
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--mut)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--espresso)', whiteSpace: 'nowrap' }}>
                      {item.meta}
                    </span>
                    <Link
                      href={item.href}
                      className="btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '.8rem',
                        background: activePillar.color,
                        color: '#FFFFFF'
                      }}
                    >
                      Book / View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
