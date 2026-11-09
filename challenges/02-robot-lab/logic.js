// Robot Lab calculations. Plain functions with no page code, so
// `npm run check robot` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// Angles are in degrees; lengths and coordinates are in meters.

/** Arm endpoint for angles [a1, a2] and lengths [L1, L2] → { x, y }. */
export function endpoint(_angles, _lengths) {
  throw new Error('TODO: implement endpoint() in logic.js');
}

/** Angles moved inside limits [[min1, max1], [min2, max2]] → [a1, a2]. */
export function clampAngles(_angles, _limits) {
  throw new Error('TODO: implement clampAngles() in logic.js');
}

/** Can the endpoint touch target [x, y] at all, ignoring joint limits? Boundary points count. */
export function isReachable(_target, _lengths) {
  throw new Error('TODO: implement isReachable() in logic.js');
}

/** Can the endpoint touch target [x, y] with both joints inside their limits? */
export function isReachableWithLimits(_target, _lengths, _limits) {
  throw new Error('TODO: implement isReachableWithLimits() in logic.js');
}
