# Data Detective

Turn synthetic sensor readings into a dashboard and investigate a suspicious interval.

**Level:** Intermediate · **Self-check:** `npm run check data`

There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner.

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

Setup time is not counted.

## Check your result

- [ ] Changing a filter updates the table, chart and summary together.
- [ ] Missing and malformed readings are reported rather than converted to zero.
- [ ] An empty selection gives a useful message.

Run `npm run check data` to test the calculations in `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself (controls, drawing, keyboard use) by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Begin with five rows in a table before building the chart. Decide which values count as valid.

Sketch the controls and output first. Write one calculation in `logic.js`, check a tiny example by hand, then run `npm run check data`. In `app.js`, add a labeled input or a small table to `workspace` that uses it, save, refresh and inspect the result. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [sensor-readings.csv](../../data/generated/sensor-readings.csv)
- [sensor-dirty.csv](../../data/generated/sensor-dirty.csv)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
