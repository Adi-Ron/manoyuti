import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'Why Do Couples Keep Having the Same Argument? | Manoyuti Bengaluru',
  description: 'Understanding recurring partner conflicts, attachment loops, and Emotionally Focused Therapy (EFT) principles by couples therapist Isha Tiwari in Bengaluru.',
  keywords: ['couples therapy Bengaluru', 'relationship counselling India', 'EFT couples therapy', 'why couples fight'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
It usually starts with something trivial—a text message not replied to, wet towels left on the bed, or plans made with in-laws without asking. Within four minutes, both partners are shouting or giving each other the freezing silent treatment. In Emotionally Focused Couples Therapy, we separate the fight into two layers: the soft vulnerable emotion underneath, and the protective reactive armor that comes out in anger. When couples learn to externalize the cycle—seeing the cycle itself as the shared enemy rather than each other—real emotional safety returns.
`;

export default function SameArgumentArticlePage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>Relationships</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              Why Do Couples Keep Having the Same Argument? Uncovering Attachment Loops
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Isha Tiwari</strong> · Relationship & Couples Therapist, Bengaluru
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>5 min read</dd></div>
            <div><dt>Framework</dt><dd>Emotionally Focused Therapy (EFT)</dd></div>
            <div><dt>Audience</dt><dd>Couples & Partners</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <BlogAudioPlayer
            title="Why Do Couples Keep Having the Same Argument? Uncovering Attachment Loops"
            readTime="5 min read"
            textToRead={ARTICLE_TEXT}
          />

          <div className="clean-card" style={{ padding: '24px 20px', margin: '24px 0 36px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--espresso)', margin: '0 0 14px' }}>The Classic Pursue-Withdraw Cycle</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div className="clean-card-subtle" style={{ padding: '12px 18px' }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', fontSize: '.9rem', marginBottom: 2 }}>Partner A (Pursuer)</strong>
                <small style={{ color: 'var(--mut)' }}>"Do you even care about us?"</small>
              </div>
              <span style={{ fontSize: '1.4rem', color: 'var(--mut)' }}>⇄</span>
              <div className="clean-card-subtle" style={{ padding: '12px 18px' }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', fontSize: '.9rem', marginBottom: 2 }}>Partner B (Withdrawer)</strong>
                <small style={{ color: 'var(--mut)' }}>"Whatever I do is never enough."</small>
              </div>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              It usually starts with something trivial—a text message not replied to, wet towels left on the bed, or plans made with in-laws without asking. Within four minutes, both partners are shouting or giving each other the freezing silent treatment.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              Surface Content vs. Deep Attachment Vulnerability
            </h2>
            <p>
              In Emotionally Focused Couples Therapy, we separate the fight into two layers:
            </p>
            <ul style={{ margin: '14px 0 20px', paddingLeft: 24, display: 'grid', gap: 8 }}>
              <li><strong>The Primary Emotion:</strong> The soft, vulnerable feeling underneath (<em>"I feel terrified that I don’t matter to you anymore"</em> or <em>"I feel like a constant disappointment to you"</em>).</li>
              <li><strong>The Secondary Reaction:</strong> The protective armor that comes out in anger (<em>Criticism, sarcasm, stonewalling, or walking away</em>).</li>
            </ul>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              How to De-escalate the Cycle
            </h2>
            <p>
              The moment you realize you are inside your signature cycle, call it out together: <em>"The loop is happening right now. You are withdrawing because you feel criticized, and I am raising my voice because I feel invisible."</em>
            </p>
            <p>
              When couples externalize the cycle—seeing the cycle itself as the shared enemy rather than each other—real emotional safety and intimacy return to the relationship.
            </p>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Ready to break recurring conflict in your relationship?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                Couples therapy provides a neutral, safe space for both partners to speak without walking on eggshells.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/booking/?service=couples">
                  Book couples counselling →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
