const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateContact, readText } = require('../src/lib/validation.ts');
const { parseMediumPosts } = require('../src/lib/blog.ts');
const { allowRequest, requestIdentity } = require('../src/lib/rate-limit.ts');
const { typeText } = require('../src/lib/animations.ts');

const contact = { name: ' Visitor ', email: 'visitor@example.com', subject: 'Hello', message: '<a href="https://example.com">Hello</a>' };
test('contact trims fields and preserves HTML as literal text', () => {
  assert.equal(validateContact(contact).name, 'Visitor');
  assert.equal(validateContact(contact).message, contact.message);
});
test('contact rejects missing fields, invalid email, oversized input and header injection', () => {
  for (const value of [null, {}, { ...contact, email: 'bad' }, { ...contact, message: 'a'.repeat(5001) }, { ...contact, subject: 'Hi\r\nBcc: victim@example.com' }]) {
    assert.throws(() => validateContact(value));
  }
});
test('chat rejects whitespace, objects and oversized messages', () => {
  for (const value of ['  ', {}, 123, 'x'.repeat(2001)]) assert.throws(() => readText(value, 'Message', 2000));
});
test('RSS handles empty feeds and rejects unsafe URLs', () => {
  assert.deepEqual(parseMediumPosts('<rss><channel></channel></rss>'), []);
  assert.deepEqual(parseMediumPosts('<rss><channel><item><title>Bad</title><link>javascript:alert(1)</link></item></channel></rss>'), []);
  const [post] = parseMediumPosts('<rss><channel><item><title>Real article</title><link>https://jalinah.medium.com/article</link><content:encoded><![CDATA[<p>Hello</p><img src="https://untrusted.example/image.png">]]></content:encoded><category>React</category></item></channel></rss>');
  assert.equal(post.imageUrl, '/placeholder.svg');
  assert.equal(post.description, 'Hello');
  assert.deepEqual(post.tags, ['React']);
  assert.equal(post.date, '');
});
test('rate limits reject excess requests, isolate scopes and fail closed in production', async () => {
  const old = { ...process.env };
  delete process.env.KV_REST_API_URL; delete process.env.KV_REST_API_TOKEN;
  process.env.NODE_ENV = 'test';
  try {
    assert.equal(await allowRequest('test', 'visitor', 1, 60), true);
    assert.equal(await allowRequest('test', 'visitor', 1, 60), false);
    assert.equal(await allowRequest('different', 'visitor', 1, 60), true);
    process.env.NODE_ENV = 'production';
    await assert.rejects(allowRequest('test', 'visitor', 1, 60));
    delete process.env.VERCEL;
    assert.equal(requestIdentity(new Headers({ 'x-forwarded-for': 'spoofed' })), 'global');
  } finally { process.env = old; }
});
test('distributed limiter uses an atomic expiring counter and rejects backend errors', async () => {
  const old = { ...process.env }; const originalFetch = global.fetch;
  process.env.KV_REST_API_URL = 'https://redis.example'; process.env.KV_REST_API_TOKEN = 'test';
  try {
    global.fetch = async (_url, options) => {
      const command = JSON.parse(options.body);
      assert.equal(command[0], 'EVAL'); assert.match(command[1], /EXPIRE/);
      return Response.json({ result: 4 });
    };
    assert.equal(await allowRequest('contact', 'visitor', 3, 600), false);
    global.fetch = async () => Response.json({ error: 'unavailable' });
    await assert.rejects(allowRequest('contact', 'visitor', 3, 600));
  } finally { global.fetch = originalFetch; process.env = old; }
});
test('typing cleanup cancels timers and reduced motion leaves static text', () => {
  const original = { window: global.window, setTimeout: global.setTimeout, clearTimeout: global.clearTimeout };
  let scheduled = 0; let cleared = false; let reduced = false;
  global.window = { matchMedia: () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }) };
  global.setTimeout = () => { scheduled++; return 7; };
  global.clearTimeout = id => { if (id === 7) cleared = true; };
  try {
    const element = { textContent: '' };
    const cleanup = typeText(element, ['Hello']);
    assert.equal(scheduled, 1); cleanup(); assert.equal(cleared, true);
    reduced = true; typeText(element, ['Hello'])();
    assert.equal(element.textContent, 'Hello'); assert.equal(scheduled, 1);
  } finally { Object.assign(global, original); }
});

test('contact action sends safe plain text with the updated recipient and visitor Reply-To', async () => {
  const Module = require('node:module'); const originalLoad = Module._load;
  const old = { ...process.env }; let sent;
  process.env.EMAIL_USER = 'sender@example.com'; process.env.EMAIL_PASSWORD = 'test'; process.env.NODE_ENV = 'test';
  delete process.env.KV_REST_API_URL; delete process.env.KV_REST_API_TOKEN;
  Module._load = function (id, ...args) {
    if (id === 'nodemailer') return { createTransport: () => ({ sendMail: async options => { sent = options; } }) };
    if (id === 'next/headers') return { headers: () => new Headers() };
    return originalLoad.call(this, id, ...args);
  };
  try {
    const filename = require.resolve('../src/app/actions.ts'); delete require.cache[filename];
    const { sendContactEmail } = require(filename);
    assert.equal((await sendContactEmail({})).success, false); assert.equal(sent, undefined);
    assert.equal((await sendContactEmail(contact)).success, true);
    assert.equal(sent.to, 'jalina.hirushan.dev@gmail.com');
    assert.equal(sent.replyTo, contact.email); assert.equal(sent.html, undefined);
    assert.ok(sent.text.includes(contact.message));
    delete require.cache[filename];
  } finally { Module._load = originalLoad; process.env = old; }
});

test('chat route rejects malformed/oversized bodies and sends current facts to a configurable model', async () => {
  const Module = require('node:module'); const originalLoad = Module._load;
  const old = { ...process.env }; let options; let calls = 0;
  process.env.GOOGLE_API_KEY = 'test'; process.env.GEMINI_MODEL = 'test-model'; process.env.NODE_ENV = 'test';
  delete process.env.KV_REST_API_URL; delete process.env.KV_REST_API_TOKEN;
  Module._load = function (id, ...args) {
    if (id === '@google/generative-ai') return { GoogleGenerativeAI: class {
      getGenerativeModel(value) { options = value; return { generateContent: async () => { calls++; return { response: { text: () => 'Reply' } }; } }; }
    } };
    return originalLoad.call(this, id, ...args);
  };
  try {
    const filename = require.resolve('../src/app/api/chat/route.ts'); delete require.cache[filename];
    const { POST } = require(filename);
    const request = body => new Request('http://localhost/api/chat', { method: 'POST', body });
    for (const body of ['{', JSON.stringify({ message: {} }), JSON.stringify({ message: 'x'.repeat(13000) })]) assert.equal((await POST(request(body))).status, 400);
    assert.equal(calls, 0);
    assert.equal((await POST(request(JSON.stringify({ message: 'When did the internship end?' })))).status, 200);
    assert.equal(options.model, 'test-model');
    assert.ok(options.systemInstruction.includes('June 2026'));
    assert.ok(options.systemInstruction.includes('jalina.hirushan.dev@gmail.com'));
    delete process.env.GOOGLE_API_KEY;
    assert.equal((await POST(request(JSON.stringify({ message: 'Hello' })))).status, 503);
    assert.equal(calls, 1);
    delete require.cache[filename];
  } finally { Module._load = originalLoad; process.env = old; }
});
