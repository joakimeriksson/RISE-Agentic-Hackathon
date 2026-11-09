import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';
import { unzipSync } from 'fflate';
import { pathToFileURL } from 'node:url';
const zip = unzipSync(readFileSync('artifacts/offline-kit.zip'));
const pages = Object.entries(zip).filter(([n]) => /^challenges\/[^/]+\/index.html$/.test(n));
test('participant ZIP excludes completed code, answers and historical backups', () => {
  assert.equal(pages.length, 8);
  for (const name of Object.keys(zip)) {
    assert.ok(!/solutions\/|ANSWER_KEY|experiment-results|^artifacts\/|^instructors\/|^demo-/.test(name), name);
  }
  assert.deepEqual(Object.keys(zip).filter(n => /^src\/shared\/.*\.js$/.test(n)).sort(),
    ['src/shared/random.js', 'src/shared/task.js']);
});
test('participant ZIP ships only TODO stubs in logic.js', async () => {
  const stubs = Object.keys(zip).filter(n => /^challenges\/[^/]+\/logic\.js$/.test(n));
  assert.equal(stubs.length, 8);
  for (const name of stubs) {
    const exports = Object.entries(await import(pathToFileURL('artifacts/offline/' + name).href));
    assert.ok(exports.length > 0, name);
    for (const [fn, value] of exports) assert.throws(() => value(), /^Error: TODO/, `${name} ${fn}`);
  }
});
for (const [name, bytes] of pages) {
  test(`task scaffold: ${name}`, () => {
    const html = new TextDecoder().decode(bytes);
    assert.equal(html, readFileSync('artifacts/offline/' + name, 'utf8'));
    assert.ok(!/<script[^>]+(?:src=|type="module")/.test(html));
    assert.ok(!/<link[^>]+rel="stylesheet"/.test(html));
    const errors = [];
    const console = new VirtualConsole();
    console.on('jsdomError', e => errors.push(e.message));
    const dom = new JSDOM(html, { runScripts: 'outside-only', virtualConsole: console });
    const w = dom.window;
    w.fetch = () => { throw new Error('Unexpected fetch'); };
    try {
      for (const script of w.document.querySelectorAll('script')) w.eval(script.textContent);
      assert.match(w.document.querySelector('#workspace').textContent, /Your application goes here/);
      assert.equal(w.document.querySelectorAll('ol li').length, 4);
      assert.equal(w.document.querySelectorAll('input[type=checkbox]').length, 3);
      const checkbox = w.document.querySelector('input');
      checkbox.click();
      assert.equal(checkbox.checked, true);
      for (const link of w.document.querySelectorAll('#app a')) {
        assert.ok(zip[link.getAttribute('href').replace('../../', '')]);
      }
      assert.deepEqual(errors, []);
    } finally { w.close(); }
  });
}
