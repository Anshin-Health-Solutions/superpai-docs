---
title: "Anna-Voice Setup"
sidebar_label: "Anna-Voice Setup"
---

# Anna-Voice Setup

This guide covers how to install and configure Anna-Voice for use with SuperPAI+. Anna-Voice provides text-to-speech (TTS) and speech-to-text (STT) capabilities with 21 distinct voice personas.

---

## Independence Principle

Anna-Voice and SuperPAI+ are independent systems:

- **SuperPAI+ works without Anna-Voice** --- voice output is silently skipped
- **Anna-Voice works without SuperPAI+** --- it is a standalone TTS/STT application
- **When both are available** --- they integrate automatically via HTTP

This means you can install either one first, and integration happens when both are running.

---

## Connection URLs

| Scenario | URL | Notes |
|----------|-----|-------|
| Local (same machine) | `http://localhost:8888` | Default configuration |
| WSL to Windows host | `http://<windows-ip>:8888` | Use host IP from `/etc/resolv.conf` |
| Remote server | `https://voice.anshintech.net` | Requires HTTPS setup |

---

## Install Anna-Voice

### Step 1: Download

Download the latest release from [GitLab](https://gitlab.anshinhealth.net/engineering/anna-voice/-/releases).

### Step 2: Install on Windows

1. Run the installer (`anna-voice-setup.exe`)
2. Follow the installation wizard
3. Anna-Voice will appear in the system tray
4. Verify by opening a browser to `http://localhost:8888/health`

### Step 3: WSL Proxy Setup

If you run SuperPAI+ in WSL and Anna-Voice on Windows, you need the WSL proxy:

```bash
# Find your Windows host IP
cat /etc/resolv.conf | grep nameserver
# Example output: nameserver 172.31.80.1

# Test connectivity
curl http://172.31.80.1:8888/health

# Set environment variable
export SUPERPAI_VOICE_URL="http://172.31.80.1:8888"
```

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
export SUPERPAI_VOICE_URL="http://$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):8888"
```

---

## Configure in SuperPAI+

### Via Command

```bash
/config set voice.enabled true
/config set voice.url http://localhost:8888
/config set voice.default_voice marcus_webb
/voice status    # Verify connection
```

### Via Environment Variable

```bash
export SUPERPAI_VOICE_URL="http://localhost:8888"
export SUPERPAI_VOICE_ENABLED="true"
```

### Via Configuration File

```json
{
  "voice": {
    "enabled": true,
    "url": "http://localhost:8888",
    "default_voice": "marcus_webb",
    "speak_on_completion": true,
    "speak_on_error": true,
    "fire_and_forget": true
  }
}
```

---

## MCP Tools for Voice

| Tool | Purpose | Parameters |
|------|---------|------------|
| `anna_speak` | Send text to be spoken | `message`, `voice_id`, `title` |
| `anna_listen` | Activate microphone input | `duration`, `language` |
| `anna_dispatch` | Route to agent-specific voice | `agent`, `message` |

### Testing Voice

```bash
# From SuperPAI+
/speak "Hello, voice integration is working!"

# Direct HTTP test
curl -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from SuperPAI+", "voice_id": "marcus_webb", "title": "Test"}'
```

---

## Agent Voice Assignments

Each agent has a default voice. You can override assignments:

```json
{
  "agent_voices": {
    "Marcus": "marcus_webb",
    "Kira": "kira_chen",
    "Dev": "dev_patel",
    "Quinn": "quinn_murphy",
    "Sage": "sage_williams",
    "Sentry": "sentry_blake"
  }
}
```

See the [Available Voices](/anna-voice/voices) reference for the complete catalog of 21 voices.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Voice not working | Check Anna-Voice is running: `curl http://localhost:8888/health` |
| WSL cannot reach voice | Verify Windows host IP and firewall rules |
| Voice delayed | Ensure `fire_and_forget: true` in config |
| Wrong voice used | Check agent voice assignments |
| No microphone input | Check Windows audio permissions for Anna-Voice |

See the [Troubleshooting](/docs/user-guide/troubleshooting) guide for additional solutions.
