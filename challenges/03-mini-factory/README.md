# Mini Factory

Simulate a three-station production line and investigate its bottleneck.

**Level:** Advanced · **Self-check:** `npm run check factory`

There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner.

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

## Simulation rules

The self-check expects these rules, so the simulation behaves the same for everyone:

- Time moves in whole seconds; one `step` is one second. `capacity` is the number of items that can **wait** in each queue, not counting the item at the station.
- Within each second, at time `t`:
  1. **Finish**, last station first: a station whose item started at time `s` is done when `t ≥ s + processing`. Station 3 sends its item to *completed*. Stations 1–2 move it into the next queue; if that queue is full the item stays and the station is **blocked**.
  2. **Arrive**: if `t` is a multiple of `arrival` (0, 4, 8, … for 4 s), a new item joins queue 1, or is **rejected** if queue 1 is full.
  3. **Start**: every empty station takes the next item from its own queue.
- So the first item arrives at `t = 0` and starts at station 1 straight away. Every item is always waiting, at a station (busy or blocked), completed or rejected.

Hand check: on the Balanced line an item spends 3 s at each station, so the item that arrives at `t` completes at `t + 9`. In 240 s (t = 0…239), items arriving at 0, 4, …, 228 complete: 58 items.

## Choose your timebox

- **30 minutes:** aim for a single-step state table for three stations. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Compare throughput, maximum queue size and utilization using the same scenario duration.
- **60 minutes:** Experiment with buffer capacity or a seeded breakdown schedule. Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] Identical inputs produce identical results.
- [ ] Pause stops simulated progress; reset restores the initial state.
- [ ] Queues stay within capacity and every arrival is waiting, processing, completed or explicitly rejected.

Run `npm run check factory` to test the calculations in `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself (controls, drawing, keyboard use) by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Start with one item and one simulated second per click. Specify how simultaneous events and blocked stations behave.

Sketch the controls and output first. Write one calculation in `logic.js`, check a tiny example by hand, then run `npm run check factory`. In `app.js`, add a labeled input or a small table to `workspace` that uses it, save, refresh and inspect the result. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [factory-scenarios.json](../../data/generated/factory-scenarios.json)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
