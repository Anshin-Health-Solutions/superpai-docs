---
id: booking-pipeline
title: Booking Pipeline
sidebar_label: Booking Pipeline
---

# Booking Pipeline

The booking pipeline is the operational heart of Anshin Orchestrate. Every tour booking — whether it arrives via email, OTA platform, WhatsApp, or direct website — flows through a defined series of stages from initial inquiry to completed tour and post-tour follow-up.

**How to get there:** Click **Operations** in the sidebar, then select the pipeline Kanban view.

---

## Pipeline Overview

The pipeline is displayed as a **Kanban board** — bookings appear as cards, organized in columns by their current stage. Agents advance bookings by dragging cards between columns.

```
│  New Requests  │ Needs Attention │ Provider Assign │  Confirmed  │ Itinerary/Mfst │ Active Tours │
│                │                 │                 │             │                │              │
│  [Card 1]     │  [Card 3]       │  [Card 5]       │  [Card 7]  │  [Card 9]     │  [Card 11]  │
│  [Card 2]     │  [Card 4]       │  [Card 6]       │  [Card 8]  │  [Card 10]    │              │
```

---

## Pipeline Stages

### Stage 1: New / Booking Request
**What it is:** A new booking inquiry has arrived.

**How bookings get here:**
- Anna AI auto-classifies an inbound email and creates the booking record (high confidence)
- An OTA platform (Viator, GetYourGuide, Booking.com, Expedia) sends a booking via the Channels integration
- A customer submits a request via the public storefront
- An agent manually creates a booking request

**Key fields:**
- Customer name and contact info
- Tour product and requested date
- Number of guests (adults, children, seniors)
- Source channel (VIA, GYG, BDC, EXP, DIR)
- Special requests or notes

**Agent action:** Review the request for completeness. Confirm the product and date are correct, then move to the next stage.

---

### Stage 2: Needs Attention
**What it is:** The booking requires specific action before it can proceed.

**Common reasons a booking lands here:**
- Missing guest information (no contact email, incomplete pax count)
- Date conflict (requested date has no available slots)
- Product mismatch (OTA's product code doesn't map to a known product)
- Price discrepancy (OTA's quoted price differs from your rate)
- Special requirements that need verification (dietary restrictions, accessibility needs)

**Agent action:** Address the specific issue — contact the guest, verify availability, or resolve the data problem. Once resolved, move the card forward.

---

### Stage 3: Provider Assignment
**What it is:** The booking is confirmed as valid — now assign the guide, driver, or partner provider.

**How to assign a provider:**
1. Open the booking card by clicking on it
2. Click the **Provider** field
3. Select from available providers (the system checks their schedule)
4. Optionally assign equipment or vehicles from the Resources section
5. Save the assignment

**Conflict detection:** If the selected provider is already booked at the same time, the system displays a warning: "This provider is already assigned to [Tour Name] at [Time]. Proceed anyway?"

**Agent action:** Assign a provider. If no provider is available, contact your network to find a subcontractor or reschedule the booking.

---

### Stage 4: Confirmed
**What it is:** The booking is fully confirmed — provider assigned, guest information complete, payment received or secured.

**What happens automatically at this stage:**
- A **Sales Order** is auto-generated in the Accounting module
- A **booking confirmation email** is sent to the guest (if confirmation template is configured)
- A **WhatsApp confirmation** is sent to the guest (if they have WhatsApp)
- The booking appears on the **Tour Calendar** and in **Today's Tours** on the correct date

**Agent action:** Verify the confirmation email was sent. No further action needed until the day before departure.

---

### Stage 5: Itinerary & Manifest
**What it is:** The pre-departure stage where travel documents are generated and distributed.

**What happens automatically:**
- At **6:00 AM**, two days before departure: the system generates a **guest itinerary** and emails/WhatsApps it to the customer
- At **7:00 AM**, the day before departure: the system generates a **provider manifest** (guide briefing document) and sends it to the assigned provider

**Itinerary contains:** Day-by-day schedule, included items, what to bring, meeting point, pickup time, and emergency contact.

**Manifest contains:** Guest list with names, nationalities, pickup locations/times, special requirements, emergency contact, and equipment notes.

**Agent action:** Monitor to ensure documents were delivered. If a late booking was added after the manifest was sent, regenerate and resend from the tour detail view.

---

### Stage 6: Active Tours
**What it is:** The tour is departing or currently in progress.

**What the system tracks:**
- Departure status (Scheduled → Departed → In Progress → Completed)
- Guide check-in confirmation
- Any real-time issues reported during the tour

**Agent action:** Monitor for any day-of issues. Providers can check in via WhatsApp or a direct call.

---

### Post-Tour: Completed
After the tour is marked **Completed**:
- At **10:00 AM** the next morning: a **post-tour follow-up** email/WhatsApp is automatically sent to the guest requesting a review and/or offering cross-sell tours
- A **Sales Invoice** is finalized
- Post-tour data feeds into the **Insights** analytics reports

---

## Booking Detail View

Click any booking card to open the full detail view (popup window). The detail view shows:

### Booking Information
| Section | Fields |
|---------|--------|
| **Header** | Booking reference, source channel, creation date |
| **Guest** | Name, email, phone, nationality, linked Contact record |
| **Tour Details** | Product, package, departure date/time, meeting point |
| **Pax Count** | Adults, children, seniors, total guests |
| **Provider** | Assigned guide/driver/boat + contact info |
| **Pricing** | Per-person rate, total amount, payment status |
| **Special Requests** | Dietary restrictions, accessibility needs, notes |
| **Status History** | Full log of every stage transition with timestamp and agent |

### Actions Available
- **Move Stage** — Drag or click to advance to the next pipeline stage
- **Assign Provider** — Select a provider from the available list
- **Generate Manifest** — Manually trigger manifest generation
- **Send Confirmation** — Manually send/resend confirmation to guest
- **Create Invoice** — Manually trigger invoice creation
- **Add Note** — Leave an internal note visible to your team
- **View in Contacts** — Jump to the guest's contact record

---

## Creating a Manual Booking

To create a booking request manually:

1. Click **+ New Booking** from the Dashboard or Operations page
2. Fill in the required fields:
   - Select the customer (or create a new contact)
   - Select the product
   - Enter the departure date
   - Enter pax count
   - Select the source channel (usually DIR for direct/phone bookings)
3. Click **Save** — the booking appears in the New Requests column
4. Process it through the pipeline as normal

---

## Booking Requests Table View

For searching, filtering, and bulk operations, switch to the **Booking Requests** table view (Operations > Booking Requests):

- **Search** by booking reference, customer name, or email
- **Filter** by date range, source channel, status, or assigned agent
- **Sort** by any column
- **Bulk actions** — Assign to agent, change status, export to CSV

---

## Manifests and Itineraries

### Manifest
A manifest is the provider's briefing document containing everything needed to lead the tour:

| Section | Content |
|---------|---------|
| Tour Details | Product name, date, time, meeting point |
| Guest List | Names, nationalities, phone numbers |
| Pickup Schedule | Hotel name, pickup time, room number for each guest |
| Special Requirements | Dietary restrictions, mobility needs, child seats |
| Equipment Notes | Any special gear needed |
| Emergency Contact | Your office number and on-call agent |

Manifests are auto-generated at **7:00 AM** for all tours departing the following day.

### Itinerary
The guest-facing day plan:

| Section | Content |
|---------|---------|
| Schedule | Time-by-time activities |
| Inclusions | What's covered in the price |
| Exclusions | What guests should bring money for |
| Pickup Info | Where and when the guest is collected |
| What to Bring | Recommended items |
| Contact | Tour company emergency contact |

Itineraries are auto-generated at **6:00 AM** for tours departing within 48 hours.

---

## Post-Tour Follow-ups

After a tour is marked as Completed, the system automatically sends:

| Type | Timing | Purpose |
|------|--------|---------|
| **Review Request** | Next morning 10:00 AM | Ask guest to leave a review on the booking platform |
| **Feedback Survey** | Next morning 10:00 AM | Structured feedback on guide quality and experience |
| **Cross-Sell Offer** | 24-48 hours later | Suggest related tours based on what they booked |

---

## Tips

### Establish a Daily Pipeline Rhythm

| Time | Action |
|------|--------|
| **8:00 AM** | Check New Requests — process anything that arrived overnight |
| **8:15 AM** | Review Review Queue — confirm or correct Anna's classifications |
| **8:30 AM** | Check Today's Tours — confirm all providers are assigned and have received manifests |
| **Throughout day** | Process new requests as they arrive |
| **End of day** | Mark completed tours, check next-day manifest generation |

### Use Notes for Team Communication
Leave internal notes on booking cards for colleagues. Notes are timestamped and attributed to the agent who wrote them — building a complete communication thread that the whole team can see.

### Watch Your Conversion Rate
The pipeline shows you exactly where bookings are getting stuck. If many cards sit in "Needs Attention" for more than 24 hours, investigate why and fix the bottleneck.
