# Robot Lab

Build a two-link arm simulator that responds to joint-angle controls.

This is a task, not a nearly finished application. You get a brief, synthetic inputs, shared styling and an empty workspace. You build the controls, logic and results with an agent or a partner.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Robot Lab**.
3. Read this brief and inspect `task.json` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Read the link lengths, starting angles and limits from the fixture.
2. Add two labeled joint-angle controls and a reset button.
3. Draw the arm and show endpoint coordinates in meters.
4. Add numeric target entry and explain whether a target is reachable.

## Choose your timebox

- **30 minutes:** aim for two labeled controls and a numeric endpoint. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Distinguish geometric reach from reach under joint limits.
- **60 minutes:** Add inverse kinematics or a recorded movement sequence. Have a partner inspect the change and your evidence.

These are unpiloted targets. Setup comes before the task clock.

## Check your result

- [ ] Zero angles place the endpoint at (L1 + L2, 0).
- [ ] A 90-degree first joint and zero second joint place it at (0, L1 + L2).
- [ ] Keyboard controls respect joint limits; drawing and displayed coordinates agree.

Also test one invalid or boundary input and explain one limitation. Add tests for the behavior you implement. `npm test` checks the kit and fixtures; it does not certify your unfinished application. See [CHECKLIST.md](CHECKLIST.md).

## Hints and working without an agent

Work out the zero-angle case on paper. Convert degrees to radians; the second link uses the sum of the joint angles.

Sketch the controls and output first. In `app.js`, add one labeled input or a small table to `workspace`, save, refresh and inspect the result. Next implement one calculation or state transition. Check a tiny example by hand before connecting the rest of the UI. Keep a backup before each step and ask a partner to review it. No completed implementation is included.

## Inputs and deliverable

- [robot-presets.json](../../data/generated/robot-presets.json)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
