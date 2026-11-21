const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/lib/booking-validation.ts');
const compiled = new Module(filename, module);
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { validateBooking, BookingValidationError } = compiled.exports;
const valid = () => ({ service_type: 'individual', format: 'Online (video)', preferred_days: ['Mon'], preferred_times: ['Morning'], name: ' Test Client ', email: 'TEST@example.com', consent: true });

test('normalizes a valid request without inventing a confirmed appointment', () => {
  const result = validateBooking(valid(), '2026-11-21');
  assert.equal(result.name, 'Test Client');
  assert.equal(result.email, 'test@example.com');
  assert.equal(result.earliest_date, null);
  assert.equal(result.is_returning, false);
  assert.equal(result.status, undefined);
});

test('rejects malformed values before database access', () => {
  const patches = [{ name: ' ' }, { email: 'not-email' }, { consent: 'true' }, { consent: false }, { service_type: 'unknown' }, { format: 'unknown' }, { preferred_days: 'Mon' }, { preferred_days: ['Holiday'] }, { preferred_times: [] }, { is_returning: 'false' }, { earliest_date: '2026-02-30' }, { earliest_date: '2026-11-20' }, { note: 'a'.repeat(2001) }, { email: {} }];
  for (const patch of patches) assert.throws(() => validateBooking({ ...valid(), ...patch }, '2026-11-21'), BookingValidationError);
  for (const body of [null, [], 'request', 10]) assert.throws(() => validateBooking(body), BookingValidationError);
});

test('supports all services and valid dates, and removes duplicate preferences', () => {
  for (const service_type of ['individual', 'couples', 'assessment', 'fertility', 'unsure']) {
    const result = validateBooking({ ...valid(), service_type, earliest_date: '2026-11-21', preferred_days: ['Mon', 'Mon'] }, '2026-11-21');
    assert.deepEqual(result.preferred_days, ['Mon']);
    assert.equal(result.service_type, service_type);
  }
});

test('handles 10,000 mixed requests with stable validation behavior', () => {
  for (let i = 0; i < 10000; i++) {
    if (i % 2) assert.throws(() => validateBooking({ ...valid(), consent: 'false' }, '2026-11-21'), BookingValidationError);
    else assert.equal(validateBooking(valid(), '2026-11-21').consent, true);
  }
});
