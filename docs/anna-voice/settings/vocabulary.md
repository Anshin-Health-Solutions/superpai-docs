---
id: vocabulary
title: Settings — Vocabulary
sidebar_label: Vocabulary
---

# Settings — Vocabulary

The **Vocabulary** tab configures recognition boosting for technical terms, project-specific identifiers, and custom words. Vocabulary boosting tells the STT engine to weight certain words more heavily during recognition, improving accuracy for specialized vocabulary.

![Vocabulary settings tab showing Enable vocabulary toggle, Vocabulary file field set to auto-detect from project, Max scan entries 500, Create Default and View File buttons, and Auto-scan project source files toggle checked](/img/anna-voice/settings-vocabulary.jpg)

## Settings

| Setting | Default | Description |
|---|---|---|
| **Enable Vocabulary** | ✅ Enabled | Master toggle for vocabulary boosting. When disabled, no custom words are sent to the STT engine. |
| **Vocabulary File** | *(blank — auto-detect)* | Path to a custom vocabulary file (one word or phrase per line). Leave blank to use the auto-detected project vocabulary. |
| **Max Scan Entries** | `500` | Maximum number of identifiers to extract from auto-scanned source files. |
| **Auto-scan project source files** | ❌ Disabled *(default)* | When enabled, Anna Voice scans source code files in the current directory for identifiers to boost. |

## Auto-Scan

When **Auto-scan project source files** is enabled, Anna Voice extracts identifiers from source files (`.rs`, `.ts`, `.py`, `.js`, `.go`, etc.) in your current working directory. It recognizes:

- **CamelCase** identifiers: `HttpTargetConfig`, `SttEngineConfig`, `DocsService`
- **snake_case** identifiers: `config_reload`, `rag_search`, `dispatch_voice`
- **SCREAMING_SNAKE_CASE** constants: `MAX_RETRY_COUNT`, `DEFAULT_PORT`

These are converted to their spoken forms and submitted to the STT engine as boosted hotwords, improving recognition when you dictate code.

Up to **Max Scan Entries** identifiers are extracted. If your project has more than 500 identifiers, the most frequently occurring ones are selected.

## Custom Vocabulary File

For persistent vocabulary that doesn't come from source scanning, create a text file with one entry per line:

```
AnnaVoice
SuperPAI
Orchestrate
BryanLee
HIPAA
OAuth2
WebSocket
```

Set the path in the **Vocabulary File** field. This vocabulary is always loaded, regardless of the auto-scan setting.

## Adding Words via API

New vocabulary entries can also be added at runtime via the HTTP API without reopening Settings:

```bash
POST http://127.0.0.1:8891/vocabulary
Content-Type: application/json

{"spoken": "orchestrate", "display": "Orchestrate"}
```

Entries added via API are saved to the vocabulary file and persist across restarts.

## Listing Current Vocabulary

```bash
GET http://127.0.0.1:8891/vocabulary
```

Response:
```json
{
  "ok": true,
  "entries": [
    {"spoken": "orchestrate", "display": "Orchestrate", "boost": 1.0},
    {"spoken": "superpai", "display": "SuperPAI", "boost": 1.0}
  ]
}
```

## Saving Changes

Click **Save**. Vocabulary changes take effect on the next recognition session — no restart required.
