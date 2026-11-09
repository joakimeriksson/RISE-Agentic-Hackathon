// Self-check for Budget Guard: run `npm run check budget`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const json = name => JSON.parse(readFileSync(new URL(`../../data/generated/${name}`, import.meta.url)));
const draft = json('application-draft.json');
const calls = json('calls.json');
const call = id => calls.find(c => c.id === id);
const problems = (application, id) => [...logic.checkBudget(application, call(id))].sort();

// The draft with every rule fixed: 24 months, overhead exactly 30 %, Kustbygg asks for less.
const fixed = structuredClone(draft);
fixed.months = 24;
fixed.partners[0].overhead = 270000;
fixed.partners[0].requested = 1220000;
fixed.partners[1].requested = 600000;

describe('30-minute goal: totals and rules', () => {
  test('a partner costs personnel + overhead + other', () => {
    assert.equal(logic.partnerCost(draft.partners[1]), 1300000);
  });
  test('the draft totals match a hand calculation', () => {
    assert.deepEqual(logic.summarize(draft), { totalCost: 2815000, totalRequested: 2100000, coFunding: 715000 });
  });
  test('against C1 the draft breaks four rules, each naming its partner', () => {
    assert.deepEqual(problems(draft, 'C1'),
      ['duration', 'funding-rate:Kustbygg AB', 'overhead:Institute Building Lab', 'total-grant']);
  });
  test('C4 allows 36 months and 4 MSEK, so only the partner problems remain', () => {
    assert.deepEqual(problems(draft, 'C4'), ['funding-rate:Kustbygg AB', 'overhead:Institute Building Lab']);
  });
  test('exactly 30 % overhead and exactly 50 % company funding are allowed', () => {
    assert.deepEqual(problems(fixed, 'C1'), []);
    const atLimit = structuredClone(fixed);
    atLimit.partners[1].requested = 650000;
    assert.deepEqual(problems(atLimit, 'C1'), [], 'Kustbygg asks for exactly 50 % of 1 300 000');
  });
  test('a total of exactly the maximum grant is allowed', () => {
    const small = { months: 12, keywords: ['energy'], partners: [
      { name: 'Small Lab', type: 'research', personnel: 200000, overhead: 60000, other: 40000, requested: 300000 },
      { name: 'Small AB', type: 'company', personnel: 300000, overhead: 90000, other: 10000, requested: 200000 }] };
    assert.deepEqual(problems(small, 'C5'), [], '300 000 + 200 000 = exactly 500 000');
  });
  test('one partner, or no company, breaks the partner rule', () => {
    assert.ok(problems({ ...fixed, partners: [fixed.partners[0]] }, 'C1').includes('partners'));
    const researchOnly = { ...fixed, partners: [fixed.partners[0], { ...fixed.partners[0], name: 'Second Lab' }] };
    assert.ok(problems(researchOnly, 'C1').includes('partners'));
  });
});

describe('45-minute goal: which calls can we apply to?', () => {
  test('the untouched draft is eligible for no call', () => {
    assert.deepEqual(logic.eligibleCalls(calls, draft, '2026-10-22'), []);
  });
  test('the fixed budget fits C4 (3 shared topics) and C1 (2 shared topics)', () => {
    assert.deepEqual(logic.eligibleCalls(calls, fixed, '2026-10-22'), ['C4', 'C1']);
  });
  test('before C3 closes on 30 September it is eligible too', () => {
    assert.deepEqual(logic.eligibleCalls(calls, fixed, '2026-09-01'), ['C4', 'C1', 'C3']);
  });
  test('a call closing today is still open', () => {
    assert.ok(logic.eligibleCalls(calls, fixed, '2026-11-30').includes('C1'));
  });
});
