-- Run once in this project's Supabase SQL Editor. Existing bookings are preserved.
ALTER TABLE public.booking_requests
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS session_location text,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_sending_at timestamptz,
  ADD COLUMN IF NOT EXISTS request_notified_at timestamptz,
  ADD COLUMN IF NOT EXISTS request_notification_sending_at timestamptz;

COMMENT ON COLUMN public.booking_requests.scheduled_at IS 'Agreed session start, stored in UTC and displayed in Asia/Kolkata.';
COMMENT ON COLUMN public.booking_requests.confirmation_sent_at IS 'When the SMTP server accepted the client confirmation email.';

-- Confirmation fields and status are managed by the server, never public clients.
-- All website writes pass through validated server endpoints using service_role.
REVOKE INSERT, UPDATE, DELETE ON public.booking_requests FROM PUBLIC, anon, authenticated;
