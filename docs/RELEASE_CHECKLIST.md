# Task-kit release checklist

This revision replaces the previous completed demonstrations with task briefs and empty workspaces. A task page opening successfully does not mean a participant has completed the exercise.

- [ ] Confirm repository access, owner authorization, license and public/template decisions.
- [ ] Run clean install, lint, fixture reproducibility, docs checks, builds and task smoke tests on Node 24.22.0.
- [ ] Verify all five task pages and the extracted offline ZIP in a real browser with network disabled.
- [ ] Test private preview in a fresh participant-owned Codespace on an actual managed event laptop; record payer, machine and cold-start time.
- [ ] Pilot the revised scope with beginners; adjust the 30/45/60-minute tracks using observed timings.
- [ ] Verify keyboard, screen reader, narrow layout and 200% zoom.
- [ ] Test no-agent planning/manual edits, save/export and cloud stop/delete instructions.
- [ ] Confirm no completed implementation or answer material is included in distributed artifacts.

Remote repository/PR creation and Codespaces validation have not occurred. The previous environment blocked Git writes, local server binding, Chromium startup and file URLs in the browser tool. Do not mark these checks passed from DOM tests. Licensing is decided (MIT code, CC0 data); payer, budget enforcement and Codespaces validation still need owner/facilitator verification.

The intended launch address is `https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon`; verify the actual repository before turning it into a participant launch link. No static host is configured.
