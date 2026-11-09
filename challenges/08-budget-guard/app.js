import { mountTask } from '../../src/shared/task.js';
import task from './task.json';

const workspace = mountTask(task);

// TODO: Build your Budget Guard application here.
// Start with: A budget table with totals and the rule problems for call C1.
// Add controls and results to workspace; keep the task brief visible.
// There is no completed model or application hidden in the shared code.
// Put the logic in logic.js and import it, e.g. import { checkBudget } from './logic.js';
// `npm run check budget` tests logic.js and tells you what is still missing.
workspace.textContent = 'Your application goes here. Open app.js and build the first task.';
