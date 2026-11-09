# Coder template: "RISE Agentic Hackathon"
#
# Each participant gets one Docker container built by envbuilder from the
# repository's own .devcontainer/ (Node 24, `npm ci` on create), with:
#   - VS Code in the browser (code-server)
#   - the Vite dev server on port 5173 exposed as a one-click app
#   - the kit's terminal agents (scripts/install-agents.sh) plus Claude Code
#   - a persistent /workspaces volume, so stopping the workspace keeps the code
#
# Push with:  coder templates push rise-hackathon -d deploy/rise-codespaces/template

terraform {
  required_providers {
    coder = {
      source  = "coder/coder"
      version = ">= 2.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 3.0"
    }
  }
}

provider "coder" {}
provider "docker" {}

data "coder_provisioner" "me" {}
data "coder_workspace" "me" {}
data "coder_workspace_owner" "me" {}

# ---------------------------------------------------------------------------
# Parameters participants (or the facilitator) can set when creating a workspace
# ---------------------------------------------------------------------------

data "coder_parameter" "repo" {
  name         = "repo"
  display_name = "Git repository"
  description  = "Fork of the hackathon kit to clone. Participants: use your own fork so you can push."
  type         = "string"
  default      = "https://github.com/joakimeriksson/RISE-Agentic-Hackathon"
  mutable      = true
}

data "coder_parameter" "install_claude" {
  name         = "install_claude"
  display_name = "Install Claude Code"
  description  = "Also install the Claude Code CLI (needs a subscription or an API key handed out by the facilitator)."
  type         = "bool"
  default      = "true"
  mutable      = true
}

# ---------------------------------------------------------------------------
# Agent that runs inside the container
# ---------------------------------------------------------------------------

resource "coder_agent" "main" {
  arch = data.coder_provisioner.me.arch
  os   = "linux"
  dir  = "/workspaces/${local.repo_name}"

  env = {
    GIT_AUTHOR_NAME     = coalesce(data.coder_workspace_owner.me.full_name, data.coder_workspace_owner.me.name)
    GIT_AUTHOR_EMAIL    = data.coder_workspace_owner.me.email
    GIT_COMMITTER_NAME  = coalesce(data.coder_workspace_owner.me.full_name, data.coder_workspace_owner.me.name)
    GIT_COMMITTER_EMAIL = data.coder_workspace_owner.me.email
  }

  startup_script = <<-EOT
    set -eu
    cd /workspaces/${local.repo_name}

    # Agents go to a user-writable prefix (the devcontainer runs as `node`).
    export PATH="$HOME/.npm-global/bin:$HOME/.local/bin:$PATH"
    if [ ! -x "$HOME/.npm-global/bin/opencode" ]; then
      bash scripts/install-agents.sh >/tmp/install-agents.log 2>&1 || true
    fi
    if [ "${data.coder_parameter.install_claude.value}" = "true" ] && ! command -v claude >/dev/null; then
      curl -fsSL https://claude.ai/install.sh | bash >/tmp/install-claude.log 2>&1 || true
    fi

    # Start the kit's dev server in the background. --strictPort means a
    # second start fails loudly instead of silently moving to 5174.
    nohup npm run dev >/tmp/vite.log 2>&1 &
  EOT

  metadata {
    display_name = "CPU"
    key          = "cpu"
    script       = "coder stat cpu"
    interval     = 10
    timeout      = 1
  }
  metadata {
    display_name = "RAM"
    key          = "mem"
    script       = "coder stat mem"
    interval     = 10
    timeout      = 1
  }
}

# VS Code in the browser.
module "code-server" {
  source   = "registry.coder.com/coder/code-server/coder"
  version  = "~> 1.0"
  agent_id = coder_agent.main.id
  folder   = "/workspaces/${local.repo_name}"
  # Pre-install the two extensions beginners actually use.
  extensions = ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}

# One-click Vite preview. `subdomain = true` relies on CODER_WILDCARD_ACCESS_URL;
# set it to false if you did not get a wildcard certificate.
resource "coder_app" "vite" {
  agent_id     = coder_agent.main.id
  slug         = "demo"
  display_name = "Run demo (port 5173)"
  url          = "http://localhost:5173"
  icon         = "/icon/vite.svg"
  subdomain    = true
  share        = "owner"
  healthcheck {
    url       = "http://localhost:5173"
    interval  = 5
    threshold = 6
  }
}

# ---------------------------------------------------------------------------
# The container: envbuilder reads .devcontainer/ from the cloned repo and
# builds it in place, then hands control to the Coder agent.
# ---------------------------------------------------------------------------

locals {
  repo_url       = data.coder_parameter.repo.value
  repo_name      = trimsuffix(basename(local.repo_url), ".git")
  container_name = "coder-${data.coder_workspace_owner.me.name}-${lower(data.coder_workspace.me.name)}"
  builder_image  = "ghcr.io/coder/envbuilder:latest"

  envbuilder_env = {
    CODER_AGENT_TOKEN          = coder_agent.main.token
    CODER_AGENT_URL            = replace(data.coder_workspace.me.access_url, "/localhost|127\\.0\\.0\\.1/", "host.docker.internal")
    ENVBUILDER_GIT_URL         = local.repo_url
    ENVBUILDER_WORKSPACE_FOLDER = "/workspaces/${local.repo_name}"
    # The init script embeds the Coder URL used to download its agent binary.
    # Rewrite localhost for the workspace container, where localhost is itself.
    ENVBUILDER_INIT_SCRIPT     = "echo '${base64encode(replace(coder_agent.main.init_script, "/localhost|127\\.0\\.0\\.1/", "host.docker.internal"))}' | base64 -d | sh"
    # If the devcontainer build ever fails, fall back to plain Node 24 so the
    # participant still gets a working terminal.
    ENVBUILDER_FALLBACK_IMAGE  = "node:24-bookworm"
  }
}

resource "docker_image" "builder" {
  name         = local.builder_image
  keep_locally = true
}

# Persists across stop/start so saved code survives.
resource "docker_volume" "workspaces" {
  name = "coder-${data.coder_workspace.me.id}-workspaces"
  lifecycle {
    ignore_changes = all
  }
}

resource "docker_container" "workspace" {
  count    = data.coder_workspace.me.start_count
  image    = docker_image.builder.name
  name     = local.container_name
  hostname = data.coder_workspace.me.name

  env = [for k, v in local.envbuilder_env : "${k}=${v}"]

  # Keep one participant from starving the others on a shared VM.
  memory     = 4096 # MB
  cpu_shares = 512

  host {
    host = "host.docker.internal"
    ip   = "host-gateway"
  }

  volumes {
    container_path = "/workspaces"
    volume_name    = docker_volume.workspaces.name
    read_only      = false
  }

  labels {
    label = "coder.owner"
    value = data.coder_workspace_owner.me.name
  }
  labels {
    label = "coder.workspace_id"
    value = data.coder_workspace.me.id
  }
}
