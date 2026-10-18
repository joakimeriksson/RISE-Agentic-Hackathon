import { mountTask } from '../../src/shared/task.js';
import task from './task.json';

const workspace = mountTask(task);

// TODO: Build your Data Detective application here.
// Start with: A table displaying the selected machine.
// Add controls and results to workspace; keep the task brief visible.
// There is no completed model or application hidden in the shared code.
workspace.textContent = 'Your application goes here. Open app.js and build the first task.';
