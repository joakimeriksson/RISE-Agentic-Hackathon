import { mountTask } from '../../src/shared/task.js';
import task from './task.json';

const workspace = mountTask(task);

// TODO: Build your Ask the Handbook application here.
// Start with: Search that finds the right guide for a one-word question.
// Add controls and results to workspace; keep the task brief visible.
// There is no completed model or application hidden in the shared code.
// Put the logic in logic.js and import it, e.g. import { search } from './logic.js';
// `npm run check handbook` tests logic.js and tells you what is still missing.
workspace.textContent = 'Your application goes here. Open app.js and build the first task.';
