// Research Autopilot calculations. Plain functions with no page code, so
// `npm run check research` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// Units: Q in W, k in W/(m·K), area in m², deltaT in K, thickness in m.
// For seeded noise, src/shared/random.js gives a reproducible generator.

/** Noiseless heat flow Q = k × A × ΔT / thickness for { k, area, deltaT, thickness }. Throws for thickness ≤ 0. */
export function heatFlow(_params) {
  throw new Error('TODO: implement heatFlow() in logic.js');
}

/** One trial per thickness × seed in the config → [{ thickness, seed, q }], noise within ±config.noise of Q. */
export function runTrials(_config) {
  throw new Error('TODO: implement runTrials() in logic.js');
}

/** Trials → CSV text: optional "#" comment lines, one header row, one row per trial. Label it as synthetic. */
export function trialsToCsv(_trials) {
  throw new Error('TODO: implement trialsToCsv() in logic.js');
}

/** Does passage appear word for word in the source card with this id? */
export function quoteExists(_cards, _cardId, _passage) {
  throw new Error('TODO: implement quoteExists() in logic.js');
}
