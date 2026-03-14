---
id: voice-tts
title: Settings — Voice / TTS
sidebar_label: Voice / TTS
---

# Settings — Voice / TTS

The **Voice / TTS** tab configures text-to-speech output — how Anna Voice speaks command results, notifications, and responses aloud.

![Voice TTS settings tab showing Enable Text-to-Speech toggle, Active backend in green showing Local Sherpa-ONNX with model path, collapsed Local TTS, Cloud TTS, and HTTP Relay sections, Voice dropdown, Available Voices list, and Test Voice button](/img/anna-voice/settings-voice-tts.jpg)

## Enable Text-to-Speech

| Setting | Default | Description |
|---|---|---|
| **Enable Text-to-Speech** | ✅ Enabled | Master toggle. When disabled, Anna Voice never speaks — all feedback is silent. The `/notify` API and `anna_speak` MCP tool return an error when TTS is disabled. |

The **Active backend** line (shown in green) confirms which TTS engine and model file is currently in use.

## TTS Backends

Three backends are tried in priority order. Anna Voice uses the first one that succeeds.

### 1 — Local TTS (Sherpa-ONNX / Piper) — Recommended

Runs entirely offline using a local ONNX model. Highest priority. No internet connection required.

![Voice TTS showing Cloud TTS section expanded with API URL https://api.openai.com, API key field, and Model tts-1](/img/anna-voice/settings-voice-tts-cloud.jpg)

| Detail | Value |
|---|---|
| **Model path** | `%LOCALAPPDATA%\AnnaVoice\models\tts\` |
| **Internet required** | No |
| **Latency** | Very low — local processing |

The model path field shows the directory containing the `.onnx` model file. If TTS has never worked on a previous installation, run **Repair** from the installer to re-download the correct Sherpa-compatible model.

### 2 — Cloud TTS (OpenAI-compatible API)

Uses an external API endpoint implementing the OpenAI `/v1/audio/speech` format.

| Setting | Default | Description |
|---|---|---|
| **API URL** | `https://api.openai.com` | Base URL of the OpenAI-compatible TTS API |
| **API key** | *(blank)* | Required for cloud TTS providers |
| **Model** | `tts-1` | The TTS model to request (e.g., `tts-1`, `tts-1-hd`) |

### 3 — HTTP Relay (Legacy External Server)

![Voice TTS showing HTTP Relay section expanded with Server URL field showing disabled — leave blank](/img/anna-voice/settings-voice-tts-relay.jpg)

Lowest priority fallback. Sends text to an external TTS HTTP server.

| Setting | Default | Description |
|---|---|---|
| **Server URL** | *(blank — disabled)* | Leave blank to disable. Provide a URL to enable the relay. |

## Voice Selection

![Voice TTS showing Voice dropdown open with US Female options: Bella, Nova, Sarah, Nicole, Sky, Heart listed](/img/anna-voice/settings-voice-tts-voice-dropdown.jpg)

The **Voice** dropdown selects from all available Kokoro voices included in the model catalog.

### Available Voices

![Voice TTS showing Available Voices expanded listing US Female af_bella af_nova af_sarah af_nicole af_sky af_heart af_river, US Male am_adam am_michael am_eric am_liam am_fenrir am_puck, UK Female bf_alice bf_emma bf_lily bf_isabella, UK Male bm_daniel bm_george bm_lewis bm_fable](/img/anna-voice/settings-voice-tts-voices.jpg)

| Category | Voice IDs |
|---|---|
| **US Female** | `af_bella`, `af_nova`, `af_sarah`, `af_nicole`, `af_sky`, `af_heart`, `af_river` |
| **US Male** | `am_adam`, `am_michael`, `am_eric`, `am_liam`, `am_fenrir`, `am_puck` |
| **UK Female** | `bf_alice`, `bf_emma`, `bf_lily`, `bf_isabella` |
| **UK Male** | `bm_daniel`, `bm_george`, `bm_lewis`, `bm_fable` |

The default voice is `af_bella` (US Female — Bella). All 21 voices are offline and bundled with the model catalog.

## Test Voice Button

Click **Test Voice** to play a short spoken sample using the currently active backend. A status message in the bottom bar confirms success (*"Settings saved"*) or shows an error.

If the test fails:
- For local TTS: run **Repair** from the installer to re-download the correct ONNX model
- For cloud TTS: verify the API URL is reachable and the API key is valid
- Check your system audio output device in Windows Sound settings

## Saving Changes

Click **Save**. TTS changes take effect immediately — no restart required.
