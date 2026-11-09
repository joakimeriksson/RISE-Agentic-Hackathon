// Mini Factory simulation engine. Plain functions with no page code, so
// `npm run check factory` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// Follow the simulation rules in README.md: the self-check expects them.
// The state can look however you like, as long as summary() can count it.

/** State of an empty line at time 0 for a scenario from factory-scenarios.json. */
export function initialState(_scenario) {
  throw new Error('TODO: implement initialState() in logic.js');
}

/** State one simulated second later. Must not change the state passed in. */
export function step(_state, _scenario) {
  throw new Error('TODO: implement step() in logic.js');
}

/** Counts → { time, arrived, completed, rejected, waiting: [queue1, queue2, queue3], atStations }. */
export function summary(_state) {
  throw new Error('TODO: implement summary() in logic.js');
}
