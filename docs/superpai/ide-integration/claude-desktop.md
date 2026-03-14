---
title: "Claude Desktop Integration"
sidebar_label: "Claude Desktop"
---

# Claude Desktop Integration

Claude Desktop can access SuperPAI+ capabilities through MCP. This enables using SuperPAI+ tools, prompts, and resources in the Desktop application's conversational interface.

---

## Config File Locations

| Platform | Config File Path |
|----------|-----------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

---

## Local MCP Configuration

Add SuperPAI+ to your Claude Desktop config for local (stdio) transport:

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

### Windows Path Example

```json
{
  "mcpServers": {
    "superpai": {
      "command": "bun",
      "args": [
        "run",
        "C:\\Users\\YourName\\.claude\\SuperPAI\\superpai-server\\mcp.ts"
      ],
      "env": {
        "SUPERPAI_DB_PATH": "C:\\Users\\YourName\\.claude\\SuperPAI\\superpai-server\\data\\superpai.db"
      }
    }
  }
}
```

---

## Remote Server Configuration

For team environments with a shared SuperPAI+ server:

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

---

## Verification Steps

1. **Restart Claude Desktop** after editing the config file
2. **Look for the tools icon** in the chat input area --- it should show SuperPAI+ tools
3. **Test a tool call** --- Ask Claude Desktop to run a health check:

```
Can you check the SuperPAI health status?
```

Expected response: The AI uses the `superpai_health` tool and reports system status.

4. **Test a prompt** --- Look for SuperPAI+ prompts in the prompt selector

---

## Available in Desktop Mode

| Component | Available | Notes |
|-----------|-----------|-------|
| MCP Tools (24) | Yes | Full tool access |
| MCP Prompts (133) | Yes | Full prompt access |
| MCP Resources (8) | Yes | Read-only data access |
| Skills (via tool) | Yes | Invoked through `superpai_skill` tool |
| Agents (via tool) | Yes | Invoked through `superpai_agent` tool |
| Voice | Yes | Via `anna_speak` tool |
| Memory | Yes | Via memory tools |
| Cost Tracking | Yes | Via `superpai_cost` tool |

### Not Available in Desktop Mode

- Direct slash commands (use MCP tools instead)
- Hook lifecycle integration
- Multi-session coordination
- Git worktree management
- Adaptive depth (manual mode selection)

---

## Tips for Desktop Usage

1. **Use prompts** --- Claude Desktop supports MCP prompts, which provide pre-built workflows optimized for SuperPAI+
2. **Check cost** --- Use the cost tool regularly since Desktop conversations can be long
3. **Memory is shared** --- Memory written from Desktop is available in CLI sessions and vice versa
4. **Voice works** --- Anna-Voice integration works from Desktop if the voice server is reachable
