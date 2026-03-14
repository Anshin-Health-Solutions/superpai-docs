---
title: "What's New in SuperPAI+ v4.8.0"
sidebar_label: "What's New in v4.8.0"
slug: /whats-new
---

# What's New in SuperPAI+ v4.8.0

**Release Date:** March 2026 | **Codename:** PAI

SuperPAI+ v4.8.0 is a major platform release introducing the PAI Algorithm, Agent Teams, a GUI installer, and PostgreSQL Tier 3 — elevating the plugin from a personal tool to a professional team platform.

---

## Headline Features

### PAI Algorithm — Ideal State Criteria

The PAI (Personal AI) Algorithm introduces **Ideal State Criteria (ISC)** — a goal-anchored development methodology where every task is evaluated against a clearly defined ideal outcome. The algorithm runs in four phases:

- **Phase 1: Understand** — Parse the request and establish ISC
- **Phase 2: Plan** — Design the approach against ISC
- **Phase 3: Execute** — Implement with continuous ISC verification
- **Phase 4: Verify** — Confirm the result meets ISC before closing

This replaces ad-hoc task execution with a systematic, repeatable engineering process.

### Agent Teams — Parallel Multi-Agent Workflows

New `/agents` and `/coordinate` commands enable **agent team orchestration**:

- Spawn specialized sub-agents in parallel (Engineer, Architect, Designer, Pentester, etc.)
- Coordinate results with a team leader agent
- Each agent has domain expertise and focused tool access
- Results are synthesized into a unified response

```
/agents "analyze this codebase for security vulnerabilities, performance issues, and architecture improvements"
```

### GUI Installer (Windows)

SuperPAI+ v4.8.0 ships with a one-click Windows installer (`SuperPAI-v4.8.0-setup.exe`) built with Tauri. The installer:

- Checks and installs all prerequisites automatically
- Configures Claude Code integration
- Sets up the local database and server
- Provides a settings UI for ongoing configuration

### PostgreSQL Tier 3 — Remote Team Database

The new three-tier database architecture enables cross-machine team coordination:

| Tier | Database | Purpose |
|------|----------|---------|
| T1 | SQLite (local) | Per-machine fast cache |
| T2 | PostgreSQL (local) | Local coordinator |
| T3 | PostgreSQL (remote) | Team-wide sync and shared memory |

---

## New Commands in v4.8.0

| Command | Description |
|---------|-------------|
| `/agents` | Spawn and coordinate a team of specialized agents |
| `/coordinate` | Coordinate parallel agent workstreams |
| `/telos` | Define and track project purpose (Telos framework) |
| `/worktree` | Manage git worktrees for parallel feature development |
| `/story` | Generate user stories and acceptance criteria |
| `/science` | Run experiments with hypothesis → test → conclusion workflow |
| `/osint` | Open-source intelligence gathering |
| `/recon` | Codebase reconnaissance and mapping |
| `/red-team` | Adversarial testing and prompt injection defense |
| `/council` | Multi-perspective decision analysis |

---

## New Steering Rules (43-50+)

Additional governance rules were added to the constitutional framework covering:
- Agent team coordination boundaries
- ISC compliance verification
- Parallel session conflict resolution
- Worktree isolation requirements

---

## Additional Improvements

- **MCP Router** — Intelligent routing of tool calls based on skill context
- **Context Monitor** — Real-time context window usage tracking with automatic compaction alerts
- **Cost Dashboard** — Per-session and per-project cost breakdown with model comparison
- **Auto-Triggers** — Hook-driven automatic skill activation based on file patterns
- **Git Worktrees** — First-class support for isolated parallel development

---

## Upgrade Path

```bash
# Windows: Download and run the new installer
# SuperPAI-v4.8.0-setup.exe

# Manual upgrade (WSL/macOS/Linux):
cd ~/.claude/SuperPAI
git pull origin main
cd superpai-server && bun install
```

Restart Claude Code after upgrading. Verify with `/version`.

---

## Breaking Changes

**None for core functionality.** The Tier 3 PostgreSQL remote database is optional — existing T1 SQLite setups continue to work unchanged.
