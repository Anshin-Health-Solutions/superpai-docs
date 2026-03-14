---
id: communications
title: Communications
sidebar_label: Communications
---

# Communications

The Communications section is Orchestrate's unified inbox — all customer interactions across email, WhatsApp, and internal contacts flow through a single, integrated interface. Agents never need to switch between separate email clients, messaging apps, or contact databases.

**How to get there:** Click **Communications** in the sidebar (mail icon).

---

## The Six Tabs

| Tab | Purpose |
|-----|---------|
| **Email Client** | Full-featured email interface connected to your Gmail account |
| **Calendar** | Google Calendar integration for scheduling and availability |
| **Contacts** | Centralized contact database linked to all communications |
| **WhatsApp / Messaging** | WhatsApp Business messaging with customers and providers |
| **Email Classification** | Anna's real-time inbox view with AI classifications |
| **Email Templates** | Reusable email templates for common responses |

---

## Email Client

The Email Client tab provides a full Gmail-connected email interface:

### Features
- **Inbox, Sent, Drafts, Trash** folder navigation
- **Compose** — Write new emails with rich text formatting
- **Reply and Forward** — Standard email operations
- **Thread view** — Complete conversation history per contact
- **Search** — Full-text search across all emails
- **Attachments** — Send and receive files

### Gmail Sync
Orchestrate syncs with your connected Gmail account via **IMAP polling** (hourly by default). Emails sync automatically — you don't need to do anything. The sync frequency can be adjusted in **Settings > Email Import**.

### Anna Integration
Every email in your inbox has an **Anna Classification Panel** visible alongside it, showing:
- **Platform** — Which OTA or channel the email is from (VIA, GYG, BDC, DIR, or unclassified)
- **Type** — Email intent (booking request, cancellation, modification, general inquiry)
- **Confidence** — Anna's confidence percentage in her classification

---

## Calendar

The Calendar tab shows your integrated Google Calendar:

- **Daily, Weekly, Monthly** views
- **Tour departures** overlaid from the booking system
- **Sync** with Google Calendar for team scheduling
- **Create events** directly from the Communications interface

---

## Contacts

The Contacts tab is the central contact registry. It is the foundation of Orchestrate's communication architecture — every email, calendar event, and WhatsApp message is linked to a contact record.

### Contact-Centric Architecture
This is a key design principle: Orchestrate doesn't just store emails in folders — it links every communication to a specific person. When you open a contact, you see the complete history:
- All emails exchanged
- All WhatsApp messages sent/received
- All bookings made by that person
- All calendar events involving them

### Contact Fields
| Field | Description |
|-------|-------------|
| Full Name | Customer or provider name |
| Email(s) | One or more email addresses |
| Phone / WhatsApp | Contact numbers |
| Company | Associated organization |
| Source | How the contact was created (OTA, direct, manual) |
| Tags | Custom labels for segmentation |
| Notes | Free-text notes about the contact |

### Finding Contacts
Use the **search bar** to find contacts by name, email, phone number, or company. The Advanced Search Builder (ASB) supports complex filters — e.g., "all contacts from Viator who booked in the last 30 days."

---

## WhatsApp / Messaging

The WhatsApp tab provides a messaging interface for customer and provider communication:

### Features
- **Conversation view** — Full chat history with each contact
- **Send and receive** text messages, images, documents
- **Template messages** — Pre-approved WhatsApp Business templates for automated messages (booking confirmations, itinerary delivery, follow-ups)
- **Notification delivery** — Manifests and itineraries are sent via WhatsApp when the customer/provider has WhatsApp configured as their preferred channel

### Use Cases
| Use Case | Example |
|----------|---------|
| Customer inquiry | Guest asks about tour availability via WhatsApp |
| Booking confirmation | "Your tour is confirmed for March 15 at 8:00 AM" |
| Day-before reminder | "Your tour departs tomorrow. Here's your itinerary." |
| Provider briefing | Send the morning's manifest to a guide |

---

## Email Classification

The Email Classification tab is Anna's view of your inbox — it shows every email alongside Anna's AI-generated classification.

### Classification Panel
For each email, Anna's panel shows:

| Field | Description |
|-------|-------------|
| **Platform** | Detected OTA source: VIA (Viator), GYG (GetYourGuide), BDC (Booking.com), EXP (Expedia), DIR (Direct), or UNKNOWN |
| **Type** | Email intent: booking_request, cancellation, modification, inquiry, other |
| **Confidence** | Anna's certainty (0–100%). High = auto-processed; Low = sent to Review Queue |

### Review Queue Workflow
Emails below Anna's confidence threshold appear in the **Review Queue** (Operations > Review Queue). Agents review these, confirm or correct Anna's classification, and the corrections improve Anna's model over time.

### Classification Accuracy
As you and your team provide corrections in the Review Queue, Anna's accuracy improves. Most teams see confidence scores above 85% within the first few weeks of operation.

---

## Email Templates

The Email Templates tab contains reusable templates for common communication scenarios:

### Built-in Templates
| Template | When Used |
|----------|-----------|
| **Booking Confirmation** | Sent automatically when a booking is confirmed |
| **Cancellation Notice** | Sent when a booking is cancelled |
| **Modification Request** | Used when changes are needed |
| **Itinerary Delivery** | Auto-sent 48 hours before departure |
| **Post-Tour Thank You** | Sent after tour completion |
| **Welcome / First Contact** | Initial reply to new customer inquiries |

### Creating Templates
1. Click **+ New Template**
2. Name the template and set the subject line
3. Write the body using rich text editor
4. Use **merge fields** (e.g., `{customer_name}`, `{tour_name}`, `{departure_date}`) for personalization
5. Save and optionally assign to an automation trigger

### Template Variables
Common merge fields available in templates:

| Variable | Value |
|----------|-------|
| `{customer_name}` | Guest's full name |
| `{tour_name}` | Product name |
| `{departure_date}` | Tour departure date |
| `{departure_time}` | Tour departure time |
| `{meeting_point}` | Tour meeting location |
| `{booking_reference}` | Unique booking reference number |
| `{agent_name}` | Assigned agent's name |
| `{company_name}` | Your organization's name |
| `{company_phone}` | Your office phone number |

---

## Tips

### Process the Review Queue Daily
The Email Classification tab's Review Queue shows items that need your attention. Review these within 24 hours — the faster you provide feedback, the faster Anna learns.

### Link Contacts to Bookings
When creating a new booking from an email inquiry, always link it to the correct contact record. This builds a complete history that your team can reference.

### Use Templates for Speed
For high-volume OTA bookings (Viator, GYG), create OTA-specific confirmation templates. This ensures consistent messaging and saves significant time.
