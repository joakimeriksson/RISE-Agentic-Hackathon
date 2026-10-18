import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
const slugs = readdirSync('challenges').sort();
const server = createServer((req, res) => {
  try {
    const relative = decodeURIComponent(req.url.split('?')[0]);
    if (!relative.startsWith('/kit/')) { res.writeHead(404).end(); return; }
    const path = resolve('dist', relative.slice(5));
    if (!path.startsWith(resolve('dist') + '/')) { res.writeHead(403).end(); return; }
    res.setHeader('Content-Type', { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[extname(path)] || 'text/plain');
    res.end(readFileSync(path));
  } catch { res.writeHead(404).end(); }
});
const offlineOnly = process.env.OFFLINE_ONLY === '1';
if (!offlineOnly) await new Promise((ok, fail) => { server.once('error', fail); server.listen(0, '127.0.0.1', ok); });
const base = offlineOnly ? '' : `http://127.0.0.1:${server.address().port}/kit/`;
let browser;
try {
  browser = await chromium.launch({ headless: true });
  for (const offline of (offlineOnly ? [true] : [false, true])) {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    if (offline) await context.setOffline(true);
    for (const slug of slugs) {
      const page = await context.newPage();
      const errors = [], unexpected = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => {
        if (offline ? !r.isNavigationRequest() : !r.url().startsWith(base)) unexpected.push(r.url());
      });
      page.on('response', r => { if (r.status() >= 400) errors.push(r.url()); });
      const path = `challenges/${slug}/index.html`;
      await page.goto(offline ? pathToFileURL(resolve('artifacts/offline', path)).href : base + path);
      await page.getByRole('heading', { name: 'Your tasks' }).waitFor();
      assert.match(await page.locator('#workspace').innerText(), /Your application goes here/);
      const check = page.getByRole('checkbox').first();
      await check.focus();
      await check.press('Space');
      assert.ok(await check.isChecked());
      await page.getByText('Need a starting hint?', { exact: true }).click();
      await page.setViewportSize({ width: 375, height: 812 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      assert.deepEqual(errors, []);
      assert.deepEqual(unexpected, []);
      if (process.env.SCREENSHOTS === '1') {
        mkdirSync('docs/screenshots', { recursive: true });
        await page.screenshot({ path: `docs/screenshots/${slug}.png`, fullPage: true });
      }
      console.log(`PASS ${offline ? 'offline' : 'built subpath'} ${slug}`);
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser?.close();
  if (server.listening) await new Promise(ok => server.close(ok));
}
