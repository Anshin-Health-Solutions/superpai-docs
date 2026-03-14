---
title: "Creating Custom Components"
sidebar_label: "Custom Components"
---

# Creating Custom Components

SuperPAI+ is designed to be extended with custom skills, commands, agents, steering rules, and identity configurations. This guide provides templates and instructions for creating each component type.

---

## Create a Custom Skill

### Step 1: Create the Skill Directory

```bash
mkdir -p ~/.claude/SuperPAI/skills/MyCategory/MySkill
```

### Step 2: Write SKILL.md

```markdown
---
name: MyCustomSkill
version: 1.0.0
category: MyCategory
triggers: [mykeyword, anotherkeyword]
model_preference: smart
priority: medium
---

# MyCustomSkill

## Purpose
Describe what this skill does and when it should be used.

## Pre-requisites
- List any requirements or assumptions

## Instructions
1. First step the AI should take
2. Second step with details
3. Third step with expected output

## Output Format
Describe the expected output structure.

## Examples

### Example 1
**User:** "mykeyword for the auth module"
**Action:** Load MyCustomSkill, apply to auth module,
produce structured output.

### Example 2
**User:** "anotherkeyword the database layer"
**Action:** Load MyCustomSkill, analyze database layer,
generate report.
```

### Step 3: Update skill-index.json

Add your skill to the index:

```json
{
  "name": "MyCustomSkill",
  "path": "skills/MyCategory/MySkill/SKILL.md",
  "category": "MyCategory",
  "triggers": ["mykeyword", "anotherkeyword"],
  "model_preference": "smart",
  "priority": "medium"
}
```

Or run `/skills rebuild` to auto-discover the new skill.

---

## Create a Custom Command

### Step 1: Create the Command File

Create `~/.claude/SuperPAI/commands/mycommand.ts`:

```typescript
import type { CommandDefinition } from '../types';

export const command: CommandDefinition = {
  name: 'mycommand',
  description: 'Description of what /mycommand does',
  usage: '/mycommand [options]',
  category: 'custom',
  handler: async (args: string[]) => {
    // Command implementation
    return {
      success: true,
      output: 'Command completed successfully',
    };
  },
};
```

### Step 2: Register the Command

Add to the command registry in `plugin.json`:

```json
{
  "components": {
    "commands": "commands/"
  }
}
```

Commands are auto-discovered from the `commands/` directory on startup.

---

## Create a Custom Agent

### Step 1: Create the Agent File

Create `~/.claude/SuperPAI/agents/myagent.md`:

```markdown
---
name: MyAgent
title: Custom Specialty
voice_id: default_voice
voice_settings:
  stability: 0.70
  similarity_boost: 0.75
  speed: 1.0
personality: Brief personality description
skills: [Skill1, Skill2, Skill3]
---

# MyAgent - Custom Agent Title

## Backstory
Describe the agent's background, experience,
and what makes them unique.

## Communication Style
"Characteristic phrase one..."
"Characteristic phrase two..."
Describe their delivery style and tone.

## Expertise
- Area of expertise 1
- Area of expertise 2
- Area of expertise 3

## When to Invoke
Describe scenarios when this agent is most useful.
```

### Step 2: Register the Agent

Agents are auto-discovered from the `agents/` directory. Restart Claude Code to load the new agent.

---

## Add Custom Steering Rules

### Step 1: Create the Rule File

Create `~/.claude/SuperPAI/steering/rule-43.md`:

```markdown
---
rule_number: 43
name: My Custom Rule
category: governance
priority: high
immutable: true
---

# Rule 43: My Custom Rule

## Statement
Clear, concise statement of what this rule requires.

## Rationale
Why this rule exists and what it protects.

## Enforcement
How the rule is checked and enforced.

## Examples
Example scenarios showing rule application.
```

### Step 2: Register the Rule

Add to the steering rules index in the plugin configuration. Rules are loaded during the PreResponse hook and applied to every response.

---

## Identity System

The identity system controls how agents present themselves. Each agent has:

- **Name** --- Display name used in communication
- **Title** --- Professional title or specialty
- **Personality** --- Brief personality traits
- **Voice** --- Anna-Voice persona assignment
- **Communication style** --- Characteristic phrases and tone
- **Skills** --- List of skills the agent can invoke

### Customizing Agent Identity

Modify any agent's identity by editing their `.md` file in the `agents/` directory. Changes take effect on next Claude Code restart.

### Creating a Custom Voice

If you have access to the Anna-Voice voice creation tools, you can create custom voices and assign them to agents. See the [Anna-Voice API](/anna-voice/api) reference for voice management endpoints.

---

## Best Practices

1. **Keep skills focused** --- One skill per capability; avoid multi-purpose skills
2. **Use unique triggers** --- Avoid overlapping with existing skill triggers
3. **Test extensively** --- Verify your component works correctly before deploying to a team
4. **Document well** --- Include examples in skills and clear descriptions in commands
5. **Version your components** --- Use semantic versioning in frontmatter
6. **Follow conventions** --- Match the naming and structure patterns of built-in components
