// Self-check for Paper to JSON: run `npm run check forms`.
// These tests describe the expected behavior. Change logic.js, not this file.
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as logic from './logic.js';

const json = name => JSON.parse(readFileSync(new URL(`../../data/generated/${name}`, import.meta.url)));
const applications = json('applications.json');
const rules = json('certifications.json');
const text = id => applications.find(a => a.id === id).text;
const problems = record => [...logic.validate(record, rules)].sort();

const alva = { applicantId: 'APP-1001', name: 'Alva Lindqvist', certification: 'Welding inspector level 1',
  employer: 'Nordweld AB', submitted: '2026-03-02', examDate: '2026-04-15', experienceYears: 3,
  email: 'alva.lindqvist@nordweld.example' };

describe('30-minute goal: dates and validation', () => {
  test('ISO, written-out and DD/MM/YYYY dates become ISO', () => {
    assert.equal(logic.normalizeDate('2026-05-03'), '2026-05-03');
    assert.equal(logic.normalizeDate('3 May 2026'), '2026-05-03');
    assert.equal(logic.normalizeDate('22 April 2026'), '2026-04-22');
    assert.equal(logic.normalizeDate('03/05/2026'), '2026-05-03', 'slash dates are DD/MM/YYYY');
  });
  test('impossible or vague dates give null', () => {
    assert.equal(logic.normalizeDate('31/02/2026'), null);
    assert.equal(logic.normalizeDate('2026-13-01'), null);
    assert.equal(logic.normalizeDate('next week'), null);
    assert.equal(logic.normalizeDate(''), null);
  });
  test('a complete, consistent record has no problems', () => assert.deepEqual(problems(alva), []));
  test('a missing field is reported by name', () => {
    assert.deepEqual(problems({ ...alva, email: null }), ['missing:email']);
  });
  test('too little experience for the certification is reported', () => {
    assert.deepEqual(problems({ ...alva, certification: 'Welding inspector level 2', experienceYears: 4 }),
      ['too-little-experience']);
  });
  test('an unknown certification is reported', () => {
    assert.deepEqual(problems({ ...alva, certification: 'Drone pilot' }), ['unknown-certification']);
  });
  test('an exam before the submission date is reported', () => {
    assert.deepEqual(problems({ ...alva, examDate: '2026-03-01' }), ['exam-before-submission']);
  });
  test('an email without @ is reported', () => {
    assert.deepEqual(problems({ ...alva, email: 'alva.lindqvist' }), ['invalid-email']);
  });
});

describe('45-minute goal: extract the form and table layouts', () => {
  test('APP-1001 (form) is extracted exactly', () => assert.deepEqual(logic.extract(text('APP-1001')), alva));
  test('APP-1002 (table, 10/03/2026 means 10 March) is extracted exactly', () => {
    assert.deepEqual(logic.extract(text('APP-1002')), { applicantId: 'APP-1002', name: 'Omar Haddad',
      certification: 'Welding inspector level 2', employer: 'Kustbygg AB', submitted: '2026-03-10',
      examDate: '2026-04-22', experienceYears: 4, email: 'omar.haddad@kustbygg.example' });
  });
  test('APP-1003 uses other labels ("Ref", "Full name", "Exam on") and is still extracted', () => {
    assert.deepEqual(logic.extract(text('APP-1003')), { applicantId: 'APP-1003', name: 'Mira Svensson',
      certification: 'Energy auditor', employer: 'Ljusgarden Fastigheter', submitted: '2026-03-05',
      examDate: '2026-03-01', experienceYears: 6, email: 'mira.svensson@ljusgarden.example' });
  });
  test('APP-1006 has no exam date, so examDate is null', () => {
    assert.equal(logic.extract(text('APP-1006')).examDate, null);
  });
  test('validating the extracted forms finds the planted problems', () => {
    const found = Object.fromEntries(['APP-1001', 'APP-1002', 'APP-1003', 'APP-1006']
      .map(id => [id, problems(logic.extract(text(id)))]));
    assert.deepEqual(found, { 'APP-1001': [], 'APP-1002': ['too-little-experience'],
      'APP-1003': ['exam-before-submission'], 'APP-1006': ['missing:examDate', 'too-little-experience'] });
  });
});
