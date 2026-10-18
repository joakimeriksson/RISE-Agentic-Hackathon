import { copyDocs } from './scripts/copy-docs.mjs';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const slugs = ["01-data-detective", "02-robot-lab", "03-mini-factory", "04-sound-lab", "05-research-autopilot"];
export default defineConfig({base:'./',plugins:[{name:'copy-workshop-docs',closeBundle:copyDocs}],build:{rollupOptions:{input:[resolve('index.html'),...slugs.map(s=>resolve('challenges',s,'index.html'))]}}});
