# RISE Codespaces — self-hosted workspaces for the hackathon

A GitHub-Codespaces-like experience on RISE's own VM: participants log in,
click **Create workspace**, and ~90 seconds later have VS Code in the browser,
the repository cloned, `npm ci` done, the Vite demo running, and terminal
coding agents installed. No GitHub billing, no personal cloud accounts, no
software on the managed laptop.

Built on [Coder](https://github.com/coder/coder) (AGPL-3.0, self-hosted) with
[envbuilder](https://github.com/coder/envbuilder), which builds each workspace
straight from this repository's existing `.devcontainer/`.

```
participant browser ──HTTPS──▶ Caddy ──▶ coderd + Postgres     (this compose file)
                                              │ Terraform
                                              ▼
                                      Docker on the same VM
                                      ┌───────────────┐ ┌───────────────┐
                                      │ coder-anna-… │ │ coder-bo-…    │ …
                                      │ devcontainer │ │               │
                                      │ code-server  │ │               │
                                      │ vite :5173   │ │               │
                                      └───────────────┘ └───────────────┘
```

## What you need

| Item | Why |
| --- | --- |
| One Linux VM, Docker + Compose installed | Runs everything. 16 vCPU / 64 GB is comfortable for 30 participants; the kit is small. |
| A DNS name, e.g. `hack.rise.se` → the VM | Login page and API. |
| A **wildcard** record `*.hack.rise.se` → the VM | Each workspace app (VS Code, the Vite preview) gets its own subdomain. This is what makes dev servers with absolute asset paths just work. |
| A certificate covering both (wildcard) | Ask RISE IT for a wildcard cert, or build Caddy with your DNS provider's plugin for Let's Encrypt DNS-01. Self-signed certs cause warnings on managed laptops — avoid. |
| Ports 80/443 open from the event network | Participants' browsers → Caddy. |

Vite's development server needs wildcard app routing: with path routing, its
root-absolute module URLs escape Coder's workspace-app prefix. Without a
wildcard, leave `CODER_WILDCARD_ACCESS_URL` empty and use `coder port-forward`
to open Vite directly on localhost. The local smoke test below does this
automatically. See Coder's [workspace port-forwarding guide](https://coder.com/docs/user-guides/workspace-access/port-forwarding).

## Setup (about 30 minutes the first time)

### Test locally on macOS (no DNS or TLS)

This smoke-test path binds Coder to `127.0.0.1:7080`, skips Caddy, and uses a
temporary copy of the Terraform template with wildcard routing disabled. It
does not modify the committed Compose file or `template/main.tf`.

1. Install and start Docker Desktop or Colima. With Colima, run `colima start`
   in a regular macOS Terminal before using the runner.
2. Install the Coder CLI with Coder's official macOS command:
   `curl -fsSL https://coder.com/install.sh | sh`.
3. From the repository root, run:

   ```bash
   ./deploy/rise-codespaces/test-local.sh
   ```

   The runner creates the ignored `.env` with a random database password,
   obtains the Docker group ID from the Linux Docker host, starts only Postgres
   and Coder, creates the first local admin, pushes a temporary template with
   the path-routed Vite app omitted, and creates `rise-local-smoke`. It runs
   `npm test`, waits for Vite, then forwards Vite and code-server to loopback.
   The generated admin password is saved in `.env` as
   `CODER_TEST_ADMIN_PASSWORD`.

4. Open [http://localhost:18081](http://localhost:18081) for the working Vite
   demo and [http://localhost:18080](http://localhost:18080) for code-server.
   The runner starts both localhost-only port forwards for you. The Coder
   dashboard at [http://localhost:7080](http://localhost:7080) remains available
   for workspace management.
5. Optional five-workspace load check: run
   `./deploy/rise-codespaces/load-test.sh 5`, watch `docker stats --no-stream`,
   then run `./deploy/rise-codespaces/load-test.sh 5 delete` before teardown.
   Capture stats while all five are running to estimate per-workspace memory.
6. When finished, run `./deploy/rise-codespaces/test-local.sh cleanup`. This
   removes the test workspaces, database, and Compose volumes. Coder CLI build
   logs are printed automatically if workspace creation fails.

The local runner requires a working Docker daemon. It cannot start Colima from
restricted IDE shells that block VM networking; start Colima from macOS Terminal
first. The `setup` run leaves the stack and smoke workspace running so you can
inspect them before cleanup.

1. **Prepare the VM**

   ```bash
   sudo apt-get install -y docker.io docker-compose-plugin git
   git clone https://github.com/joakimeriksson/RISE-Agentic-Hackathon
   cd RISE-Agentic-Hackathon/deploy/rise-codespaces
   cp .env.example .env
   # edit .env: CODER_DOMAIN, a long POSTGRES_PASSWORD, DOCKER_GROUP_ID
   getent group docker | cut -d: -f3     # value for DOCKER_GROUP_ID
   mkdir certs && cp /path/to/fullchain.pem /path/to/privkey.pem certs/
   ```

2. **Start the control plane**

   ```bash
   docker compose up -d
   docker compose logs -f coder     # wait for "Started HTTP listener"
   ```

   Open `https://hack.rise.se` and create the first (admin) user.

3. **Push the workspace template** (from your laptop or the VM)

   ```bash
   curl -L https://coder.com/install.sh | sh
   coder login https://hack.rise.se
   coder templates push rise-hackathon -d template --yes
   ```

   The template pulls `ghcr.io/coder/envbuilder` and, on first workspace
   creation, builds the devcontainer image from the repo's Dockerfile. The
   first build takes a few minutes; later ones reuse the layer cache on the VM.

4. **Set sane defaults** in the web UI under *Templates → rise-hackathon → Settings*:
   - Default autostop **2 hours**, max lifetime **1 day** (forgotten
     workspaces stop themselves; stopped workspaces keep their code).
   - Workspaces per user: 1.

5. **Create participant accounts.** Either enable Entra ID login (fill the
   `CODER_OIDC_*` variables in `.env`, restart `coder`) or, for a one-day event,
   make password accounts from a CSV:

   ```bash
   while IFS=, read -r user email; do
     coder users create --username "$user" --email "$email" --password "$(openssl rand -base64 12)"
   done < participants.csv
   ```

6. **Load-test before the event.** `./load-test.sh 30` creates 30 workspaces
   as you; watch `docker stats` and `free -h`. All should reach *Running* with a
   green "Run demo" healthcheck. `./load-test.sh 30 delete` cleans up.

7. **Hand out agent credentials.** Terminal agents are installed per workspace
   by `scripts/install-agents.sh` (Gemini CLI, OpenCode) and optionally Claude
   Code. The simplest central model for an event: create one Anthropic API key
   with a spend cap, and set it as a template-level env (`ANTHROPIC_API_KEY`)
   in `coder_agent.main.env` so participants never see or type a key. Revoke it
   after the event. If participants bring their own subscriptions, they run
   `claude` / `opencode` and sign in as usual.

## Day-of flow for a participant

1. Open `https://hack.rise.se`, log in.
2. *Workspaces → Create → rise-hackathon*. Optionally paste the URL of their own fork.
3. Wait for *Running*. Click **code-server** (VS Code) and **Run demo** (the Vite app).
4. Open a terminal in VS Code, `cd` is already in the repo, run `claude` or `opencode`, paste the starter prompt from the mission's `PROMPTS.md`.
5. Save, refresh the demo tab, run the `CHECKLIST.md`. Commit and push to their fork from the VS Code source-control view.

## Operations

- **Update the template** after editing `template/main.tf`: `coder templates push rise-hackathon -d template --yes`. Existing workspaces pick it up on next restart.
- **See who is running what**: `coder list --all`, or the *Workspaces* page.
- **Kill everything after the event**: `coder list --all -o json | jq -r '.[].name'` → `coder delete`, then `docker compose down`. Keep the `coder_pg` volume if you want to reuse accounts for the two-week hackathon.
- **Backups**: `docker compose exec database pg_dump -U coder coder > backup.sql`. Participant code lives in the `coder-<id>-workspaces` volumes and in their own git forks.

## Security notes

- The `coder` container mounts the Docker socket. Anyone who can push
  templates can therefore run arbitrary containers on the VM — keep the
  *Template Admin* role to facilitators. Ordinary participants only get a
  workspace.
- Workspaces are capped at 4 GB RAM each (`memory` in the template) so one
  runaway `npm install` can't take the host down.
- The Vite preview is shared as `owner` only; change `share = "authenticated"`
  if you want participants to demo to each other via link.
- This is a plain Docker setup, not a hardened multi-tenant platform. It's fine
  for a RISE-internal event on the RISE network; it is not meant to be exposed
  to anonymous users.
