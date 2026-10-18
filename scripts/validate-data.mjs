import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fixtures, manifest } from './generate-data.mjs';
const files=fixtures();let bytes=0;
assert.deepEqual(readdirSync('data/generated').sort(),Object.keys(files).sort());
for(const [name,data] of Object.entries(files)){assert.deepEqual(readFileSync('data/generated/'+name),Buffer.from(data),`Byte mismatch: ${name}`);bytes+=Buffer.byteLength(data);}
assert.deepEqual(JSON.parse(readFileSync('data/manifest.json')),manifest(files));
assert.ok(bytes<5*1024*1024);
console.log(`Validated exact bytes and SHA-256 manifest for ${Object.keys(files).length} fixtures (${bytes} bytes).`);
