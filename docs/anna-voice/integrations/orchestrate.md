---
id: orchestrate
title: Anshin Orchestrate Integration
sidebar_label: Anshin Orchestrate
---

# Anshin Orchestrate Integration

Anna Voice connects to Anshin Orchestrate through the **Anna AI Chat** window, giving you a voice-controlled interface to a broad range of workflow automations. Instead of typing, you speak your request — Anna transcribes it, routes it to Orchestrate's AI chat endpoint, and reads the response back to you.

## How It Works

```
You speak → Anna (STT) → HTTP dispatch → Orchestrate AI Chat → Response JSON → Anna (TTS) speaks reply
```

Anna Voice is configured with an HTTP target that points to the Orchestrate AI chat endpoint. When you say "Hey Anna, [your request]", the command text is sent as a POST request. Orchestrate processes it and returns a conversational reply, which Anna reads aloud.

## Example Workflows

The following are examples of what you can do by voice through the Anna AI Chat window in Orchestrate:

| You say | What happens |
|---|---|
| *"Hey Anna, open my latest email from Dr. Martinez"* | Orchestrate retrieves and displays the email |
| *"Hey Anna, reply to that email and confirm the appointment"* | Orchestrate drafts and sends a confirmation reply |
| *"Hey Anna, schedule a tour with guide Sarah for Thursday at 2 PM"* | Orchestrate creates a calendar event and notifies the guide |
| *"Hey Anna, send a WhatsApp message to tour guide David — I'm running 10 minutes late"* | Orchestrate sends the WhatsApp message |
| *"Hey Anna, show me today's tours"* | Orchestrate lists the day's scheduled tours |
| *"Hey Anna, who's on call this evening?"* | Orchestrate retrieves on-call staff information |

## Setup

### Step 1 — Configure an HTTP Target for Orchestrate

In Anna Voice **Settings → Targets**, add an HTTP target:

| Field | Value |
|---|---|
| **Name / Designation** | `anna` (or `orchestrate`) |
| **URL** | The Anna AI Chat webhook endpoint in Orchestrate |
| **Method** | `POST` |
| **Headers** | `Authorization: Bearer <your token>` (if required) |

### Step 2 — Configure an Alias (Optional)

If you want to say "Hey Anna" to target Orchestrate (rather than a separate designation), add an alias in `settings.json`:

```json
{
  "aliases": {
    "anna": "orchestrate"
  }
}
```

Or use the designation `anna` directly in the Targets tab.

### Step 3 — Enable Wake Words

For true hands-free operation, enable wake words (Settings → Wake Words) with the phrase `hey anna`. This lets you trigger Orchestrate workflows without pressing any key.

### Step 4 — Test

Press **F10** to enter command mode, then say:

> *"Hey Anna, what's on my schedule today?"*

Anna should route the request to Orchestrate and speak the reply.

## How Orchestrate Reads the Command

Anna Voice sends the command as a JSON body:

```json
{
  "message": "what's on my schedule today",
  "source": "anna-voice"
}
```

Orchestrate's AI chat endpoint processes the natural language request and returns a JSON response. Anna Voice reads any of these fields from the response as the spoken reply:

- `message`
- `reply`
- `response`
- `text`
- `answer`

Responses are truncated to 500 characters for TTS to keep spoken feedback brief.

## Supported Orchestrate Capabilities via Voice

Anna Voice can facilitate any workflow that Orchestrate's AI chat supports, including:

| Category | Examples |
|---|---|
| **Email** | Read emails, reply to emails, draft messages, search inbox |
| **Scheduling** | Schedule tours, book appointments, check availability, reschedule |
| **Staff Communication** | Send WhatsApp messages to tour guides and staff |
| **Tour Management** | View tour rosters, assign guides, check-in guests |
| **Notifications** | Send alerts and status updates to team members |
| **Information Retrieval** | Look up patient or guest records, retrieve protocols |

## Platform Notes

Anna Voice runs on Windows (primary), macOS, and WSL2. Orchestrate runs in your browser. Anna dispatches to Orchestrate regardless of what window is focused — the command goes over HTTP directly to the Orchestrate backend, not through the browser.

This means you can control Orchestrate workflows even while looking at a different application.

## Tips

| Tip | Effect |
|---|---|
| Use natural speech | Orchestrate's AI chat is designed for conversational queries |
| Enable Cloud STT for command mode | Better accuracy for proper names and medical/operational terms |
| Add facility-specific terms to Vocabulary | Improves recognition for staff names, room numbers, tour codes |
| Keep the wake phrase short and distinct | "Hey Anna" is reliably recognized; avoid phrases similar to other commands |
