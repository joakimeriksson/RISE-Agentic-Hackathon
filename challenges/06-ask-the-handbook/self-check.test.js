// Self-check for Ask the Handbook: run `npm run check handbook`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const handbook = JSON.parse(readFileSync(new URL('../../data/generated/handbook.json', import.meta.url)));
const guide = id => handbook.guides.find(g => g.id === id);
const top = query => logic.search(handbook, query)[0]?.id;
const sourceOf = question => logic.answer(handbook, question)?.sourceId ?? null;

describe('30-minute goal: search the guides', () => {
  test('tokenize keeps lowercase content words only', () => {
    assert.deepEqual(logic.tokenize('How do I get access to Ledger?', handbook.stopwords), ['get', 'access', 'ledger']);
  });
  test('"phishing" finds the security guide first', () => assert.equal(top('phishing'), 'H5'));
  test('"NDA template" finds the NDA guide first', () => assert.equal(top('NDA template'), 'H3'));
  test('"register customer Atlas" finds the Atlas guide first', () => assert.equal(top('register customer Atlas'), 'H6'));
  test('scores run from 0 to 1 and the best comes first', () => {
    const results = logic.search(handbook, 'phishing laptops');
    assert.ok(results.length > 0);
    assert.equal(results[0].score, 1, 'both words appear in H5');
    assert.ok(results.every((r, i) => r.score > 0 && r.score <= 1 && (i === 0 || results[i - 1].score >= r.score)));
  });
  test('words that appear nowhere, or only stopwords, find nothing', () => {
    assert.deepEqual(logic.search(handbook, 'parking garage'), []);
    assert.deepEqual(logic.search(handbook, 'how do I'), []);
    assert.deepEqual(logic.search(handbook, ''), []);
  });
});

describe('45-minute goal: answers you can trust', () => {
  test('the replaced Ledger guide (H2) is never cited; its replacement H1 is', () => {
    assert.equal(sourceOf('Who do I email to request Ledger access?'), 'H1', 'H2 matches best but was replaced by H1');
  });
  test('the quote is one whole sentence of the cited guide', () => {
    const { sourceId, quote } = logic.answer(handbook, 'Who do I email to request Ledger access?');
    const sentences = guide(sourceId).text.split(/(?<=[.!?])\s+/);
    assert.ok(sentences.includes(quote), `"${quote}" is not a sentence of ${sourceId}`);
  });
  test('the working-abroad question cites H7', () => {
    assert.equal(sourceOf('Do I need approval for working from another country?'), 'H7');
  });
  test('two guides disagree about trains; the newest (H8) wins', () => {
    assert.equal(sourceOf('Is train the default for a 600 km trip?'), 'H8');
  });
  test('questions the guides do not cover get no answer', () => {
    assert.equal(sourceOf('What is the canteen menu on Friday?'), null);
    assert.equal(sourceOf('How do I book a parking space?'), null, 'one shared word ("book") is too weak');
  });
  test('numbers in a reply must come from the guide', () => {
    assert.deepEqual(logic.unsupportedNumbers('Train is the default under 800 km since 2025.', guide('H8').text), []);
    assert.deepEqual(logic.unsupportedNumbers('Train is the default under 600 km.', guide('H8').text), ['600']);
  });
});
