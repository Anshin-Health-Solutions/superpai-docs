---
id: wake-word
title: Wake Word
sidebar_label: Wake Word
---

# Wake Word

The wake word feature lets you activate Anna Voice hands-free — without pressing any key. Anna continuously listens in the background for a trigger phrase. When she hears it, she responds with a greeting and enters command mode automatically.

## How It Works

```
Continuous listening → Wake phrase detected → Greeting (TTS) → Command mode active → Timeout or manual stop
```

Anna monitors the partial transcripts from the STT engine in real time. When a configured wake phrase appears in the audio stream, she:

1. Speaks a greeting (e.g., *"What can I do for you, Bryan?"*)
2. Activates command mode (microphone stays open)
3. Waits up to the configured timeout for a follow-up command
4. If a command is spoken, processes it through the intent → dispatch → TTS pipeline
5. Returns to idle listening mode

## Default Wake Phrases

| Phrase | Activates / targets |
|---|---|
| `hey anna` | Anna herself |
| `hey claude` | Claude target |
| `hey coordinator` | Coordinator target |

These are configurable in [Settings → Wake Words](../settings/wake-words). You can add any phrase and target name.

## Greetings

When the wake phrase is detected, Anna speaks a greeting from a rotating pool:

- *"What can I do for you, Bryan?"*
- *"How can I help, Bryan?"*
- *"I'm listening, Bryan."*
- *"Go ahead, Bryan."*
- *"Ready when you are, Bryan."*
- *"What's on your mind, Bryan?"*

Greetings cycle deterministically so you hear a different one each time. The name is taken from the **User Name** field in [Settings → Wake Words](../settings/wake-words).

## Command Timeout

After the wake phrase, command mode stays open for a configurable duration (default: **5 seconds**). If no follow-up speech is detected within that window, Anna returns to passive listening.

If you speak before the timeout, the full command pipeline runs and Anna responds.

You can also press **F10** to manually exit command mode at any time.

## Enabling Wake Words

1. Open Settings → Wake Words
2. Toggle **Enable Wake Words** on
3. Set your **User Name** (used in the greeting)
4. Review or add phrases in the **Wake Phrases** list
5. Click **Save**

See [Settings → Wake Words](../settings/wake-words) for full configuration options.

## Comparing Wake Word vs. F10

| | Wake Word | F10 |
|---|---|---|
| **Hands free** | ✅ Yes | ❌ Requires keypress |
| **Always on** | ✅ Passively monitors | ❌ Manual toggle |
| **CPU overhead** | Small (continuous STT) | Minimal (off when idle) |
| **Greeting spoken** | ✅ Yes | ❌ No |
| **Timeout** | Configurable (default 5s) | Manual stop (F10 again) |
| **Best for** | Hands-busy workflows, clinicians | Power users, quiet environments |

## Platform Notes

Wake word detection works on Windows, macOS, and Linux wherever the STT engine is running. On macOS, the **Accessibility permission** must be granted for keyboard injection to work after a detected command.

On WSL2, the Windows `anna-voice.exe` binary handles audio capture and wake detection from the Windows side — the WSL2 terminal itself does not need any special configuration.

## Tips

| Tip | Effect |
|---|---|
| Use a USB headset | Eliminates ambient noise that can trigger false positives |
| Add your name to the vocabulary | Helps the STT recognize your user name in commands |
| Shorten the timeout if false triggers are a problem | Settings → Wake Words → Command Timeout |
| Disable wake words in noisy environments | Toggle off when you don't need hands-free operation |
