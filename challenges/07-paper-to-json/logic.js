// Paper to JSON logic. Plain functions with no page code, so
// `npm run check forms` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
//
// A record is { applicantId, name, certification, employer, submitted, examDate, experienceYears, email }.
// Dates are ISO strings (2026-05-03), experienceYears is a number, and a missing field is null.
// Problem codes: 'missing:<field>', 'unknown-certification', 'too-little-experience',
// 'exam-before-submission', 'invalid-email'.

/** '2026-05-03', '3 May 2026' or '03/05/2026' (DD/MM/YYYY) → '2026-05-03'; anything else or an impossible date → null. */
export function normalizeDate(_text) {
  throw new Error('TODO: implement normalizeDate() in logic.js');
}

/** Application text in the form or table layout → a record. */
export function extract(_text) {
  throw new Error('TODO: implement extract() in logic.js');
}

/** Problems with a record, given certifications.json → array of problem codes (empty when valid). */
export function validate(_record, _rules) {
  throw new Error('TODO: implement validate() in logic.js');
}
