# Data Detective

Turn synthetic sensor readings into a dashboard and investigate a suspicious interval.

This is a task, not a nearly finished application. You get a brief, synthetic inputs, shared styling and an empty workspace. You build the controls, logic and results with an agent or a partner.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Data Detective**.
3. Read this brief and inspect `task.json` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Load the CSV and show readings in a labeled table.
2. Add a machine selector and UTC date filters.
3. Draw temperature over time and calculate count, mean, min and max.
4. Investigate a suspicious interval and write three sentences supported by the selected readings.

## Choose your timebox

- **30 minutes:** aim for a table displaying the selected machine. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Add explicit missing-value and duplicate handling, then explain your anomaly threshold.
- **60 minutes:** Compare machines or export filtered CSV safely. Have a partner inspect the change and your evidence.

These are unpiloted targets. Setup comes before the task clock.

## Check your result

- [ ] Changing a filter updates the table, chart and summary together.
- [ ] Missing and malformed readings are reported rather than converted to zero.
- [ ] An empty selection gives a useful message.

Also test one invalid or boundary input and explain one limitation. Add tests for the behavior you implement. `npm test` checks the kit and fixtures; it does not certify your unfinished application. See [CHECKLIST.md](CHECKLIST.md).

## Hints and working without an agent

Begin with five rows in a table before building the chart. Decide which values count as valid.

Sketch the controls and output first. In `app.js`, add one labeled input or a small table to `workspace`, save, refresh and inspect the result. Next implement one calculation or state transition. Check a tiny example by hand before connecting the rest of the UI. Keep a backup before each step and ask a partner to review it. No completed implementation is included.

## Inputs and deliverable

- [sensor-readings.csv](../../data/generated/sensor-readings.csv)
- [sensor-dirty.csv](../../data/generated/sensor-dirty.csv)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
