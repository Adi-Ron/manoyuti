const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

test('mail helper handles config, routing, escaping, privacy, SMTP rejection and failures', async () => {
  const sent = [];
  let transportOptions;
  let outcome = 'accepted';
  const transport = { sendMail: async message => {
    sent.push(message);
    if (outcome === 'throws') throw new Error('SMTP secret must never escape');
    return { accepted: outcome === 'accepted' ? [message.to.address] : [], rejected: outcome === 'accepted' ? [] : [message.to.address] };
  }, close: () => {} };
  const filename = path.resolve(__dirname, '../src/lib/booking-mail.ts');
  const compiled = new Module(filename, module);
  compiled.require = name => {
    assert.equal(name, 'nodemailer');
    return { default: { createTransport: options => { transportOptions = options; return transport; } } };
  };
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
  const { sendTherapistBookingNotification, sendClientBookingConfirmation } = compiled.exports;
  const keys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const booking = { id: '123', name: '<script>private</script>', email: 'client@example.com', service_type: 'individual', format: 'Online (video)', preferred_days: ['Mon'], preferred_times: ['Morning'], note: 'sensitive note excluded' };
  try {
    keys.forEach(key => delete process.env[key]);
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'unavailable');
    assert.equal(sent.length, 0);
    Object.assign(process.env, { SMTP_HOST: 'smtp.example.com', SMTP_PORT: '587', SMTP_USER: 'sender@example.com', SMTP_PASS: 'your-app-password' });
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'unavailable');
    process.env.SMTP_PASS = 'test-password';
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'sent');
    assert.equal(sent[0].to.address, 'ishatiwari1706@gmail.com');
    assert.equal(sent[0].replyTo.address, 'client@example.com');
    assert.equal(sent[0].from.name, 'Manoyuti');
    assert.ok(sent[0].text.includes('<script>private</script>'));
    assert.ok(sent[0].html.includes('&lt;script&gt;private&lt;/script&gt;'));
    assert.ok(!sent[0].html.includes('<script>'));
    assert.ok(!sent[0].text.includes(booking.note));
    assert.ok(transportOptions.requireTLS);
    assert.equal(transportOptions.connectionTimeout, 10000);
    assert.equal(transportOptions.socketTimeout, 15000);
    assert.equal((await sendClientBookingConfirmation(booking, { date: '2026-11-30', time: '10:30 AM', location: 'Video details <private>' })).status, 'sent');
    assert.equal(sent[1].to.address, booking.email);
    assert.equal(sent[1].replyTo.address, 'ishatiwari1706@gmail.com');
    assert.ok(sent[1].text.includes('30 November 2026'));
    assert.ok(sent[1].text.includes('10:30 AM'));
    assert.ok(sent[1].html.includes('Video details &lt;private&gt;'));
    assert.equal((await sendClientBookingConfirmation(booking, { date: '2026-02-30', time: '', location: '' })).status, 'failed');
    assert.equal(sent.length, 2);
    outcome = 'rejected';
    assert.equal((await sendTherapistBookingNotification(booking)).status, 'failed');
    outcome = 'throws';
    const failure = await sendTherapistBookingNotification(booking);
    assert.equal(failure.status, 'failed');
    assert.ok(!failure.error.includes('secret'));
    assert.equal((await sendTherapistBookingNotification({ ...booking, email: 'client@example.com\r\nBcc: attacker@example.com' })).status, 'failed');
  } finally {
    keys.forEach(key => previous[key] === undefined ? delete process.env[key] : process.env[key] = previous[key]);
  }
});
