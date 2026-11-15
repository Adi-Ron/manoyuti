'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    time: 'Weekday morning',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

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
          interest: 'General enquiry',
          message: formData.message || 'General enquiry',
          preferred_time: formData.time
        })
      });

      if (!res.ok) throw new Error('Request failed');

      showToast('Thank you! We\'ll reply within 24 hours.');
      setFormData({ name: '', email: '', time: 'Weekday morning', message: '' });
    } catch {
      showToast('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap two" style={{ alignItems: 'start' }}>
        <div className="rv">
          <span className="eyebrow">Begin</span>
          <h2>Request a <em>consultation.</em></h2>
          <p className="mut">Choose a service, tell us when suits you, and we'll reply within 24 hours to confirm a time and send the intake form.</p>
        </div>
        <form className="card rv" id="f" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="n" style={{ fontSize: '.85rem', color: 'var(--mut)' }}>Name</label>
            <input
              id="n"
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{ font: 'inherit', width: '100%', padding: '13px 15px', border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)' }}
            />
          </div>
          <div>
            <label htmlFor="e" style={{ fontSize: '.85rem', color: 'var(--mut)' }}>Email</label>
            <input
              id="e"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              style={{ font: 'inherit', width: '100%', padding: '13px 15px', border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)' }}
            />
          </div>
          <div>
            <label htmlFor="t" style={{ fontSize: '.85rem', color: 'var(--mut)' }}>Preferred time</label>
            <select
              id="t"
              value={formData.time}
              onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
              style={{ font: 'inherit', width: '100%', padding: '13px 15px', border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)' }}
            >
              <option>Weekday morning</option>
              <option>Weekday evening</option>
              <option>Weekend</option>
            </select>
          </div>
          <div>
            <label htmlFor="m" style={{ fontSize: '.85rem', color: 'var(--mut)' }}>Anything you'd like us to know (optional)</label>
            <textarea
              id="m"
              rows={3}
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              style={{ font: 'inherit', width: '100%', padding: '13px 15px', border: '1px solid var(--line)', borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)' }}
            />
          </div>
          <button
            className="btn"
            type="submit"
            disabled={submitting}
            style={{ background: submitting ? 'var(--mut)' : 'var(--ink)' }}
          >
            {submitting ? 'Sending...' : 'Send request'}
          </button>
        </form>
      </div>
    </section>
  );
}