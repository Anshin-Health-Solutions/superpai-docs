---
title: "Multi-Session Coordination"
sidebar_label: "Multi-Session"
---

# Multi-Session Coordination

SuperPAI+ supports running multiple Claude Code sessions simultaneously with automatic coordination to prevent conflicts, share progress, and distribute work across parallel sessions.

---

## Session Architecture

Each session receives a unique designation based on its environment:

| Designation | Platform | Typical Use |
|-------------|----------|-------------|
| WSL1 | WSL (First instance) | Primary development |
| WSL2 | WSL (Second instance) | Testing, secondary work |
| WIN1 | Windows (First instance) | Windows-specific tasks |
| WIN2 | Windows (Second instance) | Parallel Windows work |
| REM1 | Remote (SSH/VS Code) | Remote development |
| REM2 | Remote (Second instance) | Remote parallel work |

### Designation Detection

Session designation is determined automatically at startup based on:

1. Environment variables (WSL_DISTRO_NAME, WSLENV, etc.)
2. Running Claude Code instances (port detection)
3. Terminal multiplexer context (tmux pane, screen window)
4. Manual override via `/session designate WSL2`

---

## Inbox System

The inbox is the primary communication channel between sessions. Messages are stored in the superpai-server database and polled by each session.

### Sending Messages

```bash
/send WSL2 "user service refactoring is complete, ready for integration"
/send ALL "deploying to dev environment in 5 minutes"
/send WIN1 "please run Windows-specific tests for the installer"
```

### Checking the Inbox

```bash
/inbox             # Show unread messages
/inbox all         # Show all messages including read ones
/inbox clear       # Mark all messages as read
```

### Message Format

Messages include metadata for context:

```json
{
  "from": "WSL1",
  "to": "WSL2",
  "timestamp": "2026-03-09T14:30:00Z",
  "type": "info",
  "message": "user service refactoring is complete",
  "context": {
    "branch": "feat/user-service",
    "files_changed": 12,
    "tests_passed": 47
  }
}
```

---

## Status Files

Each session maintains a status file that other sessions can read to understand what work is in progress.

### Status File Location

```
~/.claude/SuperPAI/sessions/
  WSL1.status.json
  WSL2.status.json
  WIN1.status.json
```

### Status File Contents

```json
{
  "designation": "WSL1",
  "started_at": "2026-03-09T09:00:00Z",
  "current_task": "Refactoring auth middleware",
  "branch": "feat/auth-refactor",
  "files_locked": ["src/auth/middleware.ts", "src/auth/jwt.ts"],
  "mode": "WORKFLOW",
  "last_commit": "fix(auth): correct token expiry validation"
}
```

### Checking Other Sessions

```bash
/session status        # Show all active sessions
/session status WSL2   # Show specific session details
```

---

## Coordination Rules

### File Locking

When a session begins working on a file, it registers the file in its status. Other sessions can see which files are locked and avoid conflicting changes.

**Lock checking is advisory, not enforced.** Sessions warn you if you attempt to edit a file locked by another session, but do not prevent it.

### Branch Coordination

- Each session should work on its own branch when possible
- The `/sync` command merges updates from the main branch into your working branch
- Merge conflicts are surfaced with resolution guidance

### Communication Protocols

| Scenario | Action |
|----------|--------|
| Starting work on shared module | Send `/send ALL "starting work on <module>"` |
| Completing a task | Send completion message with branch and test results |
| Deploying to shared environment | Send warning 5 minutes before deployment |
| Encountering a blocking issue | Send to specific session that owns the blocked resource |
| Finished for the day | Update status with summary of completed work |

---

## Sync Command

The `/sync` command synchronizes state across sessions:

```bash
/sync              # Full sync: status, memory, inbox
/sync status       # Sync only status files
/sync memory       # Sync only memory entries
/sync branch       # Pull latest changes from remote
```

### Sync Flow

1. Push local status file to server
2. Pull all other session status files
3. Sync memory entries (new learnings, patterns)
4. Check inbox for unread messages
5. Report any conflicts or attention items

---

## Best Practices

1. **Communicate early and often** --- Send messages when starting or finishing major tasks
2. **Use separate branches** --- Avoid working on the same branch from multiple sessions
3. **Check status before starting** --- Run `/session status` to see what others are doing
4. **Sync regularly** --- Run `/sync` every 15-30 minutes during active multi-session work
5. **Lock critical files** --- Explicitly lock files you are heavily modifying
