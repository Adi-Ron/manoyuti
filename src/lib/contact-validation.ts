export class ContactValidationError extends Error {}

export function validateContact(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ContactValidationError('Please send a valid message.');
  const body = input as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = body[key];
    if (value == null || value === '') {
      if (required) throw new ContactValidationError('Please complete your name, email, interest and message.');
      return null;
    }
    if (typeof value !== 'string' || value.trim().length > max || (required && !value.trim())) throw new ContactValidationError(`Please check your ${key.replace('_', ' ')}.`);
    return value.trim() || null;
  };
  const name = text('name', 120, true)!;
  const email = text('email', 254, true)!;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ContactValidationError('Please enter a valid email address.');
  return {
    name, email: email.toLowerCase(), interest: text('interest', 120, true)!,
    message: text('message', 5000, true)!, phone: text('phone', 40), preferred_time: text('preferred_time', 200)
  };
}
