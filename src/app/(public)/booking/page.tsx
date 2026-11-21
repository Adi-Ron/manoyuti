'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import '@/styles/booking-receipt.css';

const SERVICES = [
  { value: 'individual', name: 'Individual therapy', len: '50 minutes', fee: '₹1,500' },
  { value: 'couples', name: 'Couples therapy', len: '60–75 minutes', fee: '₹3,000' },
  { value: 'assessment', name: 'Psychological assessment', len: 'With written report', fee: '₹999' },
  { value: 'fertility', name: 'Fertility counselling', len: '60 minutes', fee: '₹2,000' },
  { value: 'unsure', name: 'I\'m not sure yet', len: 'A first session', fee: 'Discussed first' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];

const plain = (s: string) => s.replace(/\[|\]/g, '');

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '160px 0' }}><p className="mut">Loading booking form…</p></div>}>
      <BookingForm />
    </Suspense>
  );
}

function BookingForm() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    service: '',
    format: '',
    days: [] as string[],
    times: [] as string[],
    from: '',
    name: '',
    email: '',
    phone: '',
    first: 'This would be my first session',
    note: '',
    consent: false
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [notificationPending, setNotificationPending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const service = searchParams.get('service')?.replace(/[^a-z]/g, '');
    if (service && SERVICES.some(s => s.value === service)) {
      setFormData(prev => ({ ...prev, service }));
    }
  }, [searchParams]);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDate(now.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (!sent) return;
    confirmationRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [sent]);

  const dateInDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  };

  const toggleArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'consent') {
        setFormData(prev => ({ ...prev, consent: checked }));
      } else {
        setFormData(prev => ({ ...prev, [name]: toggleArray(prev[name as 'days' | 'times'], value) }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    if (name === 'days' || name === 'times') setErrors(prev => ({ ...prev, when: false }));
  };

  const getService = () => SERVICES.find(s => s.value === formData.service);

  const svc = getService();
  const whenParts = [
    formData.days.join(', '),
    formData.times.join(', ').toLowerCase(),
    formData.from ? `from ${formData.from}` : ''
  ].filter(Boolean);

  const summary = {
    service: svc?.name ?? 'Not chosen yet',
    len: svc ? plain(svc.len) : '—',
    fee: svc ? plain(svc.fee) : '—',
    format: formData.format || '—',
    when: whenParts.join(' · ') || '—'
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {
      service: !formData.service,
      format: !formData.format,
      when: !formData.days.length || !formData.times.length,
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email),
      consent: !formData.consent,
      from: !!formData.from && formData.from < minDate
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(v => v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError('');
    if (!validate()) {
      showToast('A few details are missing. They\'re marked above.');
      requestAnimationFrame(() => {
        const invalid = document.querySelector<HTMLElement>('.book-form [aria-invalid="true"], .book-form fieldset:has(.err:not([hidden])) input');
        invalid?.focus();
        invalid?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: formData.service,
          format: formData.format,
          preferred_days: formData.days,
          preferred_times: formData.times,
          earliest_date: formData.from || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          is_returning: formData.first === 'I\'m a returning client',
          note: formData.note || null,
          consent: formData.consent
        })
      });
      if (!res.ok) throw new Error(res.status === 503 ? 'Booking requests are temporarily unavailable. Please use the contact page to reach us, or try again later. Your details are still here.' : 'Your request could not be sent. Please try again, or use the contact page to reach us. Your details are still here.');
      const result = await res.json();
      setNotificationPending(result.notification !== 'sent');
      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (sent) {
    const earliestDate = formData.from
      ? new Date(`${formData.from}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Flexible';

    return (
      <section className="booking-receipt-page" aria-label="Booking request received">
        <div className="booking-receipt" ref={confirmationRef} tabIndex={-1} aria-labelledby="receipt-title">
          <header className="booking-receipt-header">
            <p className="booking-receipt-status"><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg></span>Safely received</p>
            <h1 id="receipt-title">Request received.</h1>
            <p className="booking-receipt-thanks">Thank you, {formData.name.trim()}. We’ll reply to <strong>{formData.email.trim()}</strong> within 24 hours to arrange a time together.</p>
            <p className="booking-receipt-pending">Awaiting therapist confirmation <span aria-hidden="true">·</span> No payment taken</p>
          </header>

          <section className="booking-receipt-summary" aria-labelledby="receipt-summary-title">
            <h2 id="receipt-summary-title">The preferences you shared</h2>
            <dl>
              <div><dt>Support</dt><dd>{summary.service}<span>{summary.len} · {summary.fee}</span></dd></div>
              <div><dt>How we’ll meet</dt><dd>{summary.format}</dd></div>
              <div><dt>Preferred days & times</dt><dd>{formData.days.join(', ')}<span>{formData.times.join(', ')}</span></dd></div>
              <div><dt>Earliest date</dt><dd>{earliestDate}</dd></div>
            </dl>
          </section>

          <section className="booking-receipt-next" aria-labelledby="receipt-next-title">
            <h2 id="receipt-next-title">What happens next</h2>
            <ol>
              <li><span aria-hidden="true">1</span><div><h3>We find a time that works.</h3><p>Your therapist reviews your preferences and contacts you. Your session is confirmed once you agree on a time.</p></div></li>
              <li><span aria-hidden="true">2</span><div><h3>You receive the details.</h3><p>We share your session details, a short intake form, and payment information before you meet.</p></div></li>
            </ol>
          </section>

          {notificationPending && <p className="booking-receipt-notice" role="status">Your request is saved. Email notification is currently unavailable, so you can also <a href="mailto:ishatiwari1706@gmail.com">contact your therapist directly</a>. There’s no need to submit another request.</p>}

          <footer className="booking-receipt-footer">
            <Link className="clean-btn-primary" href="/therapy/#journey-h">What to expect from therapy <span aria-hidden="true">→</span></Link>
            <Link className="booking-receipt-contact" href="/contact/">Have a question? Contact us</Link>
          </footer>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pagehead blush" aria-labelledby="bk-h">
        <div className="wrap">
          <div className="txt">
            <Link className="back" href="/therapy/" style={{ '--i': 0 }}>← Therapy</Link>
            <h1 id="bk-h" style={{ '--i': 1 }}>Book a session</h1>
            <p className="lead" style={{ '--i': 2 }}>Tell us what you'd like and when suits you. We'll reply within 24 hours to confirm a time and send the intake form.</p>
          </div>
          <dl className="facts"><div><dt>We reply within</dt><dd>24 hours</dd></div><div><dt>Format</dt><dd>Online & In-person</dd></div></dl>
        </div>
      </section>

      <section className="sec tight" aria-label="Booking request">
        <div className="wrap book-grid">
          <form className="book-form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
            <fieldset className="step" id="s-service">
              <legend><h2>What would you like?</h2></legend>
              <div className="choices">
                {SERVICES.map(s => (
                  <label key={s.value} className="choice">
                    <input type="radio" name="service" value={s.value} data-name={s.name} data-len={s.len} data-fee={s.fee} required checked={formData.service === s.value} onChange={handleChange} />
                    <b>{s.name}</b><span>{s.len} · {s.fee}</span>
                  </label>
                ))}
              </div>
              <p className="err" id="e-service" hidden={!errors.service}>Choose a service, or "I'm not sure yet".</p>
            </fieldset>

            <fieldset className="step" id="s-format">
              <legend><h2>How would you like to meet?</h2></legend>
              <div className="choices two-up">
                <label className="choice"><input type="radio" name="format" value="Online (video)" checked={formData.format === 'Online (video)'} onChange={handleChange} required /><b>Online</b><span>Video session, anywhere in India</span></label>
                <label className="choice"><input type="radio" name="format" value="In person, Bengaluru" checked={formData.format === 'In person, Bengaluru'} onChange={handleChange} /><b>In person</b><span>Bengaluru</span></label>
              </div>
              <p className="err" id="e-format" hidden={!errors.format}>Choose online or in person.</p>
            </fieldset>

            <fieldset className="step" id="s-when">
              <legend><h2>When suits you?</h2></legend>
              <p className="hint">Pick every day and time that could work. We'll offer the nearest free slot.</p>
              <p className="group-label" id="days-label">Days</p>
              <div className="pills" role="group" aria-labelledby="days-label">
                {DAYS.map(d => <label key={d} className="pill"><input type="checkbox" name="days" value={d} checked={formData.days.includes(d)} onChange={handleChange} />{d}</label>)}
              </div>
              <p className="group-label" id="times-label">Time of day</p>
              <div className="pills" role="group" aria-labelledby="times-label">
                {TIMES.map(t => <label key={t} className="pill"><input type="checkbox" name="times" value={t} checked={formData.times.includes(t)} onChange={handleChange} />{t}</label>)}
              </div>
              <div className="date-row">
                <div className="field">
                  <label htmlFor="b-from">Earliest date <span className="opt-l">(optional)</span></label>
                  <div className="date-input-wrap">
                    <svg className="date-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
                    <input id="b-from" name="from" type="date" min={minDate || undefined} value={formData.from} onChange={handleChange} aria-invalid={errors.from} aria-describedby={errors.from ? 'e-date' : undefined} />
                  </div>
                </div>
                <div className="date-quick" role="group" aria-label="Quick date options">
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, from: dateInDays(3) }))}>In a few days</button>
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, from: dateInDays(7) }))}>Next week</button>
                  {formData.from && <button type="button" className="clear" onClick={() => setFormData(prev => ({ ...prev, from: '' }))}>Clear</button>}
                </div>
              </div>
              <p className="err" id="e-when" hidden={!errors.when}>Pick at least one day and one time of day.</p>
              <p className="err" id="e-date" hidden={!errors.from}>Choose today or a later date.</p>
            </fieldset>

            <fieldset className="step" id="s-you">
              <legend><h2>About you</h2></legend>
              <div className="two">
                <div className="field"><label htmlFor="b-name">Name</label><input id="b-name" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} aria-invalid={errors.name} /></div>
                <div className="field"><label htmlFor="b-email">Email</label><input id="b-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} aria-invalid={errors.email} /></div>
              </div>
              <div className="two">
                <div className="field"><label htmlFor="b-phone">Phone or WhatsApp <span className="opt-l">(optional)</span></label><input id="b-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} /></div>
                <div className="field"><label htmlFor="b-first">Have you seen us before?</label><select id="b-first" name="first" value={formData.first} onChange={handleChange}><option>This would be my first session</option><option>I'm a returning client</option></select></div>
              </div>
              <div className="field"><label htmlFor="b-note">Anything you'd like us to know <span className="opt-l">(optional)</span></label><textarea id="b-note" name="note" placeholder="For example, a language preference, or whether you'd prefer a female therapist" value={formData.note} onChange={handleChange} /><p className="hint">Please keep this brief. There's no need to share health details here; we'll talk about what brings you in during your first session.</p></div>
              <div className="consent-card">
                <label className="consent-row" htmlFor="b-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    id="b-consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span className="consent-text">
                    <strong>I understand Manoyuti is not an emergency service</strong>, and I am happy to be contacted about this booking request.
                  </span>
                </label>
                <div className="consent-policy-note">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>
                    Your details are kept strictly confidential. Please review our{' '}
                    <Link href="/terms-conditions/" className="policy-link" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link>,{' '}
                    <Link href="/policies/#privacy" className="policy-link" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link href="/policies/#cancellation" className="policy-link" target="_blank" rel="noopener noreferrer">Cancellation Policy</Link>.
                  </span>
                </div>
              </div>
              <p className="err" id="e-you" hidden={!errors.consent && !errors.name && !errors.email}>
                Please fill in your name, valid email, and confirm the acknowledgment box above.
              </p>
            </fieldset>

            {submitError && <p className="booking-error" role="alert">{submitError} <Link href="/contact/">Contact us</Link></p>}
            <div className="send-action-bar">
              <button className="btn btn-booking-submit" type="submit" disabled={submitting}>
                <span>{submitting ? 'Sending request…' : 'Send booking request'}</span>
                <span className="arr" aria-hidden="true">→</span>
              </button>
              <div className="send-assurance">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>We reply within 24 hours. Your information is held strictly confidential.</span>
              </div>
            </div>
          </form>

          <aside className="summary" aria-labelledby="sum-h">
            <div className="sum-box green">
              <h2 id="sum-h">Your request</h2>
              <dl className="sum" aria-live="polite">
                <div><dt>Service</dt><dd>{summary.service}</dd></div>
                <div><dt>Length</dt><dd>{summary.len}</dd></div>
                <div><dt>Fee</dt><dd>{summary.fee}</dd></div>
                <div><dt>Where</dt><dd>{summary.format}</dd></div>
                <div><dt>When</dt><dd>{summary.when}</dd></div>
              </dl>
            </div>
            <div className="sum-box">
              <h3>What happens next</h3>
              <ul className="ticks">
                <li>We reply within 24 hours with a confirmed time.</li>
                <li>You receive a short intake form to fill in before you meet.</li>
                <li>Pay by UPI or credit card before your session; details come with your confirmation.</li>
                <li>Need to change the time? Give us 24 hours' notice. <Link href="/policies/#cancellation">Cancellation policy</Link></li>
              </ul>
            </div>
            <p className="disclaimer">In crisis? Don't wait for a reply. Call Tele-MANAS on <a href="tel:14416">14416</a> (free, 24/7) or go to your nearest hospital.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
