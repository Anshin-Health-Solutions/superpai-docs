---
id: system-tray
title: System Tray Reference
sidebar_label: System Tray
---

# System Tray Reference

## Full Tray Menu

Right-clicking the Anna Voice shield icon in the system tray opens the context menu:

![Full tray menu shown in taskbar context: Dictation F9 checked, Voice Command F10, Wake Word checked, Settings..., View Log, Quit with date/time visible](/img/anna-voice/tray-menu-full.jpg)

## Taskbar Pinning

Anna Voice can be pinned to the Windows taskbar for quick access. Right-clicking the taskbar button gives standard Windows options:

- **Anna Voice** — brings the application to focus (opens Settings if no window is open)
- **Unpin from taskbar** — removes the taskbar pin
- **Close window** — closes any open Settings window

The shield icon in the taskbar also shows a colored badge overlay when active (red for recording, blue for wake word).

## Controlling Anna Voice Without the Tray

Anna Voice can also be controlled entirely via the [HTTP API](../integrations/http-api) on `http://127.0.0.1:8891`. This is useful for scripting, automation, and integrating with tools that need to check or change Anna's state programmatically.

For example, to check the current mode from a script:

```bash
curl -s http://127.0.0.1:8891/status
# {"dictating":false,"commanding":false,"mode":"idle"}
```
