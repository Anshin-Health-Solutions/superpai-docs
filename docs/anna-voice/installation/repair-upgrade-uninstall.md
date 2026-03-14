---
id: repair-upgrade-uninstall
title: Repair, Upgrade, and Uninstall
sidebar_label: Repair / Upgrade / Uninstall
---

# Repair, Upgrade, and Uninstall

## Running the Installer on an Existing Installation

When you run the installer with Anna Voice already installed, you see this dialog:

![Setup dialog: Anna Voice 3.8.5 is already installed. Choose an action: Reinstall, Repair, Uninstall](/img/anna-voice/wizard-repair-options.png)

| Action | What It Does |
|---|---|
| **→ Reinstall** | Runs the full setup wizard again. Use this to upgrade to a new version or change your initial configuration choices. Your `settings.json` and corrections dictionary are preserved. |
| **→ Repair** | Re-copies the application files without running the wizard. Use this if the executable or DLL files are corrupted or missing. Your settings are not changed. |
| **→ Uninstall** | Removes Anna Voice from `C:\Program Files\Anshin\AnnaVoice\`. Your personal files in `%APPDATA%\AnnaVoice\` and models in `%LOCALAPPDATA%\AnnaVoice\` are **not** deleted. |

---

## Upgrading to a New Version

1. Download the new installer from [GitLab Releases](https://gitlab.anshinhealth.net/engineering/anna-voice/-/releases)
2. Run it — the upgrade prompt appears automatically
3. Choose **→ Upgrade**
4. The wizard runs showing a **What's New** page at the start
5. All your settings, corrections, and models are preserved

---

## Common Repair Scenarios

**TTS Test Voice doesn't work after upgrading from pre-3.8.8:**

The TTS model file from old installations may be the wrong format. Run **Repair** to re-download the correct model from the updated source.

**Application won't start / crashes immediately:**

A DLL may be missing or corrupted. Run the installer and choose **→ Repair** to restore all application files.

**Download failed during initial install:**

![Download and install error message](/img/anna-voice/wizard-download-error.png)

If a model download fails during the wizard, you can:
1. Check your internet connection and try again (re-run the installer → Reinstall)
2. Skip the failing model and use a different engine (Sherpa-ONNX does not require a download if already bundled)
3. Download the model manually and place it in `%LOCALAPPDATA%\AnnaVoice\models\`

---

## Uninstall (Keep Settings)

Run the installer → **→ Uninstall**. The application binary and DLLs are removed. Your personal data is preserved:

| Location | Kept? |
|---|---|
| `C:\Program Files\Anshin\AnnaVoice\` | ❌ Removed |
| `%APPDATA%\AnnaVoice\settings.json` | ✅ Kept |
| `%APPDATA%\AnnaVoice\corrections.json` | ✅ Kept |
| `%APPDATA%\AnnaVoice\registry.json` | ✅ Kept |
| `%LOCALAPPDATA%\AnnaVoice\models\` | ✅ Kept |

To fully remove everything including models and settings, delete those two directories manually after uninstalling.
