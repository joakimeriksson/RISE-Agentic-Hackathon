# Getting started in an approved browser

The remote repository, template flag and Codespaces launch have not been verified. The owner must finish [setup and release checks](docs/RELEASE_CHECKLIST.md) before event invitations. No host software installation is required for the planned Codespaces route.

1. **Check access before the event.** Sign into your own eligible GitHub account. Ask the facilitator which account pays for compute/storage and which coding agent is approved. Check organization policy, available quota and whether budgets actually stop usage. Do not enable paid usage to get through setup.
2. **Create your own copy once the template is approved.** Open the verified repository, choose **Use this template → Create a new repository**, select your personal owner and an approved visibility, then create the copy. Avoid including confidential content. Your copy needs no upstream write permission.
3. **Create the cloud workspace.** In your copy choose **Code → Codespaces → Create codespace**. Confirm payer, branch and machine type before creating it. The smallest tested machine is not yet known; the facilitator must record it. Cold-start target is five minutes, not a guarantee.
4. **Start the demo.** Wait for `npm ci` to finish. Use Terminal → Run Task → **Run demo**, or run `npm run dev` in Terminal → New Terminal. Do not start a second server on reconnect. Open the Ports tab, find 5173 labeled Run demo, keep visibility **Private**, and choose Open in Browser. An external tab may require sign-in.
5. **Choose one challenge.** Start from its README and open its `app.js`. The application workspace is intentionally empty; build the tasks one step at a time. Read the filled PROMPTS.md and use an approved agent. Confirm it can access your files; if it cannot, apply reviewed edits manually using [the workflow](docs/AGENT_WORKFLOW.md).
6. **Check and save.** Inspect the Source Control diff, save files, run `npm test`, and check the visible output. Browser tests need a one-time `npx playwright install --with-deps chromium` inside the container; normal startup does not. Commit reviewed changes in your personal repository and push/sync there. Use editor Download on changed files and app CSV/report exports as backups. Never share credentials.
7. **Stop and clean up.** Stop the terminal process, then stop the Codespace from your Codespaces list. Closing a browser tab alone is not cleanup. After saving/exporting work, delete the Codespace if no longer needed. Stopped compute can still retain billable storage. Check your account's actual usage and retention settings.

## Direct-template alternative

GitHub documents creating a Codespace directly from a template, then using **Publish to GitHub** to retain the work in a new personal repository. This starts without a linked remote and differs from creating your own template copy first. Managed user restrictions apply. This exact UI flow has **not been tested for this project**; do not rely on it for the event until the facilitator verifies publishing and downloads on the event account. [Official template workflow](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-from-a-template).

No working launch button is asserted. Intended address for owner verification: `https://codespaces.new/joakimeriksson/RISE-Agentic-Hackathon`. Use your copy's repository name when launching a personal workspace.

If setup takes over five unresolved minutes, use [fallbacks](docs/FALLBACKS.md). No account or editor is needed to view previously distributed standalone offline demos; saving code changes still needs an approved editor or pairing.

## Optional: terminal coding agents

The cloud terminal is a full Linux VM, so CLI coding agents work there. Editor Copilot remains the default; this is an opt-in extra. In the cloud terminal run `npm run agents:install` to install [Gemini CLI](https://github.com/google-gemini/gemini-cli) (free Google sign-in) and [OpenCode](https://opencode.ai) (bring your own provider). Then start the agent from the repository root and paste the challenge prompt from PROMPTS.md. Verify results with the challenge CHECKLIST.md. Do not enable paid keys to get unstuck; pairing remains the free floor.

## Commands (cloud terminal or already equipped machine)

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies |
| `npm run dev` | Serve on 0.0.0.0:5173; fail if occupied |
| `npm test` | Model and integration checks |
| `npm run test:browser` | Task-route and offline smoke tests |
| `npm run lint` | Static JavaScript checks |
| `npm run check:docs` | Local Markdown and HTML links |
| `npm run data:generate` | Recreate seed-42 fixtures |
| `npm run data:validate` | Compare bytes, hashes and size |
| `npm run build` | Production files under dist |
| `npm run build:offline` | Five standalone task pages plus worksheets and inputs |

Browser tests run after build and offline build. Browser dependencies install in cloud/CI, never on the managed host laptop.
