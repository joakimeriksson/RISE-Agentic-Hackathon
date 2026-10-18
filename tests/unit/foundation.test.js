import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('Node pin is consistent',()=>{const v=readFileSync('.node-version','utf8').trim();assert.ok(readFileSync('.devcontainer/Dockerfile','utf8').includes('node:'+v+'-'));});
