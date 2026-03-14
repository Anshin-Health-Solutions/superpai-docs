---
id: targets
title: Settings — Targets
sidebar_label: Targets
---

# Settings — Targets

The **Targets** tab configures where voice commands are sent when you speak a command to a named destination.

![Targets settings tab showing HTTP Targets section with Name, URL, Method fields and Add Target button, Aliases section with alias and maps-to fields, and Active Sessions read-only section showing no active sessions](/img/anna-voice/settings-targets.jpg)

## HTTP Targets

HTTP Targets are named endpoints that receive voice commands as JSON. Each target has:

| Field | Description |
|---|---|
| **Name** | The spoken name (e.g., `orchestrate`, `slack`, `build`) |
| **URL** | The full URL to send the command to |
| **Method** | HTTP method: `POST` (default), `GET`, or `PUT` |

When a voice command is dispatched to a target, Anna Voice sends:

```json
{
  "message": "the command text the user spoke",
  "source": "anna-voice"
}
```

### Example: Orchestrate Target

To route "Hey Anna, orchestrate, show today's tasks" to Anshin Orchestrate:

| Field | Value |
|---|---|
| Name | `orchestrate` |
| URL | `https://orchestrate.anshinhealth.net/api/voice-command` |
| Method | `POST` |

### Example: Custom Webhook

| Field | Value |
|---|---|
| Name | `build` |
| URL | `http://localhost:9000/webhook/trigger-build` |
| Method | `POST` |

## Aliases

Aliases map alternative spoken names to canonical target names. This is useful when you want multiple phrases to route to the same destination.

| Field | Description |
|---|---|
| **From** | The spoken word or phrase (e.g., `agenda`) |
| **To** | The canonical target name (e.g., `orchestrate`) |

**Example:** Adding `agenda → orchestrate` means saying "Hey Anna, agenda, show my tasks" routes to the `orchestrate` target.

Common built-in aliases handled automatically by the intent parser:
- `clod`, `cloud`, `claud` → `claude`

## Active Sessions (Read-Only)

This section appears when Anna Voice is running. It shows all **WezTerm pane sessions** that have registered themselves with Anna Voice via the HTTP API.

Each session shows:
- **Designation** — the name to use in voice commands (e.g., `claude1`, `session2`)
- **Pane ID** — the WezTerm pane identifier
- **Branch** — the git branch active in that pane (if reported)

Sessions are registered by WezTerm panes calling `POST http://127.0.0.1:8891/registry/register`. They are stored in `%APPDATA%\AnnaVoice\registry.json` and persist across restarts.

## Resolution Priority

When you speak a command to a named target, Anna Voice resolves the destination in this order:

1. **HTTP Targets** from your settings (highest priority)
2. **Aliases** → resolved to canonical name → then HTTP Targets or Sessions
3. **Registered WezTerm sessions** (from registry)
4. **Not found** → command fails with a spoken error

## Saving Changes

Click **Save**. Target changes take effect immediately — no restart required.

## Direct Settings File Editing

Targets can also be edited directly in `%APPDATA%\AnnaVoice\settings.json`:

```json
{
  "targets": {
    "orchestrate": {
      "url": "https://orchestrate.anshinhealth.net/api/voice-command",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  },
  "aliases": {
    "agenda": "orchestrate",
    "clod": "claude"
  }
}
```

The `headers` object supports any HTTP headers needed for authentication.
