---
id: intro
title: Anna Voice Overview
sidebar_label: Overview
---

# Anna Voice

**Version 3.9.0** | Anshin Health | [GitLab Repository](https://gitlab.anshinhealth.net/engineering/anna-voice)

Anna Voice is an offline-first desktop voice assistant built entirely in Rust. It runs quietly in the Windows system tray and gives you hands-free control over any application on your screen — type by speaking, send commands to AI agents, and receive spoken feedback, all without your hands leaving the keyboard.

Anna Voice is designed to work **with any application** — Anshin Orchestrate, Claude Code, a browser, a terminal, a word processor, or a web form. It does not require a cloud subscription to function; the core speech engine runs entirely on your local machine.

---

## What Anna Voice Does

| Capability | Description |
|---|---|
| **Dictation** | Press a hotkey and speak — text appears in whatever window is focused |
| **Voice Commands** | Say "Hey Claude 1, fix the bug in line 42" — the command routes to the right agent |
| **Wake Word** | Say "Hey Anna" hands-free to trigger command mode without touching the keyboard |
| **Voice Feedback (TTS)** | Anna speaks responses and notifications aloud using a bundled offline voice |
| **LLM Enhancement** | Dictated text is silently improved for grammar, punctuation, and filler words |
| **Knowledge Search** | Query your local documents by voice using full-text search |
| **HTTP API** | External tools can trigger TTS, dispatch commands, and query status |
| **MCP Tools** | AI agents (Claude, SuperPAI+) can use Anna as a tool for voice I/O |

---

## Platform Support

| Platform | Support Level | Notes |
|---|---|---|
| **Windows 10 / 11** | ✅ Full | Installer provided. Global hotkeys, taskbar badge, autostart, system tray all native. |
| **Windows WSL2** | ✅ Supported | Run the Windows `.exe` from WSL2 — it controls the Windows desktop. |
| **macOS** | ✅ Supported | Build from source. Requires Accessibility permission for text injection. Autostart uses LaunchAgent. |
| **Linux (X11)** | ✅ Supported | Build from source. Requires X11 — Wayland users must run under XWayland. |

:::note WSL2 Users
Run `anna-voice.exe` (the Windows binary) from within WSL2, not a Linux build. This lets Anna control the Windows desktop, including injecting text into Windows applications like Orchestrate, browsers, and Office apps.
:::

---

## How Anna Voice Fits Into the Anshin Ecosystem

```
┌─────────────────────────────────────────────────────────┐
│                    Your Desktop                         │
│                                                         │
│  ┌─────────────────┐    voice commands    ┌──────────┐  │
│  │   Anna Voice    │ ──────────────────► │Orchestrate│  │
│  │  (system tray)  │                     │  (browser)│  │
│  └────────┬────────┘                     └──────────┘  │
│           │ text injection / TTS                        │
│           │                              ┌──────────┐  │
│           └─────────────────────────────►│Claude Code│  │
│                                          │(terminal) │  │
│                                          └──────────┘  │
└─────────────────────────────────────────────────────────┘
         │                    │
    SuperPAI+ server    HTTP API / MCP
    (WebSocket events)  (port 8891)
```

Anna Voice connects SuperPAI+ agents to the physical world of your desktop. When a SuperPAI+ agent finishes a long task, Anna speaks the result aloud. When you want to give an agent a new instruction without typing, you say it — Anna routes the command to the right pane or endpoint.

---

## Speech Recognition Engines

Anna Voice supports four STT engines with automatic fallback:

| Engine | Type | When to Use |
|---|---|---|
| **Sherpa-ONNX** *(default)* | Offline, streaming | Best accuracy and lowest latency. Bundled with installer — no download needed. |
| **Vosk Standard** | Offline, ~40 MB download | Lightweight legacy option. Falls back automatically if Sherpa is unavailable. |
| **Vosk HD** | Offline, ~1.8 GB download | Highest offline accuracy. Long download but no ongoing cost. |
| **Deepgram / Cloud STT** | Cloud API | Used for voice commands only when maximum accuracy is required. Requires API key. |

The installer detects which models you already have and only downloads what is missing.

---

## Voice Output (Text-to-Speech)

Anna Voice includes a bundled offline TTS voice — **Amy (US English)** — powered by the Sherpa-ONNX Piper engine. No internet connection is required for voice feedback. Amy speaks command results, error messages, and notifications.

For additional voices, a cloud TTS endpoint (OpenAI-compatible) can be configured in **Settings → Voice / TTS**.

---

## Key File Locations

| What | Windows | macOS | Linux |
|---|---|---|---|
| Settings | `%APPDATA%\AnnaVoice\settings.json` | `~/Library/Application Support/AnnaVoice/settings.json` | `~/.config/AnnaVoice/settings.json` |
| Corrections | `%APPDATA%\AnnaVoice\corrections.json` | `~/Library/Application Support/AnnaVoice/corrections.json` | `~/.config/AnnaVoice/corrections.json` |
| Models | `%LOCALAPPDATA%\AnnaVoice\models\` | `~/Library/Application Support/AnnaVoice/models/` | `~/.local/share/AnnaVoice/models/` |
| Log file | `%TEMP%\anna-voice.log` | `/tmp/anna-voice.log` | `/tmp/anna-voice.log` |
| Application | `C:\Program Files\Anshin\AnnaVoice\` | *(build from source)* | *(build from source)* |
