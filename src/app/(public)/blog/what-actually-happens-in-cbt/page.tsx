import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'What Actually Happens in CBT? | Manoyuti Therapy Bengaluru',
  description: 'A comprehensive, step-by-step walkthrough of cognitive behavioural therapy sessions, techniques, and clinical evidence by psychologist Isha Tiwari in Bengaluru.',
  keywords: ['CBT therapy Bengaluru', 'Cognitive behavioural therapy India', 'anxiety therapy', 'how CBT works', 'psychologist Bengaluru'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
Cognitive behavioural therapy, or CBT, is built on an empirically tested principle: the way we interpret a situation shapes how we feel in our body and what we do next. When those interpretations become rigid or catastrophic, they can keep anxiety, panic, or low mood going long after the original trigger has passed. In the first few sessions, your therapist works with you to understand your triggers and build a formulation. In the middle sessions, you practice cognitive restructuring and behavioral experiments. By the final sessions, you consolidate relapse-prevention tools to become your own therapist.
`;

export default function CBTArticlePage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>Therapy Explained</span>
            <h1 style={{ fontSize: 'clamp(2.3rem, 4.4vw, 3.8rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              What Actually Happens in Cognitive Behavioural Therapy (CBT)?
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Isha Tiwari</strong> · Assistant Professor & Psychologist, Bengaluru
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>6 min read</dd></div>
            <div><dt>Clinical focus</dt><dd>Anxiety, Depression, OCD</dd></div>
            <div><dt>Narration</dt><dd>Audio available below</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>

          {/* Audio Narration Component */}
          <BlogAudioPlayer
            title="What Actually Happens in Cognitive Behavioural Therapy?"
            readTime="6 min read"
            textToRead={ARTICLE_TEXT}
          />

          {/* Editorial Visual Graphic */}
          <div className="clean-card" style={{ padding: '28px 24px', margin: '24px 0 36px', textAlign: 'center' }}>
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap', margin: '14px 0' }}>
                <span className="clean-pill">
                  Thoughts (Cognition)
                </span>
                <span style={{ color: 'var(--mut)', fontSize: '1.2rem' }}>⇄</span>
                <span className="clean-pill neutral">
                  Emotions (Feelings)
                </span>
                <span style={{ color: 'var(--mut)', fontSize: '1.2rem' }}>⇄</span>
                <span className="clean-pill">
                  Actions (Behaviour)
                </span>
              </div>
              <p style={{ fontSize: '.85rem', color: 'var(--mut)', margin: '8px 0 0' }}>
                The CBT Triangle: How thought patterns directly trigger physical sensations and behavioral coping loops.
              </p>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              Cognitive Behavioural Therapy (CBT) is one of the most thoroughly investigated talking therapies in the world. Yet for someone attending their very first session in Bengaluru, the name often sounds cold, rigid, or detached.
            </p>

            <p>
              In reality, CBT is deeply human and collaborative. It does not try to brainwash you into "toxic positivity" or force you to ignore genuine hardships. Instead, it helps you investigate the automatic thoughts and interpretations running in the background of your mind.
            </p>

            <h2 style={{ fontSize: '1.7rem', color: 'var(--espresso)', margin: '34px 0 14px' }}>
              1. The First Sessions: Building the Shared Map
            </h2>
            <p>
              In sessions 1 and 2, your therapist takes time to understand what brought you here. Rather than giving you hasty advice, you build what clinicians call a <strong>case formulation</strong>—a shared psychological map.
            </p>
            <p>
              You trace recent moments when anxiety or low mood spiked. You examine the trigger, the physical sensations in your chest or stomach, the exact thought that crossed your mind (such as <em>"I will embarrass myself"</em> or <em>"I can't cope with this"</em>), and what you did in response (such as cancelling plans or avoiding your phone).
            </p>

            <h2 style={{ fontSize: '1.7rem', color: 'var(--espresso)', margin: '34px 0 14px' }}>
              2. The Middle Sessions: Active Experiments
            </h2>
            <p>
              This is where real change takes root. You learn to treat automatic thoughts as hypotheses rather than absolute facts. You learn tools like:
            </p>
            <ul style={{ margin: '14px 0 20px', paddingLeft: 24, display: 'grid', gap: 8 }}>
              <li><strong>Thought Records:</strong> Looking objectively at evidence that supports or refutes a catastrophic assumption.</li>
              <li><strong>Behavioral Experiments:</strong> Gently testing what actually happens when you don't engage in avoidance or safety behaviors.</li>
              <li><strong>Somatic Anchors:</strong> Using diaphragmatic breathing and muscle relaxation to calm autonomic physiological arousal.</li>
            </ul>

            <h2 style={{ fontSize: '1.7rem', color: 'var(--espresso)', margin: '34px 0 14px' }}>
              3. The Final Phase: Becoming Your Own Therapist
            </h2>
            <p>
              A fundamental tenet of CBT is that you should not need therapy forever. As sessions taper from weekly to bi-weekly, you draft a personalized <strong>Relapse Prevention Blueprint</strong>. You identify your earliest warning signs and the specific coping tools that work for your nervous system.
            </p>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Ready to explore CBT in Bengaluru or Online?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                Our individual therapy sessions are confidential, tailored to your pace, and available online across India or in person in Bengaluru.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/booking/?service=individual">
                  Book an individual session →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
