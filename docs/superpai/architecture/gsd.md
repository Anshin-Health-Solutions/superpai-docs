---
title: "GSD Integration Architecture (v3.7.0)"
sidebar_label: "GSD Architecture"
---

# GSD Integration Architecture (v3.7.0)

The GSD (Get Stuff Done) framework was integrated into SuperPAI+ v3.7.0 with zero breaking changes. This document describes the new components, modified components, and the architectural impact of the integration.

---

## New Components

| Component | Type | Path | Description |
|-----------|------|------|-------------|
| `/quick` command | Command | `commands/quick.ts` | Single-pass task execution |
| `/spec` command | Command | `commands/spec.ts` | Specification generation |
| `/wave` command | Command | `commands/wave.ts` | Wave management |
| `/commit` command | Command | `commands/commit.ts` | Atomic commit generation |
| SpecDriven skill | Skill | `skills/GSD/SpecDriven/SKILL.md` | Spec file creation |
| WavePlanner skill | Skill | `skills/GSD/WavePlanner/SKILL.md` | Wave decomposition |
| AtomicCommit skill | Skill | `skills/GSD/AtomicCommit/SKILL.md` | Conventional commit gen |
| ModelRouter skill | Skill | `skills/GSD/ModelRouter/SKILL.md` | Model alias routing |
| Steering Rule 40 | Rule | `steering/rule-40.md` | Identity Anchor |
| Steering Rule 41 | Rule | `steering/rule-41.md` | Safety Gate |
| Steering Rule 42 | Rule | `steering/rule-42.md` | Spec Compliance |
| `.planning/` support | Feature | Memory system | Spec file auto-loading |

---

## Modified Components

| Component | Change | Impact |
|-----------|--------|--------|
| Adaptive Depth | Added model alias support | Simple/smart/genius routing |
| PreResponse hook | Added spec file detection | Auto-loads .planning/ context |
| PostResponse hook | Added atomic commit trigger | Auto-commits after /quick tasks |
| Skill index | Added GSD category | 4 new skills indexed |
| Command registry | Added 4 new commands | /quick, /spec, /wave, /commit |
| Cost tracking | Added per-model alias tracking | Cost reports show aliases |
| Memory system | Added spec file tier | .planning/ files as memory |
| Session status | Added wave progress | Shows current wave/task |

---

## Architectural Impact

### Zero Breaking Changes

The GSD framework was designed as a purely additive extension:

1. **No existing APIs changed** --- All existing REST endpoints continue to work identically
2. **No schema migrations** --- No new database tables required (existing tables extended)
3. **No config changes required** --- GSD features are available without configuration
4. **No skill conflicts** --- GSD skills use unique triggers that do not overlap with existing skills
5. **No hook modifications** --- Existing hooks gained optional GSD awareness without behavioral changes

### Integration Points

```mermaid
graph TD
    GSD[GSD Framework] --> QK[/quick Command]
    GSD --> SP[/spec Command]
    GSD --> WV[/wave Command]
    GSD --> CM[/commit Command]

    QK --> AD[Adaptive Depth]
    QK --> TDD[TDD Skill]
    QK --> AC[AtomicCommit Skill]

    SP --> SD[SpecDriven Skill]
    SD --> WP[WavePlanner Skill]
    WP --> TDD
    TDD --> AC

    CM --> AC
    WV --> WP

    AD --> MR[ModelRouter Skill]
    MR --> CCR[Cost-Conscious Router]

    SD --> PLAN[.planning/ Files]
    PLAN --> MEM[Memory System]
```

### Model Alias Architecture

The model alias system adds a translation layer between user-facing names and actual model IDs:

```
User says "simple"  -->  ModelRouter  -->  Claude 3.5 Haiku
User says "smart"   -->  ModelRouter  -->  Claude 3.5 Sonnet
User says "genius"  -->  ModelRouter  -->  Claude Opus
```

The ModelRouter skill intercepts model selection at the Adaptive Depth level and translates aliases to concrete model IDs before API calls are made.

### Spec File Architecture

Spec files introduce a new persistence mechanism that sits alongside the existing memory system:

| Mechanism | Storage | Scope | Format |
|-----------|---------|-------|--------|
| Session Memory | In-memory | Current session | Structured JSON |
| Project Memory | SQLite | Current project | Structured JSON |
| **Spec Files** | **Filesystem** | **Current project** | **Markdown** |
| Global Memory | SQLite | All projects | Structured JSON |

Spec files are stored in the project directory (not in the SuperPAI+ installation), making them:
- Version-controllable (committed to git)
- Shareable across team members
- Readable without SuperPAI+ tooling
- Editable with standard text editors

---

## Performance Characteristics

| Operation | Latency | Token Overhead |
|-----------|---------|---------------|
| `/quick` task | 5-30 seconds | Minimal (single-pass) |
| `/spec` generation | 30-90 seconds | Moderate (genius model) |
| Wave execution (per task) | 10-60 seconds | Standard (smart model) |
| Model alias resolution | < 1ms | Zero |
| Spec file loading | < 100ms | Zero (filesystem read) |
| Atomic commit generation | 2-5 seconds | Low (simple model) |

---

## Backward Compatibility

All v3.6.x configurations, skills, commands, and agents work without modification on v3.7.0. The GSD framework is entirely opt-in --- if you never use `/quick`, `/spec`, or model aliases, SuperPAI+ behaves identically to v3.6.x.
