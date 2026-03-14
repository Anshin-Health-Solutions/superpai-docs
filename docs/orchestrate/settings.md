---
id: settings
title: Settings Reference
sidebar_label: Settings
---

# Settings Reference

The Settings section gives administrators control over all aspects of their Orchestrate organization — from general preferences to AI configuration, email connections, workflow automation, channel integrations, and pricing.

**How to get there:** Click **Settings** in the sidebar (gear icon). Requires Administrator or System Manager role.

---

## Settings Sub-Pages

Settings is organized into two groups:

### Always-Visible Settings

| Page | Purpose |
|------|---------|
| **General** | Organization profile, branding, regional preferences |
| **Anna AI** | AI assistant configuration and detection patterns |
| **Workflows** | N8N workflow automation settings |
| **Channels** | OTA channel connections overview |
| **Integrations** | Third-party integrations (Google Drive, webhooks, APIs) |

### Feature-Flagged Settings

These pages are only visible when the corresponding feature flag is enabled for your organization. Contact your Anshin administrator to activate a feature.

| Page | Feature Flag | Purpose |
|------|-------------|---------|
| **Pricing** | `orch_pricing_engine` | Rate plans, pricing rules, commissions |
| **Timeslots** | `orch_use_timeslot_instances` | Timeslot template and instance management |
| **Resources** | `orch_use_resource_reservations` | Resource scheduling configuration |
| **Accommodation** | `orch_accommodation` | Property and room inventory |
| **Ecommerce** | `orch_ecommerce` | Checkout flows and cancellation policies |
| **Itineraries** | `orch_structured_itineraries` | Visual itinerary editor settings |

---

## General Settings

### Organization Profile
- **Company name** — Your trading name displayed throughout the platform
- **Legal name** — Full legal company name for invoices
- **Logo** — Upload your company logo (displayed in header and on documents)
- **Primary color** — Brand color used throughout the interface
- **Address** — Full business address for invoices and documents
- **Phone / Email** — Primary contact details

### Regional Preferences
- **Time zone** — Critical for correct scheduling of tours, manifests, and automated messages
- **Date format** — How dates are displayed (MM/DD/YYYY, DD/MM/YYYY, etc.)
- **Currency** — Primary currency for pricing and invoicing
- **Number format** — Thousands and decimal separators

### User Preferences
- **Default language** — Platform language for new users
- **Theme** — Light / Dark / System (per user, can be changed individually)

---

## Anna AI Settings

Configures how Anna processes emails, makes decisions, and answers questions.

### Detection Patterns
Patterns that teach Anna how to identify emails from each OTA platform:

| Field | Description |
|-------|-------------|
| Platform | Which OTA this pattern applies to (VIA, GYG, BDC, EXP, DIR) |
| Pattern Type | Subject line, sender address, or email body |
| Pattern Value | The keyword, regex, or exact string to match |
| Priority | Order in which patterns are evaluated |

**Best practice:** Create multiple patterns per platform — at least one sender pattern and one subject pattern.

### Routing Rules
Define what Anna does after classifying an email:

- If Platform = [X] and Intent = booking_request → Create booking record + assign to agent
- If Intent = cancellation → Place in Needs Attention + notify team
- If Platform = UNKNOWN → Place in Review Queue

### Confidence Thresholds
| Setting | Default | Description |
|---------|---------|-------------|
| **Auto-process threshold** | 75% | Items above this are processed automatically |
| **Review queue threshold** | 50% | Items between 50-75% go to Review Queue |
| **Minimum confidence** | 30% | Items below 30% are discarded as spam/irrelevant |

### Anna Triggers
Event-based automations that fire when Anna detects specific conditions. These integrate with the N8N workflow engine to trigger downstream actions.

---

## Workflows Settings

Configures the N8N workflow automation engine:

### Connected Workflows
Shows all active N8N workflows, their trigger types, and current status (active/paused).

### Workflow Variables
Environment variables shared across all workflows for your tenant — API keys, email addresses, webhook URLs, and configuration values that workflows can reference.

### N8N Configuration
- N8N instance URL (managed by Anshin — typically read-only)
- Webhook base URL for incoming trigger endpoints
- Authentication settings for N8N API access

---

## Channels Settings

An overview panel of your channel connections. For detailed channel management, use the dedicated [Channels](/orchestrate/channels) section.

From Settings > Channels you can:
- See a summary of all active/inactive OTA connections
- Quick-enable or disable a specific channel
- Access the API credentials for each connection

---

## Integrations

### Email Import (Gmail)
Connect your Gmail account for email synchronization:

1. Click **Connect Gmail**
2. Sign in with your Google account in the OAuth flow
3. Grant Orchestrate access to read and send emails
4. Set sync frequency (default: hourly)
5. Set which labels/folders to sync (typically: Inbox, Sent)

### Google Drive
Connect Google Drive for document storage:
- Attach Google Drive files to bookings and customer records
- Store manifests and itineraries in Drive
- Access shared team documents from within Orchestrate

### Webhooks
Configure outbound webhooks — POST notifications to external URLs when specific events occur in Orchestrate:

| Event | When It Fires |
|-------|--------------|
| `booking.created` | New booking added to pipeline |
| `booking.confirmed` | Booking moves to Confirmed stage |
| `booking.cancelled` | Booking is cancelled |
| `tour.completed` | Tour marked as completed |
| `invoice.generated` | New invoice created |

**Use cases:** Notify external CRM systems, trigger Zapier automations, update external dashboards.

### API Settings
- **API Keys** — Generate and manage API keys for external integrations
- **Webhook signing secrets** — Secure your webhook endpoints

---

## Pricing Settings *(Feature Flag: `orch_pricing_engine`)*

When enabled, provides advanced pricing management:

### Rate Plans
Define multiple pricing tiers for the same product:
- Standard rate (published / rack rate)
- OTA rate (with commission built in)
- Group discount rate (applies when pax count ≥ threshold)
- Early bird rate (applies when booked X days in advance)

### Price Rules
Conditional pricing logic:
- Apply a 15% discount for bookings made 30+ days in advance
- Add a 20% premium for private tour bookings (fewer than 4 guests)
- Apply seasonal price increase for peak dates

### Commission Settings
Define OTA commission rates per platform:
- Viator: 20%
- GetYourGuide: 25%
- Booking.com: 15%

The system automatically calculates your net revenue after commission for each booking.

---

## Tips

### Lock Down Settings Access
Only administrators should have access to the Settings section. Review **User Management > Roles** to ensure agent-level roles don't have Settings access.

### Set Time Zone Before Going Live
The time zone setting affects every scheduled automation in the system — manifests, itineraries, follow-ups, and workflow triggers. Set it correctly before your first live booking.

### Test Gmail Connection
After connecting Gmail, send a test email to your connected address and verify it appears in the Communications > Email Client tab within one hour.

### Document Your Webhook Endpoints
If you configure outbound webhooks, document what external systems receive them. This prevents confusion when you later need to debug an integration.
