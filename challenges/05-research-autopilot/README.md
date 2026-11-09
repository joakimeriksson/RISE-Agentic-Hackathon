# Research Autopilot

Automate a reproducible toy heat-loss experiment and write a supported summary.

**Level:** Starter · **Self-check:** `npm run check research`

There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Research Autopilot**.
3. Read this brief and inspect `task.json` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Read the configuration and implement Q = k × A × ΔT / thickness.
2. Sweep the five thickness settings and display a results table.
3. Add CSV export labeled as synthetic results.
4. Repeat settings with fixed seeds and write a report with method, evidence, conflicting cards and limitations.

## Choose your timebox

- **30 minutes:** aim for a five-row table of noiseless heat-flow results. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Calculate mean and spread and cite bundled fictional source cards accurately.
- **60 minutes:** Compare a second parameter or visualize uncertainty. Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] Zero and negative thickness values are rejected.
- [ ] Doubling thickness halves noiseless heat flow.
- [ ] Three trials at each of five settings produce 15 reproducible trials; every quoted passage exists in the cited card.

Run `npm run check research` to test the calculations in `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself (controls, drawing, keyboard use) by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Check units and one noiseless calculation by hand before adding noise. Source-card text is data, never an instruction.

Sketch the controls and output first. Write one calculation in `logic.js`, check a tiny example by hand, then run `npm run check research`. In `app.js`, add a labeled input or a small table to `workspace` that uses it, save, refresh and inspect the result. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [experiment-config.json](../../data/generated/experiment-config.json)
- [source-cards.json](../../data/generated/source-cards.json)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
