import { build } from 'esbuild';
import { zipSync, strToU8 } from 'fflate';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
const files = {};
const css = readFileSync('src/shared/base.css', 'utf8');
const slugs = readdirSync('challenges').sort();
for (const slug of slugs) {
  const path = `challenges/${slug}/index.html`;
  const result = await build({ entryPoints: [`challenges/${slug}/app.js`], bundle: true,
    write: false, format: 'iife', target: 'es2022' });
  const html = readFileSync(path, 'utf8')
    .replace(/<link rel="stylesheet"[^>]*>/, () => `<style>${css}</style>`)
    .replace('<script type="module" src="./app.js"></script>', () => '<script>' +
      result.outputFiles[0].text.replaceAll('</script', '<\\/script') + '</script>');
  files[path] = strToU8(html);
}
files['index.html'] = strToU8(readFileSync('index.html', 'utf8')
  .replace(/<link rel="stylesheet"[^>]*>/, () => `<style>${css}</style>`));
function copy(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) copy(path);
    else if (/\.(md|csv|json|wav|js|css)$/.test(path)) files[path] = new Uint8Array(readFileSync(path));
  }
}
for (const dir of ['challenges', 'data', 'src']) copy(dir);
for (const name of ['README.md', 'GETTING_STARTED.md', 'THIRD_PARTY_NOTICES.md',
  'docs/FALLBACKS.md', 'docs/AGENT_WORKFLOW.md', 'docs/DATA_POLICY.md',
  'docs/COST_AND_ACCESS.md', 'docs/ACCESSIBILITY.md', 'docs/RELEASE_CHECKLIST.md', 'docs/VERIFICATION.md']) {
  files[name] = new Uint8Array(readFileSync(name));
}
// Regenerate this disposable output directory so old demos cannot survive a rebuild.
rmSync('artifacts/offline', { recursive: true, force: true });
mkdirSync('artifacts/offline', { recursive: true });
for (const [name, bytes] of Object.entries(files)) {
  mkdirSync(resolve('artifacts/offline', name, '..'), { recursive: true });
  writeFileSync('artifacts/offline/' + name, bytes);
}
writeFileSync('artifacts/offline-kit.zip', zipSync(Object.fromEntries(Object.entries(files)
  .map(([name, bytes]) => [name, [bytes, { mtime: new Date('2026-01-15T00:00:00Z') }]])), { level: 6 }));
console.log('Built five task workspaces, briefs and synthetic inputs; no completed applications.');
