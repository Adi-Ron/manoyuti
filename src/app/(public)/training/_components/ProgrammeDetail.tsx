import Link from 'next/link';

type Fact = { label: string; value: string };

interface ProgrammeDetailProps {
  programme: {
    id: string;
    name: string;
    desc: string;
    for: string;
    format: string;
    learn: string[];
  };
  content: {
    category: string;
    action: string;
    facts: Fact[];
    curriculumLabel: string;
    curriculumTitle: string;
    curriculumNote: string;
    registrationLabel: string;
    registrationTitle: string;
    registrationFacts: Fact[];
    registrationAction: string;
    registrationNote: string;
    benefitsTitle: string;
    benefits: { title: string; description: string }[];
  };
}

export function ProgrammeDetail({ programme, content }: ProgrammeDetailProps) {
  const enquiry = `/contact/?interest=Academy&about=${encodeURIComponent(programme.name)}`;

  return (
    <div className="care-page">
      <section className="care-hero" aria-labelledby="programme-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <Link className="care-link" href="/training/">← All programmes</Link>
            <span className="care-kicker">{content.category}</span>
            <h1 id="programme-title">{programme.name}</h1>
            <p className="care-lead">{programme.desc}</p>
            <Link className="care-button" href={enquiry}>{content.action} <span aria-hidden="true">→</span></Link>
          </div>
          <dl className="care-facts">
            {content.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="care-section" aria-labelledby="curriculum-title">
        <div className="wrap care-split">
          <div className="care-prose">
            <header className="care-section-head">
              <span className="care-kicker">{content.curriculumLabel}</span>
              <h2 id="curriculum-title">{content.curriculumTitle}</h2>
            </header>
            <ul className="care-list">{programme.learn.map(item => <li key={item}>{item}</li>)}</ul>
            <p>{content.curriculumNote}</p>
          </div>
          <aside className="care-card" aria-labelledby="registration-title">
            <span className="care-kicker">{content.registrationLabel}</span>
            <h3 id="registration-title">{content.registrationTitle}</h3>
            <dl className="care-facts">
              {content.registrationFacts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl>
            <div className="care-card-footer">
              <Link className="care-button" href={enquiry}>{content.registrationAction} <span aria-hidden="true">→</span></Link>
              <p>{content.registrationNote}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="care-section care-section-soft" aria-labelledby="benefits-title">
        <div className="wrap">
          <header className="care-section-head"><span className="care-kicker">The standard</span><h2 id="benefits-title">{content.benefitsTitle}</h2></header>
          <div className="care-grid">
            {content.benefits.map(benefit => <article key={benefit.title} className="care-prose"><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}
          </div>
        </div>
      </section>
    </div>
  );
}
