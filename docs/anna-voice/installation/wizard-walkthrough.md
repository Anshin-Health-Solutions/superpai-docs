---
id: wizard-walkthrough
title: Installation Wizard Walkthrough
sidebar_label: Installation Walkthrough
---

# Installation Wizard Walkthrough

The Anna Voice installer (`AnnaVoice-3.9.0-setup.exe`) guides you through all configuration options before copying any files. Every setting you choose in the wizard can be changed later in **Anna Voice Settings**.

Download the installer from [GitLab Releases](https://gitlab.anshinhealth.net/engineering/anna-voice/-/releases) or from your Anshin IT administrator.

---

## Existing Installation Detected

If you already have Anna Voice installed, the wizard opens with an upgrade prompt rather than a full installation.

![Upgrade prompt showing Anna Voice 3.8.7 found with Upgrade and Uninstall options](/img/anna-voice/wizard-upgrade.jpg)

| Choice | What Happens |
|---|---|
| **→ Upgrade** | Runs the full wizard, preserving your `settings.json` and corrections dictionary |
| **→ Uninstall** | Removes Anna Voice from your computer (your settings in `%APPDATA%\AnnaVoice\` are kept) |

---

## Page 1 — What's New

The wizard opens by showing the changes in this version.

![What's New page showing v3.9.0 changelog including the Intelligent Model Catalog system](/img/anna-voice/wizard-whats-new.jpg)

Review the changes, then click **Next** to begin configuration.

---

## Page 2 — General Settings

![General Settings page: HTTP API Port 8891, Logging Info/1024KB, Start with Windows checked, Desktop shortcut checked, Install Claude Code voice plugin checked](/img/anna-voice/wizard-general.jpg)

| Setting | Default | Description |
|---|---|---|
| **HTTP API Port** | `8891` | Port Anna Voice listens on for the local HTTP API. Change this only if another application uses port 8891. |
| **Logging Level** | `Info` | Controls how much detail is written to the log file. `Info` is appropriate for normal use; `Debug` for troubleshooting. |
| **Log Max Size** | `1024 KB` | Log file is rotated when it reaches this size. |
| **Start automatically with Windows** | ✅ Enabled | Adds Anna Voice to your Windows startup programs so it launches when you log in. |
| **Create desktop shortcut** | ✅ Enabled | Places a shortcut on your desktop. |
| **Install Claude Code voice plugin** | ✅ Enabled | Installs the Anna Voice plugin for Claude Code, adding `/voice`, `/listen`, and `/anna` slash commands. |

:::tip
Leave all three startup options enabled. Anna Voice is a lightweight background service (~15 MB RAM at idle) and works best when it starts with Windows so it is always ready.
:::

---

## Page 3 — Hotkeys

![Hotkeys page: Dictation Toggle F9 highlighted, Command Mode Toggle F10](/img/anna-voice/wizard-hotkeys.jpg)

| Setting | Default | Description |
|---|---|---|
| **Dictation Toggle** | `F9` | Press to start speaking and have text typed into the focused window. Press again to stop. |
| **Command Mode Toggle** | `F10` | Press to speak a voice command that gets dispatched to a target. Press again to stop. |

You can use F1–F12, or combinations like `Ctrl+Shift+D`. These bindings can be changed anytime in **Settings → Hotkeys** without reinstalling.

:::note
If F9 or F10 conflicts with another application (e.g., your browser's developer tools), change the binding now or after installation.
:::

---

## Page 4 — Speech Recognition

Choose the engine that will transcribe your voice to text.

**Before downloading a model:**

![Speech Recognition page showing engine options: Sherpa-ONNX installed, Vosk Standard not installed, Vosk HD not installed, Deepgram cloud option, Skip option. Download and Verify button visible.](/img/anna-voice/wizard-stt.jpg)

**After clicking Download & Verify:**

![Speech Recognition page showing Sherpa-ONNX: Installed in green text](/img/anna-voice/wizard-stt-verified.jpg)

| Engine Option | Size | Accuracy | Internet Required |
|---|---|---|---|
| **Sherpa-ONNX** *(recommended)* | Bundled | Excellent | No |
| Vosk Standard | ~40 MB download | Good | Download only |
| Vosk HD | ~1.8 GB download | Very good | Download only |
| Deepgram (cloud) | No download | Excellent | Yes (API key required — configure in Settings) |
| Skip | — | — | Configure after install |

**What to do:** Select **Sherpa-ONNX** and click **Download & Verify**. The installer confirms the engine is present and ready. Click **Next**.

The Detection section shows which models are already on your machine, so you know exactly what will and will not be downloaded.

:::info Fallback Chain
If Sherpa-ONNX cannot load a model at runtime (e.g., the model file is missing), it automatically falls back to Vosk. Anna Voice never crashes due to a missing model — it degrades gracefully.
:::

---

## Page 5 — Voice Output

Configure text-to-speech for spoken feedback.

**Before verification:**

![Voice Output page showing Built-in voice Amy US English selected, Cloud TTS option, Skip option, Download and Verify button](/img/anna-voice/wizard-tts.jpg)

**After clicking Download & Verify:**

![Voice Output page showing Voice model: Installed in green text](/img/anna-voice/wizard-tts-verified.jpg)

| Option | Description |
|---|---|
| **Built-in voice (Amy, US English)** *(recommended)* | Offline TTS using the Sherpa-ONNX Piper engine. Amy is a natural-sounding US English female voice included with the installer. No API key or internet required. |
| **Cloud TTS** | Uses an OpenAI-compatible TTS API. Configure the URL and API key in Settings → Voice / TTS after installation. |
| **Skip** | TTS is disabled. Anna Voice will not speak command results or notifications. |

**What to do:** Select **Built-in voice (Amy, US English)** and click **Download & Verify**. Once you see **Voice model: Installed**, click **Next**.

---

## Page 6 — Training

![Training page showing Corrections Dictionary explanation with examples: teh→the, recieve→receive, definately→definitely, anna voice→Anna Voice](/img/anna-voice/wizard-training.jpg)

The **Corrections Dictionary** maps words that the speech engine mishears to the correct replacements. For example, if the engine consistently hears "anna voice" as two words in lowercase, the correction `anna voice → Anna Voice` fixes it automatically.

The dictionary starts empty and is stored at `%APPDATA%\AnnaVoice\corrections.json`. You add corrections over time in **Settings → Training** as you notice recurring mistakes.

No action is needed on this page — click **Next**.

---

## Page 7 — Targets

![Targets page showing HTTP Targets and Aliases sections, with note that no targets are configured and Active Sessions are read-only](/img/anna-voice/wizard-targets.jpg)

Targets are the destinations where voice commands are sent:

- **HTTP Targets** — Named endpoints with a URL and HTTP method (POST/GET/PUT). Add these if you want to send commands to a webhook, the Orchestrate API, or any custom HTTP endpoint.
- **Aliases** — Shorthand names. For example, `agenda → orchestrate` means saying "Hey Anna, agenda, show today's tasks" routes to the Orchestrate target.
- **Active Sessions** — Shown read-only when Anna Voice is running. These are WezTerm terminal panes that have registered themselves with Anna Voice.

Targets are typically added after installation once you know which applications you want to control. Click **Next** to continue.

---

## Page 8 — Wake Words

![Wake Words page showing Enable Wake Word Detection checked, User Name: BryanLee, Command Timeout: 5 seconds, default phrases listed](/img/anna-voice/wizard-wakewords.jpg)

| Setting | Default | Description |
|---|---|---|
| **Enable Wake Word Detection** | ✅ Enabled | When enabled, Anna Voice listens continuously for trigger phrases. |
| **User Name** | *(your name)* | Used in greeting responses when a wake word is detected ("Good morning, Bryan"). |
| **Command Timeout** | `5` seconds | After the wake word is heard, Anna Voice waits this many seconds for your command before timing out. |

**Default wake phrases:** "hey anna", "hey claude", "hey coordinator"

You can customize the trigger phrases after installation in **Settings → Wake Words**. All phrases are lowercase and matched against partial transcripts in real time.

---

## Page 9 — LLM Text Enhancement

LLM enhancement silently improves dictated text by correcting grammar, punctuation, filler words, and capitalization — in the background, without slowing down your typing.

**Configuring the connection:**

![LLM Text Enhancement page showing Ollama selected, URL http://deepseek-01.anshinhealth.net:11434, Model qwen2.5:14b, Enhancement Tasks all checked](/img/anna-voice/wizard-llm.jpg)

**After a successful connection test:**

![LLM Text Enhancement page showing OK: Model qwen2.5:14b available in green next to Test Connection button](/img/anna-voice/wizard-llm-tested.jpg)

| Setting | Default | Description |
|---|---|---|
| **Enable LLM Text Enhancement** | ✅ Enabled | Master toggle. Disable to skip enhancement entirely and use raw STT output. |
| **Provider** | Ollama (local) | Choose between Ollama (self-hosted), OpenAI (cloud), or Anthropic (cloud). |
| **Ollama URL** | `http://localhost:11434` | URL of your Ollama instance. The Anshin deployment uses `http://deepseek-01.anshinhealth.net:11434`. |
| **Model** | `llama3.2:1b` | The LLM model to use. Anshin's deployment uses `qwen2.5:14b`. |
| **API Key** | *(blank for Ollama)* | Required for OpenAI and Anthropic providers. |

**Enhancement Tasks** — check any combination:

| Task | What It Fixes |
|---|---|
| Grammar | Corrects grammatical errors in dictated text |
| Punctuation | Adds periods, commas, and question marks |
| Filler removal | Removes "um", "uh", "like", "you know" |
| Capitalization | Capitalizes proper nouns and sentence starts |
| Formatting | Applies consistent spacing and paragraph breaks |

**What to do:** Enter your Ollama URL and model name, then click **Test Connection**. When you see **OK: Model [name] available**, click **Next**. If no LLM is available, uncheck **Enable LLM Text Enhancement** — raw STT output is still high quality.

:::tip Performance
Enhancement is non-blocking. Anna Voice types your words immediately; the LLM improves them asynchronously within a 1-second timeout. If the LLM doesn't respond in time, the original text is kept.
:::

---

## Page 10 — Knowledge Base

![Knowledge Base page showing Enable local knowledge base checked, No directories configured message, File extensions listed, Chunk Size 512](/img/anna-voice/wizard-knowledge.jpg)

The Knowledge Base indexes your local documents so you can search them by voice.

| Setting | Default | Description |
|---|---|---|
| **Enable local knowledge base** | ✅ Enabled | Activates the Tantivy BM25 full-text search engine. |
| **Index Directories** | *(none — add in Settings)* | Folders whose files will be indexed. Add directories after installation in **Settings → Knowledge**. |
| **File extensions indexed** | `txt, md, rs, py, ts, js` | File types scanned when indexing. |
| **Chunk Size** | `512` characters | Maximum characters per indexed chunk. Smaller chunks give more precise search results. |

Add your document directories after installation. Click **Next** to continue.

---

## Page 11 — Vocabulary

![Vocabulary page showing Enable Vocabulary checked, Vocabulary File blank, Max Scan Entries 500, Auto-scan project source files checked](/img/anna-voice/wizard-vocabulary.jpg)

Vocabulary boosting teaches the speech engine to better recognize technical terms, project names, and code identifiers.

| Setting | Default | Description |
|---|---|---|
| **Enable Vocabulary** | ✅ Enabled | Activates vocabulary boosting for the STT engine. |
| **Vocabulary File** | *(blank — auto-detect)* | Path to a custom vocabulary file. Leave blank to auto-detect from the current project directory. |
| **Max Scan Entries** | `500` | Maximum number of identifiers to extract from source files. |
| **Auto-scan project source files** | ✅ Enabled | Anna Voice scans source code (`.rs`, `.ts`, `.py`, etc.) and extracts CamelCase and snake_case identifiers for recognition boosting. This significantly improves accuracy when dictating code. |

Click **Next** to proceed to the final confirmation.

---

## Ready to Install

![Ready to Install page: Setup is now ready to begin installing Anna Voice on your computer. Click Install to continue.](/img/anna-voice/wizard-ready.jpg)

All settings have been collected. Click **Install** to begin copying files.

---

## Installing

![Installing page showing progress bar and file being extracted: C:\Program Files\Anshin\AnnaVoice\libstdc++-6.dll](/img/anna-voice/wizard-installing.jpg)

The installer copies the application binary, Sherpa-ONNX DLLs, the TTS voice model, and the model catalog to `C:\Program Files\Anshin\AnnaVoice\`. Your personal settings go to `%APPDATA%\AnnaVoice\` and models go to `%LOCALAPPDATA%\AnnaVoice\`.

---

## Installation Complete

![Completing the Anna Voice Setup Wizard page with Launch Anna Voice checkbox checked and Finish button](/img/anna-voice/wizard-finish.jpg)

Installation is complete. **Launch Anna Voice** is checked by default — click **Finish** to start Anna Voice immediately.

The Anshin shield icon will appear in your system tray within a few seconds. Anna Voice is ready to use.

---

## Next Steps

- [First Launch →](../getting-started/first-launch) — See the tray icon states and verify Anna Voice is working
- [Your First Dictation →](../getting-started/your-first-dictation) — Try dictation mode in under 2 minutes
- [Settings Reference →](../settings/general) — Deep-dive into any setting
