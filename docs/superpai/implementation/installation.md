---
title: "Installing SuperPAI+"
sidebar_label: "Installation"
---

# Installing SuperPAI+

This guide walks through the complete installation process for SuperPAI+ on all supported platforms.

---

## Prerequisites

| Requirement | Minimum Version | How to Check | Install Command |
|-------------|----------------|--------------|-----------------|
| Claude Code CLI | Latest | `claude --version` | `npm install -g @anthropic-ai/claude-code` |
| Node.js | 20+ | `node --version` | See [nodejs.org](https://nodejs.org) |
| Bun | 1.0+ | `bun --version` | `curl -fsSL https://bun.sh/install \| bash` |
| Git | 2.30+ | `git --version` | `apt install git` or `brew install git` |
| Anthropic API Key | N/A | Set in env | `export ANTHROPIC_API_KEY=sk-ant-...` |

---

## Step 1: Install Prerequisites

### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and Git
brew install node git

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

### Ubuntu / Debian / WSL

```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

### Windows (Native)

```powershell
# Install Node.js from https://nodejs.org (LTS)
# Install Git from https://git-scm.com

# Install Bun
powershell -c "irm bun.sh/install.ps1 | iex"

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

---

## Step 2: Clone the Repository

```bash
git clone https://gitlab.anshinhealth.net/engineering/superpai.git ~/.claude/SuperPAI
```

---

## Step 3: Run the Installer

```bash
cd ~/.claude/SuperPAI
bash install.sh
```

### What the Installer Does

1. Validates all prerequisites are installed and at correct versions
2. Installs superpai-server dependencies (`bun install`)
3. Runs database migrations (`bun run db:migrate`)
4. Seeds the database with default data (`bun run db:seed`)
5. Registers the plugin with Claude Code
6. Creates default configuration files
7. Runs a health check to verify the installation

### Installer Output

```
SuperPAI+ Installer v3.7.0
===========================
Checking prerequisites...
  Node.js 20.11.0    [OK]
  Bun 1.1.38         [OK]
  Git 2.43.0         [OK]
  Claude Code 1.2.0  [OK]

Installing server dependencies...
  bun install        [OK]

Running database migrations...
  Migration 001      [OK]
  Migration 002      [OK]
  ...
  Migration 011      [OK]

Seeding database...
  Default settings   [OK]

Registering plugin...
  Plugin registered  [OK]

Health check...
  Plugin:   OK
  Server:   OK
  Database: OK

SuperPAI+ v3.7.0 installed successfully!
Restart Claude Code to activate.
```

---

## Step 4: Restart Claude Code

Close all Claude Code terminals and reopen. The plugin loads automatically on startup.

---

## Step 5: Verify Installation

```bash
/health
```

Expected output:

```
SuperPAI+ Health Check
======================
Plugin:       OK (v3.7.0)
Server:       OK (http://localhost:3271)
Database:     OK (11 tables, 0 pending migrations)
Voice:        UNAVAILABLE (optional)
Memory:       OK (0 entries)
Session:      WSL1 (standard profile)
```

```bash
/version
```

Expected output:

```
SuperPAI+ v3.7.0 (GSD Release)
Server:  v3.7.0
Build:   2026-03-01
```

---

## Platform-Specific Notes

| Platform | Notes |
|----------|-------|
| **macOS (Apple Silicon)** | Bun has native ARM64 support; no special configuration needed |
| **macOS (Intel)** | Fully supported with x86_64 Bun binary |
| **Ubuntu 22.04+** | Recommended Linux platform; tested extensively |
| **WSL2 (Windows)** | Recommended for Windows users; use Ubuntu 22.04 distro |
| **Windows Native** | Supported but WSL2 is recommended for best experience |
| **Docker** | Not recommended for development use; use for server deployment only |

---

## Post-Installation

### Optional: Set Up Anna-Voice

If you want voice integration, install Anna-Voice separately. See the [Anna-Voice Setup](/superpai/implementation/anna-voice) guide.

### Optional: Configure Remote Server

For team environments, deploy the superpai-server to a shared machine. See the [Remote Server](/superpai/implementation/remote-server) guide.

### Optional: Configure IDE Integration

Connect your IDE to SuperPAI+ via MCP. See the [IDE Integration](/superpai/ide-integration/overview) guide.
