import Link from 'next/link';

const ISHA_CREDENTIALS = [
  'Assistant Professor of Psychology, Amity University, Bengaluru',
  'PhD Scholar in Psychology, Christ University, Bengaluru',
  'Master of Arts in Clinical Psychology, Amity University, Noida',
  'Clinical Training: SMS Psychiatric Hospital (Jaipur) & VINHANS (Delhi)',
  'Co-founder & Advisor, Centre for Happiness, Amity University'
];

const IRA_FOCUS_AREAS = [
  'Women’s Hormonal & Psychological Health (PCOS, Perinatal)',
  'Translational Psychotherapy & Intervention Development',
  'Cognitive Neuroscience & Autonomic Nervous System Regulation',
  'Qualitative Research Methods & Thematic Analysis in NVivo',
  'Ethical Mental Health Policy & Tech-Enabled Interventions'
];

const CORE_VALUES = [
  {
    num: '01',
    title: 'Evidence with care',
    desc: 'Our clinical work and teaching draw on psychological research and evidence-based approaches.'
  },
  {
    num: '02',
    title: 'Respect for your experience',
    desc: 'You know your life best. We listen without judgement and make decisions together.'
  },
  {
    num: '03',
    title: 'Care for your privacy',
    desc: 'We protect your information and explain how confidentiality works, including its limits.'
  },
  {
    num: '04',
    title: 'Clear, everyday language',
    desc: 'We explain ideas and options simply, so you can make informed choices and ask questions freely.'
  }
];

export default function AboutPage() {
  return (
    <div className="care-page care-about">
      <section className="pagehead care-hero" aria-labelledby="about-title"><div className="wrap"><div className="txt"><span className="care-kicker">About Manoyuti</span><h1 id="about-title">Good care begins with being heard.</h1><p className="lead">We bring psychology, research, and teaching together with a simple intention: to make thoughtful support feel more human and within reach.</p><div className="care-actions"><Link className="clean-btn-primary" href="/booking/">Find support <span aria-hidden="true">&rarr;</span></Link><a className="care-text-link" href="#founders">Meet Isha &amp; Ira</a></div></div><aside className="care-hero-note" aria-label="Our home"><span className="care-note-mark" aria-hidden="true">&#10035;</span><p>Rooted in Bengaluru.<br />Here for you, wherever you are in India.</p><span className="care-note-caption">Manoyuti</span></aside></div></section>

      <section className="care-section" aria-labelledby="story-title"><div className="wrap care-split"><header className="care-section-head"><span className="care-kicker">Our story</span><h2 id="story-title">Science gives us a foundation. Listening shows us the way.</h2></header><div className="care-story"><p>Manoyuti was founded by Isha and Ira Tiwari to connect psychological care with the research and teaching that help it grow.</p><p>We believe support should make room for your life as it is: your relationships, culture, questions, and pace. Our work brings clinical knowledge into that conversation with warmth and respect.</p><p>From a first therapy session to a research project or a clinical internship, we want people to feel informed, supported, and able to ask questions.</p></div></div></section>

      <section className="care-section care-section-tint" aria-labelledby="practice-title"><div className="wrap"><header className="care-section-head"><span className="care-kicker">One practice, connected work</span><h2 id="practice-title">Three ways we make room for growth</h2></header><div className="care-practice-grid"><article><span className="care-practice-symbol" aria-hidden="true">&#10035;</span><h3>Therapy &amp; care</h3><p>Private support for individuals and couples, online and in Bengaluru.</p><Link className="care-text-link" href="/therapy/">Explore therapy <span aria-hidden="true">&rarr;</span></Link></article><article><span className="care-practice-symbol" aria-hidden="true">&#9676;</span><h3>Research &amp; discovery</h3><p>Research into women’s health, cognitive neuroscience, and care that fits our communities.</p><Link className="care-text-link" href="/research/">Explore our research <span aria-hidden="true">&rarr;</span></Link></article><article><span className="care-practice-symbol" aria-hidden="true">&#10023;</span><h3>Learning &amp; training</h3><p>Supervised internships, practical workshops, and mentoring for psychology students.</p><Link className="care-text-link" href="/training/">Explore the academy <span aria-hidden="true">&rarr;</span></Link></article></div></div></section>

      <section className="care-section" aria-labelledby="founders"><div className="wrap"><header className="care-section-head"><span className="care-kicker">The people behind Manoyuti</span><h2 id="founders">Meet Isha &amp; Ira</h2><p>Two perspectives, connected by a shared care for people and psychological science.</p></header><div className="care-founder-grid">
        <article className="care-founder"><div className="care-founder-heading"><span className="care-founder-monogram" aria-hidden="true">Isha</span><div><h3>Isha Tiwari</h3><p className="care-founder-role">Psychologist &amp; clinical educator</p></div></div><p>Isha is a practising psychologist, Assistant Professor at Amity University, Bengaluru, and a PhD Scholar at Christ University. She has supported more than 1,000 individuals and couples with concerns including anxiety, trauma, OCD, relationships, and mood.</p><h4>Education &amp; experience</h4><ul className="care-credential-list">{ISHA_CREDENTIALS.map(credential => <li key={credential}>{credential}</li>)}</ul></article>
        <article className="care-founder"><div className="care-founder-heading"><span className="care-founder-monogram" aria-hidden="true">Ira</span><div><h3>Ira Tiwari</h3><p className="care-founder-role">Psychology researcher &amp; PhD scholar</p></div></div><p>Ira is a psychology researcher and doctoral scholar interested in women’s reproductive and emotional health, cognitive neuroscience, and accessible psychological interventions. Her work connects research, care, and technology.</p><h4>Research interests</h4><ul className="care-credential-list">{IRA_FOCUS_AREAS.map(area => <li key={area}>{area}</li>)}</ul></article>
      </div></div></section>

      <section className="care-section care-section-blue" aria-labelledby="values-title"><div className="wrap"><header className="care-section-head"><span className="care-kicker">What matters to us</span><h2 id="values-title">Care you can feel comfortable with</h2></header><div className="care-values">{CORE_VALUES.map(value => <article key={value.num}><h3>{value.title}</h3><p>{value.desc}</p></article>)}</div></div></section>
      <section className="care-closing"><div className="wrap"><div><span className="care-kicker">Start wherever you are</span><h2>There’s room for your questions.</h2><p>Whether you’re looking for support, training, or a research conversation, we’d be glad to hear from you.</p></div><div className="care-actions"><Link className="clean-btn-primary" href="/booking/">Request a session <span aria-hidden="true">&rarr;</span></Link><Link className="care-text-link" href="/contact/">Get in touch</Link></div></div></section>
    </div>
  );
}
