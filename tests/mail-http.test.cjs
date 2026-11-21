const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

test('Spaces email uses HTTPS, safe templates and idempotency without SMTP', async () => {
  const file = path.resolve(__dirname, '../src/lib/booking-mail.ts');
  const loaded = new Module(file, module);
  loaded.require = () => ({ default: { createTransport: () => { throw Error('SMTP must not run on Spaces'); } } });
  loaded._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, file);
  const { isBookingMailConfigured, sendTherapistBookingNotification } = loaded.exports;
  const keys = ['SPACE_ID','RESEND_API_KEY','MAIL_FROM','SMTP_HOST','SMTP_USER','SMTP_PASS'];
  const previous = keys.map(k => process.env[k]);
  const originalFetch = global.fetch;
  let mode = 'success';
  let request;
  try {
    Object.assign(process.env, { SPACE_ID: 'test/manoyuti', SMTP_HOST: 'smtp.gmail.com', SMTP_USER: 'test@example.com', SMTP_PASS: 'test-password' });
    delete process.env.RESEND_API_KEY;
    delete process.env.MAIL_FROM;
    assert.equal(isBookingMailConfigured(), false);
    Object.assign(process.env, { RESEND_API_KEY: 'test-only', MAIL_FROM: 'bookings@example.com' });
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      request = options;
      if (mode === 'throw') throw Error('Secret error must not escape');
      return { ok: mode === 'success', json: async () => ({ id: 'accepted-test' }) };
    };
    const booking = { id: 'test-reference', name: '<script>Test</script>', email: 'client@example.com', service_type: 'individual', format: 'Online (video)', note: 'Private health information' };
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'sent');
    const body = JSON.parse(request.body);
    assert.deepEqual(body.to, ['ishatiwari1706@gmail.com']);
    assert.equal(body.reply_to, booking.email);
    assert.ok(body.html.includes('&lt;script&gt;'));
    assert.ok(!body.html.includes(booking.note));
    assert.equal(request.headers['Idempotency-Key'], 'manoyuti-request-test-reference');
    mode = 'rejected';
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'failed');
    mode = 'throw';
    const failed = await sendTherapistBookingNotification(booking);
    assert.equal(failed.status, 'failed');
    assert.ok(!failed.error.includes('Secret'));
  } finally {
    global.fetch = originalFetch;
    keys.forEach((k,i) => { if (previous[i] === undefined) delete process.env[k]; else process.env[k] = previous[i]; });
  }
});
