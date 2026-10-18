import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const name = process.argv[2];
if (!/^0[1-6]-[a-z-]+$/.test(name || '')) throw new Error('Use 01-foundation … 06-release');
mkdirSync('artifacts/milestones',{recursive:true});
execFileSync('tar',['--exclude=./artifacts','--exclude=./node_modules','--exclude=./dist','--exclude=./.git','--exclude=./.npm','-czf',`artifacts/milestones/${name}.tar.gz`,'.']);
