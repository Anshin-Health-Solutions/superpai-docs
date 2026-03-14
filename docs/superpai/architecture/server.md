---
title: "Server Architecture"
sidebar_label: "Server (superpai-server)"
---

# Server Architecture (superpai-server)

The superpai-server is the persistent backend for SuperPAI+. It provides REST API endpoints for memory, cost tracking, session coordination, and configuration management. Built with Bun and Hono, it stores data in an embedded SQLite database.

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Bun | 1.0+ |
| Framework | Hono | Latest |
| Database | SQLite (via bun:sqlite) | Embedded |
| Transport | HTTP REST | JSON |
| Deployment | Local, systemd, or K8s | Flexible |

### Why Bun + Hono?

- **Bun** provides fast startup (under 100ms), native TypeScript support, and built-in SQLite bindings
- **Hono** is a lightweight web framework with excellent performance and minimal overhead
- **SQLite** requires zero configuration, no separate database server, and provides ACID transactions

---

## REST API Modules

### Sessions Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sessions` | GET | List all active sessions |
| `/api/sessions/:id` | GET | Get specific session details |
| `/api/sessions` | POST | Register a new session |
| `/api/sessions/:id` | PUT | Update session status |
| `/api/sessions/:id` | DELETE | Deregister a session |

### Memory Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/memory` | GET | List memory entries (with filters) |
| `/api/memory` | POST | Create a new memory entry |
| `/api/memory/:id` | GET | Get specific memory entry |
| `/api/memory/:id` | PUT | Update a memory entry |
| `/api/memory/:id` | DELETE | Delete a memory entry |
| `/api/memory/search` | POST | Search memory by keywords |
| `/api/memory/load` | GET | Bulk load for session startup |
| `/api/memory/sync` | POST | Sync memory across sessions |

### Cost Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cost` | GET | Current session cost summary |
| `/api/cost/track` | POST | Record a token usage event |
| `/api/cost/history` | GET | Historical cost data |
| `/api/cost/export` | GET | Export cost data as CSV |

### Coordination Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/inbox` | GET | Get inbox messages for session |
| `/api/inbox` | POST | Send a message to another session |
| `/api/inbox/:id/read` | PUT | Mark message as read |
| `/api/status` | GET | Get all session statuses |
| `/api/status/:designation` | PUT | Update session status |

### Sync Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sync/pull` | GET | Pull updates from server |
| `/api/sync/push` | POST | Push local state to server |
| `/api/sync/conflict` | GET | Check for conflicts |

### System Module

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/version` | GET | Version information |
| `/api/settings` | GET/PUT | User settings |
| `/api/v1/users/auth` | POST | User authentication |
| `/api/keys` | GET/POST/DELETE | API key management |

---

## 11 SQLite Tables

| Table | Columns | Purpose |
|-------|---------|---------|
| `sessions` | id, designation, started_at, status, branch, current_task | Session records |
| `memory` | id, tier, category, content, source, confidence, created_at | Memory entries |
| `cost_tracking` | id, session_id, model, input_tokens, output_tokens, cost, timestamp | Token usage |
| `inbox` | id, from_session, to_session, message, type, read, created_at | Messages |
| `status` | designation, current_task, branch, files_locked, last_commit, updated_at | Session status |
| `skills` | name, category, invocations, last_used, avg_duration | Skill metrics |
| `commands` | name, invocations, last_used, avg_duration | Command metrics |
| `agents` | name, invocations, last_used, skills_used | Agent metrics |
| `hooks` | name, executions, failures, avg_duration | Hook metrics |
| `settings` | key, value, updated_at | Configuration |
| `api_keys` | id, key_hash, user_email, permissions, created_at, expires_at | API keys |

---

## Kubernetes Deployment

For team environments, superpai-server can be deployed to Kubernetes:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: superpai-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: superpai-server
  template:
    spec:
      containers:
        - name: superpai-server
          image: registry.anshinhealth.net/engineering/superpai-server:latest
          ports:
            - containerPort: 3271
          env:
            - name: PORT
              value: "3271"
            - name: DB_PATH
              value: "/data/superpai.db"
          volumeMounts:
            - name: data
              mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: superpai-server-data
```

### Deployment Options

| Option | Use Case | Persistence |
|--------|----------|-------------|
| Local (bun run start) | Individual developer | Local SQLite file |
| systemd service | Shared Linux server | Server SQLite file |
| Kubernetes | Team/enterprise | PVC-backed SQLite |

---

## Database Maintenance

```bash
# Run migrations
cd superpai-server && bun run db:migrate

# Seed with default data
bun run db:seed

# Backup database
cp data/superpai.db data/superpai.db.backup

# Compact database (reclaim space)
sqlite3 data/superpai.db "VACUUM;"

# Check integrity
sqlite3 data/superpai.db "PRAGMA integrity_check;"
```
