# RISE Agentic Hackathon 🚀

**Pick a mission. Team up with a coding agent. Build something you can explain.**

Eight missions, 30–60 minutes each, with synthetic inputs, useful prompts and a way to prove your result. You describe the outcome, the agent helps you build it, and you check the behavior. No answer key, no hidden solution — the app at the end is the one you directed.

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Data: CC0](https://img.shields.io/badge/data-CC0-blue) ![Node 24](https://img.shields.io/badge/node-24.22.0-blue)

## Core missions 🎯

| Mission | What you'll build | Level |
| --- | --- | --- |
| 🕵️ [Data Detective](challenges/01-data-detective/README.md) | A sensor dashboard — and catch a suspicious interval | Intermediate |
| 🤖 [Robot Lab](challenges/02-robot-lab/README.md) | A two-link robot arm simulator | Starter |
| 🏭 [Mini Factory](challenges/03-mini-factory/README.md) | A production-line simulation with real bottlenecks | Advanced |
| 🎧 [Sound Lab](challenges/04-sound-lab/README.md) | A visual sound analyzer | Intermediate |
| 🔬 [Research Autopilot](challenges/05-research-autopilot/README.md) | A reproducible experiment and report | Starter |

## Agent practice 🧠

Warm-ups for agentic work: **the model may propose, but your code checks.**

| Mission | What you'll build | Level |
| --- | --- | --- |
| 📚 [Ask the Handbook](challenges/06-ask-the-handbook/README.md) | Answer from guides, quote the evidence, or say “I don’t know” | Intermediate |
| 📄 [Paper to JSON](challenges/07-paper-to-json/README.md) | Turn messy applications into strictly validated records | Starter |
| 💰 [Budget Guard](challenges/08-budget-guard/README.md) | Check a project budget against funding-call rules | Starter |

Each mission includes a brief, seeded synthetic data, starter/debug/review prompts, acceptance criteria and an empty workspace. Missions 06–08 also have an optional local-LLM stretch; everything through the 45-minute goal works without an LLM.

## Build, then prove it 🔁

1. **Brief the agent** — paste the starter prompt from your mission’s `PROMPTS.md`.
2. **Build one small slice** — accept a change, refresh, see it come alive.
3. **Run the self-check** — `npm run check` shows all missions; `npm run check robot` tests one mission’s `logic.js`.
4. **Check the page** — use the mission’s `CHECKLIST.md` for controls, drawing, keyboard use and empty/error cases.

A green self-check verifies calculations, not the whole UI. You do not need to read every line of code, but you do need to test the behavior and explain one limitation.

## Start in the cloud ⚡

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon)

Dependencies install when the workspace is created. Then:

```bash
npm run dev
```

Open private port **5173**, pick a mission and go. On an already equipped machine, run `npm ci` first. Node 24.22.0 is pinned.

Use Copilot in the editor, install terminal agents with `npm run agents:install`, or use [Jules](https://jules.google/) on your GitHub copy. See [Getting started](GETTING_STARTED.md) · [Agent workflow](docs/AGENT_WORKFLOW.md) · [LLM access](docs/LLM_ACCESS.md).

**No account or no network?** Download [offline-kit.zip](offline-kit.zip) for every brief, worksheet, self-check and dataset. Reading a mission needs no installation; building still needs an editor or a partner with one.

## For facilitators 🧭

- [Fallback routes](docs/FALLBACKS.md) for blocked accounts, agents or networks.
- [Instructor guide](instructors/FACILITATOR.md), [preflight](instructors/PREFLIGHT.md) and [pilot log](instructors/PILOT_RESULTS.md).
- An **unverified self-hosted workspace route** using Coder is included under `deploy/rise-codespaces/`; run its smoke and load tests before relying on it.

Cloud compute needs an eligible account and a known payer; agent access is separate. No paid model API is required by the core missions. Manual accessibility, managed-device, deployment and beginner-timing checks remain open — complete the [release checklist](docs/RELEASE_CHECKLIST.md) before an event.

Code: MIT (see `LICENSE`) · Synthetic data: CC0 · All organizations and records are fictional · No RISE endorsement is implied.
