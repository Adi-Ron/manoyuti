'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

const INTERESTS = [
  'Therapy', 'Academy', 'Research mentoring', 'Organisation programmes',
  'Events', 'Research collaboration', 'Careers', 'Something else'
];

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '160px 0' }}><p className="mut">Loading contact form…</p></div>}>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilled = useRef(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: '', message: '', time: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (prefilled.current) return;
    const interest = searchParams.get('interest') || '';
    const about = searchParams.get('about') || '';
    if (!interest && !about) return;
    prefilled.current = true;
    setFormData(prev => ({
      ...prev,
      interest: INTERESTS.includes(interest) ? interest : prev.interest,
      message: about ? `I'd like to register my interest in ${about}.` : prev.message
    }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          interest: formData.interest,
          message: formData.message,
          preferred_time: formData.time || null
        })
      });
      if (!res.ok) throw new Error('Request failed');
      showToast('Thank you! We\'ll reply within 24 hours.');
      setFormData({ name: '', email: '', phone: '', interest: '', message: '', time: '' });
    } catch {
      showToast('Something went wrong. Please try again or email us directly.');
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <section className="pagehead" aria-labelledby="ct-h">
        <div className="wrap">
          <div className="txt">
            <span className="label" style={{ '--i': 0 }}>Contact us</span>
            <h1 id="ct-h" style={{ '--i': 1 }}>We're here when you're ready</h1>
            <p className="lead" style={{ '--i': 2 }}>Ask a question, register for a programme, plan a workshop or talk about research. To book therapy, use the <Link href="/booking/">booking page</Link>.</p>
          </div>
          <dl className="facts"><div><dt>We reply within</dt><dd>24 hours</dd></div><div><dt>Phone / WhatsApp</dt><dd><a href="tel:+919936724392">+91-9936724392</a></dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-label="Contact details and form">
        <div className="wrap contact-grid">
          <div className="l">
            <div className="panelbox">
              <dl className="details">
                <div><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span><div><dt>Email</dt><dd><a href="mailto:ishat1706@gmail.com">ishat1706@gmail.com</a></dd></div></div>
                <div><span className="ic blush"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg></span><div><dt>Phone / WhatsApp</dt><dd><a href="tel:+919936724392">+91-9936724392</a></dd></div></div>
                <div><span className="ic sky"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span><div><dt>Location</dt><dd>Bengaluru, Karnataka · sessions online across India</dd></div></div>
              </dl>
            </div>
            <div className="crisis"><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/></svg></span><div><h2>In crisis?</h2><p>Please don't wait for a reply. Call Tele-MANAS on <a href="tel:14416">14416</a> (free, 24/7) or go to your nearest hospital.</p></div></div>
          </div>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h2 style={{ fontSize: 'var(--t-h3)' }}>Send us a message</h2>
            <div className="two">
              <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} /></div>
              <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} /></div>
            </div>
            <div className="two">
              <div className="field"><label htmlFor="f-phone">Phone <span className="opt-l">(optional)</span></label><input id="f-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} /></div>
              <div className="field"><label htmlFor="f-interest">I'm interested in</label><select id="f-interest" name="interest" required value={formData.interest} onChange={e => setFormData(prev => ({ ...prev, interest: e.target.value }))}><option value="">Choose one</option>{INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
            </div>
            <div className="field"><label htmlFor="f-message">Message</label><textarea id="f-message" name="message" required value={formData.message} onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))} /></div>
            <div className="field"><label htmlFor="f-time">Preferred time to talk <span className="opt-l">(optional)</span></label><input id="f-time" name="time" placeholder="e.g. weekday evenings" value={formData.time} onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))} /></div>
            <p className="small soft">We reply within 24 hours. Your details are kept confidential and used only to respond to you. <Link href="/policies/#privacy">Privacy policy</Link></p>
            <div>
              <button className="btn" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : <>Send message <span className="arr" aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
