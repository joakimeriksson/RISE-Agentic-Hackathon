import { mountTask } from '../../src/shared/task.js';
import task from './task.json';

const workspace = mountTask(task);

// TODO: Build your Paper to JSON application here.
// Start with: A date normalizer and a validator that lists problems for one record.
// Add controls and results to workspace; keep the task brief visible.
// There is no completed model or application hidden in the shared code.
// Put the logic in logic.js and import it, e.g. import { normalizeDate } from './logic.js';
// `npm run check forms` tests logic.js and tells you what is still missing.
workspace.textContent = 'Your application goes here. Open app.js and build the first task.';
