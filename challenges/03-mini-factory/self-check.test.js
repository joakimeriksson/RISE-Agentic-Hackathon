// Self-check for Mini Factory: run `npm run check factory`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const scenarios = JSON.parse(readFileSync(new URL('../../data/generated/factory-scenarios.json', import.meta.url)));
const byName = name => scenarios.find(s => s.name === name);

function run(scenario, seconds, onStep = () => {}) {
  let state = logic.initialState(scenario);
  for (let i = 0; i < seconds; i++) {
    state = logic.step(state, scenario);
    onStep(logic.summary(state));
  }
  return logic.summary(state);
}

describe('30-minute goal: single-step state', () => {
  const scenario = byName('Bottleneck');
  test('the line starts empty at time 0', () => {
    assert.deepEqual(logic.summary(logic.initialState(scenario)),
      { time: 0, arrived: 0, completed: 0, rejected: 0, waiting: [0, 0, 0], atStations: 0 });
  });
  test('after one step the first item has arrived and started at station 1', () => {
    assert.deepEqual(run(scenario, 1),
      { time: 1, arrived: 1, completed: 0, rejected: 0, waiting: [0, 0, 0], atStations: 1 });
  });
  test('step returns a new state and leaves the old one unchanged', () => {
    const state = logic.initialState(scenario);
    const before = structuredClone(state);
    logic.step(state, scenario);
    assert.deepEqual(state, before);
  });
  test('reset: a fresh initial state is the same even after a run', () => {
    const first = logic.initialState(scenario);
    run(scenario, 50);
    assert.deepEqual(logic.initialState(scenario), first);
  });
});

describe('45-minute goal: a trustworthy simulation', () => {
  test('identical inputs produce identical results', () => {
    assert.deepEqual(run(byName('Bottleneck'), 240), run(byName('Bottleneck'), 240));
  });
  for (const scenario of scenarios) {
    test(`${scenario.name}: queues stay within capacity and every item is accounted for`, () => {
      let time = 0;
      run(scenario, scenario.duration, s => {
        time++;
        assert.equal(s.time, time);
        assert.ok(s.waiting.every(n => n >= 0 && n <= scenario.capacity), `t=${s.time}: waiting ${s.waiting}`);
        assert.equal(s.arrived, s.completed + s.rejected + s.waiting.reduce((a, b) => a + b) + s.atStations,
          `t=${s.time}: arrived must equal completed + rejected + waiting + at stations`);
      });
    });
  }
  test('Balanced line: 58 completed and none rejected in 240 s (check it by hand)', () => {
    const s = run(byName('Balanced'), 240);
    assert.equal(s.completed, 58);
    assert.equal(s.rejected, 0);
  });
  test('Bottleneck line completes fewer items and has to reject some', () => {
    const slow = run(byName('Bottleneck'), 240);
    assert.ok(slow.completed < run(byName('Balanced'), 240).completed, `completed ${slow.completed}`);
    assert.ok(slow.rejected > 0, 'a full queue 1 rejects arrivals');
  });
});
