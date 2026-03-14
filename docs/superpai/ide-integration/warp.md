---
title: "Warp Terminal Integration"
sidebar_label: "Warp Terminal"
---

# Warp Terminal Integration

Warp terminal supports MCP through its AI mode. SuperPAI+ tools can be accessed within Warp's AI-powered terminal experience.

---

## Prerequisites

1. Warp terminal installed (latest version with MCP support)
2. SuperPAI+ installed with superpai-server available
3. Bun 1.0+ installed

---

## Configure mcp_servers.json

Warp reads MCP configuration from its settings file. The location depends on your platform:

| Platform | Config Path |
|----------|------------|
| macOS | `~/.warp/mcp_servers.json` |
| Linux | `~/.warp/mcp_servers.json` |

### Configuration

Create or edit `~/.warp/mcp_servers.json`:

```json
{
  "mcpServers": {
    "superpai": {
      "command": "bun",
      "args": [
        "run",
        "/home/user/.claude/SuperPAI/superpai-server/mcp.ts"
      ],
      "env": {
        "SUPERPAI_DB_PATH": "/home/user/.claude/SuperPAI/superpai-server/data/superpai.db",
        "SUPERPAI_VOICE_URL": "http://localhost:8888"
      }
    }
  }
}
```

---

## Verification

1. Restart Warp terminal
2. Open Warp AI mode (Ctrl+Shift+Space / Cmd+Shift+Space)
3. Test the integration:

```
Check SuperPAI system health.
```

---

## Usage in Warp AI Mode

Warp AI mode provides a conversational interface where SuperPAI+ tools enhance terminal workflows:

```
# Run security audit
Use SuperPAI to audit the current project for security issues.

# Check cost
How much have I spent on AI tokens today?

# Memory search
What does SuperPAI remember about this project's deployment process?

# Voice
Tell Anna-Voice to say "deployment complete" using the Marcus voice.
```

### Terminal-Specific Advantages

Warp's integration is particularly useful for:

- **DevOps workflows** --- Combine SuperPAI+ tools with terminal commands
- **Deployment checks** --- Run security audits before deploying from the terminal
- **Quick tasks** --- Use `superpai_quick` for fast development tasks without leaving the terminal
- **Cost monitoring** --- Check token usage between terminal sessions

---

## Warp-Specific Notes

- **No prompt support** --- Warp currently does not support MCP prompts
- **No resource support** --- Warp currently does not support MCP resources
- **Tools only** --- All 24 SuperPAI+ MCP tools are available
- **Voice** --- Anna-Voice works via the `anna_speak` tool
- **Best used alongside CLI** --- Warp AI mode complements Claude Code CLI rather than replacing it

---

## Recommended Setup

For the best experience with Warp:

1. Use Warp as your terminal emulator
2. Run Claude Code CLI inside Warp for full native SuperPAI+ support
3. Use Warp AI mode for quick tool calls when you need a fast answer without starting a full Claude Code session
