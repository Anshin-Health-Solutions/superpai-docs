---
title: "Database Reference"
sidebar_label: "Database"
---

# Database Reference

SuperPAI+ uses an embedded SQLite database for persistent storage. The database is located at `superpai-server/data/superpai.db` and contains 11 tables that store sessions, memory, cost data, coordination messages, and system configuration.

---

## All 11 SQLite Tables

### sessions

Stores active and historical session records.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Unique session identifier |
| `designation` | TEXT | Session designation (WSL1, WSL2, etc.) |
| `started_at` | TEXT | ISO timestamp of session start |
| `ended_at` | TEXT | ISO timestamp of session end (null if active) |
| `status` | TEXT | active, ended, crashed |
| `branch` | TEXT | Current git branch |
| `current_task` | TEXT | Description of current task |
| `profile` | TEXT | Hook profile (minimal/standard/full) |
| `platform` | TEXT | Platform identifier (linux/macos/windows) |

### memory

Stores persistent memory entries across all tiers.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Unique memory entry identifier |
| `tier` | TEXT | session, project, global |
| `category` | TEXT | pattern, convention, gotcha, preference, decision, tool |
| `content` | TEXT | The memory content |
| `source_session` | TEXT | Session that created this entry |
| `source_file` | TEXT | File context (if applicable) |
| `source_task` | TEXT | Task context (if applicable) |
| `confidence` | REAL | Confidence score (0.0 - 1.0) |
| `observations` | INTEGER | Number of times this pattern was observed |
| `tags` | TEXT | JSON array of tags |
| `project_path` | TEXT | Project root path (for project-tier) |
| `created_at` | TEXT | ISO timestamp |
| `updated_at` | TEXT | ISO timestamp |

### cost_tracking

Records token usage and cost for every API call.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-incrementing ID |
| `session_id` | TEXT | Session that made the call |
| `model` | TEXT | Model identifier |
| `model_alias` | TEXT | Model alias (simple/smart/genius) |
| `input_tokens` | INTEGER | Input tokens consumed |
| `output_tokens` | INTEGER | Output tokens generated |
| `cache_read_tokens` | INTEGER | Tokens served from cache |
| `cost` | REAL | Calculated cost in USD |
| `timestamp` | TEXT | ISO timestamp |

### inbox

Stores inter-session messages.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-incrementing ID |
| `from_session` | TEXT | Sender session designation |
| `to_session` | TEXT | Recipient session designation (or ALL) |
| `type` | TEXT | info, warning, error, request |
| `message` | TEXT | Message content |
| `context` | TEXT | JSON with additional context |
| `read` | INTEGER | 0 = unread, 1 = read |
| `created_at` | TEXT | ISO timestamp |

### status

Stores current status for each active session.

| Column | Type | Description |
|--------|------|-------------|
| `designation` | TEXT PK | Session designation |
| `current_task` | TEXT | What the session is working on |
| `branch` | TEXT | Current git branch |
| `files_locked` | TEXT | JSON array of locked file paths |
| `last_commit` | TEXT | Last commit message |
| `mode` | TEXT | Current adaptive depth mode |
| `wave_progress` | TEXT | Current wave/task (GSD) |
| `updated_at` | TEXT | ISO timestamp |

### skills

Tracks skill usage metrics.

| Column | Type | Description |
|--------|------|-------------|
| `name` | TEXT PK | Skill name |
| `category` | TEXT | Skill category |
| `invocations` | INTEGER | Total invocation count |
| `last_used` | TEXT | ISO timestamp of last use |
| `avg_duration` | REAL | Average execution duration (seconds) |

### commands

Tracks command usage metrics.

| Column | Type | Description |
|--------|------|-------------|
| `name` | TEXT PK | Command name |
| `invocations` | INTEGER | Total invocation count |
| `last_used` | TEXT | ISO timestamp of last use |
| `avg_duration` | REAL | Average execution duration (seconds) |

### agents

Tracks agent invocation history.

| Column | Type | Description |
|--------|------|-------------|
| `name` | TEXT PK | Agent name |
| `invocations` | INTEGER | Total invocation count |
| `last_used` | TEXT | ISO timestamp of last use |
| `skills_used` | TEXT | JSON array of skills invoked |

### hooks

Tracks hook execution metrics.

| Column | Type | Description |
|--------|------|-------------|
| `name` | TEXT PK | Hook name |
| `executions` | INTEGER | Total execution count |
| `failures` | INTEGER | Failure count |
| `avg_duration` | REAL | Average execution duration (ms) |

### settings

Stores user configuration key-value pairs.

| Column | Type | Description |
|--------|------|-------------|
| `key` | TEXT PK | Setting key (dot notation) |
| `value` | TEXT | Setting value (JSON-encoded) |
| `updated_at` | TEXT | ISO timestamp |

### api_keys

Manages API keys for remote server access.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Key identifier |
| `key_hash` | TEXT | Hashed API key (bcrypt) |
| `user_email` | TEXT | Associated user email |
| `user_name` | TEXT | Associated user name |
| `permissions` | TEXT | JSON array of permissions |
| `created_at` | TEXT | ISO timestamp |
| `expires_at` | TEXT | ISO timestamp (null = no expiry) |
| `last_used` | TEXT | ISO timestamp of last use |
| `revoked` | INTEGER | 0 = active, 1 = revoked |

---

## Database Maintenance Commands

```bash
cd ~/.claude/SuperPAI/superpai-server

# Run pending migrations
bun run db:migrate

# Seed with default data
bun run db:seed

# Backup the database
cp data/superpai.db data/superpai.db.$(date +%Y%m%d).backup

# Check database integrity
sqlite3 data/superpai.db "PRAGMA integrity_check;"

# Compact the database (reclaim space)
sqlite3 data/superpai.db "VACUUM;"

# Show table sizes
sqlite3 data/superpai.db "SELECT name, COUNT(*) FROM sqlite_master WHERE type='table' GROUP BY name;"

# Export a table to CSV
sqlite3 -header -csv data/superpai.db "SELECT * FROM cost_tracking;" > cost_export.csv
```

---

## Schema Migrations

Migrations are stored in `superpai-server/migrations/` and run sequentially:

```
migrations/
  001_create_sessions.sql
  002_create_memory.sql
  003_create_cost_tracking.sql
  004_create_inbox.sql
  005_create_status.sql
  006_create_skills.sql
  007_create_commands.sql
  008_create_agents.sql
  009_create_hooks.sql
  010_create_settings.sql
  011_create_api_keys.sql
```

Each migration is idempotent and can be safely run multiple times. The migration system tracks which migrations have been applied in a `_migrations` meta-table.
