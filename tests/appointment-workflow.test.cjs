const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

function load(relativePath, replacements = {}) {
  const filename = path.resolve(__dirname, relativePath);
  const compiled = new Module(filename, module);
  compiled.paths = module.paths;
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = name => replacements[name] ?? originalRequire(name);
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
  return compiled.exports;
}

const validation = load('../src/lib/appointment-validation.ts');
const id = '11111111-2222-3333-4444-555555555555';
const details = () => ({ date: '2099-11-30', time: '10:30', location: 'https://meet.example.com/private-room' });
const row = () => ({ id, name: 'Test Client', email: 'client@example.com', service_type: 'individual', format: 'Online (video)', status: 'pending', updated_at: '2026-11-21T00:00:00+00:00', scheduled_at: null, session_location: null, confirmation_sent_at: null, confirmation_sending_at: null, request_notified_at: null, request_notification_sending_at: null });

// Models the atomic conditional UPDATE used for claims, not a real database.
function database(initial = row()) {
  const state = { row: initial, readError: false, claimError: false, finishError: false };
  const db = { from: table => {
    assert.equal(table, 'booking_requests');
    let patch;
    let lease;
    const filters = [];
    const query = {
      select: () => query,
      update: value => { patch = value; return query; },
      eq: (key, value) => { filters.push(current => {
        const actual = current[key];
        // Postgres timestamptz compares instants regardless of +00:00/.000Z.
        return key.endsWith('_at') && actual && value ? Date.parse(actual) === Date.parse(value) : actual === value;
      }); return query; },
      is: (key, value) => { filters.push(current => current[key] === value); return query; },
      or: clause => { const [nullClause, expiredClause] = clause.split(','); const key = nullClause.split('.')[0]; const expired = expiredClause.split('.lt.')[1]; lease = current => current[key] === null || Date.parse(current[key]) < Date.parse(expired); return query; },
      maybeSingle: async () => execute(),
      then: resolve => Promise.resolve(execute()).then(resolve)
    };
    function execute() {
      if (!patch && state.readError) return { data: null, error: new Error('unavailable') };
      if (patch && state.claimError && Object.keys(patch).some(key => key.endsWith('sending_at') && patch[key])) return { data: null, error: new Error('claim failed') };
      if (patch && state.finishError && (patch.confirmation_sent_at || patch.request_notified_at)) return { data: null, error: new Error('tracking failed') };
      if (!state.row || !filters.every(filter => filter(state.row)) || (lease && !lease(state.row))) return { data: null, error: null };
      if (patch) Object.assign(state.row, patch);
      return { data: { ...state.row }, error: null };
    }
    return query;
  } };
  return { db, state };
}

test('appointment validation uses IST and rejects bad dates, times and meeting URLs', () => {
  const valid = validation.validateAppointment(details(), 'Online (video)', 0);
  assert.equal(valid.scheduledAt, '2099-11-30T05:00:00.000Z');
  for (const patch of [{ date: '2099-02-30' }, { date: '2020-01-01' }, { time: '24:00' }, { time: '10:60' }, { time: '10 AM' }, { location: 'javascript:alert(1)' }, { location: 'http://example.com/room' }, { location: 'https://user:pass@example.com/room' }, { location: 'https://example.com/\troom' }, { location: 'a'.repeat(501) }]) {
    assert.throws(() => validation.validateAppointment({ ...details(), ...patch }, 'Online (video)'), validation.AppointmentValidationError);
  }
  for (const value of [null, [], 'details']) assert.throws(() => validation.validateAppointment(value, 'Online (video)'), validation.AppointmentValidationError);
  assert.equal(validation.validateAppointment({ ...details(), location: '123 Test Street, Bengaluru' }, 'In person, Bengaluru', 0).location, '123 Test Street, Bengaluru');
});

test('concurrent confirmation clicks send once and persist the confirmed appointment', async () => {
  const { db, state } = database();
  let sends = 0;
  const { confirmBooking, ConfirmationError } = load('../src/lib/booking-confirmation.ts', {
    './appointment-validation': validation,
    './booking-mail': { sendClientBookingConfirmation: async (booking, appointment) => { sends++; assert.equal(booking.email, 'client@example.com'); assert.equal(appointment.scheduledAt, '2099-11-30T05:00:00.000Z'); await Promise.resolve(); return { status: 'sent' }; } }
  });
  const results = await Promise.allSettled([confirmBooking(db, id, details()), confirmBooking(db, id, details())]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  const rejected = results.find(result => result.status === 'rejected');
  assert.ok(rejected.reason instanceof ConfirmationError);
  assert.equal(rejected.reason.status, 409);
  assert.equal(sends, 1);
  assert.equal(state.row.status, 'confirmed');
  assert.equal(state.row.scheduled_at, '2099-11-30T05:00:00.000Z');
  assert.equal(state.row.session_location, details().location);
  assert.ok(state.row.confirmation_sent_at);
  assert.equal(state.row.confirmation_sending_at, null);
  assert.deepEqual(await confirmBooking(db, id, {}), { success: true, alreadySent: true });
  assert.equal(sends, 1);
});

test('SMTP failures preserve pending booking and details and release the claim', async () => {
  for (const status of ['failed', 'unavailable']) {
    const { db, state } = database();
    const { confirmBooking } = load('../src/lib/booking-confirmation.ts', {
      './appointment-validation': validation,
      './booking-mail': { sendClientBookingConfirmation: async () => ({ status }) }
    });
    await assert.rejects(confirmBooking(db, id, details()), error => error.status === 503 && (status === 'failed' ? /before retrying/.test(error.message) : /not configured/.test(error.message)));
    assert.equal(state.row.status, 'pending');
    assert.equal(state.row.confirmation_sent_at, null);
    assert.equal(state.row.confirmation_sending_at, null);
    assert.equal(state.row.scheduled_at, '2099-11-30T05:00:00.000Z');
  }
});

test('missing schema, missing requests, inactive bookings and claim failures never send', async () => {
  let sends = 0;
  const { confirmBooking } = load('../src/lib/booking-confirmation.ts', { './appointment-validation': validation, './booking-mail': { sendClientBookingConfirmation: async () => { sends++; return { status: 'sent' }; } } });
  const missingSchema = row(); delete missingSchema.scheduled_at;
  await assert.rejects(confirmBooking(database(missingSchema).db, id, details()), error => error.status === 503 && /setup/.test(error.message));
  await assert.rejects(confirmBooking(database(null).db, id, details()), error => error.status === 404);
  await assert.rejects(confirmBooking(database({ ...row(), status: 'cancelled' }).db, id, details()), error => error.status === 409);
  const unavailable = database(); unavailable.state.claimError = true;
  await assert.rejects(confirmBooking(unavailable.db, id, details()), error => error.status === 503);
  assert.equal(sends, 0);
});

test('tracking failure after accepted email keeps the lease and asks admin not to resend', async () => {
  const { db, state } = database(); state.finishError = true;
  let sends = 0;
  const { confirmBooking } = load('../src/lib/booking-confirmation.ts', { './appointment-validation': validation, './booking-mail': { sendClientBookingConfirmation: async () => { sends++; return { status: 'sent' }; } } });
  await assert.rejects(confirmBooking(db, id, details()), error => error.status === 503 && /Do not resend/.test(error.message));
  assert.ok(state.row.confirmation_sending_at);
  assert.equal(state.row.confirmation_sent_at, null);
  await assert.rejects(confirmBooking(db, id, details()), error => error.status === 409);
  assert.equal(sends, 1);
});

test('admin confirmation API requires same origin and authenticated therapist; maps errors correctly', async () => {
  let admin = null;
  let calls = 0;
  const workflow = load('../src/lib/booking-confirmation.ts', { './appointment-validation': validation, './booking-mail': {} });
  const { POST } = load('../src/app/api/admin/bookings/[id]/confirm/route.ts', {
    '@/lib/admin': { getAdminUser: async () => admin },
    '@/lib/supabase/service': { createServiceClient: () => ({}) },
    '@/lib/appointment-validation': validation,
    '@/lib/booking-confirmation': { ...workflow, confirmBooking: async (_db, _id, input) => { calls++; validation.validateAppointment(input, 'Online (video)'); return { success: true }; } }
  });
  const send = (body = details(), origin = 'https://manoyuti.example', bookingId = id) => POST(new Request(`https://manoyuti.example/api/admin/bookings/${bookingId}/confirm`, { method: 'POST', headers: origin ? { origin } : {}, body: typeof body === 'string' ? body : JSON.stringify(body) }), { params: { id: bookingId } });
  assert.equal((await send()).status, 401);
  admin = { user: { id: 'admin' } };
  assert.equal((await send(details(), 'https://attacker.example')).status, 403);
  assert.equal((await send(details(), null)).status, 403);
  assert.equal((await send(details(), 'null')).status, 403);
  assert.equal((await send(details(), undefined, 'invalid')).status, 400);
  assert.equal((await send('{')).status, 400);
  assert.equal((await send('x'.repeat(4001))).status, 413);
  assert.equal(calls, 0);
  assert.equal((await send({ ...details(), date: '2099-02-30' })).status, 400);
  assert.equal((await send()).status, 200);
});

test('therapist notification endpoint authenticates, claims once, and skips already sent requests', async () => {
  let admin = null;
  let sends = 0;
  let deliveryStatus = 'sent';
  const { db, state } = database();
  const { POST } = load('../src/app/api/admin/bookings/[id]/notify/route.ts', {
    '@/lib/admin': { getAdminUser: async () => admin },
    '@/lib/supabase/service': { createServiceClient: () => db },
    '@/lib/booking-mail': { sendTherapistBookingNotification: async () => { sends++; await Promise.resolve(); return { status: deliveryStatus }; } }
  });
  const send = (origin = 'https://manoyuti.example', bookingId = id) => POST(new Request(`https://manoyuti.example/api/admin/bookings/${bookingId}/notify`, { method: 'POST', headers: origin ? { origin } : {} }), { params: { id: bookingId } });
  assert.equal((await send()).status, 401);
  admin = { user: { id: 'admin' } };
  assert.equal((await send(null)).status, 403);
  assert.equal((await send('https://attacker.example')).status, 403);
  assert.equal((await send(undefined, '-'.repeat(36))).status, 400);
  const responses = await Promise.all([send(), send()]);
  assert.deepEqual(responses.map(response => response.status).sort(), [200, 409]);
  assert.equal(sends, 1);
  assert.ok(state.row.request_notified_at);
  assert.equal(state.row.request_notification_sending_at, null);
  assert.equal((await send()).status, 200);
  assert.equal(sends, 1);
  state.row = row(); deliveryStatus = 'failed';
  const failed = await send();
  assert.equal(failed.status, 503);
  assert.match((await failed.json()).error, /before retrying/);
  assert.equal(state.row.request_notified_at, null);
  assert.equal(state.row.request_notification_sending_at, null);
  delete state.row.request_notification_sending_at;
  assert.equal((await send()).status, 503);
  assert.equal(sends, 2);
});
