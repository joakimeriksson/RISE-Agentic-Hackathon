// Data Detective calculations. Plain functions with no page code, so
// `npm run check data` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
//
// A row is { timestamp_utc, machine_id, temperature_c, vibration_mm_s, power_kw, duplicate }.
// Numeric fields are numbers, or null when the cell is empty or not a number (never 0).
// duplicate is true for a repeated timestamp + machine pair after its first appearance.

/** CSV text → { rows, issues }, where issues lists problems found, e.g. { line, problem }. Throws on a wrong header. */
export function parseReadings(_csvText) {
  throw new Error('TODO: implement parseReadings() in logic.js');
}

/** Rows matching { machine, from, to }; any option may be left out. from is inclusive, to exclusive (ISO UTC). */
export function filterRows(_rows, _filter) {
  throw new Error('TODO: implement filterRows() in logic.js');
}

/** { count, mean, min, max } of one numeric field, skipping nulls and duplicates. No values → count 0, the rest null. */
export function summarize(_rows, _field) {
  throw new Error('TODO: implement summarize() in logic.js');
}
