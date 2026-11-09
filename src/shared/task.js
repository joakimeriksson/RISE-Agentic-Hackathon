// Presentation only: task instructions and a blank area for participant code.
export function mountTask(task) {
  const root = document.querySelector('#app');
  root.replaceChildren();
  const add = (parent, tag, text) => {
    const node = document.createElement(tag);
    node.textContent = text;
    parent.append(node);
    return node;
  };
  add(root, 'p', 'Level: ' + task.level).className = 'eyebrow';
  add(root, 'p', task.mission).className = 'notice';
  const brief = add(root, 'section', '');
  add(brief, 'h2', 'Your tasks');
  const list = add(brief, 'ol', '');
  for (const step of task.steps) add(list, 'li', step);
  add(brief, 'h3', 'Inputs');
  const inputs = add(brief, 'ul', '');
  for (const file of task.data) {
    const link = add(add(inputs, 'li', ''), 'a', file);
    link.href = '../../data/generated/' + file;
  }
  add(brief, 'h3', 'How to check your work');
  for (const check of task.checks) {
    const label = add(brief, 'label', '');
    const input = document.createElement('input');
    input.type = 'checkbox';
    label.append(input, document.createTextNode(check));
  }
  const self = add(brief, 'p', 'Self-check: put your calculations in logic.js, then run ');
  add(self, 'code', 'npm run check ' + task.check);
  self.append(' in the terminal. It lists which 30- and 45-minute checks pass.');
  const hints = add(brief, 'details', '');
  add(hints, 'summary', 'Need a starting hint?');
  add(hints, 'p', task.hint);
  add(brief, 'p', '45 minutes: ' + task.validation);
  add(brief, 'p', '60 minutes: ' + task.extension);
  const workspace = add(root, 'section', '');
  workspace.id = 'workspace';
  workspace.setAttribute('aria-label', 'Your application workspace');
  return workspace;
}
