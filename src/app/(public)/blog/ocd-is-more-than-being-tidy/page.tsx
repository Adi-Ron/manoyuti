import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'Why OCD is Much More Than Being Neat | Manoyuti Bengaluru',
  description: 'Dispelling myths about Obsessive-Compulsive Disorder, understanding intrusive thoughts, and how Exposure and Response Prevention (ERP) brings recovery.',
  keywords: ['OCD therapy Bengaluru', 'ERP treatment India', 'intrusive thoughts therapy', 'psychologist Bengaluru OCD'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
Saying "I'm so OCD about organizing my bookshelf" trivializes one of the most agonizing mental health conditions known to psychiatric medicine. True OCD is not a quirky personality trait—it is an exhausting psychological battle. People with OCD experience thoughts that are ego-dystonic—meaning the thoughts are the exact opposite of what the person values or wants. The global gold standard treatment for OCD is Exposure and Response Prevention (ERP). In ERP, under close clinical supervision, we gently expose you to the trigger without performing the neutralizing compulsion, allowing your brain to habituate and realize thoughts cannot harm you.
`;

export default function OCDArticlePage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>Understanding Conditions</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              Why OCD is Much More Than Being Neat: Obsessions, Compulsions and Recovery
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Isha Tiwari</strong> · Clinical Psychologist, Bengaluru
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>7 min read</dd></div>
            <div><dt>Modalities</dt><dd>ERP & ACT Frameworks</dd></div>
            <div><dt>Evidence Base</dt><dd>Gold Standard Clinical Efficacy</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <BlogAudioPlayer
            title="Why OCD is Much More Than Being Neat: Obsessions, Compulsions and Recovery"
            readTime="7 min read"
            textToRead={ARTICLE_TEXT}
          />

          {/* Infographic block */}
          <div className="clean-card" style={{ padding: '26px 22px', margin: '24px 0 36px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--espresso)', margin: '0 0 14px' }}>The OCD Feedback Loop</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <div className="clean-card-subtle" style={{ padding: '12px 14px' }}>
                <strong style={{ display: 'block', color: 'var(--espresso)', fontSize: '.9rem', marginBottom: 2 }}>1. Intrusive Thought</strong>
                <small style={{ color: 'var(--mut)' }}>Sudden disturbing fear</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: '12px 14px' }}>
                <strong style={{ display: 'block', color: 'var(--espresso)', fontSize: '.9rem', marginBottom: 2 }}>2. Acute Anxiety</strong>
                <small style={{ color: 'var(--mut)' }}>Panic & urge to neutralize</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: '12px 14px' }}>
                <strong style={{ display: 'block', color: 'var(--espresso)', fontSize: '.9rem', marginBottom: 2 }}>3. Compulsion</strong>
                <small style={{ color: 'var(--mut)' }}>Checking, washing, rituals</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: '12px 14px' }}>
                <strong style={{ display: 'block', color: 'var(--espresso)', fontSize: '.9rem', marginBottom: 2 }}>4. Brief Relief</strong>
                <small style={{ color: 'var(--mut)' }}>Reinforces cycle</small>
              </div>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              Saying <em>"I'm so OCD about organizing my bookshelf"</em> trivializes one of the most agonizing mental health conditions known to psychiatric medicine. True OCD is not a quirky personality trait—it is an exhausting psychological battle.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              What Intrusive Thoughts Truly Look Like
            </h2>
            <p>
              People with OCD experience thoughts that are <strong>ego-dystonic</strong>—meaning the thoughts are the exact opposite of what the person values or wants. A loving mother might be struck with a horrific thought of dropping her infant. A deeply moral student might suffer from unbearable fears of blasphemy or harming a stranger.
            </p>
            <p>
              Because the person finds these thoughts abhorrent, they experience intense panic and engage in <strong>compulsions</strong> (repeated checking of doors, excessive handwashing, mental rituals, or asking loved ones for constant reassurance) to relieve the terror.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              How Exposure & Response Prevention (ERP) Breaks the Chain
            </h2>
            <p>
              The global gold standard treatment for OCD is <strong>Exposure and Response Prevention (ERP)</strong>.
            </p>
            <p>
              In ERP, under close clinical supervision, we gently expose you to the trigger without performing the neutralizing compulsion. At first, your anxiety spikes. But after 15 to 20 minutes of sitting with the discomfort, your brain experiences <em>habituation</em>. Your nervous system learns that thoughts are just neural noise—they cannot hurt you, and you do not need to perform a ritual to survive them.
            </p>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Are intrusive thoughts taking over your daily peace?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                You do not have to battle OCD in isolation. We offer specialized, compassionate ERP and CBT therapy in Bengaluru and online.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/booking/?service=individual">
                  Consult an OCD therapist →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
