# Task-kit handover

The active project contains eight task briefs: five core missions and three agent-practice missions. Each has synthetic inputs, prompts, acceptance checklists, a `logic.js` skeleton with self-checks and a minimal empty application workspace. Participants build the functionality themselves. Completed applications, answer keys and solution imports are not included.

Run `npm ci`, then `npm run dev` in a prepared workspace. `npm run check` summarizes participant self-checks; these start failing by design until the participant implements `logic.js`. The participant artifact is `offline-kit.zip` (also copied to `artifacts/offline-kit.zip`). Production output is `dist`. Neither package includes completed applications.

The public repository and template are at https://github.com/joakimeriksson/RISE-Agentic-Hackathon. An owner Codespaces launch succeeded. The terminal-agent installer was fixed after a non-root permissions failure, but a successful rerun has not been recorded. Managed-device, browser, accessibility, deployment and beginner-timing checks remain open. The self-hosted Coder route under `deploy/rise-codespaces/` is included but unverified.

The previous completed implementation is preserved only in historical local archives under `artifacts/milestones`, which are ignored and excluded from participant builds. Do not distribute those old archives as the new task kit.

See `docs/VERIFICATION.md` for test scope and `docs/RELEASE_CHECKLIST.md` for remaining owner, browser, Codespaces, deployment and pilot checks.
