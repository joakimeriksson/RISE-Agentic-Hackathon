# Task-kit release checklist

This kit contains task briefs, `logic.js` skeletons and self-checks, not completed applications. A task page opening successfully does not mean a participant has completed the exercise.

- [x] Confirm repository access, owner authorization, license and public/template decisions.
- [x] Run clean install, lint, fixture reproducibility, docs checks, builds and task smoke tests on Node 24.22.0.
- [x] Verify all eight task pages and offline-kit.zip in a real browser with network disabled.
- [ ] Test private preview in a fresh participant-owned Codespace on an actual managed event laptop; record payer, machine and cold-start time.
- [ ] Pilot the revised scope with beginners; adjust the 30/45/60-minute tracks using observed timings.
- [ ] Verify keyboard, screen reader, narrow layout and 200% zoom.
- [ ] Test no-agent planning/manual edits, save/export and cloud stop/delete instructions.
- [ ] Run the self-hosted Coder smoke test and a representative workspace load test before offering that route.
- [ ] Confirm no completed implementation or answer material is included in distributed artifacts.

The public repository and template are live, and an owner Codespace was created successfully. [CI run 42709777237](https://github.com/joakimeriksson/RISE-Agentic-Hackathon/actions/runs/42709777237) passed on Node 24.22.0, including clean install, lint, fixtures, docs, builds, offline DOM tests and Chromium smoke tests of all eight built and offline pages with offline mode enabled. This does not verify the participant-managed flow, payer controls, cold-start timing, screen readers, 200% zoom or a managed event laptop. License approval is complete (MIT code, CC0 synthetic data); payer and budget enforcement still need owner/facilitator verification.

The launch address is `https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon`. The direct-template launch was exercised by the owner; Publish to GitHub and participant downloads remain unverified. No static host is configured. The self-hosted Coder route is documentation and automation only until its smoke and load checks pass.
