// Ask the Handbook logic. Plain functions with no page code, so
// `npm run check handbook` can test them. Replace each TODO with your own code;
// keep the names and argument shapes, and add helpers as you like.
// handbook is the parsed handbook.json: { stopwords, guides: [{ id, title, updated, text, supersededBy? }] }.
//
// Evidence rules the self-check expects:
// - A guide's score is the share of the question's content words found in its title or text (0 to 1).
// - Answer only when the best guide scores at least 0.5; otherwise return null.
// - Never cite a guide that has supersededBy. If several guides score within 0.1 of the best, cite the newest.

/** Lowercase content words: split on anything that is not a letter or digit, drop stopwords. */
export function tokenize(_text, _stopwords) {
  throw new Error('TODO: implement tokenize() in logic.js');
}

/** Guides containing any of the query's content words → [{ id, score }], best first, newest first on ties. */
export function search(_handbook, _query) {
  throw new Error('TODO: implement search() in logic.js');
}

/** { sourceId, quote } where quote is one whole sentence of the cited guide, or null when the evidence is too weak. */
export function answer(_handbook, _question) {
  throw new Error('TODO: implement answer() in logic.js');
}

/** Numbers in replyText (e.g. "600", "2025") that do not appear in sourceText → array of strings. */
export function unsupportedNumbers(_replyText, _sourceText) {
  throw new Error('TODO: implement unsupportedNumbers() in logic.js');
}
