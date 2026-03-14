---
id: wake-words
title: Settings — Wake Words
sidebar_label: Wake Words
---

# Settings — Wake Words

The **Wake Words** tab configures hands-free activation. When wake word detection is enabled, Anna Voice continuously listens in the background. When you say a trigger phrase, it automatically enters command mode without you pressing any hotkey.

![Wake Words settings tab showing Enable Wake Word Detection toggle, User Name set to Bryan, Command Timeout 5 seconds, Wake Phrases list with hey anna, hey claude, hey coordinator each with X delete buttons, and New phrase field with Add button](/img/anna-voice/settings-wake-words.jpg)

## Settings

| Setting | Default | Description |
|---|---|---|
| **Enable Wake Word Detection** | ❌ Disabled | Master toggle. Enable to allow hands-free activation. |
| **User Name** | `there` | Your name, used in greeting responses when a wake word is detected. For example, if set to "Bryan", Anna may respond "Good morning, Bryan." |
| **Command Timeout** | `5` seconds | After a wake word is detected, Anna Voice waits this long for your command. If you don't speak within the timeout, command mode cancels automatically. |

## Wake Phrases

The default trigger phrases are:

- `hey anna`
- `hey claude`
- `hey coordinator`

These are matched case-insensitively against real-time partial transcripts from the STT engine. You can add or remove phrases in the **Wake Phrases** list within Settings → Wake Words.

Keep phrases distinct and natural-sounding. Short, two-word phrases like "hey anna" work best — longer phrases reduce the chance of accidental triggers but require more precise pronunciation.

## How Wake Word Detection Works

1. When enabled, the STT engine runs continuously at low priority in the background
2. Partial transcripts (words recognized so far) are checked against your wake phrase list every few hundred milliseconds
3. On a match, command mode activates automatically — the same as pressing F10
4. Anna Voice may speak a brief greeting (e.g., "Yes, Bryan?")
5. You speak your command
6. After the command timeout expires with no further speech, or you finish speaking, the transcript is dispatched
7. Wake word listening resumes

## Toggling from the Tray

Wake word detection can be toggled without opening Settings:

Right-click tray icon → **Wake Word** (checkmark shows when active)

## Performance Note

Wake word listening uses the same STT engine as dictation. On machines with limited RAM, enabling wake words continuously keeps the engine loaded and always consuming memory. On typical modern machines (8 GB+ RAM) the impact is negligible.
