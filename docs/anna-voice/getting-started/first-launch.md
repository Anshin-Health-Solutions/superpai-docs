---
id: first-launch
title: First Launch
sidebar_label: First Launch
---

# First Launch

When Anna Voice starts for the first time, it performs a short startup sequence before becoming ready.

## What Happens at Startup

1. **Single-instance check** — Anna Voice creates a lock file at `%TEMP%\anna-voice.lock`. If another instance is already running, the new launch exits silently.
2. **Configuration copy** — Your personal `settings.json` is copied from the install directory to `%APPDATA%\AnnaVoice\` if it does not already exist. All your settings live here — no admin rights needed to change them.
3. **Model loading** — The speech recognition model loads in the background. The tray icon appears within 2 seconds; model loading continues behind the scenes.
4. **HTTP API starts** — The local API server starts on port `8891` (default).
5. **Tray icon appears** — The Anshin shield icon appears in the system notification area.

The whole sequence takes 2–10 seconds depending on your machine and which model you installed.

## The Tray Icon

Anna Voice lives entirely in the Windows system tray (notification area, bottom-right of your taskbar).

**Hover over the tray** to see the tooltip — it shows the current mode and your configured hotkeys:

```
Anna Voice — Idle [F9/F10]
```

**Left-click** the tray icon to quickly toggle dictation mode on and off.

**Right-click** the tray icon for the full context menu:

![Tray context menu showing Dictation F9 checked, Voice Command F10, Wake Word checked, Settings..., View Log, Quit](/img/anna-voice/tray-menu.png)

| Menu Item | Action |
|---|---|
| **Dictation (F9)** | Toggle dictation mode. A checkmark shows when active. |
| **Voice Command (F10)** | Toggle command mode. A checkmark shows when active. |
| **Wake Word** | Toggle continuous wake word listening. A checkmark shows when active. |
| **Settings...** | Open the Settings window |
| **View Log** | Open `%TEMP%\anna-voice.log` in your default text editor |
| **Quit** | Exit Anna Voice completely |

The menu labels update dynamically to show your currently configured hotkey bindings.

## Tray Icon States

The shield icon changes appearance to show the current state:

![Tray thumbnail showing Anna Voice with a blue dot indicator — wake word listening mode](/img/anna-voice/tray-states.png)

| Indicator | State |
|---|---|
| Shield, no dot | Idle — ready but not actively listening |
| Shield + **red dot** | Dictation active — speaking text to focused window |
| Shield + **blue dot** | Wake word listening — monitoring for "Hey Anna" |
| Shield + **red dot** (command mode) | Command mode active — listening for a command to dispatch |

![Tray icon showing red dot indicating active recording](/img/anna-voice/tray-recording.jpg)

## Verifying the HTTP API

Anna Voice is working correctly if the health endpoint responds:

```bash
curl http://127.0.0.1:8891/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "3.9.0",
  "uptime_secs": 12,
  "dictating": false,
  "commanding": false
}
```

If this request times out, check the log file (**View Log** from the tray menu) for startup errors.

## Autostart Verification

If you enabled "Start automatically with Windows" during installation, Anna Voice will launch each time you log in. To verify:

1. Open Task Manager → Startup apps
2. Look for **Anna Voice** — it should show as **Enabled**

To disable autostart without uninstalling: uncheck "Start at Windows login" in **Settings → General**, then click Save.
