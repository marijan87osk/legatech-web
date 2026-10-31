import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual TS modules without a browser, SMTP, GA requests or new deps.
function loadTs(path, globals = {}, imports = {}) {
  const source = readFileSync(new URL('../' + path, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
  }).outputText;
  const context = vm.createContext({exports: {}, process: {env: {}}, ...globals,
    require(name) { if (name in imports) return imports[name]; throw Error('Unexpected import: ' + name); },
  });
  vm.runInContext(code, context, {filename: path});
  return context.exports;
}

function setup({consent = 'granted', tag = true, debug = false, throws = false} = {}) {
  const calls = [];
  const window = tag ? {gtag: (...args) => {calls.push(JSON.parse(JSON.stringify(args))); if (throws) throw Error('Tag failure');}} : {};
  const document = {cookie: consent === null ? '' : 'legatech_consent=' + encodeURIComponent(JSON.stringify({analytics: consent, savedAt: '2026-10-31T10:00:00Z', version: '2026-08-13'}))};
  const analytics = loadTs('src/lib/analytics.ts', {window, document, process: {env: debug ? {NEXT_PUBLIC_GA_DEBUG_MODE: 'true'} : {}}});
  const {createContactSubmission} = loadTs('src/lib/contact-submission.ts', {fetch}, {'./analytics': analytics});
  return {calls, analytics, createContactSubmission, window};
}
const receipt = '0123456789abcdef';
const success = (id = receipt) => ({ok: true, sent: true, submissionId: id});
const response = (body, status = 200) => new Response(JSON.stringify(body), {status, headers: {'Content-Type': 'application/json'}});
const enquiry = {name: 'Test Čć Žđ', email: 'test@example.invalid', company: 'Test', description: 'Local test only. Never transmitted.', formStartedAt: 1};

test('real gtag bootstrap queues Arguments objects, not plain array method calls', () => {
  const {analytics, window} = setup({tag: false});
  analytics.initializeGoogleAnalytics();
  assert.equal(window.dataLayer.length, 4);
  for (const command of window.dataLayer) {
    assert.equal(Array.isArray(command), false, 'Google treats arrays as dataLayer method calls');
    assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
  }
  const config = window.dataLayer.find(command => command[0] === 'config');
  assert.equal(config[1], 'G-956PBX0RC6');
  assert.equal(config[2].send_page_view, false);
  analytics.trackContactLeadOnce(receipt);
  analytics.trackContactLeadOnce(receipt);
  const leads = window.dataLayer.filter(command => command[0] === 'event' && command[1] === 'generate_lead');
  assert.equal(leads.length, 1);
  assert.equal(Object.prototype.toString.call(leads[0]), '[object Arguments]');
  assert.deepEqual(JSON.parse(JSON.stringify(leads[0][2])), {method: 'contact_form'});
});

test('bootstrap creates no queue without analytics consent', () => {
  const {analytics, window} = setup({tag: false, consent: 'denied'});
  analytics.initializeGoogleAnalytics();
  assert.equal(window.gtag, undefined);
  assert.equal(window.dataLayer, undefined);
});

test('no lead before the response; one lead after confirmed SMTP receipt, no PII', async () => {
  const {calls, createContactSubmission} = setup();
  let finish;
  const sender = createContactSubmission(async (url, options) => {
    assert.equal(url, '/api/contact.php'); assert.equal(options.method, 'POST');
    return new Promise(resolve => {finish = resolve;});
  });
  const pending = sender.submit(enquiry);
  assert.equal(calls.length, 0); assert.equal(sender.locked, true);
  finish(response(success()));
  assert.equal((await pending).status, 'success');
  assert.deepEqual(calls, [['event', 'generate_lead', {method: 'contact_form'}]]);
});

for (const [name, body, status] of [
  ['server validation', {ok: false, errors: {email: 'Invalid'}}, 422],
  ['SMTP failure', {ok: false}, 502],
  ['rate limiting', {ok: false}, 429],
  ['HTTP failure despite success body', success(), 500],
  ['application failure', {ok: false, sent: true, submissionId: receipt}, 200],
  ['honeypot acknowledgement', {ok: true, sent: false}, 200],
  ['old/ambiguous success', {ok: true}, 200],
  ['truthy success fields', {ok: 'true', sent: 'true', submissionId: receipt}, 200],
  ['missing receipt', {ok: true, sent: true}, 200],
  ['PII in receipt', {ok: true, sent: true, submissionId: enquiry.email}, 200],
  ['null JSON', null, 200],
  ['array JSON', [success()], 200],
]) {
  test(name + ' never records a lead', async () => {
    const {calls, createContactSubmission} = setup();
    const sender = createContactSubmission(async () => response(body, status));
    assert.equal((await sender.submit(enquiry)).status, 'error');
    assert.equal(sender.locked, false); assert.equal(calls.length, 0);
  });
}

for (const [name, request] of [
  ['invalid JSON', async () => new Response('<html>Error</html>')],
  ['network rejection', async () => {throw Error('offline');}],
]) test(name + ' never records a lead', async () => {
  const {calls, createContactSubmission} = setup();
  assert.equal((await createContactSubmission(request).submit(enquiry)).status, 'error');
  assert.equal(calls.length, 0);
});

test('synchronous duplicate submit and later repeat are ignored', async () => {
  const {calls, createContactSubmission} = setup(); let finish, requests = 0;
  const sender = createContactSubmission(async () => {requests++; return new Promise(resolve => {finish = resolve;});});
  const first = sender.submit(enquiry);
  sender.reset(); // A reset while the request is pending cannot unlock it.
  assert.equal((await sender.submit(enquiry)).status, 'ignored');
  finish(response(success())); await first;
  assert.equal((await sender.submit(enquiry)).status, 'ignored');
  assert.equal(requests, 1); assert.equal(calls.length, 1);
});

test('failure can be retried; an explicit new enquiry can count separately', async () => {
  const {calls, createContactSubmission} = setup(); let requests = 0;
  const sender = createContactSubmission(async () => ++requests === 1 ? response({ok: false}, 503) : response(success(requests === 2 ? receipt : 'fedcba9876543210')));
  assert.equal((await sender.submit(enquiry)).status, 'error');
  assert.equal((await sender.submit(enquiry)).status, 'success');
  sender.reset();
  assert.equal((await sender.submit(enquiry)).status, 'success');
  assert.equal(calls.length, 2);
});

test('the same server receipt across form instances still counts once', async () => {
  const {calls, createContactSubmission} = setup();
  for (let i = 0; i < 2; i++) await createContactSubmission(async () => response(success())).submit(enquiry);
  assert.equal(calls.length, 1);
});

test('unexpected server fields cannot enter Analytics parameters', async () => {
  const {calls, createContactSubmission} = setup();
  await createContactSubmission(async () => response({...success(), ...enquiry, user_properties: {email: enquiry.email}})).submit(enquiry);
  assert.deepEqual(calls, [['event', 'generate_lead', {method: 'contact_form'}]]);
});

for (const options of [{consent: 'denied'}, {consent: null}, {tag: false}]) {
  test('delivery succeeds without consent/tag; no event is queued or replayed', async () => {
    const {calls, createContactSubmission, window} = setup(options);
    const sender = createContactSubmission(async () => response(success()));
    assert.equal((await sender.submit(enquiry)).status, 'success');
    window.gtag = (...args) => calls.push(args);
    assert.equal((await sender.submit(enquiry)).status, 'ignored');
    assert.equal(calls.length, 0);
  });
}

test('an analytics exception neither fails delivery nor retries the event', async () => {
  const {calls, createContactSubmission, analytics} = setup({throws: true});
  assert.equal((await createContactSubmission(async () => response(success())).submit(enquiry)).status, 'success');
  analytics.trackContactLeadOnce(receipt);
  assert.equal(calls.length, 1);
});

test('DebugView is opt-in, with no form fields or receipt in parameters', async () => {
  const {calls, createContactSubmission} = setup({debug: true});
  await createContactSubmission(async () => response(success())).submit(enquiry);
  assert.deepEqual(calls, [['event', 'generate_lead', {method: 'contact_form', debug_mode: true}]]);
});

test('server-rendered analytics call is inert', () => {
  const analytics = loadTs('src/lib/analytics.ts');
  assert.doesNotThrow(() => analytics.trackContactLeadOnce(receipt));
});
