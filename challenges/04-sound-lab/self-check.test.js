// Self-check for Sound Lab: run `npm run check sound`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const rejects = fn => assert.throws(fn, e => !/^TODO/.test(e.message), 'expected your own error, not the TODO placeholder');

function wav(name) {
  const bytes = readFileSync(new URL(`../../data/generated/${name}.wav`, import.meta.url));
  return logic.parseWav(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
}
const WINDOW = 2048;
const BIN = 16000 / WINDOW;

describe('30-minute goal: read a WAV file', () => {
  test('tone-440 has 16000 Hz sample rate and 32000 samples (two seconds)', () => {
    const { sampleRate, samples } = wav('tone-440');
    assert.equal(sampleRate, 16000);
    assert.equal(samples.length, 32000);
  });
  test('samples are scaled to -1..1; the tone peaks near amplitude 0.12', () => {
    const { samples } = wav('tone-440');
    const loudest = Math.max(...Array.from(samples, Math.abs));
    assert.ok(loudest > 0.11 && loudest < 0.13, `loudest sample ${loudest}`);
  });
  test('silence is all zeros', () => {
    assert.ok(Array.from(wav('silence').samples).every(x => x === 0));
  });
});

describe('45-minute goal: spectrum and peak frequency', () => {
  for (const [name, expected] of [['tone-440', [440]], ['tone-1000', [1000]], ['mix', [440, 880]]]) {
    test(`${name}: peak within one frequency bin (${BIN} Hz) of ${expected.join(' or ')} Hz`, () => {
      const { samples, sampleRate } = wav(name);
      const peak = logic.peakFrequency(samples, sampleRate, WINDOW);
      assert.ok(expected.some(f => Math.abs(peak - f) <= BIN), `peak ${peak} Hz`);
    });
  }
  test('silence gives finite magnitudes and no peak (null)', () => {
    const { samples, sampleRate } = wav('silence');
    assert.ok(Array.from(logic.spectrum(samples, sampleRate, WINDOW).magnitudes).every(Number.isFinite));
    assert.equal(logic.peakFrequency(samples, sampleRate, WINDOW), null);
  });
  test('frequency resolution is sample rate / window size', () => {
    const { samples, sampleRate } = wav('tone-440');
    for (const size of [1024, 4096]) {
      const { frequencies, magnitudes } = logic.spectrum(samples, sampleRate, size);
      assert.equal(frequencies.length, magnitudes.length);
      assert.ok(Math.abs(frequencies[1] - frequencies[0] - sampleRate / size) < 1e-9, `window ${size}`);
    }
  });
  test('impossible window sizes are rejected', () => {
    const { samples, sampleRate } = wav('tone-440');
    rejects(() => logic.spectrum(samples, sampleRate, 0));
    rejects(() => logic.spectrum(samples, sampleRate, samples.length + 1));
  });
});
