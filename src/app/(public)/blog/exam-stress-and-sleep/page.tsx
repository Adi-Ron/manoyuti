import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'Exam Stress, Anxiety and Broken Sleep | Manoyuti Bengaluru',
  description: 'Evidence-based psychology strategies for students and competitive exam aspirants in Bengaluru to manage exam anxiety and protect restorative sleep.',
  keywords: ['exam stress India', 'student mental health Bengaluru', 'sleep anxiety', 'psychologist for students Bengaluru'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
Across Bengaluru and India, intense academic pressure frequently turns sleep into the first sacrificial lamb. Students are told to wake up at 4 AM or stay up late with energy drinks. But neuroscience tells us the exact opposite. When you sleep, your hippocampus replays the day’s learning, transferring concepts into long-term neocortical memory stores. When you pull an all-nighter, this transfer mechanism breaks down. You may recognize answers on paper, but your recall speed drops by up to 35 percent.
`;

export default function ExamStressBlogPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>Student Wellbeing</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              Exam Stress, Anxiety and Broken Sleep: An Evidence-Based Guide for Indian Students
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Isha Tiwari</strong> · Assistant Professor, Amity University, Bengaluru
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>5 min read</dd></div>
            <div><dt>Focus</dt><dd>Sleep hygiene & Cognitive overload</dd></div>
            <div><dt>Audience</dt><dd>Students & Exam Aspirants</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <BlogAudioPlayer
            title="Exam Stress, Anxiety and Broken Sleep: An Evidence-Based Guide"
            readTime="5 min read"
            textToRead={ARTICLE_TEXT}
          />

          <div className="clean-card" style={{ padding: '24px 20px', margin: '24px 0 36px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 4 }}>⚡</span>
              <strong style={{ fontSize: '.9rem', color: 'var(--espresso)' }}>High Cortisol</strong>
              <small style={{ display: 'block', color: 'var(--mut)' }}>Fights melatonin onset</small>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--mut)' }}>→</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 4 }}>📉</span>
              <strong style={{ fontSize: '.9rem', color: 'var(--espresso)' }}>Memory Impairment</strong>
              <small style={{ display: 'block', color: 'var(--mut)' }}>REM consolidation blocked</small>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--mut)' }}>→</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 4 }}>🌿</span>
              <strong style={{ fontSize: '.9rem', color: 'var(--sage)' }}>Somatic Reset</strong>
              <small style={{ display: 'block', color: 'var(--mut)' }}>Restoring slow-wave sleep</small>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              Across Bengaluru and India, intense academic pressure frequently turns sleep into the first sacrificial lamb. Students are told to wake up at 4 AM or stay up late with energy drinks. But neuroscience tells us the exact opposite.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              What Happens to the Brain Under Exam Deprivation
            </h2>
            <p>
              When you sleep, your hippocampus replays the day’s learning, transferring concepts into long-term neocortical memory stores. When you pull an all-nighter, this transfer mechanism breaks down. You may recognize answers on paper, but your recall speed drops by up to 35 percent.
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              Three Concrete Interventions That Actually Work
            </h2>
            <div style={{ display: 'grid', gap: 14, margin: '16px 0 24px' }}>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>1. The 15-Minute "Worry Dump" Protocol</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  At 9 PM, sit with a physical notebook and write out every scary outcome your brain is predicting. Close the notebook. This gives your working memory cognitive permission to power down.
                </span>
              </div>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>2. The Physiological Sigh Before Turning Off the Light</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  Two quick inhales through the nose followed by a long, slow exhale through the mouth. Doing this 5 times rapidly activates parasympathetic vagal tone and lowers heart rate.
                </span>
              </div>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>3. The Non-Negotiable 7-Hour Floor</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  A student with 7 hours of sleep and 4 hours of revision consistently outperforms a student with 3 hours of sleep and 9 hours of revision. Prioritize sleep as your highest-ROI study tool.
                </span>
              </div>
            </div>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Need individual support navigating academic anxiety?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                We work with high-school students, university candidates, and competitive exam aspirants across Bengaluru and online.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/booking/?service=individual">
                  Book a student consultation →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
