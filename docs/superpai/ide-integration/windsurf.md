---
title: "Windsurf Integration"
sidebar_label: "Windsurf"
---

# Windsurf Integration

Windsurf (by Codeium) supports MCP through its Cascade AI feature. SuperPAI+ tools can be used within Windsurf's AI-powered development workflow.

---

## Prerequisites

1. Windsurf IDE installed (latest version with MCP support)
2. SuperPAI+ installed with superpai-server available
3. Bun 1.0+ installed

---

## Configure MCP

### Step 1: Open MCP Settings

In Windsurf, navigate to Settings > Cascade > MCP Servers. You can also access this through the Command Palette: "Cascade: Configure MCP Servers".

### Step 2: Add SuperPAI+ Configuration

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

### Step 3: Restart Windsurf

Restart Windsurf to load the new MCP configuration.

---

## Verification

1. Open Cascade AI (Ctrl+Shift+L / Cmd+Shift+L)
2. Check the tools panel for SuperPAI+ tools
3. Test connectivity:

```
Check the health of the SuperPAI system.
```

---

## Usage in Cascade AI

Cascade AI integrates SuperPAI+ tools into its flow-based development approach:

```
# Invoke an agent through Cascade
Use the SuperPAI agent tool to invoke Sentry
for a security review of this project.

# Run an audit
Run a SuperPAI security audit focused on authentication.

# Access memory
Search SuperPAI memory for patterns related to
database migrations in this project.
```

### Cascade Flows with SuperPAI+

Cascade's multi-step flows can incorporate SuperPAI+ tools:

1. **Plan** --- Use `superpai_spec` to generate a specification
2. **Implement** --- Cascade writes code with SuperPAI+ memory context
3. **Test** --- Use `superpai_test` to run tests
4. **Review** --- Use `superpai_review` for automated code review

---

## Windsurf-Specific Notes

- **Prompt support** --- Windsurf has partial prompt support; not all 133 SuperPAI+ prompts may be available
- **Resource support** --- Windsurf has partial resource support; check the tools panel for availability
- **Voice** --- Anna-Voice integration works via the `anna_speak` tool
- **Cost** --- SuperPAI+ cost tracking covers only SuperPAI+ tool calls, not Windsurf's native AI usage

---

## Remote Server Alternative

For team environments, point Windsurf to a remote SuperPAI+ server:

```json
{
  "mcpServers": {
    "superpai": {
      "url": "https://superpai.anshintech.net/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key-here"
      }
    }
  }
}
```
