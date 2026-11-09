// Sound Lab calculations. Plain functions with no page code, so
// `npm run check sound` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// In the page, get the bytes with: await (await fetch(url)).arrayBuffer()

/** WAV file bytes (ArrayBuffer) → { sampleRate, samples }, samples as numbers from -1 to 1. Mono 16-bit PCM is enough. */
export function parseWav(_arrayBuffer) {
  throw new Error('TODO: implement parseWav() in logic.js');
}

/**
 * Magnitude spectrum of the first windowSize samples → { frequencies, magnitudes },
 * where frequencies[i] = i × sampleRate / windowSize. Throws when windowSize is
 * below 2 or larger than the number of samples.
 */
export function spectrum(_samples, _sampleRate, _windowSize) {
  throw new Error('TODO: implement spectrum() in logic.js');
}

/** Strongest frequency in Hz, or null when there is no clear peak (for example silence). */
export function peakFrequency(_samples, _sampleRate, _windowSize) {
  throw new Error('TODO: implement peakFrequency() in logic.js');
}
