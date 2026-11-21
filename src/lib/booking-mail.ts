import nodemailer from 'nodemailer';

export interface BookingMailDetails {
  id: string;
  name: string;
  email: string;
  service_type: string;
  format: string;
  preferred_days?: string[] | null;
  preferred_times?: string[] | null;
  earliest_date?: string | null;
  phone?: string | null;
}

export interface BookingConfirmationDetails {
  /** YYYY-MM-DD, interpreted as the appointment date in India. */
  date: string;
  /** Human-readable time, including timezone when not IST. */
  time: string;
  /** Video meeting instructions/link or the full in-person address. */
  location: string;
}

export type MailDeliveryResult = { status: 'sent' } | { status: 'unavailable' | 'failed'; error: string };

const THERAPIST_EMAIL = 'ishatiwari1706@gmail.com';
const escapeHTML = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
const serviceNames: Record<string, string> = { individual: 'Individual therapy', couples: 'Couples therapy', assessment: 'Psychological assessment', fertility: 'Fertility counselling', unsure: 'First session — service to discuss' };

function smtpConfiguration() {
  // Spaces restrict outbound ports to 80/443/8080; use the HTTPS provider there.
  if (process.env.SPACE_ID) return null;
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || '587');
  if (!host || !user || !pass || /^(your-|example|placeholder)/i.test(user) || /^(your-|example|placeholder)/i.test(pass) || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  return { host, port, secure: port === 465, requireTLS: port !== 465, auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, dnsTimeout: 5000, disableFileAccess: true, disableUrlAccess: true };
}

/** Checks server configuration only; does not connect or send a test email. */
export function isBookingMailConfigured(): boolean {
  return httpsConfiguration() !== null || smtpConfiguration() !== null;
}

function httpsConfiguration() {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.MAIL_FROM?.trim();
  if (!key || /^(your-|example|placeholder)/i.test(key) || !from || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(from)) return null;
  return { key, from };
}

async function deliver(to: string, replyTo: string, subject: string, text: string, id: string): Promise<MailDeliveryResult> {
  const https = httpsConfiguration();
  if (https) {
    if (![to, replyTo].every(email => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))) return { status: 'failed', error: 'An email address is invalid.' };
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${https.key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `manoyuti-${id}` },
        body: JSON.stringify({ from: `Manoyuti <${https.from}>`, to: [to], reply_to: replyTo, subject, text,
          html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#2a211e;max-width:600px;margin:auto;padding:32px;background:#fbf8f2"><p>MANOYUTI</p><div style="white-space:pre-wrap">${escapeHTML(text)}</div></div>` }),
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) return { status: 'failed', error: 'The email provider did not accept the message. The booking remains saved.' };
      const result = await response.json();
      return result.id ? { status: 'sent' } : { status: 'failed', error: 'Email acceptance could not be confirmed. Check delivery before retrying.' };
    } catch { return { status: 'failed', error: 'Email acceptance could not be confirmed. Check delivery before retrying.' }; }
  }
  const config = smtpConfiguration();
  if (!config) return { status: 'unavailable', error: 'Email delivery is not configured. The booking remains saved; contact the therapist directly.' };
  if (![to, replyTo, config.auth.user].every(email => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))) return { status: 'failed', error: 'Email delivery could not start because an email address is invalid.' };
  let transport: ReturnType<typeof nodemailer.createTransport> | undefined;
  try {
    transport = nodemailer.createTransport(config);
    const result = await transport.sendMail({
      from: { name: 'Manoyuti', address: config.auth.user },
      to: { address: to, name: to === THERAPIST_EMAIL ? 'Isha Tiwari' : '' },
      replyTo: { address: replyTo, name: '' },
      subject,
      text,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#2a211e;max-width:600px;margin:0 auto;padding:32px;background:#fbf8f2"><p style="color:#596447;font-size:14px;letter-spacing:2px">MANOYUTI</p><div style="white-space:pre-wrap">${escapeHTML(text)}</div></div>`,
      // A stable identifier helps mail clients recognize retransmissions; it is
      // not a substitute for database-backed delivery/idempotency locking.
      messageId: `<${id.replace(/[^a-zA-Z0-9-]/g, '')}@manoyuti.booking>`,
      disableFileAccess: true,
      disableUrlAccess: true
    });
    const accepted = (result.accepted ?? []).some((address: string | { address: string }) => (typeof address === 'string' ? address : address.address).toLowerCase() === to.toLowerCase());
    if (!accepted || result.rejected?.length) return { status: 'failed', error: 'The email provider did not accept the recipient. The booking remains saved.' };
    return { status: 'sent' };
  } catch {
    // Never surface provider credentials, client details, or raw SMTP responses.
    return { status: 'failed', error: 'Email acceptance could not be confirmed. The booking remains saved; check delivery before retrying.' };
  } finally {
    transport?.close();
  }
}

export async function sendTherapistBookingNotification(booking: BookingMailDetails): Promise<MailDeliveryResult> {
  const preferences = [booking.preferred_days?.join(', '), booking.preferred_times?.join(', '), booking.earliest_date ? `From ${booking.earliest_date}` : 'Earliest date: flexible'].filter(Boolean).join(' · ');
  const text = `A new booking request is waiting for review. This is not a confirmed appointment.\n\nReference: ${booking.id}\nName: ${booking.name}\nEmail: ${booking.email}\n${booking.phone ? `Phone: ${booking.phone}\n` : ''}Service: ${serviceNames[booking.service_type] ?? booking.service_type}\nFormat: ${booking.format}\nPreferences (India time): ${preferences}\n\nOpen the Manoyuti admin booking list to confirm the date, time and meeting details. The client will receive a confirmation email only after you confirm the appointment.\n\nPersonal notes are available in the protected admin area and are not included in this email.`;
  return deliver(THERAPIST_EMAIL, booking.email, 'Manoyuti · New booking request', text, `request-${booking.id}`);
}

export async function sendClientBookingConfirmation(booking: BookingMailDetails, confirmation: BookingConfirmationDetails): Promise<MailDeliveryResult> {
  const parsedDate = new Date(`${confirmation.date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(confirmation.date) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== confirmation.date || !confirmation.time.trim() || !confirmation.location.trim()) return { status: 'failed', error: 'A valid appointment date, time and location are required before sending confirmation.' };
  const date = parsedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const text = `Hello ${booking.name},\n\nYour appointment with Manoyuti is confirmed.\n\nDate: ${date}\nTime: ${confirmation.time} (India Standard Time, UTC+05:30)\nFormat: ${booking.format}\nMeeting details: ${confirmation.location}\nReference: ${booking.id}\n\nThere is nothing you need to prepare. If you have questions or need to change your appointment, reply to this email. Please give at least 24 hours' notice for a change.\n\nWe look forward to meeting you.\nManoyuti`;
  return deliver(booking.email, THERAPIST_EMAIL, 'Manoyuti · Your appointment is confirmed', text, `confirmation-${booking.id}`);
}
