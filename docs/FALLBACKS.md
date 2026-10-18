# Fallback ladder

After five minutes of unresolved setup trouble, switch routes.

| Situation | Route | Limitation |
| --- | --- | --- |
| Codespaces and agent available | Personal copy, cloud editor and private preview | Account, payer, policy and agent entitlement apply |
| Agent unavailable | Follow task steps with a partner and edit manually | No generated implementation; build a smaller feature |
| Codespaces blocked | Read the offline brief, inspect inputs and pair with an editor user | Task pages do not supply a code editor |
| Sign-in or network blocked | Previously downloaded task ZIP | No remote saving or agent access |
| Microphone unavailable | Bundled synthetic WAV inputs | Live capture is optional |
| Visuals unsuitable | Build numeric or table output first | Charts can follow later |

Maintainers run `npm run build:offline` and distribute artifacts/offline-kit.zip. Extract it, open index.html, then choose a task. Each task HTML embeds its brief, script and styles; linked datasets and worksheets are alongside it. Keep the folder structure. No server or package installation is needed to read the tasks.

There are no finished demos. On a browser-only offline device, sketch the interface, inspect data, write a prompt and define a hand-checkable example. Implementation requires an already approved editor or pairing. To edit a standalone task, find the TODO at the end of its inline script and save a copy. No hosted destination or third-party editor is verified or endorsed.
