import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
test('five task routes without completed applications', () => {
  const html = readFileSync('index.html', 'utf8');
  assert.equal((html.match(/Open task/g) || []).length, 5);
  assert.ok(!html.includes('solutions/'));
  assert.ok(!existsSync('solutions'));
  assert.ok(!existsSync('instructors/ANSWER_KEY.md'));
  assert.deepEqual(readdirSync('src/shared').filter(f => f.endsWith('.js')).sort(), ['random.js', 'task.js']);
  for (const slug of readdirSync('challenges')) {
    const task = JSON.parse(readFileSync(`challenges/${slug}/task.json`));
    assert.equal(task.steps.length, 4);
    assert.equal(task.checks.length, 3);
    assert.ok(task.data.every(f => existsSync('data/generated/' + f)));
    assert.match(readFileSync(`challenges/${slug}/app.js`, 'utf8'), /TODO: Build your/);
  }
});
