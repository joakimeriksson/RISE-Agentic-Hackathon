# Budget Guard

Check a fictional project budget against funding-call rules and find the calls it can actually apply to.

**Level:** Starter · **Self-check:** `npm run check budget` · **Practice for:** Track 1, *Funding application agent* (and track 5, quote agent)

The core idea of a drafting agent: an LLM may propose a budget or a plan, but hard rules are checked by code. There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner. All organisations, systems, people and rules in the inputs are invented.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Budget Guard**.
3. Read this brief and inspect `task.json`, `logic.js` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Show the draft budget as a table: cost, requested grant and co-funding per partner.
2. Check the draft against one call: duration, partners, overhead share, funding rate and total grant.
3. Let the user edit a number and see the problems update.
4. List the calls that are open, fit the rules and share at least one topic, best match first.

## Choose your timebox

- **30 minutes:** aim for a budget table with totals and the rule problems for call C1. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating.
- **45 minutes:** finish the core steps until all self-checks pass. Show why each rejected call was rejected, in plain words.
- **60 minutes:** Let an LLM explain the problems to the applicant or propose work packages, and check its suggestion with your own rules. See [LLM access](../../docs/LLM_ACCESS.md). Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] Totals and co-funding add up and match a hand calculation.
- [ ] Each broken rule names the partner it concerns; exactly 30 % overhead is allowed.
- [ ] The untouched draft is eligible for no call; a fixed budget is eligible for C4 and C1.

Run `npm run check budget` to test `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Calculate one partner's cost by hand first. Money rules break at exact limits, so compare carefully.

Sketch the page first. Write one function in `logic.js`, check a tiny example by hand, then run `npm run check budget`. In `app.js`, show its result in `workspace`, save, refresh and inspect it. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [application-draft.json](../../data/generated/application-draft.json)
- [calls.json](../../data/generated/calls.json)

[Data schemas](../../data/README.md). Use the bundled synthetic inputs only; never paste real internal documents, applications or budgets into the task or an agent. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
