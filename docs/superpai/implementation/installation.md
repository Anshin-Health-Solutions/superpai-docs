---
title: "Installing SuperPAI+"
sidebar_label: "Installation"
---

# Installing SuperPAI+

SuperPAI+ v4.8.0 supports two installation methods: the **GUI Installer** (recommended for Windows) and **manual installation** (macOS, Linux, WSL).

---

## Method 1: GUI Installer (Windows — Recommended)

### Prerequisites

| Requirement | How to Obtain |
|-------------|--------------|
| Windows 10/11 (64-bit) | — |
| Claude Code CLI | `npm install -g @anthropic-ai/claude-code` |
| Anthropic API Key | [console.anthropic.com](https://console.anthropic.com) |
| SuperPAI+ License Key | Provided by Anshin Technology Solutions |

### Installation Steps

1. **Download** the installer from your license portal
2. **Run** `SuperPAI-v4.8.0-setup.exe` as Administrator
3. **Enter** your license key when prompted
4. **Follow** the setup wizard — prerequisites are checked and installed automatically
5. **Restart** Claude Code when the installer completes

### What the Installer Configures

- Installs Bun runtime (if not present)
- Sets up the local SuperPAI+ server and SQLite database
- Registers the plugin with Claude Code (`~/.claude/`)
- Creates the settings configuration
- Runs a health check to verify everything works

### Verify Installation

Open a Claude Code terminal and run:

```
/health
/version
```

Expected output for `/version`:
```
SuperPAI+ v4.8.0
Server:  v4.8.0
Build:   2026-03
```

---

## Method 2: Manual Installation (macOS / Linux / WSL)

### Prerequisites

| Requirement | Minimum Version | Install |
|-------------|----------------|---------|
| Claude Code CLI | Latest | `npm install -g @anthropic-ai/claude-code` |
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| Bun | 1.0+ | `curl -fsSL https://bun.sh/install \| bash` |
| Git | 2.30+ | `apt install git` or `brew install git` |
| Anthropic API Key | N/A | Set `ANTHROPIC_API_KEY` in your shell |

### Install Steps

```bash
# 1. Clone the plugin (requires license access)
git clone https://github.com/Anshin-Health-Solutions/superpai.git ~/.claude/SuperPAI

# 2. Run the installer script
cd ~/.claude/SuperPAI
bash install.sh

# 3. Restart Claude Code
# Close all terminals and reopen

# 4. Verify
/health
/version
```

### macOS-specific

```bash
brew install node git
curl -fsSL https://bun.sh/install | bash
npm install -g @anthropic-ai/claude-code
```

### Ubuntu/Debian/WSL

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
npm install -g @anthropic-ai/claude-code
```

---

## Post-Installation

### Verify with Health Check

```
/health
```

Expected output:
```
SuperPAI+ Health Check
======================
Plugin:    OK (v4.8.0)
Server:    OK (http://localhost:3271)
Database:  OK (SQLite T1)
Memory:    OK
Session:   WIN1 (or WSL1, standard profile)
```

### Optional: Remote Server (Team Deployment)

For team environments, deploy the superpai-server to shared infrastructure.
See the [Remote Server](/docs/implementation/remote-server) guide.

### Optional: IDE Integration

Connect your IDE via MCP. See the [IDE Integration](/docs/ide-integration/overview) guide.

---

## Platform Support

| Platform | Support Level | Notes |
|----------|--------------|-------|
| Windows 10/11 (Native) | Full | GUI installer available |
| WSL2 (Ubuntu 22.04+) | Full | Recommended for CLI users |
| macOS (Apple Silicon) | Full | Native ARM64 |
| macOS (Intel) | Full | x86_64 |
| Ubuntu 22.04+ | Full | Tested |
| Docker | Server only | Dev use not recommended |
