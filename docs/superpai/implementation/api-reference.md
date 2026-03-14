---
title: "REST API Reference"
sidebar_label: "API Reference"
---

# REST API Reference

The superpai-server exposes a REST API for persistent storage, session coordination, cost tracking, and system management. All endpoints accept and return JSON.

---

## Base URL

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:3271` |
| Remote | `https://superpai.anshintech.net` |
| K8s internal | `http://superpai-server-svc:3271` |

---

## Authentication

Remote deployments require API key authentication:

```
Authorization: Bearer <api-key>
```

Local deployments do not require authentication by default (configurable via `MCP_AUTH_ENABLED`).

---

## Sessions Module

### List Sessions

```
GET /api/sessions
```

Response:

```json
{
  "sessions": [
    {
      "id": "sess_abc123",
      "designation": "WSL1",
      "started_at": "2026-03-09T09:00:00Z",
      "status": "active",
      "branch": "main",
      "current_task": "Implementing auth module"
    }
  ]
}
```

### Register Session

```
POST /api/sessions
Content-Type: application/json

{
  "designation": "WSL1",
  "branch": "main"
}
```

### Update Session Status

```
PUT /api/sessions/:id
Content-Type: application/json

{
  "current_task": "Writing tests for auth",
  "branch": "feat/auth",
  "files_locked": ["src/auth/middleware.ts"]
}
```

### Deregister Session

```
DELETE /api/sessions/:id
```

---

## Memory Module

### List Memory Entries

```
GET /api/memory?tier=project&category=convention&limit=50
```

### Create Memory Entry

```
POST /api/memory
Content-Type: application/json

{
  "tier": "project",
  "category": "convention",
  "content": "This project uses barrel exports in every directory",
  "source": {
    "session": "WSL1",
    "file": "src/index.ts"
  },
  "tags": ["typescript", "imports"]
}
```

### Search Memory

```
POST /api/memory/search
Content-Type: application/json

{
  "query": "database migration",
  "tier": "project",
  "limit": 10
}
```

### Bulk Load (Session Startup)

```
GET /api/memory/load?tier=project&tier=global
```

### Sync Memory

```
POST /api/memory/sync
Content-Type: application/json

{
  "session": "WSL1",
  "entries": [...]
}
```

---

## Cost Module

### Get Cost Summary

```
GET /api/cost?session=WSL1
```

Response:

```json
{
  "session": "WSL1",
  "duration": "2h 15m",
  "models": {
    "simple": { "input_tokens": 45230, "output_tokens": 12450, "cost": 0.03 },
    "smart": { "input_tokens": 234100, "output_tokens": 89320, "cost": 2.04 },
    "genius": { "input_tokens": 18500, "output_tokens": 6200, "cost": 0.74 }
  },
  "total_cost": 2.81
}
```

### Track Token Usage

```
POST /api/cost/track
Content-Type: application/json

{
  "session": "WSL1",
  "model": "claude-3-5-sonnet-20241022",
  "model_alias": "smart",
  "input_tokens": 1500,
  "output_tokens": 800,
  "cache_read_tokens": 500
}
```

### Export Cost Data

```
GET /api/cost/export?format=csv&days=30
```

---

## Coordination Module

### Get Inbox Messages

```
GET /api/inbox?session=WSL1&unread=true
```

### Send Message

```
POST /api/inbox
Content-Type: application/json

{
  "from": "WSL1",
  "to": "WSL2",
  "type": "info",
  "message": "Auth module refactoring complete"
}
```

### Get All Session Statuses

```
GET /api/status
```

---

## Sync Module

### Pull Updates

```
GET /api/sync/pull?session=WSL1&since=2026-03-09T14:00:00Z
```

### Push State

```
POST /api/sync/push
Content-Type: application/json

{
  "session": "WSL1",
  "status": { ... },
  "memory_entries": [ ... ],
  "cost_events": [ ... ]
}
```

---

## System Module

### Health Check

```
GET /health
```

Response:

```json
{
  "status": "ok",
  "version": "3.7.0",
  "uptime": 3600,
  "database": "ok",
  "tables": 11,
  "pending_migrations": 0
}
```

### User Authentication

```
POST /api/v1/users/auth
Content-Type: application/json

{
  "email": "user@anshintech.net",
  "password": "password"
}
```

### API Key Management

```
GET /api/keys                    # List keys
POST /api/keys                   # Create key
DELETE /api/keys/:id             # Revoke key
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": "Session with id sess_xyz not found"
  }
}
```

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `BAD_REQUEST` | Invalid request body or parameters |
| 401 | `UNAUTHORIZED` | Missing or invalid API key |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict (e.g., duplicate session) |
| 500 | `INTERNAL_ERROR` | Server error |
