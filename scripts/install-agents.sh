#!/usr/bin/env bash
# Optional: install terminal coding agents inside a Codespace/Gitpod terminal.
# The kit itself needs no agent and no paid API. Agents are a participant choice.
set -euo pipefail

echo "Installing terminal coding agents (this may take a minute)..."

# Free default: sign in with a Google account, no API key needed.
npm install -g @google/gemini-cli

# Open source, provider-agnostic: bring your own model key, or pick a free provider.
npm install -g opencode-ai

# Bring-your-own-subscription options — uncomment if your event approves them:
# npm install -g @anthropic-ai/claude-code   # needs Claude subscription or API key
# npm install -g @openai/codex               # needs ChatGPT plan or API key

cat <<'EOF'

Done. Next steps:

  gemini          Start Gemini CLI; choose "Sign in with Google" (free tier).
  opencode        Start OpenCode; run /connect inside it to add a model provider.

Tips:
  - Run the agent from the repository root so it can read challenges/ and data/.
  - Paste the starter prompt from the challenge PROMPTS.md as your first message.
  - Verify behavior with the challenge CHECKLIST.md, not by reading every diff.
  - The kit never requires a paid API; do not enter card details to get unstuck.
EOF
