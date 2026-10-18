import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
export function copyDocs() {
  function copy(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, e.name);
      if (e.isDirectory()) copy(path);
      else if (/\.(md|csv|json|wav|js|css)$/.test(path)) {
        mkdirSync(join('dist', dir), { recursive: true });
        cpSync(path, join('dist', path));
      }
    }
  }
  for (const dir of ['docs', 'data', 'challenges', 'src']) copy(dir);
  for (const f of ['README.md', 'GETTING_STARTED.md', 'THIRD_PARTY_NOTICES.md']) cpSync(f, join('dist', f));
}
