// Self-check for Robot Lab: run `npm run check robot`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const presets = JSON.parse(readFileSync(new URL('../../data/generated/robot-presets.json', import.meta.url)));
const { lengths, limits } = presets;
const [L1, L2] = lengths;

function near(actual, expected, what) {
  assert.ok(Math.abs(actual - expected) < 1e-6, `${what}: expected ${expected}, got ${actual}`);
}
function point(angles, x, y) {
  const p = logic.endpoint(angles, lengths);
  near(p.x, x, `x for angles [${angles}]`);
  near(p.y, y, `y for angles [${angles}]`);
}

describe('30-minute goal: endpoint and limits', () => {
  test('zero angles place the endpoint at (L1 + L2, 0)', () => point([0, 0], L1 + L2, 0));
  test('90° first joint, 0° second joint places it at (0, L1 + L2)', () => point([90, 0], 0, L1 + L2));
  test('the second link adds its angle to the first: [0, 90] gives (L1, L2)', () => point([0, 90], L1, L2));
  test('[90, -90] folds the second link back to horizontal: (L2, L1)', () => point([90, -90], L2, L1));
  test('angles outside the limits are moved to the nearest limit', () => {
    assert.deepEqual(logic.clampAngles([200, -200], limits), [150, -135]);
    assert.deepEqual(logic.clampAngles([10, -20], limits), [10, -20]);
  });
});

describe('45-minute goal: reachable targets', () => {
  const geometric = { '1.7,0': true, '0,1.7': true, '0,0': false, '0.3,0': true, '1,1': true, '2,0': false,
    '-1,0': true, '-1.7,0': true, '0.299,0': false, '1.701,0': false, '0.8,-0.5': true, '0,-1.7': true };
  for (const target of presets.targets) {
    const expected = geometric[target.join(',')];
    test(`(${target}) is ${expected ? '' : 'not '}reachable, ignoring joint limits`, () => {
      assert.equal(logic.isReachable(target, lengths), expected,
        'Boundary points count as reachable; compare distances with a small tolerance');
    });
  }
  test('(-1.7, 0) needs a 180° first joint, so joint limits make it unreachable', () => {
    assert.equal(logic.isReachableWithLimits([-1.7, 0], lengths, limits), false);
  });
  test('(-1, 0) is still reachable with limits by bending the elbow', () => {
    assert.equal(logic.isReachableWithLimits([-1, 0], lengths, limits), true);
  });
  test('targets reachable without bending past a limit stay reachable', () => {
    for (const target of [[1.7, 0], [0, -1.7], [1, 1]]) {
      assert.equal(logic.isReachableWithLimits(target, lengths, limits), true, `target (${target})`);
    }
    assert.equal(logic.isReachableWithLimits([2, 0], lengths, limits), false, 'target (2,0)');
  });
});
