import Link from 'next/link';

const ISHA_STATS = [
  { value: '1,000+', label: 'clients supported' },
  { value: '15+', label: 'research projects' },
  { value: '10+', label: 'courses taught' }
];

const IRA_TAGS = [
  "Women's health", "Intervention development", "Cognitive neuroscience",
  "Health psychology", "Mental health policy"
];

const VALUES = [
  'Compassion', 'Integrity', 'Confidentiality', 'Curiosity', 'Continuous learning'
];

const TICKS = [
  '<b>Evidence first.</b> Therapies with strong research support, including CBT, DBT, ACT, EMDR, SFBT and REBT.',
  '<b>You, not a template.</b> Every plan is shaped around your needs, goals and pace.',
  '<b>A safe, non-judgemental space.</b> What you share stays confidential, within ethical and legal limits.',
  '<b>Growth beyond the session.</b> Practical tools you can use in everyday life.'
];

export default function AboutPage() {
  return (
    <>
      <section className="pagehead" aria-labelledby="ab-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>About Resilio</span>
            <h1 id="ab-h" style={{ '--i': 1 }}>Where psychology meets health</h1>
            <p className="lead" style={{ '--i': 2 }}>We are building a space where psychology meets science, health and technology, to make understanding the human mind more accessible, meaningful and compassionate.</p>
          </div>
          <dl className="facts"><div><dt>Founded by</dt><dd>Isha & Ira Tiwari</dd></div><div><dt>Based in</dt><dd>Bengaluru</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="vision1-h">
        <div className="wrap split">
          <h2 id="vision1-h" className="rv">The many dimensions of well-being</h2>
          <div className="prose rv" style={{ '--i': 1 }}>
            <p>Our vision is a multidisciplinary platform exploring the many dimensions of human well-being, from women's reproductive and emotional health to cognitive functioning, neuroscience, health psychology, victimology and the nuances of everyday psychological experience.</p>
            <p>We believe that health is more than the absence of illness, psychology is more than the treatment of mental health concerns, and technology can be more than a tool. Brought together thoughtfully, these fields help us understand people better, challenge misconceptions, and bridge the gap between scientific knowledge and everyday life.</p>
            <p>That is why Resilio has three parts: <Link href="/therapy/">therapy</Link>, <Link href="/research/">research</Link> and <Link href="/training/">training</Link>, with a <Link href="/blog/">blog</Link> that shares what we learn.</p>
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="founders-h">
        <div className="wrap">
          <div className="head"><h2 id="founders-h" className="rv">The founders</h2></div>
          <div className="team">
            <article className="person rv">
              <div className="top"><span className="avatar" aria-hidden="true">IT</span><div><h3>Isha Tiwari</h3><p className="role">Psychologist · Assistant Professor, Amity University, Bengaluru · PhD scholar, Christ University</p></div></div>
              <p>Isha Tiwari is a psychologist and an Assistant Professor at Amity University, Bengaluru. She is pursuing her PhD in Psychology at Christ University, Bengaluru, and holds an MA in Clinical Psychology from Amity University, Noida.</p>
              <p>Isha has supported more than 1,000 clients through individual and couples therapy, working with anxiety, trauma, OCD, mood disorders, relationship concerns and addiction. She trained at institutions including SMS Psychiatric Hospital, Jaipur, and VINHANS, Delhi, and has worked alongside psychiatrists on complex cases.</p>
              <p>As an academic, she has taught more than 10 courses, supervised over 15 research projects, and helped set up the Centre for Happiness at Amity University. That blend of clinical practice and research is the foundation of Resilio.</p>
              <div className="figs">{ISHA_STATS.map((s, i) => <div key={i}><b>{s.value}</b><span>{s.label}</span></div>)}</div>
            </article>
            <article className="person rv" style={{ '--i': 1 }}>
              <div className="top"><span className="avatar blush" aria-hidden="true">IT</span><div><h3>Ira Tiwari</h3><p className="role">Psychology researcher · PhD scholar</p></div></div>
              <p className="quote">Where psychology meets research, innovation and human well-being.</p>
              <p>I am a psychology researcher and PhD scholar with a keen interest in bridging psychological science, therapeutic innovation and technology to address complex human experiences. My work is driven by a central belief: psychological care should be informed by evidence, grounded in human experience, and continuously improved through research and innovation.</p>
              <p>My primary focus lies in research and development, psychotherapy and intervention development, with a growing emphasis on women's psychological health, emotional well-being, and accessible, evidence-informed support.</p>
              <p>Beyond psychotherapy, my interests span artificial intelligence, cognitive neuroscience, health psychology, criminal psychology and mental health policy. Through this platform, I aim to translate research into meaningful ideas and make complex concepts accessible beyond academic spaces.</p>
              <ul className="tags">{IRA_TAGS.map((t, i) => <li key={i}>{t}</li>)}</ul>
              <p><Link className="link" href="/about/">Read both stories <span className="arr" aria-hidden="true">→</span></Link></p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="approach-h">
        <div className="wrap split">
          <div className="prose rv">
            <h2 id="approach-h" style={{ margin: 0 }}>Our approach</h2>
            <p>We are guided by curiosity, compassion, scientific thinking and a commitment to responsible knowledge-sharing. We value interdisciplinary perspectives, respect the diversity of human experience, and communicate psychology without unnecessary jargon or sensationalism.</p>
            <p>As the platform grows, our goal is to bring together research, education, practical resources and thoughtful conversations across disciplines that are often explored separately.</p>
            <h3>Our values</h3>
            <ul className="vals">{VALUES.map((v, i) => <li key={i}>{v}</li>)}</ul>
          </div>
          <div className="panelbox rv" style={{ '--i': 1 }}>
            <h3>In therapy</h3>
            <ul className="ticks">{TICKS.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</ul>
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="vision-h">
        <div className="wrap">
          <div className="band rv">
            <div><h2 id="vision-h">Our vision</h2><p>To build a space where science feels human, psychology feels accessible, women's experiences are heard, and technology helps knowledge reach the people who need it.</p></div>
            <div className="acts"><Link className="btn light" href="/booking/">Book a session <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}