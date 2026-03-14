---
title: "Slash Commands"
sidebar_label: "Commands (47)"
---

# Slash Commands (47)

SuperPAI+ provides 47 slash commands organized into functional categories. Each command is available by typing `/` followed by the command name in any Claude Code session with SuperPAI+ loaded.

---

## Core System Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/health` | Check system health and component status | `/health` |
| `/version` | Display SuperPAI+ version information | `/version` |
| `/status` | Show current session status and designation | `/status` |
| `/help` | List all available commands | `/help` |
| `/config` | View or modify configuration settings | `/config show` |
| `/mode` | Override adaptive depth mode | `/mode workflow` |
| `/profile` | Switch hook profile | `/profile full` |

## GSD Commands (v3.7.0)

| Command | Description | Example |
|---------|-------------|---------|
| `/quick` | Execute a small task in a single pass | `/quick "add health endpoint"` |
| `/spec` | Generate specification and wave plan | `/spec "auth system"` |
| `/wave` | View or manage wave execution status | `/wave status` |
| `/commit` | Generate an atomic conventional commit | `/commit` |

## Development Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/test` | Run or write tests (TDD workflow) | `/test run` |
| `/review` | Perform code review | `/review --strict` |
| `/refactor` | Refactor code with safety checks | `/refactor auth.ts` |
| `/debug` | Debug an issue with structured analysis | `/debug "login fails"` |
| `/docs` | Generate documentation from code | `/docs api` |
| `/lint` | Run linting and code quality checks | `/lint` |
| `/format` | Format code according to project standards | `/format` |
| `/worktree` | Create or manage git worktrees | `/worktree create feat/auth` |
| `/branch` | Create or switch branches | `/branch feat/new-feature` |
| `/deploy` | Deployment helpers and status checks | `/deploy status` |

## Database Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/db` | Database management operations | `/db migrate` |
| `/schema` | View or modify database schema | `/schema show users` |
| `/seed` | Seed database with test data | `/seed dev` |

## Security Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/audit` | Run security audit (150+ checks) | `/audit` |
| `/pentest` | Penetration testing workflows | `/pentest webapp` |
| `/recon` | Reconnaissance and information gathering | `/recon domain.com` |
| `/osint` | Open-source intelligence gathering | `/osint target` |
| `/secrets` | Scan for exposed secrets and credentials | `/secrets scan` |

## Memory and Learning Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/memory` | View and manage persistent memory | `/memory show` |
| `/learn` | Capture a new learning for the knowledge base | `/learn "pattern"` |
| `/evolve` | Apply learned patterns to improve behavior | `/evolve` |
| `/forget` | Remove a specific memory entry | `/forget id:123` |

## Session and Coordination Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/session` | Manage session designation and status | `/session` |
| `/inbox` | Check the multi-session inbox | `/inbox` |
| `/send` | Send a message to another session | `/send WSL2 "task done"` |
| `/sync` | Synchronize state across sessions | `/sync` |

## Cost and Monitoring Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/cost` | View token usage and cost tracking | `/cost` |
| `/metrics` | View system performance metrics | `/metrics` |
| `/logs` | View system logs | `/logs tail` |

## Voice Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/voice` | Control voice integration settings | `/voice on` |
| `/speak` | Force the agent to speak a message | `/speak "hello"` |
| `/listen` | Activate voice input | `/listen` |

## Agent Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/agent` | Invoke a specific agent | `/agent security` |
| `/agents` | List all available agents | `/agents` |

## Skill Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/skills` | List all available skills | `/skills` |
| `/skill` | View details of a specific skill | `/skill tdd` |

---

## Command Flags

Most commands accept optional flags:

| Flag | Meaning | Example |
|------|---------|---------|
| `--verbose` | Show detailed output | `/health --verbose` |
| `--json` | Output in JSON format | `/status --json` |
| `--quiet` | Suppress non-essential output | `/test run --quiet` |
| `--force` | Skip confirmation prompts | `/deploy --force` |
| `--dry-run` | Preview without executing | `/db migrate --dry-run` |

---

## Custom Commands

You can create custom commands by adding a command definition to your plugin configuration. See the [Custom Components](/docs/implementation/custom-components) guide for details.
