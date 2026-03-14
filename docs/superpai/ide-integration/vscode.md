---
title: "VS Code Integration"
sidebar_label: "VS Code"
---

# VS Code Integration

Visual Studio Code supports MCP through the Claude extension. Once configured, SuperPAI+ tools and prompts are available directly in your VS Code editor alongside your code.

---

## Prerequisites

1. VS Code 1.85+ installed
2. Claude extension for VS Code installed (from marketplace)
3. SuperPAI+ installed with superpai-server available
4. Bun 1.0+ installed

---

## Install the Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Claude" by Anthropic
4. Click Install
5. Restart VS Code if prompted

---

## Configure MCP

### Option 1: Workspace Settings

Add to your `.vscode/settings.json`:

```json
{
  "claude.mcpServers": {
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

### Option 2: User Settings

Open Settings (JSON) via Command Palette (Ctrl+Shift+P > "Preferences: Open User Settings (JSON)") and add the same configuration under `claude.mcpServers`.

### Option 3: Remote Server

For team environments:

```json
{
  "claude.mcpServers": {
    "superpai": {
      "url": "https://superpai.anshintech.net/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key-here"
      }
    }
  }
}
```

---

## Verification

1. Open the Claude panel in VS Code (click the Claude icon in the sidebar)
2. Look for the tools indicator showing SuperPAI+ tools are available
3. Ask Claude to check system health:

```
Use the superpai_health tool to check the system status.
```

4. Verify you see a successful health response with version 3.7.0

---

## Usage in VS Code

### Using Tools

SuperPAI+ tools are available through the Claude chat panel:

```
# Run a security audit
Use superpai_audit to check my codebase for security issues.

# Check costs
What is my current token usage? Use the superpai_cost tool.

# Invoke an agent
Use superpai_agent to invoke Marcus for a code review of the open file.
```

### Using Prompts

Access SuperPAI+ prompts through the prompt selector in the Claude panel. Prompts provide pre-built workflows for common tasks like code review, documentation, and testing.

### Using Resources

SuperPAI+ resources provide context about the current system state:

- `superpai://skills` --- List of available skills
- `superpai://health` --- System health status
- `superpai://memory` --- Relevant memory entries

---

## VS Code-Specific Tips

1. **Use with open files** --- Reference currently open files when asking Claude to use SuperPAI+ tools
2. **Terminal integration** --- You can still use the Claude Code CLI in VS Code's integrated terminal for full native support
3. **Side-by-side** --- Run VS Code MCP alongside Claude Code CLI for the best of both worlds
4. **Workspace config** --- Use workspace-level MCP settings so each project can have its own SuperPAI+ configuration
