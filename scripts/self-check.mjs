// Runs a mission's self-check against the participant's logic.js.
// `npm run check robot` runs one mission; `npm run check` summarizes all five.
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
const missions = readdirSync('challenges').sort().map(slug => ({ slug,
  ...JSON.parse(readFileSync(`challenges/${slug}/task.json`, 'utf8')) }));
const file = m => `challenges/${m.slug}/self-check.test.js`;
const wanted = process.argv[2]?.toLowerCase();
if (wanted) {
  const mission = missions.find(m => m.check === wanted || m.slug.includes(wanted));
  if (!mission) {
    console.error(`Unknown mission "${wanted}". Try: ${missions.map(m => m.check).join(', ')}`);
    process.exit(2);
  }
  process.exitCode = spawnSync(process.execPath, ['--test', '--test-reporter=spec', file(mission)],
    { stdio: 'inherit' }).status;
} else {
  for (const m of missions) {
    const out = spawnSync(process.execPath, ['--test', '--test-reporter=tap', file(m)], { encoding: 'utf8' }).stdout;
    const count = key => Number(out.match(new RegExp(`^# ${key} (\\d+)`, 'm'))?.[1] ?? 0);
    console.log(`${m.title.padEnd(20)} ${String(count('pass')).padStart(2)}/${count('tests')} checks pass` +
      `   npm run check ${m.check}`);
  }
}
