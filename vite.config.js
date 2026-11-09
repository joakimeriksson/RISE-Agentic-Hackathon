import { copyDocs } from './scripts/copy-docs.mjs';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const slugs = ["01-data-detective", "02-robot-lab", "03-mini-factory", "04-sound-lab", "05-research-autopilot",
  "06-ask-the-handbook", "07-paper-to-json", "08-budget-guard"];
// Optional LLM for the 60-minute stretches: the page calls /llm/chat/completions and the dev server
// forwards it to any OpenAI-compatible endpoint, adding the key server-side. See docs/LLM_ACCESS.md.
const llm = process.env.LLM_BASE_URL || 'http://localhost:11434/v1';
const llmHeaders = process.env.LLM_API_KEY ? { Authorization: `Bearer ${process.env.LLM_API_KEY}` } : {};
export default defineConfig({base:'./',define:{'import.meta.env.LLM_MODEL':JSON.stringify(process.env.LLM_MODEL||'gemma4:latest')},server:{proxy:{'/llm':{target:llm,changeOrigin:true,rewrite:p=>p.replace(/^\/llm/,''),headers:llmHeaders}}},plugins:[{name:'copy-workshop-docs',closeBundle:copyDocs}],build:{rollupOptions:{input:[resolve('index.html'),...slugs.map(s=>resolve('challenges',s,'index.html'))]}}});
