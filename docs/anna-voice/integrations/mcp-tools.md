---
id: mcp-tools
title: MCP Tools Reference
sidebar_label: MCP Tools
---

# MCP Tools Reference

Anna Voice exposes 7 MCP (Model Context Protocol) tools that allow Claude and other MCP-compatible agents to control voice input, output, and knowledge search. These tools are available at `http://127.0.0.1:8891/mcp`.

## Configuring as an MCP Server

To connect Anna Voice as an MCP server in Claude Code or another MCP client, add the following to your `.mcp.json`:

```json
{
  "mcpServers": {
    "anna-voice": {
      "url": "http://127.0.0.1:8891/mcp"
    }
  }
}
```

Or using the stdio proxy pattern (if supported by your client):

```json
{
  "mcpServers": {
    "anna-voice": {
      "command": "curl",
      "args": ["-s", "http://127.0.0.1:8891/mcp"]
    }
  }
}
```

---

## Tool Reference

### anna_speak

Speak text aloud through the user's speakers via TTS.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `text` | string | ✅ | The text to speak aloud |
| `voice_id` | string | ❌ | Optional voice ID override |

**Example:**
```json
{
  "name": "anna_speak",
  "arguments": {
    "text": "I finished refactoring the authentication module. All 47 tests pass."
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "spoken": "I finished refactoring the authentication module. All 47 tests pass.",
    "tier": "local"
  }
}
```

`tier` indicates which TTS engine was used: `local` (Piper Amy), `cloud`, or `relay`.

---

### anna_listen

Get the current voice input status and mode. No parameters required.

**Example:**
```json
{"name": "anna_listen", "arguments": {}}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "dictating": false,
    "commanding": false,
    "mode": "idle",
    "uptime_secs": 3847
  }
}
```

Possible `mode` values: `idle`, `dictation`, `command`.

---

### anna_dispatch

Dispatch a voice command to a registered target. Parses intent automatically unless `target` is provided.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `text` | string | ✅ | The command text (with or without intent prefix) |
| `target` | string | ❌ | Explicit target name — skips intent parsing |

**Example (with intent parsing):**
```json
{
  "name": "anna_dispatch",
  "arguments": {
    "text": "Hey Claude 2, run the integration tests"
  }
}
```

**Example (explicit target):**
```json
{
  "name": "anna_dispatch",
  "arguments": {
    "target": "claude2",
    "text": "run the integration tests"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "target": "claude2",
    "message": "Sent to claude2 (pane 42)",
    "response": null
  }
}
```

For HTTP targets, `response` contains the response body from the target.

---

### anna_transcribe

Start or stop live transcription, or get current transcription status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `action` | string | ✅ | `"start"`, `"stop"`, or `"status"` |

**Example:**
```json
{
  "name": "anna_transcribe",
  "arguments": {"action": "status"}
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "dictating": false,
    "commanding": false,
    "mode": "idle"
  }
}
```

> **Note:** `start` and `stop` guide the user to use the hotkey or API; they do not directly toggle hardware recording from MCP context.

---

### anna_hotword_add

Add a word to the recognition vocabulary for better accuracy. Persisted across restarts.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `spoken` | string | ✅ | The spoken form of the word (how you say it) |
| `display` | string | ❌ | The display form (what gets typed); defaults to `spoken` |
| `boost` | number | ❌ | Recognition boost weight (default `1.0`) |

**Example:**
```json
{
  "name": "anna_hotword_add",
  "arguments": {
    "spoken": "anshin",
    "display": "Anshin",
    "boost": 1.0
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "added": "anshin",
    "display": "Anshin",
    "boost": 1.0,
    "note": "Hotword added and persisted to vocabulary"
  }
}
```

---

### anna_mode

Switch Anna Voice between dictation, command, and idle modes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `mode` | string | ✅ | `"dictation"`, `"command"`, or `"idle"` |

**Example:**
```json
{
  "name": "anna_mode",
  "arguments": {"mode": "idle"}
}
```

**Response:**
```json
{
  "success": true,
  "result": {"mode": "idle"}
}
```

---

### anna_knowledge_search

Search the local knowledge base for relevant documents using BM25 ranking.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | ✅ | Full-text search query |
| `limit` | integer | ❌ | Maximum results to return (default `5`) |

**Example:**
```json
{
  "name": "anna_knowledge_search",
  "arguments": {
    "query": "HIPAA compliance data retention",
    "limit": 3
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "results": [
      {
        "path": "C:\\docs\\policies\\hipaa-policy.md",
        "snippet": "Patient data must be retained for a minimum of 6 years...",
        "score": 2.31
      }
    ]
  }
}
```

If the knowledge base is not enabled, returns:
```json
{"success": false, "result": {"error": "RAG knowledge base not enabled"}}
```

---

## Listing Available Tools

```bash
GET http://127.0.0.1:8891/mcp/tools
```

Returns the complete list of tool definitions with input schemas in MCP format.
