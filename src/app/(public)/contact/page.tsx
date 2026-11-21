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
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

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
    if (submitting) return;
    const form = e.currentTarget as HTMLFormElement;
    if (!formData.name.trim() || !formData.message.trim()) {
      const input = form.elements.namedItem(!formData.name.trim() ? 'name' : 'message') as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity('Please add a little text before sending.');
      input.reportValidity();
      return;
    }
    setResult(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone || null,
          interest: formData.interest,
          message: formData.message.trim(),
          preferred_time: formData.time || null
        })
      });
      if (!res.ok) throw new Error('Request failed');
      showToast('Thank you! We\'ll reply within 24 hours.');
      setResult('success');
      setFormData({ name: '', email: '', phone: '', interest: '', message: '', time: '' });
    } catch {
      setResult('error');
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
          <dl className="facts"><div><dt>We reply within</dt><dd>24 hours</dd></div><div><dt>Location</dt><dd>Bengaluru & Online</dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-label="Contact details and form">
        <div className="wrap contact-grid">
            <div className="contact-info-col">
              <div className="panelbox">
                <dl className="details">
                  <div><span className="ic sky"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></span><div><dt>Location</dt><dd>Bengaluru, Karnataka · sessions online across India</dd></div></div>
                  <div><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span><div><dt>Response time</dt><dd>Within 24 hours on all enquiries</dd></div></div>
                </dl>
              </div>
              <div className="crisis"><span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" /></svg></span><div><h2>In crisis?</h2><p>Please don't wait for a reply. Call Tele-MANAS on <a href="tel:14416">14416</a> (free, 24/7) or go to your nearest hospital.</p></div></div>
            </div>
            <form className="form" onSubmit={handleSubmit} aria-busy={submitting} onInput={e => {
              const input = e.target as HTMLInputElement | HTMLTextAreaElement;
              if (typeof input.setCustomValidity === 'function') input.setCustomValidity('');
            }}>
              <h2 style={{ fontSize: 'var(--t-h3)' }}>Send us a message</h2>
              <p className="hint">Only the fields marked optional can be left blank. Please avoid sharing private health details here.</p>
              {result && <div ref={resultRef} tabIndex={-1} className={`form-feedback ${result}`} role={result === 'error' ? 'alert' : 'status'}>
                <h3>{result === 'success' ? 'Your message has been received' : 'Your message could not be sent'}</h3>
                <p>{result === 'success' ? "Thank you for reaching out. We'll reply by email within 24 hours. You can leave this page whenever you're ready." : 'Your details are still below. Please try again, or use the contact details at the bottom of this page.'}</p>
              </div>}
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
