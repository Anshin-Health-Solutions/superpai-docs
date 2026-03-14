---
id: your-first-dictation
title: Your First Dictation
sidebar_label: Your First Dictation
---

# Your First Dictation

This page walks you through dictating text for the first time and verifying that everything is working.

## Before You Begin

- Anna Voice must be running (Anshin shield in the system tray)
- Your microphone must be connected and working in Windows
- Click into any text field — a browser address bar, Notepad, an email, Orchestrate's chat input, anywhere you can type

## Try It Now

1. Click into a text field where you want to type
2. Press **F9** — the tray icon gets a **red dot**, and the tooltip changes to `RECORDING [F9]`
3. Speak a sentence: *"This is a test of Anna Voice dictation"*
4. Pause briefly — you'll see words appearing in the text field as you speak
5. Press **F9** again to stop — the red dot disappears

If text appeared in your text field, dictation is working.

## What to Expect

- Words appear **as you speak** — there's no waiting until you're done
- A brief pause in speech naturally ends a phrase and triggers typing
- If LLM enhancement is enabled (Settings → LLM), grammar and punctuation are improved silently in the background within about 1 second
- The text injected uses keyboard simulation — it will type into whatever window is currently focused, just like pressing keys

## If Text Doesn't Appear

**Check the tray icon** — the red dot must be present while you're speaking. If it's not, the hotkey isn't registered.

**Check the log file** — right-click the tray → **View Log**. Look for lines like:
```
[INFO] STT engine: Sherpa-ONNX (small)
[INFO] Model loaded in 1.2s
[INFO] Audio capture started
```

If you see errors about missing models or DLLs, see [Troubleshooting](../troubleshooting).

**Try a different microphone** — open **Settings → Audio / STT** and select your microphone from the dropdown.

## Tips for Good Results

| Tip | Why It Helps |
|---|---|
| Speak in complete sentences | The STT engine uses context — full sentences give better accuracy than single words |
| Use a USB headset | Eliminates background noise and analog interference |
| Pause slightly between sentences | Helps the engine segment phrases correctly |
| Add corrections for recurring mistakes | Use **Settings → Training** to fix persistent misrecognitions |
| Enable vocabulary auto-scan | **Settings → Vocabulary** — improves recognition of code identifiers and technical terms |

## Next Steps

- [Dictation Mode (detailed) →](../using-anna/dictation) — Filtering, LLM enhancement, and accuracy tips
- [Voice Commands →](../using-anna/voice-commands) — Control apps by name using F10
- [Settings → Audio / STT →](../settings/audio-stt) — Change your microphone and STT engine
