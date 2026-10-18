# Verification scope

The current kit contains five task scaffolds, not completed applications. Tests check task instructions, blank workspaces, local links, fixture reproducibility and absence of completed code in distribution. They do not certify calculations or UI participants have not implemented yet.

The final local log is artifacts/verification.txt. Offline DOM checks inspect the actual ZIP and execute its embedded task scripts without fetch. DOM execution is supplemental: real rendering, keyboard accessibility and file:// behavior still need browser validation. The browser smoke runner checks built task pages and offline pages when run in an authorized environment.

Earlier completed-demo test results are obsolete for this revision. Browser validation remains blocked/unperformed, as documented in RELEASE_CHECKLIST.md. No cloud startup or beginner task timings have been observed.
