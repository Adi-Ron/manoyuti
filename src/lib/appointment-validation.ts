export type AppointmentDetails = { date: string; time: string; location: string; scheduledAt: string };
export class AppointmentValidationError extends Error {}

export function validateAppointment(input: unknown, format: string, now = Date.now()): AppointmentDetails {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new AppointmentValidationError('Choose a date, time, and session location.');
  const value = input as Record<string, unknown>;
  const date = typeof value.date === 'string' ? value.date : '';
  const time = typeof value.time === 'string' ? value.time : '';
  const location = typeof value.location === 'string' ? value.location.trim() : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new AppointmentValidationError('Choose a valid date and time. All times are in India Standard Time.');
  const instant = new Date(`${date}T${time}:00+05:30`);
  // Round-trip the calendar date separately: Date otherwise normalises 31 February.
  const calendar = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(instant.getTime()) || !Number.isFinite(calendar.getTime()) || calendar.toISOString().slice(0, 10) !== date || instant.getTime() <= now) throw new AppointmentValidationError('Choose an appointment time in the future.');
  if (location.length < 5 || location.length > 500 || /[\u0000-\u001f\u007f]/.test(location)) throw new AppointmentValidationError('Add a meeting link or complete session address (up to 500 characters).');
  if (format === 'Online (video)') {
    let url: URL;
    try { url = new URL(location); } catch { throw new AppointmentValidationError('Add a complete online meeting link, starting with https://.'); }
    if (url.protocol !== 'https:' || url.username || url.password) throw new AppointmentValidationError('Use a secure meeting link starting with https://.');
  }
  return { date, time, location, scheduledAt: instant.toISOString() };
}
