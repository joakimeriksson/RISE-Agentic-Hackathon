# Mini Factory

Simulate a three-station production line and investigate its bottleneck.

This is a task, not a nearly finished application. You get a brief, synthetic inputs, shared styling and an empty workspace. You build the controls, logic and results with an agent or a partner.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Mini Factory**.
3. Read this brief and inspect `task.json` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Read a scenario and show station states and waiting queues.
2. Implement a bounded simulation engine separately from the display.
3. Add start, pause, reset and single-step controls; show simulated time and completions.
4. Change one processing time and compare two runs of the same duration.

## Choose your timebox

- **30 minutes:** aim for a single-step state table for three stations. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Compare throughput, maximum queue size and utilization using the same scenario duration.
- **60 minutes:** Experiment with buffer capacity or a seeded breakdown schedule. Have a partner inspect the change and your evidence.

These are unpiloted targets. Setup comes before the task clock.

## Check your result

- [ ] Identical inputs produce identical results.
- [ ] Pause stops simulated progress; reset restores the initial state.
- [ ] Queues stay within capacity and every arrival is waiting, processing, completed or explicitly rejected.

Also test one invalid or boundary input and explain one limitation. Add tests for the behavior you implement. `npm test` checks the kit and fixtures; it does not certify your unfinished application. See [CHECKLIST.md](CHECKLIST.md).

## Hints and working without an agent

Start with one item and one simulated second per click. Specify how simultaneous events and blocked stations behave.

Sketch the controls and output first. In `app.js`, add one labeled input or a small table to `workspace`, save, refresh and inspect the result. Next implement one calculation or state transition. Check a tiny example by hand before connecting the rest of the UI. Keep a backup before each step and ask a partner to review it. No completed implementation is included.

## Inputs and deliverable

- [factory-scenarios.json](../../data/generated/factory-scenarios.json)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
