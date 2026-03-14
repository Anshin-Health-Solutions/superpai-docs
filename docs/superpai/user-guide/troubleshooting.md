---
title: "Troubleshooting"
sidebar_label: "Troubleshooting"
---

# Troubleshooting

This guide covers common issues with SuperPAI+ and their solutions. If your issue is not listed here, check the [GitLab Issues](https://gitlab.anshinhealth.net/engineering/superpai/-/issues) page or reach out on the engineering Slack channel.

---

## Plugin Not Loading

### Symptoms
- No slash commands available after starting Claude Code
- `/health` command not recognized
- No session designation shown

### Solutions

**1. Verify installation:**
```bash
ls ~/.claude/SuperPAI/plugin.json
# Should exist and be valid JSON
```

**2. Check plugin registration:**
```bash
cat ~/.claude/settings.json | grep -i superpai
# Should reference the SuperPAI plugin path
```

**3. Reinstall the plugin:**
```bash
cd ~/.claude/SuperPAI
bash install.sh
```

**4. Restart Claude Code completely** --- Close all terminals and reopen.

---

## Skills Not Triggering

### Symptoms
- Asking for TDD workflow but standard responses given
- Skills referenced in `/skills` output but not activating
- Keyword triggers not matching

### Solutions

**1. Check skill index:**
```bash
cat ~/.claude/SuperPAI/skills/skill-index.json
# Verify the skill entry exists with correct triggers
```

**2. Force-load a skill:**
```bash
/skill TDD            # Explicitly load the skill
```

**3. Check for naming conflicts:**
Multiple skills with overlapping triggers may cause confusion. Review trigger keywords in `skill-index.json`.

**4. Verify SKILL.md format:**
Ensure the skill's `SKILL.md` file has valid frontmatter with `name` and `triggers` fields.

---

## Voice Not Working

### Symptoms
- No spoken output even with `/voice on`
- Anna-Voice server not reachable
- Agents not speaking with their assigned voices

### Solutions

**1. Check Anna-Voice health:**
```bash
curl http://localhost:8888/health
# Should return {"status": "ok"}
```

**2. Verify Anna-Voice is running:**
On Windows, check if the Anna-Voice application is running in the system tray.

**3. WSL network access:**
If using WSL, ensure you can reach the Windows host:
```bash
# Find Windows host IP
cat /etc/resolv.conf | grep nameserver
# Test connectivity
curl http://<windows-ip>:8888/health
```

**4. Check voice configuration:**
```bash
/voice status
# Should show connection URL and enabled state
```

**5. Firewall rules:**
Ensure Windows Firewall allows incoming connections on port 8888 from WSL.

---

## MCP Server Issues

### Symptoms
- IDE integration not working (VS Code, Cursor, etc.)
- MCP tools not appearing in IDE
- Connection timeouts

### Solutions

**1. Check server status:**
```bash
curl http://localhost:3271/health
# Should return server health information
```

**2. Verify server is running:**
```bash
cd ~/.claude/SuperPAI/superpai-server
bun run start
```

**3. Check port availability:**
```bash
lsof -i :3271
# Verify no other process is using the port
```

**4. Review IDE MCP configuration:**
Ensure your IDE's MCP settings point to the correct server URL and transport mode (stdio vs HTTP).

**5. Restart the MCP server:**
```bash
cd ~/.claude/SuperPAI/superpai-server
bun run restart
```

---

## Database Issues

### Symptoms
- Memory not persisting across sessions
- Cost tracking not recording
- Session status not updating

### Solutions

**1. Check database file:**
```bash
ls -la ~/.claude/SuperPAI/superpai-server/data/superpai.db
# Should exist and have recent modification time
```

**2. Run migrations:**
```bash
cd ~/.claude/SuperPAI/superpai-server
bun run db:migrate
```

**3. Reset database (last resort):**
```bash
cd ~/.claude/SuperPAI/superpai-server
rm data/superpai.db
bun run db:migrate
bun run db:seed
```

> **Warning:** Resetting the database will delete all stored memory, cost data, and session history.

---

## Performance Issues

### Symptoms
- Slow response times
- High token usage for simple tasks
- Frequent timeouts

### Solutions

**1. Check hook profile:**
```bash
/profile
# If set to "full", switch to "standard" for better performance
/profile standard
```

**2. Review active skills:**
Too many skills loaded simultaneously can increase context size. Use `/skills active` to see what is loaded.

**3. Clear session memory:**
Large session memory can slow down responses:
```bash
/memory clear session
```

**4. Check cost by model:**
```bash
/cost model=genius
# If Opus is being used frequently, consider limiting it
```

---

## Getting Help

| Channel | Use For |
|---------|---------|
| `/health --verbose` | Detailed system diagnostics |
| `/logs tail` | Recent system log entries |
| `/version` | Verify installed version |
| [GitLab Issues](https://gitlab.anshinhealth.net/engineering/superpai/-/issues) | Bug reports and feature requests |
| Engineering Slack #superpai | Real-time support from the team |
| This documentation | Comprehensive guides and references |
