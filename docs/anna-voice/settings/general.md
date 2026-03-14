---
id: general
title: Settings — General
sidebar_label: General
---

# Settings — General

Open Settings from the tray menu: right-click the shield icon → **Settings...**

The **General** tab controls the HTTP API port, logging, startup behavior, and maintenance actions.

![General settings tab showing HTTP API Port 8891, Launch at Windows startup checkbox, Data Directory path, Logging section with Info level and 1024 KB max size, and Maintenance section](/img/anna-voice/settings-general.jpg)

## HTTP API

| Setting | Default | Description |
|---|---|---|
| **HTTP API Port** | `8891` | The port Anna Voice listens on for local API calls. Change only if another service conflicts. **Restart required.** |

The API is bound to `127.0.0.1` (localhost only) and is not accessible from other machines on the network.

## Logging

| Setting | Default | Description |
|---|---|---|
| **Level** | `Info` | Minimum severity to write to the log. `Info` for normal use; `Debug` for troubleshooting. Options: `Error`, `Warn`, `Info`, `Debug`. |
| **Max Size** | `1024 KB` | The log file is rotated when it reaches this size. |

Log file location: `%APPDATA%\AnnaVoice\anna-voice.log`

Open the log directly from the tray: right-click → **View Log**.

## Startup & Shortcuts

| Setting | Default | Description |
|---|---|---|
| **Start automatically with Windows** | ✅ | Registers Anna Voice in `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`. Uncheck to disable autostart. |
| **Create desktop shortcut** | ✅ | Adds a shortcut to your desktop. Uncheck to remove it. |
| **Install Claude Code voice plugin** | ✅ | Installs the Anna Voice plugin to your Claude Code configuration, adding `/voice`, `/listen`, and `/anna` commands. |

## Data Directory

Shows your user config directory: `%APPDATA%\AnnaVoice\`

Click **Open Folder** to open it in File Explorer. This is where your `settings.json`, `corrections.json`, and `registry.json` live.

## Saving Changes

Click **Save** to apply. Changes to the HTTP port require a restart. All other General settings take effect immediately.
