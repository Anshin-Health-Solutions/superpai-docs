---
id: llm
title: Settings — LLM
sidebar_label: LLM Enhancement
---

# Settings — LLM Enhancement

The **LLM** tab configures AI-powered text improvement for dictated text. When enabled, Anna Voice sends recognized text to a language model that corrects grammar, removes filler words, and adds punctuation — transparently and without slowing down your typing.

![LLM Text Enhancement settings tab showing Enable LLM enhancement toggle, Provider set to ollama, Ollama URL http deepseek-01.anshinhealth.net 11434, Model qwen2.5:14b, API Key cloud providers only, Timeout 1000ms, Enhancement tasks grammar punctuation filler capitalization formatting all checked, Test Connection button](/img/anna-voice/settings-llm.jpg)

## How Enhancement Works

Enhancement is **non-blocking**:

1. When you finish a phrase, Anna Voice types the raw STT text into the focused window immediately
2. Simultaneously, the same text is sent to the LLM with a prompt describing the requested improvements
3. If the LLM responds within the timeout (default: 1 second), the typed text is replaced with the enhanced version
4. If the LLM times out or fails, the original raw text remains — no disruption to your workflow

## Settings

| Setting | Default | Description |
|---|---|---|
| **Enable LLM Text Enhancement** | ❌ Disabled | Master toggle. When disabled, raw STT output is always used. |
| **Provider** | `Ollama (local)` | Choose from Ollama, OpenAI, or Anthropic. |
| **Ollama URL** | `http://localhost:11434` | URL of your Ollama instance. The Anshin internal deployment is at `http://deepseek-01.anshinhealth.net:11434`. |
| **Model** | `llama3.2:1b` | The model name to request. Must be available on your Ollama instance. Anshin's deployment uses `qwen2.5:14b`. |
| **API Key** | *(blank)* | Required for OpenAI and Anthropic providers. Not needed for Ollama. |
| **Timeout** | `1000 ms` | Maximum time to wait for LLM response before using raw text. Increase if your LLM is on a slow network connection. |

## Enhancement Tasks

Choose which types of improvements the LLM applies:

| Task | What It Does |
|---|---|
| ✅ **Grammar** | Corrects grammatical errors ("I were going" → "I was going") |
| ✅ **Punctuation** | Adds periods, commas, and question marks at natural boundaries |
| ✅ **Filler removal** | Removes "um", "uh", "like", "you know", "so" |
| ✅ **Capitalization** | Capitalizes proper nouns, sentence starts, and "I" |
| ✅ **Formatting** | Applies consistent spacing and paragraph breaks |

You can enable any combination. Disabling all tasks while leaving the master toggle on is equivalent to disabling enhancement.

## Test Connection

Click **Test Connection** to verify that the configured provider and model are reachable. A green status message confirms success:

```
OK: Model qwen2.5:14b available
```

If the test fails, check:
- The Ollama URL is reachable from your machine
- The model name is spelled exactly as it appears in `ollama list`
- For cloud providers, the API key is correct and has not expired

## Provider Notes

![LLM tab showing Provider dropdown open with three options: ollama highlighted, openai, anthropic](/img/anna-voice/settings-llm-provider-dropdown.jpg)

### Ollama (Local) — Recommended

Ollama runs locally and requires no API key or internet connection. Smaller models (1B–3B parameters) respond within the 1-second timeout comfortably on modern hardware. The Anshin-hosted Ollama at `http://deepseek-01.anshinhealth.net:11434` is available to all Anshin staff on the internal network.

### OpenAI (Cloud)

Set the API key in the API Key field. Use models like `gpt-4o-mini` for low latency. OpenAI calls consume API credits.

### Anthropic (Cloud)

Set the API key. Use models like `claude-haiku-3-5` for low latency.

## Saving Changes

Click **Save**. Enhancement changes take effect immediately — no restart required.
