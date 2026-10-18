import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fixtures, manifest } from '../../scripts/generate-data.mjs';
test('input fixtures reproduce exact bytes without precomputed answers', () => {
  const files = fixtures();
  let bytes = 0;
  for (const [name, contents] of Object.entries(files)) {
    assert.deepEqual(readFileSync('data/generated/' + name), Buffer.from(contents));
    bytes += Buffer.byteLength(contents);
  }
  assert.ok(!Object.hasOwn(files, 'experiment-results.csv'));
  assert.deepEqual(JSON.parse(readFileSync('data/manifest.json')), manifest(files));
  assert.ok(bytes < 5 * 1024 * 1024);
});
