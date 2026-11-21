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

const { validateContact, ContactValidationError } = load('../src/lib/contact-validation.ts');
const valid = () => ({ name: ' Test Client ', email: 'TEST@example.com', interest: 'General enquiry', message: 'Please contact me.' });

test('contact accepts existing home payload and normalizes without extra fields', () => {
  const message = validateContact({ ...valid(), role: 'admin' });
  assert.equal(message.name, 'Test Client');
  assert.equal(message.email, 'test@example.com');
  assert.equal(message.interest, 'General enquiry');
  assert.equal(message.phone, null);
  assert.equal(message.role, undefined);
});

test('contact rejects malformed, blank and oversized fields', () => {
  for (const input of [null, [], true, 'message']) assert.throws(() => validateContact(input), ContactValidationError);
  for (const patch of [{ name: ' ' }, { email: 'bad' }, { interest: '' }, { message: ' ' }, { message: {} }, { phone: 123 }, { preferred_time: [] }, { message: 'a'.repeat(5001) }]) {
    assert.throws(() => validateContact({ ...valid(), ...patch }), ContactValidationError);
  }
});

test('contact API reports failures honestly and handles 100 concurrent mixed requests', async () => {
  let writes = 0;
  let fail = false;
  const { POST } = load('../src/app/api/contact/route.ts', {
    '@/lib/contact-validation': { validateContact, ContactValidationError },
    '@/lib/supabase/service': { createServiceClient: () => ({ from: table => {
      assert.equal(table, 'contact_messages');
      return { insert: async payload => { writes++; assert.equal(payload.message, 'Please contact me.'); return { error: fail ? new Error('simulated outage') : null }; } };
    } }) }
  });
  const send = body => POST(new Request('http://localhost/api/contact', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }));
  const oldURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const oldKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const oldError = console.error;
  try {
    assert.equal((await send('{')).status, 400);
    assert.equal((await send(null)).status, 400);
    assert.equal((await send('x'.repeat(30001))).status, 413);
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    assert.equal((await send(valid())).status, 503);
    assert.equal(writes, 0);
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
    const responses = await Promise.all(Array.from({ length: 100 }, (_, i) => send(i % 2 ? { ...valid(), email: 'bad' } : valid())));
    assert.equal(responses.filter(response => response.status === 200).length, 50);
    assert.equal(responses.filter(response => response.status === 400).length, 50);
    assert.equal(writes, 50);
    fail = true;
    console.error = () => {};
    assert.equal((await send(valid())).status, 500);
  } finally {
    console.error = oldError;
    if (oldURL === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldURL;
    if (oldKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = oldKey;
  }
});
