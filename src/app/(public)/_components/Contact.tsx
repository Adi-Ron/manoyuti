'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

const PRESET_SLOTS = [
  'Weekday morning (8:00 AM – 12:00 PM)',
  'Weekday afternoon (12:00 PM – 4:00 PM)',
  'Weekday evening (4:00 PM – 8:00 PM)',
  'Late evening (8:00 PM – 10:00 PM)',
  'Weekend morning (9:00 AM – 1:00 PM)',
  'Weekend afternoon (2:00 PM – 6:00 PM)',
  'Custom / Specific day & time'
];

export function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    timeSlot: PRESET_SLOTS[0],
    customTime: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const finalTime = formData.timeSlot === 'Custom / Specific day & time'
      ? (formData.customTime ? `Custom: ${formData.customTime}` : 'Custom time requested')
      : (formData.customTime ? `${formData.timeSlot} (Note: ${formData.customTime})` : formData.timeSlot);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interest: 'General enquiry',
          message: formData.message || 'General enquiry',
          preferred_time: finalTime
        })
      });

      if (!res.ok) throw new Error('Request failed');

      showToast('Thank you! We\'ll reply within 24 hours to confirm your session.');
      setFormData({
        name: '',
        email: '',
        timeSlot: PRESET_SLOTS[0],
        customTime: '',
        message: ''
      });
    } catch {
      showToast('Something went wrong. Please try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const isCustom = formData.timeSlot === 'Custom / Specific day & time';

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg2)', padding: 'clamp(52px, 7vw, 84px) 5vw' }}>
      <div className="wrap" style={{ maxWidth: 840, margin: '0 auto' }}>
        <div
          className="card rv home-contact-card"
          style={{
            padding: 'clamp(30px, 4.5vw, 48px)',
            borderRadius: 18,
            boxShadow: '0 24px 50px -28px rgba(43,37,32,0.35)',
            border: '1px solid var(--line)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 30px' }}>
            <span className="eyebrow" style={{ marginBottom: 8, color: 'var(--bronze)' }}>Begin</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', margin: '0 0 10px', color: 'var(--espresso)' }}>
              Request a <em>consultation.</em>
            </h2>
            <p className="mut" style={{ fontSize: '1.02rem', lineHeight: 1.55, margin: 0 }}>
              Tell us your preferences and schedule. We'll reply within 24 hours to confirm your private slot and send the welcome intake form.
            </p>
          </div>

          <form id="f" onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
            <div className="home-contact-fields" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <div>
                <label htmlFor="n" style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--espresso)', display: 'block', marginBottom: 6 }}>
                  Your name *
                </label>
                <input
                  id="n"
                  type="text"
                  required
                  placeholder="e.g. Ananya Rao"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    font: 'inherit',
                    width: '100%',
                    padding: '13px 15px',
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    background: 'var(--bg)',
                    color: 'var(--ink)'
                  }}
                />
              </div>
              <div>
                <label htmlFor="e" style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--espresso)', display: 'block', marginBottom: 6 }}>
                  Email address *
                </label>
                <input
                  id="e"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    font: 'inherit',
                    width: '100%',
                    padding: '13px 15px',
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    background: 'var(--bg)',
                    color: 'var(--ink)'
                  }}
                />
              </div>
            </div>

            {/* Time Slot Selection with Custom option */}
            <div>
              <div className="home-contact-slot-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label htmlFor="t" style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--espresso)', margin: 0 }}>
                  Preferred time window
                </label>
                <span style={{ fontSize: '.78rem', color: '#446853', fontWeight: 600 }}>
                  Flexible scheduling
                </span>
              </div>
              <select
                id="t"
                value={formData.timeSlot}
                onChange={e => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                style={{
                  font: 'inherit',
                  width: '100%',
                  padding: '13px 15px',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  cursor: 'pointer'
                }}
              >
                {PRESET_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Custom Time Input (shown whenever Custom is selected or to add specific exact time) */}
            <div
              style={{
                background: isCustom ? 'rgba(68, 104, 83, 0.08)' : 'transparent',
                border: isCustom ? '1.5px dashed #446853' : 'none',
                borderRadius: 8,
                padding: isCustom ? '14px 16px' : 0,
                transition: 'all 0.25s ease'
              }}
            >
              <label
                htmlFor="custom-time"
                style={{
                  fontSize: '.85rem',
                  fontWeight: 600,
                  color: isCustom ? '#355341' : 'var(--mut)',
                  display: 'block',
                  marginBottom: 6
                }}
              >
                {isCustom ? 'Specify your custom preferred day & time *' : 'Have a specific day/time in mind? (optional)'}
              </label>
              <input
                id="custom-time"
                type="text"
                required={isCustom}
                placeholder="e.g. Saturdays at 11:30 AM, or weekdays after 7:30 PM IST"
                value={formData.customTime}
                onChange={e => setFormData(prev => ({ ...prev, customTime: e.target.value }))}
                style={{
                  font: 'inherit',
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  background: 'var(--bg)',
                  color: 'var(--ink)'
                }}
              />
            </div>

            <div>
              <label htmlFor="m" style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--espresso)', display: 'block', marginBottom: 6 }}>
                Anything you'd like us to know <span style={{ fontWeight: 400, opacity: 0.7 }}>(optional)</span>
              </label>
              <textarea
                id="m"
                rows={3}
                placeholder="Briefly tell us what you're seeking support for or any questions you have..."
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                style={{
                  font: 'inherit',
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, paddingTop: 6 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '.82rem', color: 'var(--mut)' }}>
                <span>🔒 Confidential & private</span>
                <span>⏱ 24-hour response guarantee</span>
                <span>📍 Online & Bengaluru</span>
              </div>
              <button
                className="btn"
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? 'var(--mut)' : 'var(--ink)',
                  padding: '12px 24px',
                  fontSize: '.95rem'
                }}
              >
                {submitting ? 'Sending...' : 'Send request →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
