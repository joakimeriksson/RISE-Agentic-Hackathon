#!/usr/bin/env bash
# Optional: install terminal coding agents inside a Codespace/Gitpod terminal.
# The kit itself needs no agent and no paid API. Agents are a participant choice.
set -euo pipefail

echo "Installing terminal coding agents (this may take a minute)..."

# Devcontainers run as a non-root user, so install to a user-writable prefix.
PREFIX="$HOME/.npm-global"
mkdir -p "$PREFIX"
export PATH="$PREFIX/bin:$PATH"
if ! grep -q '.npm-global/bin' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> "$HOME/.bashrc"
fi

# Free default: sign in with a Google account, no API key needed.
npm install -g --prefix="$PREFIX" @google/gemini-cli

# Open source, provider-agnostic: bring your own model key, or pick a free provider.
npm install -g --prefix="$PREFIX" opencode-ai

# Bring-your-own-subscription options — uncomment if your event approves them:
# npm install -g --prefix="$PREFIX" @anthropic-ai/claude-code   # needs Claude subscription or API key
# npm install -g --prefix="$PREFIX" @openai/codex               # needs ChatGPT plan or API key

cat <<'EOF'

Done. Next steps:

  gemini          Start Gemini CLI; choose "Sign in with Google" (free tier).
  opencode        Start OpenCode; run /connect inside it to add a model provider.

Tips:
  - If "gemini" or "opencode" is not found, open a new terminal first
    (or run: export PATH="$HOME/.npm-global/bin:$PATH").
  - Run the agent from the repository root so it can read challenges/ and data/.
  - Paste the starter prompt from the challenge PROMPTS.md as your first message.
  - Verify behavior with the challenge CHECKLIST.md, not by reading every diff.
  - The kit never requires a paid API; do not enter card details to get unstuck.
EOF
