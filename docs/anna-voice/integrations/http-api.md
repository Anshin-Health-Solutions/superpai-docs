---
id: http-api
title: HTTP API Reference
sidebar_label: HTTP API
---

# HTTP API Reference

Anna Voice exposes a local HTTP server on `127.0.0.1:8891` (default port). All endpoints are local-only — the server does not accept connections from other machines unless you configure a reverse proxy.

The base URL for all requests is:

```
http://127.0.0.1:8891
```

---

## Health & Status

### GET /health

Returns service status including version, uptime, and current mode.

**Response:**
```json
{
  "status": "ok",
  "version": "3.9.0",
  "uptime_secs": 3847,
  "dictating": false,
  "commanding": false
}
```

### GET /status

Returns current voice mode only.

**Response:**
```json
{
  "dictating": false,
  "commanding": false,
  "mode": "idle"
}
```

Possible `mode` values: `idle`, `dictation`, `command`.

---

## TTS — Text-to-Speech

### POST /notify

Speak text aloud through the system speakers.

**Request:**
```json
{"text": "Deployment completed successfully."}
```

**Response:**
```json
{"ok": true, "message": "Spoken"}
```

If TTS is disabled, returns `{"ok": false, "message": "TTS disabled"}`.

---

## Voice Command Dispatch

### POST /dispatch/send

Dispatch a command to a named target directly (bypasses intent parsing).

**Request:**
```json
{
  "target": "claude1",
  "text": "run the test suite"
}
```

**Response:**
```json
{"ok": true, "message": "Sent to claude1"}
```

### POST /dispatch/voice

Process a command string through the full intent parser and dispatch pipeline, including TTS reply. Equivalent to the user speaking the text in command mode.

**Request:**
```json
{"text": "Hey Claude 1, fix the authentication bug"}
```

**Response:**
```json
{"ok": true, "message": "Dispatched"}
```

Anna parses the target and command, routes to the target, and speaks any reply aloud.

---

## Target Registry

The registry maps designation names to WezTerm pane IDs. WezTerm sessions self-register at startup.

### GET /registry

List all currently registered pane targets.

**Response:**
```json
{
  "ok": true,
  "sessions": [
    {"designation": "claude1", "pane_id": 42, "branch": "main"},
    {"designation": "wsl",     "pane_id": 7,  "branch": null}
  ]
}
```

### POST /registry/register

Register a WezTerm pane as a named target.

**Request:**
```json
{
  "designation": "claude1",
  "pane_id": 42,
  "branch": "main"
}
```

**Response:**
```json
{"ok": true, "message": "Registered claude1 as pane 42"}
```

### POST /registry/deregister

Remove a target from the registry.

**Request:**
```json
{"designation": "claude1"}
```

**Response:**
```json
{"ok": true, "message": "Deregistered claude1"}
```

---

## Knowledge Base (RAG)

### POST /rag/search

Search the local knowledge base using BM25 full-text search.

**Request:**
```json
{
  "query": "authentication middleware",
  "limit": 5
}
```

`limit` is optional (default: 5).

**Response:**
```json
{
  "ok": true,
  "results": [
    {
      "path": "C:\\projects\\server\\src\\middleware\\auth.ts",
      "snippet": "export async function authMiddleware...",
      "score": 1.84
    }
  ]
}
```

### POST /rag/ingest

Re-index the configured knowledge base directories.

**Request:** (empty body)

**Response:**
```json
{"ok": true, "message": "Ingest started"}
```

---

## Vocabulary

### GET /vocabulary

List all current vocabulary entries.

**Response:**
```json
{
  "ok": true,
  "entries": [
    {"spoken": "orchestrate", "display": "Orchestrate", "boost": 1.0},
    {"spoken": "superpai",    "display": "SuperPAI",    "boost": 1.0}
  ]
}
```

### POST /vocabulary

Add a new vocabulary entry. Persisted across restarts.

**Request:**
```json
{
  "spoken": "anshin",
  "display": "Anshin"
}
```

`boost` is optional (default: `1.0`).

**Response:**
```json
{"ok": true, "message": "Added"}
```

---

## Model Catalog (v3.9.0+)

### GET /models/catalog

Returns the full model catalog as JSON — all STT and TTS models with their download URLs and metadata.

### POST /models/refresh

Triggers a background refresh of the model catalog from GitHub and HuggingFace. Non-blocking.

**Response:**
```json
{"ok": true, "message": "Refresh started"}
```

---

## Configuration

### POST /config/reload

Reload `settings.json` from disk without restarting Anna Voice. Useful after manual edits.

**Response:**
```json
{"ok": true, "message": "Config reloaded"}
```

---

## MCP Tool Endpoints

### GET /mcp/tools

Returns the list of all available MCP tools in JSON Schema format.

### POST /mcp/call

Invoke an MCP tool by name.

**Request:**
```json
{
  "name": "anna_speak",
  "arguments": {"text": "Hello from the API"}
}
```

**Response:**
```json
{
  "success": true,
  "result": {"spoken": "Hello from the API", "tier": "local"}
}
```

See [MCP Tools](mcp-tools) for all available tool names and parameters.

---

## Authentication

The HTTP server accepts connections from `127.0.0.1` only. No authentication is required by default. Do not expose this port to external networks.
