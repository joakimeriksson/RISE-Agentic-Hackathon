// Self-check for Data Detective: run `npm run check data`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const rejects = fn => assert.throws(fn, e => !/^TODO/.test(e.message), 'expected your own error, not the TODO placeholder');

const csv = name => readFileSync(new URL(`../../data/generated/${name}`, import.meta.url), 'utf8');
const clean = () => logic.parseReadings(csv('sensor-readings.csv'));
const dirty = () => logic.parseReadings(csv('sensor-dirty.csv'));

describe('30-minute goal: load, filter and summarize', () => {
  test('the clean file has 864 readings with numeric values', () => {
    const { rows } = clean();
    assert.equal(rows.length, 864);
    const first = rows[0];
    assert.equal(first.timestamp_utc, '2026-01-15T00:00:00.000Z');
    assert.equal(first.machine_id, 'M1');
    assert.equal(first.temperature_c, 21.101);
    assert.equal(first.vibration_mm_s, 1.448);
    assert.equal(first.power_kw, 5.852);
  });
  test('filtering by machine keeps only that machine', () => {
    const rows = logic.filterRows(clean().rows, { machine: 'M2' });
    assert.equal(rows.length, 288);
    assert.ok(rows.every(r => r.machine_id === 'M2'));
  });
  test('a one-hour UTC window holds 12 five-minute readings (from inclusive, to exclusive)', () => {
    const rows = logic.filterRows(clean().rows,
      { machine: 'M3', from: '2026-01-15T06:00:00.000Z', to: '2026-01-15T07:00:00.000Z' });
    assert.equal(rows.length, 12);
  });
  test('summary of M1 temperature matches a hand calculation', () => {
    const values = csv('sensor-readings.csv').trim().split('\n').slice(1)
      .map(line => line.split(',')).filter(cells => cells[1] === 'M1').map(cells => Number(cells[2]));
    const s = logic.summarize(logic.filterRows(clean().rows, { machine: 'M1' }), 'temperature_c');
    assert.equal(s.count, 288);
    assert.ok(Math.abs(s.mean - values.reduce((a, b) => a + b) / values.length) < 1e-9, `mean ${s.mean}`);
    assert.equal(s.min, Math.min(...values));
    assert.equal(s.max, Math.max(...values));
  });
  test('an empty selection gives count 0 and null statistics, not NaN', () => {
    const rows = logic.filterRows(clean().rows, { machine: 'M9' });
    assert.deepEqual(rows, []);
    assert.deepEqual(logic.summarize(rows, 'temperature_c'), { count: 0, mean: null, min: null, max: null });
  });
  test('empty and "broken" cells become null, never 0, and are reported', () => {
    const { rows, issues } = dirty();
    assert.equal(rows[3].temperature_c, null, 'line 5 has an empty temperature');
    assert.equal(rows[4].temperature_c, null, 'line 6 has "broken" as temperature');
    assert.ok(issues.length >= 2, 'both problems should be listed in issues');
  });
});

describe('45-minute goal: duplicates and invalid files', () => {
  test('duplicates stay in the rows for display but are flagged', () => {
    const { rows } = dirty();
    assert.equal(rows.length, 865);
    assert.equal(rows[864].duplicate, true, 'the last row repeats M1 at 00:50');
    assert.ok(!rows[10].duplicate, 'the first appearance is not a duplicate');
  });
  test('summaries skip nulls and duplicates', () => {
    const s = logic.summarize(logic.filterRows(dirty().rows, { machine: 'M1' }), 'temperature_c');
    assert.equal(s.count, 286, '288 readings, minus 2 missing values; the duplicate is not counted twice');
  });
  test('the duplicate is reported as an issue too', () => {
    assert.ok(dirty().issues.length >= 3);
  });
  test('a header-only file gives no rows and no error', () => {
    assert.deepEqual(logic.parseReadings(csv('sensor-empty.csv')).rows, []);
  });
  test('a file with the wrong header is rejected with an error', () => {
    rejects(() => logic.parseReadings(csv('sensor-malformed.csv')));
  });
});
