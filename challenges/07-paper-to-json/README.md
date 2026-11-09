# Paper to JSON

Turn fictional certification applications in mixed layouts into validated JSON records.

**Level:** Starter · **Self-check:** `npm run check forms` · **Practice for:** Track 3, *Documents in → structure out* (and track 6, project assistant)

The core idea of an extraction agent: whatever produces the JSON (your code or an LLM), a strict validator decides whether it can be trusted. There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner. All organisations, systems, people and rules in the inputs are invented.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Paper to JSON**.
3. Read this brief and inspect `task.json`, `logic.js` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Show each application's raw text next to an empty record with the eight fields.
2. Normalize dates written as 2026-05-03, 3 May 2026 or 03/05/2026 to ISO format.
3. Extract the fields from the form and table layouts.
4. Validate each record and list its problems: missing fields, unknown certification, too little experience, exam before submission.

## Choose your timebox

- **30 minutes:** aim for a date normalizer and a validator that lists problems for one record. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating.
- **45 minutes:** finish the core steps until all self-checks pass. Show a table of all six applications with their status and problems.
- **60 minutes:** Let an LLM extract the two letter-style applications, then run its JSON through the same validator. See [LLM access](../../docs/LLM_ACCESS.md). Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] 03/05/2026 is read as 3 May, following the DD/MM rule in certifications.json.
- [ ] Missing fields become null and are reported, never guessed.
- [ ] Every application ends up valid or with a readable list of problems.

Run `npm run check forms` to test `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

For the 60-minute LLM step, the two letters have known outcomes: APP-1004 should end with `missing:email` and APP-1005 with `unknown-certification`. If the model invents an email address, your validator cannot catch it. Ask why, and how you would stop that.

## Hints and working without an agent

Do dates first: they are small, easy to test and full of traps. Invalid dates such as 31/02/2026 must give null.

Sketch the page first. Write one function in `logic.js`, check a tiny example by hand, then run `npm run check forms`. In `app.js`, show its result in `workspace`, save, refresh and inspect it. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [applications.json](../../data/generated/applications.json)
- [certifications.json](../../data/generated/certifications.json)

[Data schemas](../../data/README.md). Use the bundled synthetic inputs only; never paste real internal documents, applications or budgets into the task or an agent. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
