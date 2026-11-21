import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogAudioPlayer } from '@/components/ui/BlogAudioPlayer';

export const metadata: Metadata = {
  title: 'How to Write a Clinical Case History | Manoyuti Bengaluru',
  description: 'A complete clinical guide for psychology interns and students in Bengaluru on structuring intake notes, MSE, and 5P biopsychosocial case formulations.',
  keywords: ['clinical case history psychology', 'MSE mental status exam India', 'psychology internship Bengaluru', 'case formulation tutorial'],
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946'
  }
};

const ARTICLE_TEXT = `
One of the most common complaints clinical supervisors in Bengaluru hospitals and clinics have about intern reports is this: "This is a transcript, not a case history." A professional clinical case history is an interpretive document that links presenting symptoms to predisposing vulnerabilities, triggers, and maintaining factors. Using the 5P biopsychosocial framework—Presenting, Predisposing, Precipitating, Perpetuating, and Protective factors—interns can structure ethical, professional reports that earn supervisor respect and pass ethics boards.
`;

export default function CaseHistoryArticlePage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/blog/" style={{ marginBottom: 12, display: 'inline-block' }}>← Back to All Articles</Link>
            <span className="clean-pill neutral" style={{ marginBottom: 12 }}>For Psychology Students</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.15, margin: '8px 0 14px', color: 'var(--espresso)' }}>
              How to Write a Clinical Case History That Supervisors & Ethics Boards Trust
            </h1>
            <p className="lead" style={{ fontSize: '1.12rem', color: 'var(--mut)', margin: 0 }}>
              Written by <strong>Isha Tiwari</strong> · Assistant Professor & Clinical Supervisor, Bengaluru
            </p>
          </div>
          <dl className="facts">
            <div><dt>Reading time</dt><dd>8 min read</dd></div>
            <div><dt>Level</dt><dd>BA / MA Psychology Interns</dd></div>
            <div><dt>Includes</dt><dd>MSE & 5P Formulation Templates</dd></div>
          </dl>
        </div>
      </section>

      <section className="clean-section clean-section-paper">
        <article className="wrap article" style={{ maxWidth: 840, margin: '0 auto' }}>
          
          <BlogAudioPlayer
            title="How to Write a Clinical Case History That Supervisors and Ethics Boards Trust"
            readTime="8 min read"
            textToRead={ARTICLE_TEXT}
          />

          <div className="clean-card" style={{ padding: '26px 22px', margin: '24px 0 36px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--espresso)', margin: '0 0 14px', textAlign: 'center' }}>
              The 5P Biopsychosocial Formulation Framework
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
              <div className="clean-card-subtle" style={{ padding: 12, textAlign: 'center' }}>
                <strong style={{ fontSize: '.85rem', color: 'var(--espresso)', display: 'block', marginBottom: 2 }}>1. Presenting</strong>
                <small style={{ color: 'var(--mut)' }}>Current issues</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: 12, textAlign: 'center' }}>
                <strong style={{ fontSize: '.85rem', color: 'var(--espresso)', display: 'block', marginBottom: 2 }}>2. Predisposing</strong>
                <small style={{ color: 'var(--mut)' }}>Vulnerabilities</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: 12, textAlign: 'center' }}>
                <strong style={{ fontSize: '.85rem', color: 'var(--espresso)', display: 'block', marginBottom: 2 }}>3. Precipitating</strong>
                <small style={{ color: 'var(--mut)' }}>Triggers</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: 12, textAlign: 'center' }}>
                <strong style={{ fontSize: '.85rem', color: 'var(--espresso)', display: 'block', marginBottom: 2 }}>4. Perpetuating</strong>
                <small style={{ color: 'var(--mut)' }}>Maintaining loops</small>
              </div>
              <div className="clean-card-subtle" style={{ padding: 12, textAlign: 'center' }}>
                <strong style={{ fontSize: '.85rem', color: 'var(--espresso)', display: 'block', marginBottom: 2 }}>5. Protective</strong>
                <small style={{ color: 'var(--mut)' }}>Strengths & coping</small>
              </div>
            </div>
          </div>

          <div className="prose" style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--ink)' }}>
            <p className="lead" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: 20 }}>
              One of the most common complaints clinical supervisors in Bengaluru hospitals and clinics have about intern reports is this: <em>"This is a transcript, not a case history."</em>
            </p>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              The Essential Sections of a Standard Case History
            </h2>
            <div style={{ display: 'grid', gap: 14, margin: '16px 0 24px' }}>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>1. Demographic Details & Informant Reliability</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  Age, gender, educational status, occupation, and whether the history was provided by the client, family, or both, along with an assessment of informant reliability.
                </span>
              </div>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>2. Chief Complaints in Client’s Own Verbatim Words</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  Always record the presenting complaints in quotation marks in the client's own language, alongside the exact duration of each symptom.
                </span>
              </div>
              <div className="clean-card-subtle" style={{ padding: 18 }}>
                <strong style={{ color: 'var(--espresso)', display: 'block', marginBottom: 4, fontSize: '.98rem' }}>3. Systematic Mental Status Examination (MSE)</strong>
                <span style={{ fontSize: '.92rem', color: 'var(--mut)', lineHeight: 1.55 }}>
                  Document General Appearance, Speech (rate, tone, volume), Mood (subjective) vs Affect (objective congruency), Thought (form, stream, content, delusions), Perception (hallucinations), and Insight level (Grades 1 to 6).
                </span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.65rem', color: 'var(--espresso)', margin: '30px 0 12px' }}>
              Common Intern Pitfalls to Avoid
            </h2>
            <ul style={{ margin: '14px 0 20px', paddingLeft: 24, display: 'grid', gap: 8 }}>
              <li><strong>Confusing Affect with Mood:</strong> Mood is the sustained internal emotional climate reported by the patient; affect is the moment-to-moment emotional expression observed by the clinician.</li>
              <li><strong>Omitting Negative Findings:</strong> If the client denies suicidal ideation or perceptual disturbances, document <em>"No active suicidal intent; no hallucinations reported"</em> rather than leaving it blank.</li>
              <li><strong>Violating Anonymization:</strong> In academic submissions, always use initials or pseudonyms to maintain strict confidentiality.</li>
            </ul>

            <div className="clean-card" style={{ padding: 28, margin: '40px 0 20px' }}>
              <h3 style={{ margin: '0 0 8px', color: 'var(--espresso)', fontSize: '1.25rem' }}>Want hands-on supervision for your clinical reports?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '.95rem', color: 'var(--mut)', lineHeight: 1.6 }}>
                Join our Clinical Psychology Internship and Masterclasses in Bengaluru and online. Learn how to write reports that stand up to the highest hospital standards.
              </p>
              <div>
                <Link className="clean-btn-primary" href="/training/clinical-internship/">
                  Explore Clinical Internship →
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
