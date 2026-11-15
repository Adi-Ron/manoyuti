import Link from 'next/link';
import { RESEARCH_AREAS } from '@/lib/utils';

const MENTORING = [
  { name: 'PhD Proposal Mentoring', for: 'PhD applicants and early PhD scholars', desc: 'One-to-one support to shape a strong PhD proposal: finding the gap in the literature, framing your research questions, choosing a sound method and design, and preparing the proposal for review.', link: '/contact/?interest=Research%20mentoring&about=PhD%20Proposal%20Mentoring', linkText: 'Register interest', icon: 'file-text', tint: 't-blush' },
  { name: 'Dissertation Mentoring', for: 'UG, PG and PhD students', desc: 'Support from research question to final write-up, as part of Resilio Training.', link: '/training/dissertation-mentoring/', linkText: 'About dissertation mentoring', icon: 'book-open', tint: 't-sand' },
];

export default function ResearchPage() {
  return (
    <>
      <section className="pagehead sky" aria-labelledby="rs-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Research and development</span>
            <h1 id="rs-h" style={{ '--i': 1 }}>Research that asks better questions</h1>
            <p className="lead" style={{ '--i': 2 }}>We study how psychological care can be developed, adapted and evaluated to fit the lived experience of the people it serves, especially women.</p>
            <div className="acts" style={{ '--i': 3 }}><Link className="btn" href="/contact/?interest=Research%20collaboration">Collaborate with us <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
          <dl className="facts"><div><dt>Research projects supervised</dt><dd>15+</dd></div><div><dt>Led by</dt><dd>Ira & Isha Tiwari</dd></div></dl>
        </div>
      </section>

      <section className="sec" aria-labelledby="why-h">
        <div className="wrap split">
          <h2 id="why-h" className="rv">Why research sits beside therapy</h2>
          <div className="prose rv" style={{ '--i': 1 }}>
            <p>Psychological care should be informed by evidence, grounded in human experience, and continuously improved through research and innovation. Our research asks how interventions can be developed and adapted so they respond better to the realities of people's lives.</p>
            <p>We bring together psychology, health and technology: fields that are often explored separately. The aim is to translate research into ideas, tools and services that make support more informed, inclusive and accessible.</p>
          </div>
        </div>
      </section>

      <section className="sec tint" aria-labelledby="areas-h">
        <div className="wrap">
          <div className="head"><h2 id="areas-h" className="rv">What we study</h2><p className="rv">Six areas guide our projects, our teaching and our writing.</p></div>
          <div className="cards c3">
            {RESEARCH_AREAS.map((area, i) => (
              <article key={area.id} className="card rv" style={{ '--i': i }}>
                <span className="ic {area.id === 'womens-health' ? 'blush' : ''}">
                  <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                    {area.id === 'womens-health' && <><path d="M12 21v-9"/><path d="M12 12c0-3.5 2.5-6 7-6 0 4-3 6-7 6z"/><path d="M12 14.5c-4 0-7-2-7-5.5 4 0 7 1.5 7 5.5z"/></>}
                    {area.id === 'health-psychology' && <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6z"/>}
                    {area.id === 'cognitive-neuroscience' && <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></>}
                    {area.id === 'victimology' && <><path d="M12 3l8 3v6c0 5-3.5 8.3-8 9-4.5-.7-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></>}
                    {area.id === 'intervention-dev' && <><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6M9 16h4"/></>}
                    {area.id === 'psychology-tech' && <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></>}
                  </svg>
                </span>
                <h3>{area.name}</h3>
                <p>{area.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="mentor-h">
        <div className="wrap">
          <div className="head"><span className="label rv">Research mentoring</span><h2 id="mentor-h" className="rv">Mentoring for researchers</h2><p className="rv">One-to-one guidance from someone who has supervised more than 15 research projects.</p></div>
          <div className="cards c3">
            {MENTORING.map((item, i) => (
              <article key={item.name} className={`card ${item.tint} rv`} style={{ '--i': i }}>
                <span className="soon-tag">Coming soon</span>
                <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  {item.icon === 'file-text' && <><path d="M9 3h6"/><path d="M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></>}
                  {item.icon === 'book-open' && <><path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h14"/><path d="M8 7h8M8 11h6"/></>}
                </svg></span>
                <h3>{item.name}</h3>
                <p className="meta">{item.for}</p>
                <p>{item.desc}</p>
                <Link className="link" href={item.link}>{item.linkText} <span className="arr" aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="collab-h">
        <div className="wrap">
          <div className="band rv">
            <div><h2 id="collab-h">Work with us</h2><p>Collaborate on a study, invite us to speak, or ask about taking part in our research.</p></div>
            <div className="acts"><Link className="btn light" href="/contact/?interest=Research%20collaboration">Get in touch <span className="arr" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}