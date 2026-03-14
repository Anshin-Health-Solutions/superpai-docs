---
title: "AI Agents (16)"
sidebar_label: "Agents (16)"
---

# AI Agents (16)

SuperPAI+ includes 16 specialized AI agents, each with a distinct persona, expertise area, voice, and communication style. Agents go beyond skills by maintaining a persistent identity and behavioral pattern throughout their engagement.

---

## All 16 Agents

| Agent | Specialty | Voice | Personality |
|-------|-----------|-------|-------------|
| **Marcus** | Engineering Leadership | Deep, measured | Battle-scarred tech lead, strategic thinker |
| **Kira** | Frontend Development | Warm, energetic | Component architect, accessibility advocate |
| **Dev** | Backend Engineering | Calm, precise | API specialist, database expert |
| **Quinn** | DevOps/Infrastructure | Direct, efficient | Container orchestration, CI/CD pipelines |
| **Sage** | Architecture | Thoughtful, slow | System design, trade-off analysis |
| **Sentry** | Security | Alert, sharp | Vulnerability assessment, threat modeling |
| **Doc** | Documentation | Clear, patient | Technical writing, API documentation |
| **Tester** | Quality Assurance | Methodical, thorough | Test strategy, coverage analysis |
| **Data** | Database Engineering | Analytical, precise | Schema design, query optimization |
| **Scout** | Reconnaissance | Quiet, focused | OSINT, information gathering |
| **Voice** | Voice Integration | Variable, adaptive | Anna-Voice setup, TTS/STT configuration |
| **Coach** | Code Review | Supportive, direct | Best practices, mentoring feedback |
| **Planner** | Project Planning | Organized, structured | Task decomposition, timeline estimation |
| **Debugger** | Troubleshooting | Patient, systematic | Root cause analysis, debugging methodology |
| **Designer** | UX/UI Design | Creative, empathetic | User experience, interface design |
| **Ops** | Production Operations | Calm under pressure | Incident response, monitoring, alerting |

---

## Agent vs. Skill Comparison

| Aspect | Skill | Agent |
|--------|-------|-------|
| Identity | None --- applies instructions only | Persistent persona with name and voice |
| Scope | Single task or capability | Can invoke multiple skills |
| Memory | No memory of past usage | Remembers context within session |
| Voice | No voice | Dedicated voice persona |
| Invocation | Keyword match or `/skill` | `/agent <name>` command |
| Duration | Active only during task | Active until dismissed |
| Communication | Standard AI output | Character-specific style and tone |

---

## Invoking Agents

### Basic Invocation

```bash
/agent Marcus        # Invoke the engineering leader
/agent Sentry        # Invoke the security specialist
/agent Kira          # Invoke the frontend expert
```

### Agent with Task

```bash
/agent Dev "optimize the user query to handle 10k concurrent requests"
/agent Doc "generate API documentation for the auth module"
/agent Tester "create comprehensive test coverage for the payment service"
```

### Listing Agents

```bash
/agents              # List all 16 agents with their specialties
/agent info Marcus   # Show detailed info about a specific agent
```

---

## Agent Behavior

When an agent is invoked:

1. **Identity Loading** --- The agent's persona, communication style, and voice are loaded
2. **Context Gathering** --- The agent reads relevant project context and memory
3. **Skill Activation** --- The agent activates relevant skills for its specialty
4. **Task Execution** --- Work is performed with the agent's characteristic approach
5. **Voice Output** --- If Anna-Voice is connected, the agent speaks with its assigned voice
6. **Memory Update** --- Key findings and decisions are stored in session memory

### Agent Chaining

Agents can hand off work to other agents. For example:

1. **Planner** decomposes a feature into tasks
2. **Dev** implements the backend
3. **Kira** implements the frontend
4. **Tester** writes comprehensive tests
5. **Doc** generates documentation
6. **Coach** reviews the complete implementation

---

## Agent Voices

Each agent has an assigned Anna-Voice persona for spoken output. See the [Voice Integration](/docs/user-guide/voice) guide for configuration details and the [Available Voices](/anna-voice/voices) reference for the full voice catalog.

| Agent | Default Voice | Accent |
|-------|--------------|--------|
| Marcus | Marcus Webb | American |
| Kira | Kira Chen | American |
| Dev | Dev Patel | British-Indian |
| Quinn | Quinn Murphy | Irish |
| Sage | Sage Williams | British |
| Sentry | Sentry Blake | American |

---

## Creating Custom Agents

You can create custom agents by adding an agent definition file. See the [Custom Components](/docs/implementation/custom-components) guide for the template and registration process.
