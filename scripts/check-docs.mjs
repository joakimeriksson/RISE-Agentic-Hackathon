import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>['node_modules','dist','artifacts','.git'].includes(e.name)?[]:e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
let errors=0;
for(const file of walk('.').filter(f=>f.endsWith('.md')||f.endsWith('.html'))){
 const content=readFileSync(file,'utf8');
 const links=file.endsWith('.md')?[...content.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]):[...content.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(const link of links){if(/^(https?:|mailto:|data:|#)/.test(link))continue;const dest=link.split('#')[0];if(dest&&!existsSync(resolve(dirname(file),dest))){console.error(`${file}: missing ${link}`);errors++;}}
}
if(errors)process.exitCode=1;else console.log('All local documentation and HTML links resolve.');
