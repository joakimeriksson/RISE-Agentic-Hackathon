// Self-check for Research Autopilot: run `npm run check research`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const rejects = fn => assert.throws(fn, e => !/^TODO/.test(e.message), 'expected your own error, not the TODO placeholder');

const json = name => JSON.parse(readFileSync(new URL(`../../data/generated/${name}`, import.meta.url)));
const config = json('experiment-config.json');
const cards = json('source-cards.json');
const flow = thickness => logic.heatFlow({ k: config.k, area: config.area, deltaT: config.deltaT, thickness });

describe('30-minute goal: noiseless heat flow', () => {
  test('0.04 × 10 × 20 / 0.02 = 400 W', () => {
    assert.ok(Math.abs(flow(0.02) - 400) < 1e-9, `got ${flow(0.02)}`);
  });
  test('doubling thickness halves noiseless heat flow', () => {
    for (const t of [0.02, 0.04, 0.05]) assert.ok(Math.abs(flow(2 * t) - flow(t) / 2) < 1e-9, `thickness ${t}`);
  });
  test('zero and negative thickness are rejected', () => {
    rejects(() => flow(0));
    rejects(() => flow(-0.02));
  });
});

describe('45-minute goal: reproducible trials, export and citations', () => {
  test('three seeds at five thicknesses give 15 trials', () => {
    const trials = logic.runTrials(config);
    assert.equal(trials.length, 15);
    for (const t of config.thicknesses) assert.equal(trials.filter(x => x.thickness === t).length, 3, `thickness ${t}`);
  });
  test('running again gives exactly the same trials', () => {
    assert.deepEqual(logic.runTrials(config), logic.runTrials(config));
  });
  test('noise is applied and stays within ±noise of the noiseless value', () => {
    const trials = logic.runTrials(config);
    for (const { thickness, q } of trials) {
      assert.ok(Math.abs(q / flow(thickness) - 1) <= config.noise + 1e-12, `q ${q} at ${thickness} m`);
    }
    assert.ok(trials.some(({ thickness, q }) => q !== flow(thickness)), 'every trial equals the noiseless value');
  });
  test('the CSV export is labeled synthetic and has one row per trial', () => {
    const text = logic.trialsToCsv(logic.runTrials(config));
    assert.match(text, /synthetic/i);
    const lines = text.trim().split(/\r?\n/).filter(line => !line.startsWith('#'));
    assert.equal(lines.length, 16, 'one header row plus 15 trial rows');
  });
  test('a word-for-word quote is found in its card', () => {
    assert.equal(logic.quoteExists(cards, 'S1', 'doubling thickness halves noiseless heat flow'), true);
  });
  test('reworded quotes, the wrong card or an unknown card are not', () => {
    assert.equal(logic.quoteExists(cards, 'S1', 'doubling thickness always halves heat loss'), false);
    assert.equal(logic.quoteExists(cards, 'S5', 'doubling thickness halves noiseless heat flow'), false);
    assert.equal(logic.quoteExists(cards, 'S9', 'heat flow'), false);
  });
});
