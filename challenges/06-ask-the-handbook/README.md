# Ask the Handbook

Answer staff questions from fictional internal guides, quoting the source, and say "I don't know" when the guides do not cover it.

**Level:** Intermediate · **Self-check:** `npm run check handbook` · **Practice for:** Track 2, *Find your way in RISE* (and track 7, literature watch)

The core idea of a document agent: retrieve, quote the evidence, and refuse when the evidence is missing. There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner. All organisations, systems, people and rules in the inputs are invented.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Ask the Handbook**.
3. Read this brief and inspect `task.json`, `logic.js` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Load the guides and show them as a searchable list with title and date.
2. Search: rank guides by how many of the question's words they contain.
3. Answer with one quoted sentence and its guide, skipping guides that were replaced.
4. Refuse when the evidence is too weak, and prefer the newest guide when two disagree.

## Choose your timebox

- **30 minutes:** aim for search that finds the right guide for a one-word question. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating.
- **45 minutes:** finish the core steps until all self-checks pass. Explain your evidence threshold and show a question that sits just below it.
- **60 minutes:** Let an LLM rephrase the quoted answer, then reject replies containing numbers the guide does not contain. See [LLM access](../../docs/LLM_ACCESS.md). Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] Every answer quotes a sentence that really exists in the cited guide.
- [ ] Questions the guides do not cover get an honest "no answer", not a guess.
- [ ] An outdated or replaced guide is never cited when a newer one answers the question.

Run `npm run check handbook` to test `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Start with search for a single word such as "phishing". Use the stopword list in handbook.json so everyone counts words the same way.

Sketch the page first. Write one function in `logic.js`, check a tiny example by hand, then run `npm run check handbook`. In `app.js`, show its result in `workspace`, save, refresh and inspect it. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [handbook.json](../../data/generated/handbook.json)

[Data schemas](../../data/README.md). Use the bundled synthetic inputs only; never paste real internal documents, applications or budgets into the task or an agent. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
