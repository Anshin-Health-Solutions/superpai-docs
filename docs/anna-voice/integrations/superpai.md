---
id: superpai
title: SuperPAI+ Integration
sidebar_label: SuperPAI+
---

# SuperPAI+ Integration

Anna Voice integrates with SuperPAI+ in two ways:

1. **WebSocket listener** — Anna monitors the SuperPAI+ event hub and speaks agent notifications aloud
2. **HTTP target dispatch** — SuperPAI+ agents can send commands to Anna to control voice output or relay voice commands

## WebSocket Integration

Anna Voice can connect to the SuperPAI+ WebSocket hub (`ws://`) and listen for real-time events from sessions and agents. When an event arrives that has a spoken form, Anna announces it through TTS — without you having to watch the screen.

### Enabling the WebSocket Connection

In **Settings → LLM** (or directly in `settings.json`):

```json
{
  "websocket": {
    "enabled": true,
    "url": "ws://localhost:3000/ws"
  }
}
```

Replace `localhost:3000` with your SuperPAI+ server address. The connection is maintained with automatic reconnect and exponential backoff (starting at 2 seconds, max 60 seconds).

### Event Types That Anna Announces

| Event type | What Anna says |
|---|---|
| `task_completed` | *"[task name] completed"* |
| `agent_message` (short ≤100 chars) | *"[agent name] says: [message]"* |
| `agent_message` (long >100 chars) | *"Message from [agent name]"* |
| `notification` | The message text verbatim |

Other event types are silently ignored.

### Example Event Payloads

**Task completed:**
```json
{"type": "task_completed", "task": "Code review"}
```
Anna says: *"Code review completed."*

**Agent message (short):**
```json
{"type": "agent_message", "agent": "Claude 1", "message": "All tests pass."}
```
Anna says: *"Claude 1 says: All tests pass."*

**Notification:**
```json
{"type": "notification", "message": "Deployment to dev finished successfully."}
```
Anna says: *"Deployment to dev finished successfully."*

## SuperPAI+ Agents Calling Anna

Any SuperPAI+ agent can call Anna Voice's HTTP API to send voice notifications or dispatch commands:

### Sending a Voice Notification

```bash
POST http://127.0.0.1:8891/notify
Content-Type: application/json

{"text": "I've completed the analysis. Results are in the dashboard."}
```

### Dispatching a Voice Command

```bash
POST http://127.0.0.1:8891/dispatch/voice
Content-Type: application/json

{"text": "Hey Claude 1, run the test suite and report back."}
```

### Reading Agent Status from Anna

```bash
GET http://127.0.0.1:8891/status
```

Returns current dictation/command mode state, useful for agents that need to know whether a user is actively speaking.

## MCP Tools in SuperPAI+ Sessions

When Anna Voice is added as an MCP server to a SuperPAI+ session, agents can call Anna tools directly:

| Tool | Use case |
|---|---|
| `anna_speak` | Announce task completions, alerts, or results |
| `anna_dispatch` | Route a voice command to a Claude Code session or terminal |
| `anna_listen` | Check whether the user is actively dictating or commanding |
| `anna_knowledge_search` | Search local documents and return results to the agent |
| `anna_hotword_add` | Add a new technical term to the vocabulary at runtime |

See [MCP Tools](mcp-tools) for full parameter documentation.

## Architecture Overview

```
SuperPAI+ Server
    ↕ WebSocket (events out)
    ↕ HTTP REST (commands in/out)
Anna Voice (Windows desktop)
    ↕ TTS (speakers)
    ↕ STT (microphone)
User
```

Anna Voice acts as the voice I/O bridge between SuperPAI+ multi-agent sessions and the human user — announcing agent activity without requiring screen interaction.
