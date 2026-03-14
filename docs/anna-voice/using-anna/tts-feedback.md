---
id: tts-feedback
title: TTS Feedback
sidebar_label: TTS Feedback
---

# TTS Feedback

Anna Voice can speak responses and notifications aloud through your system speakers. This "TTS feedback" loop closes the voice interaction cycle: you speak a command, and Anna speaks the answer back to you — no screen required.

## When Anna Speaks

Anna Voice produces audio output in these situations:

| Trigger | What Anna says |
|---|---|
| **Wake word detected** | A greeting: *"What can I do for you, Bryan?"* |
| **Command dispatched successfully (HTTP)** | The `message`, `reply`, `response`, `text`, or `answer` field from the JSON response (up to 500 characters) |
| **Command dispatched successfully (no body)** | *"Sent to [target]"* |
| **Target not found** | *"Target [name] not found"* |
| **Intent not recognized** | *"I heard: [transcript]. But I don't know what to do with that."* |
| **Dispatch failed** | *"Failed: [error message]"* |
| **TTS Test button in Settings** | *"Hello, I am Anna. TTS is working correctly."* (or similar) |
| **POST /notify** | Any text you send via the HTTP API |

## TTS Engines

Anna Voice tries TTS engines in order until one succeeds:

| Tier | Engine | When used |
|---|---|---|
| **Built-in (offline)** | Piper VITS — Amy (US English female) | Always available; fastest; no internet needed |
| **Cloud TTS** | Your configured cloud endpoint | When enabled in Settings → Voice / TTS |
| **HTTP relay** | A relay URL that accepts text and returns audio | Advanced/custom setups |

See [Settings → Voice / TTS](../settings/voice-tts) for how to configure TTS engines and voice selection.

## Sending a Notification via API

Any application — scripts, agents, Orchestrate automations — can make Anna speak by calling the HTTP API:

```bash
POST http://127.0.0.1:8891/notify
Content-Type: application/json

{"text": "Deployment to dev completed successfully."}
```

Response:
```json
{"ok": true, "message": "Spoken"}
```

This is how SuperPAI+ agents and Orchestrate use Anna as an audio output channel.

## Sending Voice Commands via API

```bash
POST http://127.0.0.1:8891/dispatch/voice
Content-Type: application/json

{"text": "Hey Claude 1, run the build"}
```

Anna parses the intent, dispatches to the target, and speaks the reply — all programmatically. Useful for automations that need to relay voice commands from one system to another.

## MCP: anna_speak Tool

When Anna Voice is configured as an MCP server, Claude and other MCP-compatible agents can invoke the `anna_speak` tool directly:

```json
{
  "name": "anna_speak",
  "arguments": {
    "text": "I've finished reviewing the pull request."
  }
}
```

The tool returns:
```json
{
  "success": true,
  "result": { "spoken": "I've finished reviewing the pull request.", "tier": "local" }
}
```

The `tier` field indicates which TTS engine was used (`local`, `cloud`, or `relay`).

## Disabling TTS Feedback

To turn off all audio output from Anna Voice:

1. Open **Settings → Voice / TTS**
2. Toggle **Enable TTS** off
3. Click **Save**

When TTS is disabled, the `/notify` endpoint and MCP `anna_speak` tool will return an error (`"TTS is disabled in configuration"`), and command mode will operate silently.

## Adjusting Volume and Voice

TTS audio plays through your default system audio device. Volume is controlled at the OS level — there is no per-application volume slider in Anna Voice.

To change the voice or accent, see [Settings → Voice / TTS](../settings/voice-tts). The built-in Amy voice (US English female) is always available offline. Additional voices can be configured via cloud TTS endpoints.
