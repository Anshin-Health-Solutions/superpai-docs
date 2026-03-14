---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

## Anna Voice Won't Start

**Symptom:** No tray icon appears after launching `anna-voice.exe`.

| Check | Action |
|---|---|
| Another instance is running | Right-click the system tray, look for an existing Anna Voice icon |
| Port 8891 already in use | Open Settings → General and change the HTTP port, or find what's using 8891 (`netstat -ano \| findstr 8891`) |
| DLL missing or corrupted | Run the installer → **Repair** to restore application files |
| Windows Firewall blocked | Allow `anna-voice.exe` through the firewall in Windows Security → Firewall → Allow an app |

---

## No Sound / TTS Not Working

**Symptom:** Commands are processed but Anna never speaks.

| Check | Action |
|---|---|
| TTS is disabled | Settings → Voice / TTS → toggle **Enable TTS** on |
| System volume muted | Check Windows volume mixer; Anna Voice uses the default audio device |
| Wrong audio device | Go to Windows Sound settings and set your speakers/headset as the default playback device |
| Model not downloaded | Run the installer → **Repair** (or Reinstall) to re-download the TTS model |
| TTS model wrong format (pre-3.8.8 installs) | Run **Repair** from the installer — the correct HuggingFace model will be downloaded |

**Test:** Click **Test Voice** in Settings → Voice / TTS. If you hear *"Hello, I am Anna"*, TTS is working. If not, check the log at `%APPDATA%\AnnaVoice\anna-voice.log`.

---

## Test Voice Button Fails Silently

**Symptom:** Clicking Test Voice in Settings → Voice / TTS does nothing.

**Cause:** This was a known bug in versions before v3.8.8. The original Piper model from `rhasspy/piper-voices` lacks ONNX metadata required by Sherpa-ONNX.

**Fix:** Run the installer and choose **Repair** (or **Reinstall**). All model downloads now use the compatible `csukuangfj/vits-piper-en_US-amy-low` package from HuggingFace.

---

## Microphone Not Detected / No Audio Input

**Symptom:** The tray icon shows idle but dictation produces no text.

| Check | Action |
|---|---|
| Microphone not selected | Settings → Audio/STT → **Microphone** — select your device |
| Microphone permission denied | Windows Settings → Privacy & Security → Microphone → allow Anna Voice |
| Device unplugged | Plug in your headset/microphone and restart Anna Voice |
| Wrong default device | Set your microphone as the default recording device in Windows Sound settings |

---

## Dictation Text Not Appearing

**Symptom:** Tray icon shows red dot (recording active) but no text appears in the focused window.

| Check | Action |
|---|---|
| Focus lost | Click into the text field again before pressing F9 |
| Application doesn't accept keyboard input | Some fullscreen games and kiosk apps block input injection; use a standard window |
| macOS Accessibility permission | System Preferences → Privacy & Security → Accessibility → enable AnnaVoice |
| Enigo injection failed | Check the log for `[anna-voice] Keyboard inject error` |

---

## Recognition Accuracy is Poor

**Symptom:** Transcribed text has frequent errors or missing words.

| Cause | Fix |
|---|---|
| Background noise | Use a USB headset; position microphone closer to your mouth |
| Wrong model tier | Settings → Audio/STT → Model tier → `medium` or `large` (requires download) |
| Technical terms misrecognized | Add corrections in Settings → Training; enable Auto-scan vocabulary in Settings → Vocabulary |
| Non-English speech | Change **Language** in Settings → Audio/STT to the appropriate language code |
| Vosk engine selected | Switch to Sherpa-ONNX (Settings → Audio/STT → Engine) for better accuracy |

---

## Voice Commands Not Dispatching

**Symptom:** You say "Hey Claude 1, [command]" but nothing happens.

| Check | Action |
|---|---|
| Command mode not active | Press F10 to enter command mode first, or enable wake words |
| Target not registered | `GET http://127.0.0.1:8891/registry` — check that `claude1` appears |
| Target name not recognized | The parser recognizes: `claude`, `anna`, `coordinator`, `session`, `wsl`, `win` + optional number |
| HTTP target URL wrong | Settings → Targets — verify the URL and test it independently with `curl` |
| WezTerm not running | WezTerm registry requires WezTerm; use HTTP targets for non-WezTerm terminals |

---

## Wake Word Not Triggering

**Symptom:** Saying "Hey Anna" does nothing.

| Check | Action |
|---|---|
| Wake words disabled | Settings → Wake Words → toggle **Enable Wake Words** on |
| Microphone volume too low | Check microphone levels in Windows Sound settings |
| Phrase not configured | Settings → Wake Words → verify your phrase appears in the list |
| STT engine offline | Wake word detection uses the running STT engine; verify it works in dictation mode first |

---

## LLM Enhancement Not Working

**Symptom:** Dictated text is not being cleaned up despite LLM being enabled.

| Check | Action |
|---|---|
| LLM disabled | Settings → LLM → toggle **Enable LLM Enhancement** on |
| Ollama not running | Start Ollama: `ollama serve` |
| Wrong model name | Settings → LLM → **Model** must match an installed model (`ollama list`) |
| Timeout too short | The default 1000ms timeout may be too short for slow hardware; increase in settings.json |
| Network/firewall | If using a remote LLM, verify the URL is accessible from this machine |

---

## Knowledge Search Returns No Results

**Symptom:** `/rag/search` or the `anna_knowledge_search` MCP tool returns empty results.

| Check | Action |
|---|---|
| Knowledge base disabled | Settings → Knowledge → toggle **Enable Knowledge Base** on |
| No directories indexed | Settings → Knowledge → add at least one **Index Directory** |
| Index not built yet | Call `POST /rag/ingest` or toggle knowledge base off/on to trigger indexing |
| File type not included | Settings → Knowledge → check that your file extension is in the list |
| Empty directories | Verify the configured paths contain readable files |

---

## Installer / Upgrade Issues

**Download fails during install:**

1. Check your internet connection
2. Re-run the installer and choose **Reinstall**
3. Download the model manually and place it in `%LOCALAPPDATA%\AnnaVoice\models\`

**Application won't start after upgrade:**

Run the installer → **Repair** to restore missing or corrupted DLL files.

**Settings lost after reinstall:**

They should not be — your `settings.json` at `%APPDATA%\AnnaVoice\` is preserved. If they are missing, check if the directory still exists.

---

## Log Files

Anna Voice writes a log to `%APPDATA%\AnnaVoice\anna-voice.log`. Log verbosity is set in Settings → General (default: Info). Switch to Debug for detailed event tracing.

To tail the log in PowerShell:
```powershell
Get-Content "$env:APPDATA\AnnaVoice\anna-voice.log" -Wait -Tail 50
```

---

## Getting Help

If the above steps don't resolve your issue:

1. Check the log at `%APPDATA%\AnnaVoice\anna-voice.log`
2. Verify Anna Voice version: `GET http://127.0.0.1:8891/health`
3. Contact Anshin support or file an issue in the [GitLab repository](https://gitlab.anshinhealth.net/engineering/anna-voice/-/issues)
