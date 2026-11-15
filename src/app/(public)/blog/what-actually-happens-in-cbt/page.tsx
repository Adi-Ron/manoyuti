import Link from 'next/link';

export default function CBTArticlePage() {
  return (
    <>
      <section className="pagehead sand" aria-labelledby="pt-h">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ '--i': 0 }}>← All articles</Link>
            <span className="label" style={{ '--i': 1 }}>Therapy Explained</span>
            <h1 id="pt-h" className="post-title" style={{ '--i': 2 }}><span className="mask" style={{ '--i': 0 }}><span>What actually</span></span><span className="mask" style={{ '--i': 1 }}><span>happens in CBT?</span></span></h1>
            <p className="lead" style={{ '--i': 3 }}>By Isha Tiwari</p>
          </div>
          <dl className="facts"><div><dt>Reading time</dt><dd>6 min</dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-label="Article">
        <article className="wrap article">
          <aside aria-labelledby="ev-h">
            <div className="evidence">
              <h2 id="ev-h">Evidence at a glance</h2>
              <ul className="ticks">
                <li>CBT is one of the most widely studied talking therapies, with support from many meta-analyses.<sup><a href="#ref2">2</a></sup></li>
                <li>The research base is strongest for anxiety disorders and depression.<sup><a href="#ref2">2</a></sup><sup><a href="#ref3">3</a></sup></li>
                <li>It is structured and time-limited: you and your therapist set goals and track progress together.<sup><a href="#ref1">1</a></sup></li>
                <li>Effects vary between people, and CBT is not the only effective option.<sup><a href="#ref3">3</a></sup></li>
              </ul>
            </div>
          </aside>
          <div className="prose">
            <p className="disclaimer">This article is educational and not a substitute for therapy.</p>
            <p className="lead">Cognitive behavioural therapy, or CBT, is built on a simple idea: the way we interpret a situation shapes how we feel and what we do next.</p>
            <p>When those interpretations become rigid or harsh, they can keep anxiety or low mood going long after the original trigger has passed.</p>
            <h2>The first few sessions</h2>
            <p>Early sessions focus on understanding you. Your therapist will ask about what brings you in, when the difficulties started and what you have already tried. Together you build a shared picture, often called a formulation, of how your thoughts, feelings, body sensations and behaviours connect.</p>
            <h2>The middle sessions</h2>
            <p>This is where most of the change happens. You learn to notice automatic thoughts, test them against evidence and try out new ways of responding. For anxiety, this often includes gradually facing situations you have been avoiding. Between sessions you practise small tasks, because skills grow through use in daily life.</p>
            <h2>Ending well</h2>
            <p>CBT aims to make you your own therapist. Final sessions review what has helped, plan for setbacks and agree on when to check in again.</p>
            <h2>Is CBT right for me?</h2>
            <p>CBT suits many people, but not everyone. Some people benefit more from approaches such as ACT, DBT or EMDR, depending on their needs. A good first session should leave you with a clear sense of the plan and why it fits you.</p>
            <h2 id="refs-h">References</h2>
            <ol className="refs">
              <li id="ref1">Beck, A. T., Rush, A. J., Shaw, B. F., & Emery, G. (1979). <em>Cognitive therapy of depression.</em> Guilford Press.</li>
              <li id="ref2">Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. <em>Cognitive Therapy and Research, 36</em>(5), 427–440. <a href="https://doi.org/10.1007/s10608-012-9476-1">https://doi.org/10.1007/s10608-012-9476-1</a></li>
              <li id="ref3">Cuijpers, P., Cristea, I. A., Karyotaki, E., Reijnders, M., & Huibers, M. J. H. (2016). How effective are cognitive behavior therapies for major depression and anxiety disorders? A meta-analytic update of the evidence. <em>World Psychiatry, 15</em>(3), 245–258. <a href="https://doi.org/10.1002/wps.20346">https://doi.org/10.1002/wps.20346</a></li>
            </ol>
            <div className="crisis"><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/></svg></span><div><h3>Would it help to talk?</h3><p>If you are in crisis, call Tele-MANAS on <a href="tel:14416">14416</a>. If you'd like support, <Link href="/booking/">book a session</Link>.</p></div></div>
          </div>
        </article>
      </section>
    </>
  );
}