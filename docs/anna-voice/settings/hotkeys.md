---
id: hotkeys
title: Settings — Hotkeys
sidebar_label: Hotkeys
---

# Settings — Hotkeys

The **Hotkeys** tab configures the global keyboard shortcuts that toggle dictation and command mode from anywhere on your desktop, regardless of which application is in focus.

![Hotkeys settings tab showing Dictation Toggle F9 and Command Mode Toggle F10 with Record and Reset buttons](/img/anna-voice/settings-hotkeys.jpg)

## Bindings

| Setting | Default | Description |
|---|---|---|
| **Dictation Toggle** | `F9` | Press to start speaking text into the focused window. Press again to stop. |
| **Command Mode Toggle** | `F10` | Press to speak a voice command for dispatch. Press again to stop. |

Both keys are global — they work even when Anna Voice is not the active window.

## Changing a Hotkey

1. Click the field next to **Dictation Toggle** or **Command Mode Toggle**
2. Press the key combination you want (e.g., `Ctrl+Shift+D`, `Alt+F9`)
3. The field updates to show the captured binding
4. Click **Save**
5. **Restart Anna Voice** — hotkey changes require a restart to take effect

## Supported Key Formats

| Format | Example |
|---|---|
| Single function key | `F9`, `F10`, `F11` |
| Modifier + function key | `Ctrl+F9`, `Alt+F10` |
| Modifier + letter | `Ctrl+Shift+D`, `Alt+Shift+V` |
| Multiple modifiers | `Ctrl+Alt+F10` |

**Modifiers:** `Ctrl`, `Alt`, `Shift` (combinable with `+`)

## Conflict Handling

If a hotkey is already claimed by another application, Anna Voice logs a warning at startup and continues without that binding:

```
[WARN] Could not register hotkey F9 — already in use
```

If this happens, change the binding in Settings → Hotkeys to something not claimed by your other applications.

If an invalid key string is saved to `settings.json`, Anna Voice falls back to the default (`F9`/`F10`) and logs a warning.

## 500ms Debounce

A 500ms debounce prevents accidental double-toggles if you tap the key quickly. This is fixed and cannot be configured.
