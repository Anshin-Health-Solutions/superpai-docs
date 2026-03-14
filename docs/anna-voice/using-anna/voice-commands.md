---
id: voice-commands
title: Voice Commands
sidebar_label: Voice Commands
---

# Voice Commands

Voice command mode lets you control registered targets — Claude Code sessions, terminals, and HTTP services like Anshin Orchestrate — using natural speech. Instead of typing, you say a target name and a command, and Anna Voice parses your words, finds the right destination, and dispatches the message.

## How It Works

When command mode is active (F10 or wake word), Anna Voice runs your speech through a pipeline:

```
Microphone → STT → Intent Parser → Target Resolver → Dispatcher → TTS Reply
```

1. **STT** — your speech is transcribed (Cloud STT preferred, offline fallback)
2. **Intent parser** — extracts the target name and command text from the transcript
3. **Target resolver** — looks up where to send the command (HTTP target, alias, or WezTerm pane)
4. **Dispatcher** — sends the command via HTTP POST or WezTerm CLI
5. **TTS reply** — Anna speaks the response or a confirmation

## Command Format

The standard format is:

```
[Hey] <target> [<number>], <command>
```

| Part | Required | Notes |
|---|---|---|
| `Hey` | Optional | Helps the STT recognize the utterance as a command |
| `<target>` | Required | One of the recognized target base names |
| `<number>` | Optional | Session number — spoken as a word or digit |
| `<command>` | Required | Any text; sent verbatim to the target |

## Recognized Target Names

| What you say | Resolves to | STT aliases also accepted |
|---|---|---|
| `claude` | `claude` | `clod`, `cloud`, `claud` |
| `claude 1` (or `claude one`) | `claude1` | `clod 1`, `claude1` |
| `claude 2` … `claude 5` | `claude2` … `claude5` | spoken or digit form |
| `anna` | `anna` | — |
| `coordinator` | `coordinator` | — |
| `session` | `session` | `session 1` … `session 5` |
| `wsl` | `wsl` | — |
| `win` | `win` | `win 1` … `win 5` |

The parser is case-insensitive and strips leading/trailing whitespace and common STT punctuation (commas, periods, colons).

## Example Commands

| You say | Target | Command sent |
|---|---|---|
| `"Hey Claude 1, add error handling to the API"` | `claude1` | `add error handling to the API` |
| `"Claude three, fix the broken tests"` | `claude3` | `fix the broken tests` |
| `"Hey Anna, review the pull request"` | `anna` | `review the pull request` |
| `"Hey Coordinator, start the deployment pipeline"` | `coordinator` | `start the deployment pipeline` |
| `"wsl run the build script"` | `wsl` | `run the build script` |
| `"Claude 2, run the test suite"` | `claude2` | `run the test suite` |

## Target Resolution Order

When a command is dispatched, the target name is resolved in this order:

1. **Aliases** — check `settings.json` aliases map (e.g., `"clod" → "claude"`)
2. **HTTP targets** — check configured HTTP targets (Settings → Targets); HTTP takes priority over panes
3. **WezTerm registry** — check panes that have self-registered via the WezTerm shell integration

If no match is found, Anna says *"Target [name] not found"* and stops.

## TTS Responses

After a successful dispatch, Anna Voice speaks a response:

- **HTTP target** — if the response JSON contains a `message`, `reply`, `response`, `text`, or `answer` field, Anna reads it aloud (truncated to 500 characters)
- **HTTP target (no body)** — Anna says *"Sent to [target]"*
- **WezTerm pane** — the command is sent silently (no spoken confirmation)
- **Failed dispatch** — Anna says *"Failed: [error message]"*

This means that when you dispatch to an Orchestrate or other AI endpoint that returns a conversational reply, you hear the answer spoken back to you without looking at a screen.

## Entering Command Mode

There are three ways to activate command mode:

| Method | How |
|---|---|
| **F10 hotkey** | Press F10 (or your configured command hotkey) |
| **Wake word** | Say "Hey Anna", "Hey Claude", or any configured wake phrase |
| **API** | `POST /api/v1/dispatch/voice {"text": "..."}` sends a command programmatically |

See [Wake Word](wake-word) for hands-free activation, or [Using F10](../settings/hotkeys) for hotkey details.

## What the STT Engine Hears

The parser handles common STT quirks automatically:

| STT output | Parsed as |
|---|---|
| `Hey Claude 1, do X` | target=`claude1`, command=`do X` |
| `Hey Claude1 do X` | target=`claude1`, command=`do X` |
| `hey claude one do X` | target=`claude1`, command=`do X` |
| `HEY CLAUDE 1, DO X` | target=`claude1`, command=`DO X` |
| `Hey Claude 1. Add X` | target=`claude1`, command=`Add X` (period treated as separator) |

The original casing of the command portion is preserved so that proper nouns, code identifiers, and capitalized words are sent correctly.

## Tips for Best Results

| Tip | Reason |
|---|---|
| Say "Hey" before the target name | Helps the STT recognize the utterance as a command |
| Pause briefly after the target name | Gives the parser a clean phrase boundary |
| Add aliases for targets you use most | Settings → Targets; shorter names are easier to say |
| Use Cloud STT for command mode | Significantly more accurate than offline engines for proper names |
| Register WezTerm panes with meaningful names | `claude1`, `build`, `wsl` are easier to say than pane IDs |
