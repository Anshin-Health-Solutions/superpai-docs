---
id: requirements
title: System Requirements
sidebar_label: System Requirements
---

# System Requirements

## Windows (Installer — Recommended)

| Requirement | Minimum | Recommended |
|---|---|---|
| **OS** | Windows 10 (64-bit) | Windows 11 |
| **RAM** | 200 MB free | 800 MB free (if using Vosk HD model) |
| **Disk** | 250 MB free | 2.5 GB free (for all models) |
| **Microphone** | Any Windows-recognized input device | USB headset (best signal quality) |
| **Audio drivers** | Windows default (WASAPI) | — |
| **Administrator rights** | Required for initial install only | — |

The **Sherpa-ONNX engine** (the default) is bundled in the installer and requires no additional download. Speech recognition begins working immediately after installation completes.

### Optional: Additional Models

| Model | Download Size | Use Case |
|---|---|---|
| Vosk Standard | ~40 MB | Lightweight fallback; legacy compatibility |
| Vosk HD | ~1.8 GB | Highest offline accuracy when Sherpa is unavailable |
| Cloud STT (Deepgram) | No download | Maximum accuracy for commands; requires API key |

---

## macOS

| Requirement | Details |
|---|---|
| **OS** | macOS 12 Monterey or later |
| **Build tools** | Xcode Command Line Tools, Rust toolchain (`rustup`) |
| **Permission** | Accessibility permission (required for keyboard text injection — macOS prompts on first use) |
| **Audio** | Any Core Audio input device |

Build from source:
```bash
git clone https://gitlab.anshinhealth.net/engineering/anna-voice
cd anna-voice
cargo build --release
```

Autostart on macOS uses a LaunchAgent plist (`~/Library/LaunchAgents/com.annavoice.plist`), created automatically when you enable "Start at login" in Settings → General.

---

## Linux (X11)

| Requirement | Details |
|---|---|
| **Display server** | X11 (Wayland: run under XWayland) |
| **OS** | Ubuntu 22.04+ / Debian 12+ / Fedora 38+ or equivalent |
| **Build tools** | Rust toolchain, `pkg-config`, system libraries below |
| **System libraries** | `libasound2-dev`, `libx11-dev`, `libxcursor-dev`, `libxrandr-dev`, `libxi-dev`, `libgl1-mesa-dev`, `libgtk-3-dev`, `libappindicator3-dev` |

Install build dependencies on Ubuntu/Debian:
```bash
sudo apt install libasound2-dev libx11-dev libxcursor-dev libxrandr-dev \
  libxi-dev libgl1-mesa-dev libgtk-3-dev libappindicator3-dev pkg-config
```

Build:
```bash
cargo build --release
```

Autostart on Linux uses an XDG Autostart `.desktop` file (`~/.config/autostart/AnnaVoice.desktop`).

:::note Wayland
Global hotkeys and keyboard text injection require X11. Wayland users must launch their desktop session with XWayland support enabled (`WAYLAND_DISPLAY` unset, or use `Xwayland`).
:::

---

## WSL2

No separate install is needed. Install Anna Voice using the **Windows installer**, then launch `anna-voice.exe` from within your WSL2 terminal:

```bash
# From WSL2 bash — launches the Windows binary controlling the Windows desktop
/mnt/c/Program\ Files/Anshin/AnnaVoice/anna-voice.exe &
```

The Windows binary controls Windows applications (Orchestrate, browsers, terminals) directly. Text injection and hotkeys work exactly as on a native Windows session.
