---
title: "Cursor IDE Integration"
sidebar_label: "Cursor"
---

# Cursor IDE Integration

Cursor supports MCP through its built-in AI features. SuperPAI+ tools can be used alongside Cursor's native AI capabilities for enhanced development workflows.

---

## Prerequisites

1. Cursor IDE installed (latest version)
2. SuperPAI+ installed with superpai-server available
3. Bun 1.0+ installed

---

## Enable MCP in Cursor Settings

1. Open Cursor Settings (Ctrl+Shift+J / Cmd+Shift+J)
2. Navigate to Features > MCP
3. Enable MCP support
4. Click "Add Server" to add the SuperPAI+ configuration

---

## Add Server Configuration

### Local (stdio) Transport

Add this configuration in Cursor's MCP settings:

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

### Remote Server

For team environments with a shared server:

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

## Verification

1. Open the Cursor AI panel (Ctrl+L / Cmd+L)
2. Check that SuperPAI+ tools appear in the tools list
3. Test with a simple tool call:

```
Check the SuperPAI system health status.
```

You should see the health check response with all components reporting their status.

---

## Usage in Cursor

### With Cursor Chat

SuperPAI+ tools integrate with Cursor's chat interface:

```
# Security audit
Run a security audit on the current project using SuperPAI.

# Code review
Ask the Marcus agent to review the selected code.

# Memory
What patterns has SuperPAI learned about this project?
```

### With Cursor Composer

When using Cursor's Composer for multi-file edits, SuperPAI+ tools provide additional context:

- Use `superpai_memory_search` to find relevant patterns before writing code
- Use `superpai_skill` to invoke specialized skills during implementation
- Use `superpai_cost` to monitor token usage across long Composer sessions

---

## Cursor-Specific Tips

1. **Combine with Cursor features** --- Use SuperPAI+ for specialized tasks (security, architecture) and Cursor's native features for inline edits
2. **Tab completion** --- SuperPAI+ tools appear in Cursor's tab completion when the tools panel is active
3. **Context sharing** --- SuperPAI+ memory shares context between Cursor and Claude Code CLI sessions
4. **Cost awareness** --- Cursor uses its own AI credits; SuperPAI+ cost tracking only covers SuperPAI+ tool calls
