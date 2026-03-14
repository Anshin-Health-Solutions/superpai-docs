---
id: training
title: Settings — Training
sidebar_label: Training
---

# Settings — Training

The **Training** tab manages the Corrections Dictionary — a simple lookup table that fixes words the speech engine consistently mishears.

![Training settings tab showing Corrections Dictionary with example entries: coulda to could have, gonna to going to, gotta to got to, i to I, i'd to I'd, i'll to I'll, i'm to I'm, and more, with Add field at bottom](/img/anna-voice/settings-training.jpg)

## How the Corrections Dictionary Works

Every word in the recognized text is checked against the dictionary. When a match is found, the misheard word is replaced before the text is typed into the focused window or dispatched as a command. Matching is case-insensitive.

**Example corrections:**

| Heard As | Corrected To |
|---|---|
| `coulda` | `could have` |
| `gonna` | `going to` |
| `gotta` | `got to` |
| `i` | `I` |
| `i'd` | `I'd` |
| `i'll` | `I'll` |
| `i'm` | `I'm` |
| `i've` | `I've` |
| `ok` | `OK` |
| `shoulda` | `should have` |
| `wanna` | `want to` |
| `woulda` | `would have` |

## Adding a Correction

1. Open Settings → **Training**
2. In the **Add** row at the top of the list, type the word as the engine mishears it in the **Heard As** field
3. Type the correct replacement in the **Corrected To** field
4. Click **Add** (or press Enter)
5. Click **Save**

The correction takes effect on the next recognition result — no restart required.

## Deleting a Correction

Click the **Del** button next to any entry to remove it. Click **Save** to apply.

## Editing the Dictionary File Directly

The dictionary is stored at `%APPDATA%\AnnaVoice\corrections.json`:

```json
{
  "teh": "the",
  "anna voice": "Anna Voice",
  "clod": "Claude",
  "orchestrate": "Orchestrate",
  "git hub": "GitHub"
}
```

Edit this file in any text editor. Anna Voice reloads it automatically — or you can trigger a reload via `POST http://127.0.0.1:8891/config/reload`.

## Training Workflow

The most effective way to build your dictionary:

1. Use dictation normally for a session
2. Note words that are consistently wrong
3. Open Settings → Training, add the corrections
4. Save and continue — corrections take effect immediately

Over a few sessions, your dictionary will cover your most common terms and accuracy will improve noticeably.

:::tip Technical Vocabulary
For technical terms, code identifiers, and product names (like `Orchestrate`, `SuperPAI`, function names), consider also enabling **Settings → Vocabulary → Auto-scan project source files**. The vocabulary scanner automatically boosts recognition of identifiers found in your code, which is often more effective than corrections for technical terms.
:::
