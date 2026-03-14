---
title: "SuperPAI+ Platform Overview"
sidebar_label: "Platform Overview"
slug: /marketing
---

# SuperPAI+ Platform Overview

SuperPAI+ is the most comprehensive AI-assisted engineering platform available today. Built as a plugin for Claude Code, it transforms a general-purpose AI assistant into a full-stack engineering partner with deep domain knowledge, persistent memory, voice interaction, multi-session coordination, and over 70 specialized skills.

---

## By the Numbers

| Component | Count | Description |
|-----------|-------|-------------|
| Skills | 73 | Specialized capabilities from TDD to security auditing |
| Commands | 47 | Slash commands for instant access to platform features |
| Agents | 16 | Autonomous AI personas with distinct expertise |
| Hooks | 13 | Lifecycle event handlers for automation |
| MCP Tools | 24 | Model Context Protocol tools for IDE integration |
| MCP Prompts | 133 | Pre-built prompt templates for common workflows |
| MCP Resources | 8 | Structured data resources exposed to IDEs |
| SQLite Tables | 11 | Server-side persistent storage |
| Voice Personas | 21 | Distinct TTS voices via Anna-Voice integration |
| Steering Rules | 42 | Constitutional governance rules |
| IDE Integrations | 7 | Claude Code, Desktop, VS Code, Cursor, Windsurf, Warp, Remote |

---

## What Makes SuperPAI+ Unique

### 1. Adaptive Depth System

SuperPAI+ automatically selects the right level of effort for every task. The three-mode system (DIRECT, WORKFLOW, ALGORITHM) ensures simple questions get instant answers while complex engineering tasks receive full planning, testing, and review cycles.

### 2. Constitutional Governance

42 steering rules define how the AI behaves --- from coding standards to safety gates. These rules are immutable during sessions and ensure consistent, predictable behavior across all interactions.

### 3. Plugin Architecture

SuperPAI+ is not a monolithic application. It is a modular plugin composed of skills, commands, hooks, and agents that can be extended, customized, or replaced. The `plugin.json` manifest declares all components, and the `hooks.json` registry controls lifecycle behavior.

### 4. Multi-Session Coordination

Run multiple Claude Code sessions simultaneously (WSL1, WSL2, WIN1, etc.) with automatic coordination through an inbox system, status files, and conflict prevention. Each session knows what others are working on.

### 5. Voice-First Design

Through Anna-Voice integration, every agent has a unique voice persona. Agents speak their progress, ask questions aloud, and respond to voice commands. The fire-and-forget architecture ensures voice never blocks the development workflow.

### 6. Persistent Memory

A three-tier memory system (session, project, global) ensures context persists across sessions. The learning pipeline (`/learn` to `/evolve`) captures patterns and improves behavior over time.

---

## Feature Highlights

| Feature | Description | Command |
|---------|-------------|---------|
| Adaptive Depth | Auto-selects DIRECT/WORKFLOW/ALGORITHM mode | Automatic |
| GSD Framework | Spec-driven development with wave planning | `/quick`, `/spec` |
| TDD Enforcement | Tests written before implementation code | `/test` |
| Security Auditing | 150+ automated checks across 7 categories | `/audit` |
| Cost Tracking | Real-time token usage and cost monitoring | `/cost` |
| Voice Integration | 21 distinct agent voices via Anna-Voice | `/voice` |
| Multi-Session | Coordinated parallel development sessions | `/session` |
| Memory System | Persistent learning across sessions | `/memory`, `/learn` |
| Code Review | Automated review with configurable strictness | `/review` |
| Git Worktrees | Isolated development branches | `/worktree` |
| Health Monitoring | System and component health checks | `/health` |
| Penetration Testing | Security scanning and reconnaissance | `/pentest` |
| Documentation | Auto-generated docs from code | `/docs` |
| Deployment | Kubernetes and Docker deployment helpers | `/deploy` |
| Database Management | Migration and schema management | `/db` |
| API Testing | Endpoint testing and validation | `/api` |

---

## Architecture at a Glance

SuperPAI+ operates across four layers:

1. **Plugin Layer** --- Skills, commands, hooks, agents loaded into Claude Code
2. **Server Layer** --- Bun + Hono REST API with SQLite persistence (superpai-server)
3. **Voice Layer** --- Anna-Voice native application for TTS/STT
4. **IDE Layer** --- MCP protocol integration for VS Code, Cursor, Windsurf, Warp, Desktop

Each layer is independently deployable and operates through well-defined interfaces. The plugin layer communicates with the server via REST API, the voice layer via HTTP, and IDEs via MCP (stdio or HTTP transport).

---

## Target Users

- **Individual Engineers** --- AI-powered pair programming with persistent context
- **Engineering Teams** --- Shared remote server with team-wide memory and coordination
- **Enterprise Organizations** --- Multi-tenant deployment with RBAC and audit logging
- **Onnex Partners** --- White-label integration into partner platforms

---

## Getting Started

```bash
# Clone and install
git clone https://gitlab.anshinhealth.net/engineering/superpai.git ~/.claude/SuperPAI
cd ~/.claude/SuperPAI && bash install.sh

# Restart Claude Code, then verify
/health
/version
```

See the [User Guide](/docs/user-guide/intro) for complete getting-started instructions.
