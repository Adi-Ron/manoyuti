import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'PCOS, Hormones and Anxiety | Manoyuti Bengaluru',
  description: 'How Polycystic Ovary Syndrome influences emotional health, the neurobiology of PCOS anxiety, and compassionate psychological care in Bengaluru.',
  keywords: ['PCOS anxiety India', 'PCOS mental health Bengaluru', 'hormonal mood swings therapy', 'women psychologist Bengaluru'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
Women diagnosed with Polycystic Ovary Syndrome across India are routinely handed a prescription for birth control, told to "just lose weight", and sent out the clinic door. Almost nobody warns them about the psychological storm that accompanies it. When insulin resistance is present, compensatory spikes in insulin stimulate androgen production. Chronic low-grade inflammation causes microglial activation in the brain, impairing serotonin synthesis and precipitating sudden anxiety. Healing requires moving away from punishing diets and embracing mind-body regulation.
`;

export default function PCOSArticlePage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>Women's Mental Health</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              PCOS, Hormones and Anxiety: What Medical Science & Psychology Reveal
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Ira Tiwari</strong> · Psychology Researcher & Doctoral Scholar
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>6 min read</dd></div>
            <div><dt>Research focus</dt><dd>Endocrine-psychological link</dd></div>
            <div><dt>Prevalence</dt><dd>1 in 5 Indian women</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <BlogAudioPlayer
            title="PCOS, Hormones and Anxiety: What Medical Science and Psychology Reveal"
            readTime="6 min read"
            textToRead={ARTICLE_TEXT}
          />

          <div className="clean-card" style={{ padding: '24px 22px', margin: '24px 0 36px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--espresso)', margin: '0 0 14px', textAlign: 'center' }}>Key Interaction Pathways</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              <div className="clean-card-subtle" style={{ padding: '14px 16px' }}>
                <span className="clean-pill neutral" style={{ marginBottom: 8 }}>Endocrine</span>
                <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>Hyperandrogenism, insulin resistance, and elevated systemic inflammation.</p>
              </div>
              <div className="clean-card-subtle" style={{ padding: '14px 16px' }}>
                <span className="clean-pill neutral" style={{ marginBottom: 8 }}>Neurological</span>
                <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>HPA-axis dysregulation and altered central serotonin synthesis.</p>
              </div>
              <div className="clean-card-subtle" style={{ padding: '14px 16px' }}>
                <span className="clean-pill neutral" style={{ marginBottom: 8 }}>Psychosocial</span>
                <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>Body image distress, medical dismissal, and fertility worries.</p>
              </div>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              Women diagnosed with Polycystic Ovary Syndrome across India are routinely handed a prescription for birth control, told to "just lose weight", and sent out the clinic door. Almost nobody warns them about the psychological storm that accompanies it.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              Your Anxiety Isn't "In Your Head"—It's In Your Biology
            </h2>
            <p>
              When insulin resistance is present, cells cannot take up glucose efficiently. This triggers compensatory spikes in insulin, which stimulates ovarian theca cells to overproduce androgens like testosterone.
            </p>
            <p>
              Simultaneously, chronic low-grade inflammation causes microglial activation in the brain. This neuroinflammatory state directly impairs hippocampal neurogenesis and reduces serotonin availability, precipitating sudden, inexplicable crying spells, irritability, and social anxiety.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              A Combined Mind-Body Protocol
            </h2>
            <p>
              Healing requires moving away from punishing diets and embracing somatic regulation. Psychotherapy for PCOS focuses on:
            </p>
            <ul style={{ margin: '14px 0 20px', paddingLeft: 24, display: 'grid', gap: 8 }}>
              <li><strong>Decoupling Self-Worth from Body Weight:</strong> Replacing harsh self-criticism with Acceptance and Commitment Therapy (ACT) tools.</li>
              <li><strong>Regulating Autonomic Nervous Tone:</strong> Using somatic pacing, breathwork, and boundary-setting to lower baseline cortisol.</li>
              <li><strong>Medical Advocacy:</strong> Helping you communicate assertively with gynecologists and endocrinologists without feeling dismissed.</li>
            </ul>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Looking for compassionate women’s health counselling?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                Our therapists understand the intricate link between reproductive hormones, emotional wellbeing, and somatic health.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/booking/?service=fertility">
                  Book women’s health counselling →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
