const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

function browserContext(files) {
  const window = {};
  const context = { window, Object, Set, Map, String, Array, RegExp };
  for (const file of files) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  return window;
}

test('catalog keeps 20 solutions and 12 needs with valid references', () => {
  const data = browserContext(['assets/js/catalog-data.js']);
  assert.equal(data.CATALOG.length, 20);
  assert.equal(data.NEEDS.length, 12);
  const needIds = new Set(data.NEEDS.map(item => item.id));
  assert.equal(new Set(data.CATALOG.map(item => item.id)).size, 20);
  for (const item of data.CATALOG) for (const id of item.needs) assert.ok(needIds.has(id), `${item.id}: ${id}`);
});

test('catalog validator rejects malformed IDs and unknown needs', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ldx-invalid-catalog-'));
  const fixture = path.join(temp, 'bad.js');
  fs.writeFileSync(fixture, "window.NEEDS=[{id:'N',label:'Need'}];window.CATALOG=[{id:'X',name:'X',category:'Cat',shortDescription:'Short',fullDescription:'Full',idealFor:[],needs:['UNKNOWN'],capabilities:[],outputs:[],caseIds:[]},{id:'X',name:'X',category:'Cat',shortDescription:'Short',fullDescription:'Full',idealFor:[],needs:['N'],capabilities:[],outputs:[],caseIds:[]}];window.PROCESS=[];");
  const result = spawnSync(process.execPath, ['scripts/validate-catalog.js', fixture], { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
  fs.rmSync(temp, { recursive: true, force: true });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Duplicate solution id/);
  assert.match(result.stderr, /unknown need/);
});

test('all phase 2 features remain explicitly disabled', () => {
  const data = browserContext(['assets/js/feature-flags.js']);
  assert.deepEqual({ ...data.LDX_FEATURE_FLAGS }, { leadCapture: false, aiAdvisor: false, cases: false, analytics: false });
});

test('lead payload contract validates fields and keeps consent explicit', () => {
  const data = browserContext(['assets/js/lead-capture.js']);
  const input = { name:' A ', email:'a@b.co', company:' B ', segment:'TELECOM', companySize:'UP_TO_500', commercialContactConsent:false, selectedNeeds:['TIME'] };
  assert.equal(data.LDXLeadCapture.validate(input).ok, true);
  const payload = data.LDXLeadCapture.buildPayload(input, { sessionId:'session-test', catalogContext:['MICRO', 1] });
  assert.equal(payload.payload.payload.name, 'A');
  assert.equal(payload.payload.payload.commercialContactConsent, false);
  assert.deepEqual(Array.from(payload.payload.payload.catalogContext), ['MICRO']);
  assert.deepEqual(Array.from(data.LDXLeadCapture.validate({}).errors).sort(), ['company','companySize','commercialContactConsent','email','name','segment','selectedNeeds'].sort());
});

test('lead local adapter covers loading, validation error, backend error and success states', async () => {
  const data = browserContext(['assets/js/lead-capture.js']);
  const valid = { name:'A', email:'a@b.co', company:'B', segment:'TELECOM', companySize:'UP_TO_500', commercialContactConsent:false, selectedNeeds:[] };
  const seen = [];
  const success = await data.LDXLeadCapture.mockSubmit(valid, async () => ({ ok:true, leadId:'mock-id' }), state => seen.push(state));
  assert.equal(success.state, 'success');
  assert.deepEqual(seen, ['loading','success']);
  const failure = await data.LDXLeadCapture.mockSubmit(valid, async () => ({ ok:false }), () => {});
  assert.equal(failure.error.code, 'MOCK_ERROR');
  const invalid = await data.LDXLeadCapture.mockSubmit({}, async () => { throw Error('must not run'); }, () => {});
  assert.equal(invalid.error.code, 'VALIDATION_ERROR');
});

test('advisor mock restricts recommendations to catalog IDs and falls back safely', () => {
  const data = browserContext(['assets/js/ai-advisor.js']);
  const catalog = [{ id:'A', needs:['N'] }, { id:'B', needs:['X'] }];
  assert.deepEqual(data.LDXAIAdvisor.recommend(['N'], catalog).recommended.map(item => item.id), ['A']);
  const clean = data.LDXAIAdvisor.safeResult({ recommended:[{id:'UNKNOWN',reason:'x'}], journey:[{stage:'x',solutionId:'UNKNOWN'}] }, catalog);
  assert.equal(clean.fallback, true);
  assert.equal(clean.recommended.length, 0);
  assert.equal(clean.journey.length, 0);
});

test('lead submission is a local disabled response and makes no request', async () => {
  const data = browserContext(['assets/js/lead-capture.js']);
  assert.equal((await data.LDXLeadCapture.submit({})).error.code, 'FEATURE_DISABLED');
});

test('Apps Script scaffold only accepts known action names and never claims configuration', () => {
  let response;
  const context = { ContentService: { MimeType: { JSON:'application/json' }, createTextOutput: text => ({ setMimeType: () => { response = JSON.parse(text); return response; } }) } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'backend/apps-script/Code.gs'), 'utf8'), context);
  context.doPost({ postData: { contents: '{"action":"other"}' } });
  assert.equal(response.error.code, 'INVALID_ACTION');
  context.doPost({ postData: { contents: '{"action":"lead","payload":{}}' } });
  assert.equal(response.error.code, 'NOT_CONFIGURED');
});
