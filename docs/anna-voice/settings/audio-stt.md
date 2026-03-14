---
id: audio-stt
title: Settings — Audio / STT
sidebar_label: Audio / STT
---

# Settings — Audio / STT

The **Audio / STT** tab controls your microphone selection, speech recognition engine, and model tier.

![Audio / STT settings tab showing Microphone dropdown set to System Default, STT Engine dropdown set to Sherpa-ONNX, Model tier dropdown open showing tiny/small/medium/large options with none found, Runtime Status section showing Sherpa-ONNX: Not installed and Vosk: Available](/img/anna-voice/settings-audio-stt.jpg)

## Microphone

| Setting | Default | Description |
|---|---|---|
| **Microphone** | `(System Default)` | The audio input device used for speech recognition. Select a specific device from the dropdown to override the Windows default. |

A restart is required after changing the microphone. Anna Voice captures audio at the device's native sample rate and converts it internally — no manual sample rate configuration is needed.

:::tip USB Headsets
A USB headset gives the cleanest signal by avoiding analog noise from the motherboard's audio circuitry. If you have both a built-in mic and a USB headset, select the headset here explicitly even if it's your Windows default, to ensure Anna Voice uses it after system audio changes.
:::

## STT Engine

| Setting | Default | Description |
|---|---|---|
| **STT Engine** | `Sherpa-ONNX (offline, recommended)` | The speech recognition engine. Choose from Sherpa-ONNX, Vosk, Deepgram (cloud), or disable. |
| **Model tier** | `small` | Selects the accuracy/speed tradeoff for Sherpa-ONNX. Larger tiers are more accurate but use more RAM. |

![Audio STT engine dropdown showing three options: Sherpa-ONNX local recommended, Vosk local legacy, Deepgram cloud API key required](/img/anna-voice/settings-audio-stt-engine-dropdown.jpg)

### Engine Options

| Engine | Type | Notes |
|---|---|---|
| **Sherpa-ONNX (local, recommended)** | Offline, streaming | Fastest and most accurate local engine. Streams results as you speak. ~30 MB model download. |
| **Vosk (local, legacy)** | Offline | Legacy fallback engine. Used automatically if Sherpa-ONNX is not installed. |
| **Deepgram (cloud, API key required)** | Cloud | Maximum accuracy for technical vocabulary. Requires a Deepgram API key. |

### Model Tiers (Sherpa-ONNX)

| Tier | RAM Usage | Accuracy | Notes |
|---|---|---|---|
| `tiny` | Lowest | Basic | Fastest, suitable for simple dictation |
| `small` | Low | Good | *(default)* Best balance for most users |
| `medium` | Moderate | Better | Noticeably more accurate for technical terms |
| `large` | High | Best | Use if accuracy is paramount and RAM allows |

If a selected tier is not installed, Anna Voice automatically falls back to the next available tier, then to Vosk.

## Runtime Status

The Runtime Status section shows what is currently installed and available:

| Field | What It Shows |
|---|---|
| **Sherpa-ONNX** | `Installed` (green) or `Not installed` (gray) with the active tier |
| **Vosk** | `Available (vosk-model-en-us-0.22)` if a Vosk model is found, or `Not found` |
| **Model Catalog** | Schema version, number of known STT models, last updated date |
| **Refresh Model Catalog** button | Triggers a background check for newer model versions on GitHub and HuggingFace |

## Cloud STT for Voice Commands (Advanced)

Expand this section to configure a cloud STT endpoint for command mode. Cloud STT gives higher accuracy for voice commands than local engines, at the cost of internet connectivity.

| Setting | Default | Description |
|---|---|---|
| **Cloud STT URL** | `https://speaches-stt.svcs.anshinhealth.net` | Base URL of the OpenAI-compatible transcription API |
| **Cloud API Key** | *(blank)* | API key if your cloud endpoint requires authentication |
| **Cloud Model** | *(from model catalog)* | The Whisper model name to request (e.g., `Systran/faster-whisper-small`) |
| **Prefer cloud for voice commands** | ❌ Disabled | When enabled, command mode uses cloud STT and falls back to local if the cloud fails. Dictation always uses the local engine. |

The cloud endpoint must implement the OpenAI-compatible `/v1/audio/transcriptions` endpoint (multipart form: `file`, `model`, `language`). The Anshin-hosted [Speaches](https://github.com/speaches-ai/speaches) instance at `https://speaches-stt.svcs.anshinhealth.net` is compatible.

## Saving Changes

Click **Save**. A restart is required after changing the microphone or STT engine.
