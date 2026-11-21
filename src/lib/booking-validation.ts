const SERVICES = ['individual', 'couples', 'assessment', 'fertility', 'unsure'];
const FORMATS = ['Online (video)', 'In person, Bengaluru'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['Morning', 'Afternoon', 'Evening'];

export class BookingValidationError extends Error {}

export function validateBooking(input: unknown, today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new BookingValidationError('Please send a valid booking request.');
  }
  const body = input as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = body[key];
    if (value == null || value === '') {
      if (required) throw new BookingValidationError(`Please provide your ${key}.`);
      return null;
    }
    if (typeof value !== 'string' || value.trim().length > max || (required && !value.trim())) {
      throw new BookingValidationError(`Please check your ${key}.`);
    }
    return value.trim() || null;
  };
  const choice = (key: string, allowed: string[]) => {
    if (typeof body[key] !== 'string' || !allowed.includes(body[key] as string)) {
      throw new BookingValidationError('Please choose a service and session format.');
    }
    return body[key] as string;
  };
  const choices = (key: string, allowed: string[]) => {
    const values = body[key];
    if (!Array.isArray(values) || !values.length || values.length > allowed.length || values.some(value => typeof value !== 'string' || !allowed.includes(value))) {
      throw new BookingValidationError('Please choose at least one available day and time of day.');
    }
    return Array.from(new Set(values)) as string[];
  };

  const service_type = choice('service_type', SERVICES);
  const format = choice('format', FORMATS);
  const preferred_days = choices('preferred_days', DAYS);
  const preferred_times = choices('preferred_times', TIMES);
  const name = text('name', 120, true)!;
  const email = text('email', 254, true)!;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BookingValidationError('Please enter a valid email address.');
  if (body.consent !== true) throw new BookingValidationError('Please confirm the booking acknowledgment.');
  if (body.is_returning != null && typeof body.is_returning !== 'boolean') throw new BookingValidationError('Please check whether you are a returning client.');
  const earliest_date = text('earliest_date', 10);
  if (earliest_date) {
    const parsed = new Date(`${earliest_date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(earliest_date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== earliest_date || earliest_date < today) {
      throw new BookingValidationError('Please choose today or a future date.');
    }
  }
  return { service_type, format, preferred_days, preferred_times, name, email: email.toLowerCase(), phone: text('phone', 40), note: text('note', 2000), earliest_date, is_returning: body.is_returning ?? false, consent: true };
}
