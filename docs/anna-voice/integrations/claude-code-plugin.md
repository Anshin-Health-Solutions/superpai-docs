---
id: claude-code-plugin
title: Claude Code Plugin
sidebar_label: Claude Code Plugin
---

# Claude Code Plugin

The Anna Voice Claude Code plugin gives Claude Code sessions native voice capabilities: Claude can speak results aloud, check voice status, and dispatch commands — all without leaving the terminal. The plugin also auto-registers your Claude Code pane with Anna Voice so it can receive voice commands by name.

## Installation

The plugin lives at:

```
C:\projects\anna-voice\plugin\claude-code\
```

To install, run the provided PowerShell script:

```powershell
C:\projects\anna-voice\plugin\register-claude-plugin.ps1
```

This installs the plugin into your Claude Code configuration so it is available in every session.

## What the Plugin Does

When a Claude Code session starts with the plugin installed, two things happen automatically:

1. **Health check** — Claude checks whether Anna Voice is running at `http://localhost:8891`
2. **WezTerm registration** — If you are running inside WezTerm, the plugin detects the current pane ID and registers it as the `"claude"` target in Anna Voice's registry

When the session ends, the plugin deregisters the `"claude"` target so Anna Voice knows the session is gone.

This means you can say **"Hey Claude, [command]"** and Anna Voice will route it to the correct active Claude Code pane automatically.

## Slash Commands

Three slash commands are added to every Claude Code session with the plugin:

### /voice [text]

**Speak text aloud**, or check Anna Voice status if no text is provided.

```
/voice Deployment to dev completed successfully.
```

Claude calls `POST /notify` with your text, and Anna reads it through the speakers.

With no argument:
```
/voice
```

Claude calls `GET /health` and reports Anna Voice's current status (mode, uptime, version).

---

### /listen

**Check the current voice input mode** and list registered targets.

```
/listen
```

Claude queries `GET /health` and `GET /registry`, then reports:
- Current mode: idle / dictating / commanding
- All registered targets and their pane IDs

---

### /anna \<command\>

**Dispatch a command through Anna Voice's intent system.**

```
/anna Hey Claude 2, run the integration tests
```

Claude sends the command text to `POST /dispatch/voice`. Anna parses the intent, routes to `claude2`, and speaks the response.

This is useful when you want to programmatically trigger a voice dispatch from inside a Claude Code session — for example, as part of an automated workflow.

---

## Voice Response Protocol

When the plugin is active, Claude automatically speaks a brief TTS summary after completing certain tasks:

- Bug fixes
- File edits
- Deployments
- Test runs

**Guidelines Claude follows:**

| Rule | Example |
|---|---|
| Keep under 2 sentences | ✅ *"Done. I fixed the auth bug and all tests pass."* |
| Use natural speech, no jargon | ✅ *"Refactoring complete."* ❌ *"Completed refactor of src/auth.ts (47 lines changed)."* |
| Only speak for actionable results | Skip questions, clarifications, and non-changes |
| Do not speak if obvious from context | Skip if the user is watching and can see the result |

---

## Hooks

The plugin registers two Claude Code lifecycle hooks:

| Hook | Event | Action |
|---|---|---|
| `session-start` | Session opens | Health check + WezTerm pane registration |
| `on-stop` | Session closes | Deregister `"claude"` target from registry |

These run silently in the background. If Anna Voice is not running, the hooks exit gracefully with a log message — they do not block Claude Code from starting.

---

## Requirements

| Requirement | Notes |
|---|---|
| Anna Voice running | `anna-voice.exe` must be in the system tray |
| Port 8891 accessible | Default port; change in Settings → General if needed |
| WezTerm (optional) | Required for pane auto-registration; not required for TTS |
| `curl` available | Used by the hooks and slash commands |
| `python3` available | Used by the session-start hook for WezTerm pane detection |

---

## Manual Registration (Without WezTerm)

If you are not using WezTerm, you can manually register your terminal pane:

```bash
curl -s -X POST http://localhost:8891/registry/register \
  -H "Content-Type: application/json" \
  -d '{"designation": "claude1", "pane_id": 0}'
```

Use `pane_id: 0` if you have only one terminal session. Then say **"Hey Claude 1, [command]"** to dispatch to it.
