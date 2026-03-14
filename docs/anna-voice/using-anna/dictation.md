---
id: dictation
title: Dictation Mode
sidebar_label: Dictation
---

# Dictation Mode

Dictation mode transcribes your speech and types it directly into whatever window is currently focused — a browser, a terminal, Orchestrate's chat input, a word processor, or any other text field. It works with any application that accepts keyboard input.

## Basic Usage

1. **Click into the text field** where you want text to appear
2. **Press F9** (or your configured dictation hotkey) — the tray icon gets a red dot
3. **Speak** — words appear as you speak
4. **Press F9 again** to stop

There is no recording delay. The STT engine streams results in real time as you speak each phrase.

## What Happens to Your Speech

Anna Voice processes recognized text through several stages before typing it:

### Stage 1 — Noise Filtering

Single short words recognized in isolation (e.g., "the", "uh", "huh", "mm") are discarded before typing. This prevents common recognition noise artifacts from appearing in your text.

### Stage 2 — Corrections Dictionary

Every word is checked against your corrections dictionary (`%APPDATA%\AnnaVoice\corrections.json`). Matching words are replaced immediately. See [Settings → Training](../settings/training) for how to add corrections.

### Stage 3 — Capitalization

Text is automatically capitalized at sentence boundaries — after `.`, `!`, and `?`. This is rule-based and always active regardless of LLM settings.

### Stage 4 — LLM Enhancement (Optional)

If LLM enhancement is enabled (Settings → LLM), the phrase is simultaneously sent to the language model for grammar, punctuation, filler removal, and capitalization improvements. The raw text is typed immediately; if the LLM responds within the timeout (default 1 second), the typed text is replaced with the improved version.

### Stage 5 — Keyboard Injection

The final text is injected into the focused window using keyboard simulation (`enigo` crate). It types each character as if pressed on a real keyboard. This works with any application.

## Word Spacing

Each recognized phrase is followed by a space automatically, so words from consecutive phrases flow together naturally without you having to say "space".

## Visual Indicators While Dictating

| Indicator | Meaning |
|---|---|
| Tray icon — red dot | Dictation is active |
| Tray tooltip | `Anna Voice — RECORDING [F9]` |
| Tray menu | Dictation item has a checkmark |
| Taskbar badge (Windows) | Red overlay dot on the taskbar button |

## Stopping Dictation

Press **F9** again to stop. There is a 500ms debounce — pressing rapidly twice stops then immediately restarts. Wait a half-second between presses if you want to stop cleanly.

## Tips for Best Results

| Tip | Effect |
|---|---|
| Speak in complete sentences | Context improves accuracy significantly |
| Pause briefly between sentences | Helps the engine segment phrases correctly |
| Use a USB headset | Eliminates background noise |
| Add corrections for recurring mistakes | Use Settings → Training |
| Enable auto-scan vocabulary | Settings → Vocabulary — recognizes your code identifiers |
| Use a larger model tier | Settings → Audio/STT → Model tier → medium or large |

## Dictation in WSL2

From a WSL2 terminal, run the Windows `anna-voice.exe` binary. Dictation injects text into the Windows foreground window — this includes any Windows application: Orchestrate in a browser, a Windows terminal, Office apps, etc.

The WSL2 terminal itself (if it's a Windows terminal like Windows Terminal) also accepts injected text.

## macOS Notes

On macOS, first-time use triggers an Accessibility permission prompt:

> *"AnnaVoice" would like to control this computer.*

Grant this permission in **System Preferences → Privacy & Security → Accessibility**. Without it, keyboard injection fails silently and no text appears.
