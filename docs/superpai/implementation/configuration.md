---
title: "Configuration Reference"
sidebar_label: "Configuration"
---

# Configuration Reference

SuperPAI+ is configurable through settings files, environment variables, and runtime commands. This reference documents all available configuration options.

---

## Settings Table

Settings are stored in the superpai-server database and can be modified via the `/config` command or REST API.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `adaptive_depth.enabled` | boolean | `true` | Enable adaptive depth mode selection |
| `adaptive_depth.default_mode` | string | `workflow` | Default mode (direct/workflow/algorithm) |
| `adaptive_depth.escalation_threshold` | number | `10` | File count threshold for escalation |
| `tdd.enforcement` | boolean | `true` | Enforce TDD (tests before code) |
| `tdd.coverage_target` | number | `80` | Target test coverage percentage |
| `voice.enabled` | boolean | `true` | Enable voice output |
| `voice.url` | string | `http://localhost:8891` | Anna-Voice server URL |
| `voice.default_voice` | string | `marcus_webb` | Default voice persona |
| `voice.speak_on_completion` | boolean | `true` | Speak when tasks complete |
| `voice.speak_on_error` | boolean | `true` | Speak when errors occur |
| `cost.tracking_enabled` | boolean | `true` | Enable cost tracking |
| `cost.alert_threshold_session` | number | `10.00` | Session cost alert threshold ($) |
| `cost.alert_threshold_daily` | number | `50.00` | Daily cost alert threshold ($) |
| `cost.preferred_model` | string | `smart` | Default model alias |
| `memory.sync_interval` | number | `60` | Memory sync interval (seconds) |
| `memory.max_entries_project` | number | `10000` | Max project memory entries |
| `memory.max_entries_global` | number | `5000` | Max global memory entries |
| `session.auto_designation` | boolean | `true` | Auto-assign session designation |
| `gsd.enabled` | boolean | `true` | Enable GSD framework |
| `gsd.auto_commit` | boolean | `true` | Auto-commit after /quick tasks |
| `gsd.spec_dir` | string | `.planning` | Spec file directory name |
| `hooks.profile` | string | `standard` | Active hook profile |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SUPERPAI_SERVER_URL` | `https://superpai.anshintech.dev` | Server URL |
| `SUPERPAI_VOICE_URL` | `http://localhost:8891` | Anna-Voice URL |
| `SUPERPAI_PROFILE` | `standard` | Hook profile |
| `SUPERPAI_VOICE_ENABLED` | `true` | Enable voice |
| `SUPERPAI_COST_TRACKING` | `true` | Enable cost tracking |
| `SUPERPAI_DB_PATH` | `data/superpai.db` | SQLite database path |
| `SUPERPAI_LOG_LEVEL` | `info` | Log level (debug/info/warn/error) |
| `SUPERPAI_MCP_TRANSPORT` | `stdio` | MCP transport mode (stdio/http) |
| `SUPERPAI_MCP_AUTH` | `false` | Enable MCP authentication |
| `SUPERPAI_API_KEY` | N/A | API key for authenticating to remote superpai-server |
| `ANTHROPIC_API_KEY` | N/A | Anthropic API key for Claude |

Environment variables override database settings. Set them in your shell profile for persistence.

---

## Hook Profile Tuning

Control which hooks fire in each profile:

| Command | Effect |
|---------|--------|
| `/profile minimal` | Only core hooks fire (SessionStart, PreResponse, ErrorHandler, SafetyGate) |
| `/profile standard` | All 13 hooks fire (default) |
| `/profile full` | All hooks fire with extended analysis |
| `/profile show` | Display current profile and active hooks |

### Custom Profile Configuration

You can create custom profiles by modifying the `plugin.json`:

```json
{
  "profiles": {
    "custom": {
      "hooks": [
        "SessionStart",
        "PreResponse",
        "PostResponse",
        "SafetyGate",
        "ErrorHandler"
      ],
      "extras": false
    }
  }
}
```

Activate with `/profile custom`.

---

## Runtime Configuration Commands

| Command | Description |
|---------|-------------|
| `/config show` | Display all current settings |
| `/config set <key> <value>` | Set a configuration value |
| `/config reset <key>` | Reset a setting to default |
| `/config export` | Export settings to JSON |
| `/config import <file>` | Import settings from JSON |

### Examples

```bash
/config set voice.enabled false           # Disable voice
/config set cost.alert_threshold_session 20   # Raise session cost alert
/config set adaptive_depth.default_mode direct  # Default to DIRECT mode
/config set gsd.auto_commit false           # Disable auto-commit
```

---

## Configuration Hierarchy

Settings are resolved in priority order (highest wins):

1. **CLI flags** --- `/config set` and command arguments
2. **Environment variables** --- `SUPERPAI_*` prefixed
3. **Server database** --- Stored in `settings` table
4. **plugin.json** --- Plugin-level defaults
5. **Built-in defaults** --- Hardcoded in source

---

## Recommended Configurations

### Solo Developer

```bash
/profile standard
/config set voice.enabled true
/config set cost.alert_threshold_session 10
/config set gsd.auto_commit true
```

### Team Environment

```bash
/profile standard
/config set memory.sync_interval 30
/config set session.auto_designation true
/config set cost.alert_threshold_daily 100
```

### CI/CD Pipeline

```bash
/profile minimal
/config set voice.enabled false
/config set tdd.enforcement true
/config set cost.tracking_enabled false
```
