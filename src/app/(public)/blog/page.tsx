'use client';

import { useState } from 'react';
import Link from 'next/link';

const POSTS = [
  { slug: 'what-actually-happens-in-cbt', category: 'Therapy Explained', readTime: '6 min read', title: 'What actually happens in CBT?', desc: 'A walk through the first, middle and final sessions of cognitive behavioural therapy, and what the research says about it.' },
  { slug: 'exam-stress-and-sleep', category: 'Student Wellbeing', readTime: 'coming soon', title: 'Exam stress and sleep', desc: 'Practical, evidence-based ways to protect sleep during exam season.', soon: true },
  { slug: 'ocd-is-more-than-being-tidy', category: 'Understanding Conditions', readTime: 'coming soon', title: 'OCD is more than being tidy', desc: 'What obsessions and compulsions really look like, and why the everyday use of \'OCD\' gets it wrong.', soon: true },
  { slug: 'pcos-and-mood', category: "Women's Mental Health", readTime: 'coming soon', title: 'PCOS and mood: what the research says', desc: 'How PCOS can affect anxiety, low mood and body image, and what kinds of support help.', soon: true },
  { slug: 'why-same-argument', category: 'Relationships', readTime: 'coming soon', title: 'Why the same argument keeps coming back', desc: 'Recurring conflict in couples often isn\'t about the topic. A look at the patterns underneath.', soon: true },
  { slug: 'writing-case-history', category: 'For Psychology Students', readTime: 'coming soon', title: 'Writing a case history that helps', desc: 'A practical guide for interns on structuring a case history your supervisor will thank you for.', soon: true },
];

const CATEGORIES = ['All', 'For Psychology Students', 'Relationships', 'Student Wellbeing', 'Therapy Explained', 'Understanding Conditions', "Women's Mental Health"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="pagehead sand" aria-labelledby="bl-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h14"/><path d="M8 7h8M8 11h6"/></svg> The Resilio blog</span>
            <h1 id="bl-h" style={{ '--i': 1 }}>Research you can read</h1>
            <p className="lead" style={{ '--i': 2 }}>Clear, research-backed articles on mental health, therapy and psychology.</p>
          </div>
          <dl className="facts"><div><dt>Every article</dt><dd>lists its sources</dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-labelledby="list-h">
        <div className="wrap">
          <h2 id="list-h" className="vh">Articles</h2>
          <div className="filters" role="group" aria-label="Filter articles by topic" id="filters">
            {CATEGORIES.map((cat, i) => (
              <button key={cat} type="button" aria-pressed={activeCategory === cat} data-cat={cat} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <ol className="posts" id="postGrid">
            {filtered.map((post, i) => (
              <li key={post.slug} className={`post-row rv ${post.soon ? 'soon' : ''}`} data-cat={post.category} style={{ '--i': i }}>
                <p className="cat">{post.category} · {post.readTime}</p>
                <div className="txt">
                  <h3><Link href={post.soon ? '#' : `/blog/${post.slug}/`}>{post.title}</Link></h3>
                  <p>{post.desc}</p>
                  {!post.soon && <p><Link className="link" href={`/blog/${post.slug}/`}>Read article <span className="arr" aria-hidden="true">→</span></Link></p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="soft" id="noPosts" hidden>No articles on this topic yet.</p>
        </div>
      </section>
    </>
  );
}