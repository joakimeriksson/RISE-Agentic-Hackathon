# Getting started in an approved browser

The public repository, template flag and an owner Codespaces launch have been verified. The facilitator must finish the remaining [setup and release checks](docs/RELEASE_CHECKLIST.md) before event invitations. No host software installation is required for the Codespaces route.

1. **Check access before the event.** Sign into your own eligible GitHub account. Ask the facilitator which account pays for compute/storage and which coding agent is approved. Check organization policy, available quota and whether budgets actually stop usage. Do not enable paid usage to get through setup.
2. **Create your own copy.** Open [the repository](https://github.com/joakimeriksson/RISE-Agentic-Hackathon), choose **Use this template → Create a new repository**, select your personal owner and an approved visibility, then create the copy. Avoid including confidential content. Your copy needs no upstream write permission.
3. **Create the cloud workspace.** In your copy choose **Code → Codespaces → Create codespace**. Confirm payer, branch and machine type before creating it. The smallest tested machine is not yet known; the facilitator must record it. Cold-start target is five minutes, not a guarantee.
4. **Start the task page.** Wait for `npm ci` to finish. Use Terminal → Run Task → **Run demo**, or run `npm run dev` in Terminal → New Terminal. Do not start a second server on reconnect. Open the Ports tab, find 5173 labeled Run demo, keep visibility **Private**, and choose Open in Browser. An external tab may require sign-in.
5. **Choose one challenge.** Start from its README and inspect its `app.js` and `logic.js`. The application workspace is intentionally empty; build the tasks one step at a time. Read the filled PROMPTS.md and use an approved agent. Confirm it can access your files; if it cannot, apply edits manually using [the workflow](docs/AGENT_WORKFLOW.md).
6. **Check and save.** Run `npm test` for kit checks and `npm run check <mission>` for your mission's calculations; use its CHECKLIST.md for the page itself. Save files and inspect the Source Control diff for unexpected files, secrets or external URLs. Browser tests need a one-time `npx playwright install --with-deps chromium` inside the container; normal startup does not. Commit your changes in your personal repository and push/sync there. Use editor Download on changed files and app CSV/report exports as backups. Never share credentials.
7. **Stop and clean up.** Stop the terminal process, then stop the Codespace from your Codespaces list. Closing a browser tab alone is not cleanup. After saving/exporting work, delete the Codespace if no longer needed. Stopped compute can still retain billable storage. Check your account's actual usage and retention settings.

## Direct-template alternative

GitHub supports creating a Codespace directly from a template, then using **Publish to GitHub** to retain the work in a new personal repository. The owner has verified that the direct launch opens a workspace; publishing and downloads on a participant-managed account remain unverified. This route starts without a linked remote and does not automatically receive later kit updates. [Official template workflow](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-from-a-template).

Launch address: `https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon`. Use your copy's repository name when launching from a personal copy.

If setup takes over five unresolved minutes, use [fallbacks](docs/FALLBACKS.md). The offline-kit.zip lets you read the tasks and inspect inputs. Building and saving code changes requires an approved editor or pairing.

## Optional: more coding agents

Editor Copilot is the default, but any of these routes work — pick what you have access to. The core kit never requires a paid API.

**Terminal agents in the cloud workspace.** The cloud terminal is a full Linux VM, so CLI coding agents work there. Run `npm run agents:install` to install [Gemini CLI](https://github.com/google-gemini/gemini-cli) (free Google sign-in) and [OpenCode](https://opencode.ai) (bring your own provider). Start the agent from the repository root and paste the challenge prompt from PROMPTS.md.

**Jules, an autonomous cloud agent.** [Jules](https://jules.google/) works directly on your GitHub copy: connect the repository, paste the mission prompt as the task (or add the `jules` label to an issue), and it clones the repo into a cloud VM, plans, edits and opens a pull request. No Codespace or local setup is needed for the building step, and there is a free tier (15 tasks/day). Jules is asynchronous and autonomous rather than a pair programmer: you describe the outcome, then review its PR. You still need somewhere to run the app and mission checks — ask Jules to run the self-check in its VM, or open the PR branch in a Codespace and check against CHECKLIST.md.

**Pairing remains the free floor.** Use any agent you already have and apply its edits yourself.

Whichever route you choose: verify results with the mission self-check and CHECKLIST.md, and do not enable paid keys to get unstuck. Missions 06–08 also have an optional [local-LLM stretch](docs/LLM_ACCESS.md).

## Commands (cloud terminal or already equipped machine)

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies |
| `npm run dev` | Serve on 0.0.0.0:5173; fail if occupied |
| `npm test` | Kit and fixture checks |
| `npm run check` | Summarize all participant self-checks |
| `npm run check <mission>` | Test one mission's `logic.js`, for example `robot` or `forms` |
| `npm run test:browser` | Task-route and offline smoke tests |
| `npm run lint` | Static JavaScript checks |
| `npm run check:docs` | Local Markdown and HTML links |
| `npm run data:generate` | Recreate seed-42 fixtures |
| `npm run data:validate` | Compare bytes, hashes and size |
| `npm run build` | Production files under dist |
| `npm run build:offline` | Eight standalone task pages plus worksheets and inputs |
| `npm run agents:install` | Install optional Gemini CLI and OpenCode terminal agents |

Browser tests run after build and offline build. Browser dependencies install in cloud/CI, never on the managed host laptop.
