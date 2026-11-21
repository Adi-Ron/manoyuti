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

test('booking API handles validation, unavailable database, save success and failure', async () => {
  let writes = 0;
  let fail = false;
  let mailStatus = 'sent';
  let mailCalls = 0;
  let trackingUnavailable = false;
  const { POST } = load('../src/app/api/booking/route.ts', {
    '@/lib/booking-validation': load('../src/lib/booking-validation.ts'),
    '@/lib/booking-mail': { sendTherapistBookingNotification: async booking => { mailCalls++; assert.equal(booking.id, 'test-booking-id'); return { status: mailStatus }; } },
    '@/lib/supabase/service': { createServiceClient: () => ({ from: table => {
      assert.equal(table, 'booking_requests');
      const updateQuery = { eq: () => updateQuery, is: () => updateQuery, select: () => updateQuery, maybeSingle: async () => ({ data: trackingUnavailable ? null : { id: 'test-booking-id' }, error: trackingUnavailable ? new Error('missing column') : null }), then: resolve => resolve({ error: null }) };
      return { update: () => updateQuery, insert: payload => { writes++; assert.equal(payload.consent, true); return { select: () => ({ single: async () => ({ data: fail ? null : { id: 'test-booking-id' }, error: fail ? new Error('simulated outage') : null }) }) }; } };
    } }) }
  });
  const send = body => POST(new Request('http://localhost/api/booking', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }));
  const valid = { service_type: 'individual', format: 'Online (video)', preferred_days: ['Mon'], preferred_times: ['Morning'], name: 'Test Client', email: 'test@example.com', consent: true };
  const oldURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const oldKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const oldError = console.error;
  try {
    assert.equal((await send('{')).status, 400);
    assert.equal((await send(null)).status, 400);
    assert.equal((await send({ ...valid, consent: 'false' })).status, 400);
    assert.equal((await send('x'.repeat(20001))).status, 413);
    assert.equal(writes, 0);
    assert.equal(mailCalls, 0);
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    assert.equal((await send(valid)).status, 503);
    assert.equal(writes, 0);
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
    const successful = await send(valid);
    assert.equal(successful.status, 200);
    const saved = await successful.json();
    assert.equal(saved.success, true);
    assert.equal(saved.notification, 'sent');
    assert.equal(saved.booking_id, 'test-booking-id');
    assert.equal(writes, 1);
    fail = true;
    console.error = () => {};
    assert.equal((await send(valid)).status, 500);
    assert.equal(mailCalls, 1);
    fail = false;
    trackingUnavailable = true;
    const beforeMissingSchema = mailCalls;
    const missingSchema = await (await send(valid)).json();
    assert.equal(missingSchema.success, true);
    assert.equal(missingSchema.notification, 'unavailable');
    assert.equal(mailCalls, beforeMissingSchema);
    trackingUnavailable = false;
    mailStatus = 'unavailable';
    const unavailable = await (await send(valid)).json();
    assert.equal(unavailable.success, true);
    assert.equal(unavailable.notification, 'unavailable');
    mailStatus = 'failed';
    const failedMail = await (await send(valid)).json();
    assert.equal(failedMail.success, true);
    assert.equal(failedMail.notification, 'failed');
    const responses = await Promise.all(Array.from({ length: 100 }, (_, i) => send(i % 2 ? { ...valid, preferred_days: 'Mon' } : valid)));
    assert.equal(responses.filter(response => response.status === 200).length, 50);
    assert.equal(responses.filter(response => response.status === 400).length, 50);
    assert.equal(writes, 55);
  } finally {
    console.error = oldError;
    if (oldURL === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldURL;
    if (oldKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = oldKey;
  }
});
