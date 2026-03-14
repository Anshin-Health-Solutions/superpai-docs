---
title: "Hook System Architecture"
sidebar_label: "Hooks (13)"
---

# Hook System Architecture

Hooks are lifecycle event handlers that fire at specific points during a Claude Code session. SuperPAI+ provides 13 hooks that control initialization, safety, tracking, and cleanup.

---

## All 13 Hooks

### SessionStart

**Trigger:** Claude Code startup
**Profile:** All profiles
**Purpose:** Initialize the session environment

Responsibilities:
- Load persistent memory from superpai-server
- Assign session designation (WSL1, WSL2, WIN1, etc.)
- Detect hook profile
- Check component health (server, voice, database)
- Display welcome message with session info

### SessionEnd

**Trigger:** Claude Code shutdown
**Profile:** Standard and Full
**Purpose:** Clean up and persist state

Responsibilities:
- Save session memory to server
- Update session status file
- Send shutdown notification to other sessions
- Generate session summary

### PreResponse

**Trigger:** Before every AI response
**Profile:** All profiles
**Purpose:** Apply governance and context

Responsibilities:
- Apply all 42 steering rules
- Check safety gates for destructive operations
- Load relevant skills based on input keywords
- Set adaptive depth mode

### PostResponse

**Trigger:** After every AI response
**Profile:** Standard and Full
**Purpose:** Track and persist

Responsibilities:
- Track token usage and cost
- Update session memory with response context
- Send voice notification (if enabled)
- Update session status

### PreCommand

**Trigger:** Before slash command execution
**Profile:** Standard and Full
**Purpose:** Validate and authorize

Responsibilities:
- Validate command exists and has correct arguments
- Check command permissions
- Log command invocation

### PostCommand

**Trigger:** After slash command execution
**Profile:** Standard and Full
**Purpose:** Track and report

Responsibilities:
- Log command result
- Update usage metrics
- Trigger dependent commands if chained

### PreEdit

**Trigger:** Before file modification
**Profile:** Full only
**Purpose:** Safety check

Responsibilities:
- Check file lock status (multi-session)
- Verify file is not system-protected
- Create backup if configured
- Log edit intent

### PostEdit

**Trigger:** After file modification
**Profile:** Full only
**Purpose:** Track and validate

Responsibilities:
- Update file tracking records
- Trigger auto-test if configured
- Update session status with modified files

### PreCommit

**Trigger:** Before git commit
**Profile:** Standard and Full
**Purpose:** Validate commit

Responsibilities:
- Validate conventional commit message format
- Run linting on staged files
- Check for secrets in staged changes
- Verify test status

### PostCommit

**Trigger:** After git commit
**Profile:** Standard and Full
**Purpose:** Notify and sync

Responsibilities:
- Update session status with latest commit
- Notify other sessions via inbox
- Log commit in history

### ErrorHandler

**Trigger:** On any error
**Profile:** All profiles
**Purpose:** Recovery and alerting

Responsibilities:
- Log error with context
- Suggest recovery actions
- Send voice alert (if enabled)
- Update error metrics

### SafetyGate

**Trigger:** Destructive operation detected
**Profile:** All profiles
**Purpose:** Prevent accidental damage

Responsibilities:
- Block destructive operations (rm -rf, DROP TABLE, force push)
- Display warning with operation details
- Require explicit user confirmation
- Log all gate triggers

### ModelSwitch

**Trigger:** AI model change
**Profile:** Standard and Full
**Purpose:** Track model transitions

Responsibilities:
- Log model transition (from/to)
- Update cost tracking with new model pricing
- Notify if switching to expensive model (genius/Opus)

---

## Hook Implementation Pattern

Hooks are implemented as bash scripts or TypeScript functions. Here is the general pattern:

```bash
#!/bin/bash
# Hook: SessionStart
# Profile: all
# Trigger: Claude Code startup

HOOK_NAME="SessionStart"
SERVER_URL="${SUPERPAI_SERVER_URL:-http://localhost:3271}"

# 1. Load persistent memory
memory=$(curl -s "${SERVER_URL}/api/memory/load" 2>/dev/null)

# 2. Assign session designation
designation=$(detect_session_designation)

# 3. Health check
health=$(curl -s "${SERVER_URL}/health" 2>/dev/null)

# 4. Output initialization result
echo "{
  \"hook\": \"${HOOK_NAME}\",
  \"designation\": \"${designation}\",
  \"memory_loaded\": $(echo $memory | jq '.count'),
  \"server_healthy\": $(echo $health | jq '.status == \"ok\"')
}"
```

---

## Auto-Trigger Table

| Event | Hooks Fired (in order) |
|-------|----------------------|
| Session start | SessionStart |
| User sends message | PreResponse |
| AI generates response | PostResponse |
| User runs `/command` | PreCommand, PostCommand |
| File is modified | PreEdit, PostEdit |
| Git commit created | PreCommit, PostCommit |
| Error occurs | ErrorHandler |
| Destructive operation | SafetyGate |
| Model changes | ModelSwitch |
| Session ends | SessionEnd |

---

## Creating Custom Hooks

You can add custom hooks by registering them in `hooks.json`. See the [Custom Components](/docs/implementation/custom-components) guide for the registration process and template.
