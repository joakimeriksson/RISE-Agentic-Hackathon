# Verification scope

The current kit contains eight task scaffolds, not completed applications. Tests check task instructions, blank workspaces, self-check scaffolding, local links, fixture reproducibility and absence of completed code in distribution. They do not certify calculations or UI participants have not implemented yet.

`npm run check` executes participant-facing tests against each mission's `logic.js`. Zero passing checks is expected in a fresh kit; the command verifies that the self-check harness runs, not that a mission is complete.

The final local log is `artifacts/verification.txt`. Offline DOM checks inspect the actual ZIP and execute its embedded task scripts without fetch. DOM execution is supplemental: real rendering, keyboard accessibility and `file://` behavior still need browser validation. The browser smoke runner checks built task pages and offline pages when run in an authorized environment.

Earlier completed-demo test results are obsolete for this revision. [CI run 42709777237](https://github.com/joakimeriksson/RISE-Agentic-Hackathon/actions/runs/42709777237) passed automated Chromium validation for all eight built pages and offline `file://` pages, including offline mode, a keyboard-operated checklist control and a narrow viewport. Screen-reader and 200%-zoom checks remain manual. An owner Codespaces launch succeeded, but cold-start timing, the managed participant flow and beginner task timings have not been recorded.
