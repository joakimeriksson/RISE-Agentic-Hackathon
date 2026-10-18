# RISE Agentic Hackathon 🚀

**Pick a mission. Team up with an AI coding agent. Ship a working app in 30–60 minutes.**

No installs, no API keys, no setup purgatory — just you, an agent, and a mission brief. You describe the outcome, the agent writes the code, and *you* prove it works. All data is synthetic; all the building is real.

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Data: CC0](https://img.shields.io/badge/data-CC0-blue) ![Node 24](https://img.shields.io/badge/node-24.22.0-blue)

## Choose your mission 🎯

| Mission | What you'll build | Vibe |
| --- | --- | --- |
| 🕵️ [Data Detective](challenges/01-data-detective/README.md) | A sensor dashboard — and catch a suspicious interval red-handed | Forensics |
| 🤖 [Robot Lab](challenges/02-robot-lab/README.md) | A two-link robot arm simulator that obeys your joint angles | Physics |
| 🏭 [Mini Factory](challenges/03-mini-factory/README.md) | A production-line simulation with real bottlenecks | Systems |
| 🎧 [Sound Lab](challenges/04-sound-lab/README.md) | A visual sound analyzer | Signal |
| 🔬 [Research Autopilot](challenges/05-research-autopilot/README.md) | A reproducible experiment and report | Science |

Every mission gives you a brief, synthetic input data, ready-made prompts, acceptance checklists — and an **empty workspace**. There is no answer key and no hidden solution. The app that appears at the end is the one *you* directed.

## How it works 🔁

1. **Brief the agent** — paste the starter prompt from your mission's `PROMPTS.md`.
2. **Build in small slices** — accept a change, refresh, see it come alive.
3. **Prove it** — run the mission's `CHECKLIST.md`. You don't review code; you verify behavior. Zero angles → endpoint at `(L1+L2, 0)`? Then your robot arm is real.

Stuck? Every prompt file has debug, review and extend follow-ups. Finished early? Each mission has 45- and 60-minute stretches waiting.

## Start in 2 minutes ⚡

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon)

Then in the cloud terminal:

```bash
npm run dev        # already installed for you — just serve
```

Open port **5173**, pick a mission, go. Prefer a terminal agent over the editor one? `npm run agents:install` sets up Gemini CLI and OpenCode. Full details in [Getting started](GETTING_STARTED.md) · [Agent workflow](docs/AGENT_WORKFLOW.md) · [Fallbacks](docs/FALLBACKS.md).

**No account? No problem.** The offline kit in `artifacts/` has every brief, worksheet and dataset — read the mission on any machine, build wherever you have an editor.

## The fine print 📜

Everything runs on synthetic seed-42 data — no real sensors, no external services, no paid APIs required. Cloud compute needs an eligible GitHub account and a known payer; agent access is provisioned separately. Event timings and the cloud launch flow are still being piloted — facilitators, see the [release checklist](docs/RELEASE_CHECKLIST.md).

Code: [MIT](LICENSE) · Synthetic data: CC0 · Not endorsed by RISE.
