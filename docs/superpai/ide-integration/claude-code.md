---
title: "Claude Code CLI Integration"
sidebar_label: "Claude Code CLI"
---

# Claude Code CLI Integration

Claude Code CLI is the primary and most fully-featured integration for SuperPAI+. The plugin loads natively into Claude Code, providing access to all 73 skills, 47 commands, 16 agents, and 13 hooks without any MCP configuration.

---

## Installation

SuperPAI+ installs directly into Claude Code via the standard installation process:

```bash
# Clone the repository
git clone https://gitlab.anshinhealth.net/engineering/superpai.git ~/.claude/SuperPAI

# Run the installer
cd ~/.claude/SuperPAI && bash install.sh
```

The installer automatically:
1. Copies the plugin files to `~/.claude/SuperPAI/`
2. Registers the plugin in Claude Code's configuration
3. Installs superpai-server dependencies
4. Runs database migrations
5. Creates default configuration files

---

## Manual Registration

If the automatic installer does not register the plugin, you can manually add it to Claude Code's settings:

```bash
# Open Claude Code settings
claude config edit

# Add SuperPAI+ to the plugins list
# (The exact format depends on your Claude Code version)
```

Alternatively, ensure the `CLAUDE_PLUGIN_PATH` environment variable includes the SuperPAI+ directory:

```bash
export CLAUDE_PLUGIN_PATH="$HOME/.claude/SuperPAI"
```

Add this to your shell profile (`~/.bashrc`, `~/.zshrc`, or equivalent) for persistence.

---

## Verification

After installation, restart Claude Code and verify:

```bash
# Health check - all components should show green
/health

# Version check - should show v3.7.0
/version

# List all skills
/skills

# List all commands
/help
```

### Expected /health Output

```
SuperPAI+ Health Check
======================
Plugin:       OK (v3.7.0)
Server:       OK (http://localhost:3271)
Database:     OK (11 tables, 0 pending migrations)
Voice:        OK (http://localhost:8888) or UNAVAILABLE
Memory:       OK (142 entries loaded)
Session:      WSL1 (standard profile)
```

---

## What You Get in CLI Mode

### Full Native Integration

| Component | Count | Availability |
|-----------|-------|-------------|
| Skills | 73 | All available |
| Commands | 47 | All available |
| Agents | 16 | All available |
| Hooks | 13 | All active (profile-dependent) |
| Voice | 21 voices | Requires Anna-Voice |
| Multi-Session | Yes | Full coordination |
| Memory | 3 tiers | Full persistence |
| Cost Tracking | Yes | Real-time |
| Adaptive Depth | Yes | Automatic |
| GSD Framework | Yes | /quick, /spec, model aliases |

### CLI-Exclusive Features

These features are only available in the native CLI integration:

- **Full hook support** --- All 13 hooks fire at the correct lifecycle points, including PreEdit and PostEdit
- **Multi-session coordination** --- Session designation, inbox, status files, and file locking
- **Native adaptive depth** --- The CCR model router operates at the deepest integration level
- **Git worktree management** --- Full `/worktree` command support

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SUPERPAI_SERVER_URL` | `http://localhost:3271` | Server URL |
| `SUPERPAI_VOICE_URL` | `http://localhost:8888` | Anna-Voice URL |
| `SUPERPAI_PROFILE` | `standard` | Hook profile |
| `SUPERPAI_VOICE_ENABLED` | `true` | Enable voice output |
| `SUPERPAI_COST_TRACKING` | `true` | Enable cost tracking |

### Shell Profile Setup

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# SuperPAI+ Configuration
export SUPERPAI_SERVER_URL="http://localhost:3271"
export SUPERPAI_VOICE_URL="http://localhost:8888"
export SUPERPAI_PROFILE="standard"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Plugin not loading | Run `bash install.sh` again and restart Claude Code |
| Commands not recognized | Verify `~/.claude/SuperPAI/plugin.json` exists |
| Server not connecting | Start the server: `cd ~/.claude/SuperPAI/superpai-server && bun run start` |
| Session not designated | Check environment variables and restart |

See the [Troubleshooting](/superpai/user-guide/troubleshooting) guide for more solutions.
