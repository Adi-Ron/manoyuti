'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPostMeta {
  slug: string;
  category: string;
  readTime: string;
  published: string;
  title: string;
  desc: string;
}

const POSTS: BlogPostMeta[] = [
  {
    slug: 'what-actually-happens-in-cbt',
    category: 'Therapy Explained',
    readTime: '6 min read',
    published: 'Updated Nov 2026',
    title: 'What happens in CBT?',
    desc: 'A gentle guide to cognitive behavioural therapy, from your first conversation to the skills you practise between sessions.'
  },
  {
    slug: 'exam-stress-and-sleep',
    category: 'Student Wellbeing',
    readTime: '5 min read',
    published: 'Nov 2026',
    title: 'When exam stress affects your sleep',
    desc: 'Understand the connection between academic pressure and sleep, with practical habits to support you through exam season.'
  },
  {
    slug: 'ocd-is-more-than-being-tidy',
    category: 'Understanding Conditions',
    readTime: '7 min read',
    published: 'Nov 2026',
    title: 'OCD is more than being tidy',
    desc: 'Making sense of obsessions and compulsions, and how exposure and response prevention can support recovery.'
  },
  {
    slug: 'pcos-and-mood',
    category: "Women's Mental Health",
    readTime: '6 min read',
    published: 'Nov 2026',
    title: 'PCOS, hormones and your mood',
    desc: 'Explore how PCOS and emotional wellbeing can affect each other, and where psychological support may help.'
  },
  {
    slug: 'why-same-argument',
    category: 'Relationships',
    readTime: '5 min read',
    published: 'Nov 2026',
    title: 'Why does the same argument keep coming back?',
    desc: 'Look beneath familiar disagreements to understand the needs, fears and patterns that can keep couples feeling stuck.'
  },
  {
    slug: 'writing-case-history',
    category: 'For Psychology Students',
    readTime: '8 min read',
    published: 'Nov 2026',
    title: 'Writing a thoughtful clinical case history',
    desc: 'A practical starting point for psychology students learning to organise intake notes, case formulations and ethical documentation.'
  }
];

const CATEGORIES = ['All', 'Therapy Explained', 'Student Wellbeing', 'Understanding Conditions', "Women's Mental Health", 'Relationships', 'For Psychology Students'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(post => post.category === activeCategory);

  return (
    <>
      <section className="care-hero" aria-labelledby="journal-title">
        <div className="wrap care-hero-grid">
          <div className="care-intro">
            <span className="care-kicker">The Manoyuti journal</span>
            <h1 id="journal-title">A little understanding can go a long way.</h1>
            <p className="care-lead">Thoughtful reads on mental health, relationships and everyday wellbeing, grounded in psychological research.</p>
          </div>
          <div className="care-hero-note"><span className="care-kicker">At your own pace</span><p>Read quietly, listen to an article, or find a topic that meets you where you are.</p><span className="care-card-meta">5–8 minute reads · Audio narration available</span></div>
        </div>
      </section>

      <section className="care-section" aria-label="Journal articles">
        <div className="wrap">
          <div className="care-filters" role="group" aria-label="Filter articles by category">
            {CATEGORIES.map(category => (
              <button key={category} type="button" aria-pressed={activeCategory === category} aria-controls="article-results" onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <p className="care-result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{activeCategory === 'All' ? ' to explore' : ` in ${activeCategory}`}</p>
          <div id="article-results" className="care-grid care-grid-three">
            {filtered.map(post => (
              <article key={post.slug} className="care-card care-journal-card">
                <span className="care-kicker">{post.category}</span>
                <h2><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h2>
                <p>{post.desc}</p>
                <div className="care-card-footer">
                  <span className="care-card-meta">{post.readTime} · {post.published}</span>
                  <Link href={`/blog/${post.slug}/`} className="care-link" aria-label={`Read ${post.title}`}>Read article <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
