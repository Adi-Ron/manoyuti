import type { SupabaseClient } from '@supabase/supabase-js';
import { validateAppointment } from './appointment-validation';
import { sendClientBookingConfirmation } from './booking-mail';

export class ConfirmationError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

/** Claim a short database lease so concurrent clicks cannot send duplicate confirmations. */
export async function confirmBooking(db: SupabaseClient, id: string, input: unknown) {
  const { data: booking, error } = await db.from('booking_requests').select('*').eq('id', id).maybeSingle();
  if (error) throw new ConfirmationError('Could not load this request. Please refresh and try again.', 503);
  if (!booking) throw new ConfirmationError('This booking request was not found.', 404);
  if (!['confirmation_sent_at', 'confirmation_sending_at', 'scheduled_at', 'session_location'].every(key => key in booking)) throw new ConfirmationError('Appointment setup is incomplete. Run supabase/booking-confirmation.sql in the Supabase SQL Editor.', 503);
  if (booking.confirmation_sent_at) return { success: true, alreadySent: true };
  if (!['pending', 'confirmed'].includes(booking.status)) throw new ConfirmationError('Only an active booking request can be confirmed.', 409);
  const details = validateAppointment(input, booking.format);
  const now = new Date().toISOString();
  const expired = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const { data: claimed, error: claimError } = await db.from('booking_requests').update({
    scheduled_at: details.scheduledAt, session_location: details.location,
    confirmation_sending_at: now, updated_at: now
  }).eq('id', id).eq('status', booking.status).eq('updated_at', booking.updated_at).is('confirmation_sent_at', null)
    .or(`confirmation_sending_at.is.null,confirmation_sending_at.lt.${expired}`).select('id').maybeSingle();
  if (claimError) throw new ConfirmationError('Could not save the appointment details. Please try again.', 503);
  if (!claimed) throw new ConfirmationError('This request is being updated or its email is sending. Refresh before trying again.', 409);

  const delivery = await sendClientBookingConfirmation(booking, details);
  if (delivery.status !== 'sent') {
    const { error: releaseError } = await db.from('booking_requests').update({ confirmation_sending_at: null })
      .eq('id', id).eq('confirmation_sending_at', now);
    if (releaseError) console.error('Could not release booking confirmation lease');
    throw new ConfirmationError(delivery.status === 'unavailable'
      ? 'Email is not configured. The appointment details are saved, but no confirmation has been sent. Configure the email provider and try again.'
      : 'Email acceptance could not be confirmed. The appointment details are saved. Check the email provider and client delivery before retrying to avoid sending a duplicate.', 503);
  }
  const { data: finished, error: finishError } = await db.from('booking_requests').update({
    status: 'confirmed', confirmation_sent_at: new Date().toISOString(), confirmation_sending_at: null
  }).eq('id', id).eq('confirmation_sending_at', now).select('id').maybeSingle();
  if (finishError || !finished) {
    // Keep the lease rather than invite an immediate duplicate email on a database outage.
    throw new ConfirmationError('The email was accepted, but the booking status could not be updated. Do not resend; check the booking before taking further action.', 503);
  }
  return { success: true, alreadySent: false };
}

