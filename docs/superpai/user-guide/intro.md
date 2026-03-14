---
title: "Getting Started with SuperPAI+"
sidebar_label: "Getting Started"
---

# Getting Started with SuperPAI+

Welcome to SuperPAI+, the personal AI infrastructure that transforms Claude Code into a full engineering platform. This guide will take you from installation to your first productive session in under 10 minutes.

---

## What is SuperPAI+?

SuperPAI+ is a Claude Code plugin that adds 73 skills, 47 commands, 16 agents, and 13 hooks to your AI development environment. It provides:

- **Adaptive Depth** --- Automatically adjusts effort level based on task complexity
- **Test-Driven Development** --- Enforces TDD with tests written before implementation
- **Multi-Session Coordination** --- Run parallel sessions with automatic conflict prevention
- **Voice Integration** --- Agents speak with distinct voices via Anna-Voice
- **Persistent Memory** --- Context that survives across sessions and projects
- **Constitutional Governance** --- 42 steering rules ensure consistent, safe behavior

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|-------------|----------------|-------|
| Claude Code CLI | Latest | `npm install -g @anthropic-ai/claude-code` |
| Node.js | 20+ | Required for SuperPAI server |
| Bun | 1.0+ | Runtime for superpai-server |
| Git | 2.30+ | Required for installation |
| WSL2 (Windows) | Ubuntu 22.04+ | Recommended for Windows users |

---

## Installation

### Step 1: Install Prerequisites

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code
```

### Step 2: Clone the Repository

```bash
git clone https://gitlab.anshinhealth.net/engineering/superpai.git ~/.claude/SuperPAI
```

### Step 3: Run the Installer

```bash
cd ~/.claude/SuperPAI
bash install.sh
```

The installer will:
- Validate prerequisites
- Install dependencies for superpai-server
- Run database migrations
- Register the plugin with Claude Code
- Configure default settings

### Step 4: Restart Claude Code

Close and reopen your Claude Code terminal. The plugin loads automatically on startup.

### Step 5: Verify Installation

```bash
/health    # Should show all components green
/version   # Should show v3.7.0
```

---

## Session Designation

When SuperPAI+ starts, it assigns your session a designation based on your environment:

| Designation | Environment | Example |
|-------------|-------------|---------|
| WSL1 | First WSL terminal | Primary development session |
| WSL2 | Second WSL terminal | Secondary/testing session |
| WIN1 | Windows terminal | Windows-specific tasks |
| WIN2 | Second Windows terminal | Parallel Windows work |

The designation is used for multi-session coordination and appears in your prompt.

---

## Your First 10 Minutes

### Minute 1-2: Explore the System

```bash
/help              # See all available commands
/status            # Check system status
/skills            # List all 73 skills
```

### Minute 3-4: Try Adaptive Depth

Ask a simple question --- SuperPAI+ uses DIRECT mode (instant answer). Then ask something complex like "refactor the authentication module" --- it automatically switches to WORKFLOW mode with planning, testing, and review.

### Minute 5-6: Use a Skill

```bash
/audit             # Run security audit (150+ checks)
/cost              # Check token usage and costs
```

### Minute 7-8: Try GSD (v3.7.0)

```bash
/quick "add a health check endpoint to the API"
```

This executes the task in a single pass with an automatic atomic commit.

### Minute 9-10: Check Memory

```bash
/memory            # View what SuperPAI+ has learned
/learn             # Capture a new learning from this session
```

---

## What Happens at Startup

When Claude Code launches with SuperPAI+, the following sequence executes:

1. **Plugin Loading** --- `plugin.json` is parsed, all components registered
2. **SessionStart Hook** --- Fires to initialize the session environment
3. **Health Check** --- Validates server connectivity, database access, voice availability
4. **Memory Sync** --- Loads persistent memory from the server
5. **Profile Detection** --- Determines hook profile (minimal, standard, full)
6. **Session Designation** --- Assigns WSL1/WSL2/WIN1 etc. based on environment
7. **Ready** --- The system is fully initialized and ready for commands

---

## Next Steps

- [Adaptive Depth System](/superpai/user-guide/adaptive-depth) --- Understand the three operating modes
- [Slash Commands](/superpai/user-guide/commands) --- Reference for all 47 commands
- [GSD Integration](/superpai/user-guide/gsd-integration) --- Deep dive into `/quick` and `/spec`
- [Skills System](/superpai/user-guide/skills) --- Explore the 73 available skills
