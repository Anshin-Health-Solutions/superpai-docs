---
title: "Upgrading SuperPAI+"
sidebar_label: "Upgrade Guide"
---

# Upgrading SuperPAI+

Upgrading SuperPAI+ is a straightforward three-step process. This guide covers the upgrade procedure, version-specific changes, and component behavior during upgrades.

---

## Standard Upgrade Process

### Step 1: Pull Latest Code

```bash
cd ~/.claude/SuperPAI
git pull origin main
```

### Step 2: Update Dependencies and Migrate

```bash
cd superpai-server
bun install
bun run db:migrate
```

### Step 3: Verify

Close and reopen Claude Code, then verify:

```bash
/version       # Should show new version
/health        # All components should be green
```

---

## Component Behavior During Upgrade

| Component | Behavior | Action Required |
|-----------|----------|-----------------|
| **Skills** | New skills auto-discovered on restart | None |
| **Commands** | New commands auto-registered | None |
| **Agents** | New agents auto-loaded | None |
| **Hooks** | Updated hooks take effect on restart | None |
| **Server** | Must be restarted after upgrade | Restart server |
| **Database** | Migrations run automatically | Run `bun run db:migrate` |
| **Memory** | Preserved across upgrades | None |
| **Configuration** | Preserved, new defaults added | Review new settings |
| **MCP** | Updated tools/prompts on server restart | Restart IDE MCP |

---

## v3.6.x to v3.7.0 Changes

### New Features

| Feature | Type | Description |
|---------|------|-------------|
| `/quick` command | Command | Single-pass task execution |
| `/spec` command | Command | Specification generation |
| `/wave` command | Command | Wave management |
| `/commit` command | Command | Atomic commit generation |
| GSD skills (4) | Skills | SpecDriven, WavePlanner, AtomicCommit, ModelRouter |
| Model aliases | Feature | simple/smart/genius aliases |
| Steering rules 40-42 | Rules | Identity, Safety, Spec Compliance |
| `.planning/` support | Feature | Spec file persistence |

### Modified Behavior

| Component | Change | Impact |
|-----------|--------|--------|
| Adaptive Depth | Added model alias support | No breaking changes |
| Memory sync | Reduced latency to < 1s | Performance improvement |
| Cost tracking | Per-model alias reporting | Enhanced cost visibility |
| Session status | Added wave progress field | New status information |

### Database Changes

| Migration | Description |
|-----------|-------------|
| None | v3.7.0 requires no schema changes |

v3.7.0 is fully backward-compatible at the database level. No new tables are added. Existing tables gain optional new columns through SQLite's flexible schema.

### Configuration Changes

New configuration options (with defaults):

```json
{
  "gsd": {
    "enabled": true,
    "auto_commit": true,
    "spec_dir": ".planning",
    "model_aliases": {
      "simple": "claude-3-5-haiku-20241022",
      "smart": "claude-3-5-sonnet-20241022",
      "genius": "claude-opus-4-20250514"
    }
  }
}
```

All new settings have sensible defaults. No configuration changes are required for the upgrade.

---

## Rollback Procedure

If you need to roll back to a previous version:

```bash
cd ~/.claude/SuperPAI

# Check available versions
git tag -l

# Roll back to specific version
git checkout v3.6.2

# Reinstall dependencies
cd superpai-server && bun install

# Restart Claude Code
```

### Rollback Considerations

- **Memory entries** created during the newer version remain in the database
- **Spec files** in `.planning/` directories are not affected by rollback
- **Configuration** changes made for the newer version may need manual cleanup
- **Database** rollback is not needed for v3.7.0 (no schema changes)

---

## Version History

| Version | Release Date | Codename | Key Features |
|---------|-------------|----------|--------------|
| v3.7.0 | March 2026 | GSD | Spec-driven dev, wave planning, model aliases |
| v3.6.2 | February 2026 | Stability | Bug fixes, performance improvements |
| v3.6.1 | January 2026 | Polish | UI improvements, cost tracking enhancements |
| v3.6.0 | December 2025 | Voice | Anna-Voice integration, agent voices |
| v3.5.0 | October 2025 | Memory | Persistent memory system, learning pipeline |
| v3.4.0 | August 2025 | Sessions | Multi-session coordination |
| v3.3.0 | June 2025 | Security | Security audit framework |
| v3.2.0 | April 2025 | MCP | IDE integration via MCP |
| v3.1.0 | February 2025 | Skills | Skill system expansion |
| v3.0.0 | December 2024 | Foundation | Initial public release |
