---
id: release-notes
title: What's New in v3.9.0
sidebar_label: "What's New — v3.9.0"
---

# What's New in Anna Voice v3.9.0

*Released 2026-03-10*

![What's New screen shown during upgrade](/img/anna-voice/wizard-whats-new.jpg)

---

## Intelligent Model Catalog

The biggest change in v3.9.0 is a new **Model Catalog system** that replaces over 40 hardcoded model references scattered across the codebase. A single JSON file (`assets/model-catalog.json`) now defines:

- All STT models: 4 Sherpa-ONNX tiers + 2 Vosk models
- All TTS models: Piper Amy (bundled) + 21 Kokoro voices
- Download URLs, version strings, and compatibility info

**What this means for you:**
- The Settings → Audio / STT tab now shows a **Runtime Status** section with the catalog version, model counts, and a **Refresh Model Catalog** button
- Model discovery in the installer and settings always stays current without requiring a new release
- The catalog is bundled in the installer so fresh installs have model metadata even when offline

### Background Catalog Refresh

At startup, Anna Voice silently checks GitHub releases and HuggingFace for newer model versions. This is best-effort and non-blocking — if your machine is offline or the request times out, the locally bundled catalog is used as fallback. The refreshed catalog is cached at `%LOCALAPPDATA%\AnnaVoice\model-catalog.json`.

### New HTTP Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/models/catalog` | Returns the full model catalog as JSON |
| `POST` | `/models/refresh` | Triggers a background catalog refresh |

---

## TTS "Test Voice" Now Works Reliably (v3.8.8 fix, included in v3.9.0)

The **Test Voice** button in Settings → Voice / TTS previously failed silently on most installations. The root cause was that the `.onnx` model file from the original source (`rhasspy/piper-voices`) lacked ONNX metadata that the Sherpa-ONNX engine requires. All model downloads now use `csukuangfj/vits-piper-en_US-amy-low` on HuggingFace, which is the pre-converted, Sherpa-compatible package.

If you installed before v3.8.8 and TTS never worked, run **Repair** from the installer (or re-run the installer and choose **Reinstall**) to re-download the correct model file.

---

## Previous Versions

| Version | Date | Key Change |
|---|---|---|
| 3.9.0 | 2026-03-10 | Intelligent Model Catalog replaces 40+ hardcoded references |
| 3.8.8 | 2026-03-09 | TTS Test Voice fixed; all downloads use csukuangfj HuggingFace source |
| 3.8.7 | 2026-03-09 | TTS engine initialization debugging and espeak-ng-data fix |
| 3.8.x | 2026-03-09 | Multiple rapid iterations on TTS model loading and DLL stability |

For the full version history, see [CHANGELOG.md](https://gitlab.anshinhealth.net/engineering/anna-voice/-/blob/main/CHANGELOG.md) in the GitLab repository.
