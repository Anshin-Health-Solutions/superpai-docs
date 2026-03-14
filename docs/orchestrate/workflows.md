---
id: workflows
title: Workflow Automation
sidebar_label: Workflows
---

# Workflow Automation

Anshin Orchestrate includes a built-in workflow automation engine powered by **self-hosted N8N**. Workflows automate repetitive tasks — sending manifests, delivering itineraries, processing follow-ups, routing bookings, and making AI-assisted decisions — so your team spends time on guests, not administration.

**How to get there:** Click **Operations > Workflows** or **Settings > Workflows** in the sidebar.

---

## Built-In Automated Workflows

Orchestrate ships with pre-built workflows for the most common tour operations automation needs:

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| **Manifest Generation** | Daily 7:00 AM | Generates and sends provider manifests for all tours departing the next day |
| **Itinerary Delivery** | Daily 6:00 AM | Emails and WhatsApps itineraries to guests for tours departing within 48 hours |
| **Post-Tour Follow-up** | Daily 10:00 AM | Sends review requests and cross-sell offers to guests who completed a tour the previous day |
| **Booking Confirmation** | Booking confirmed | Sends confirmation email and WhatsApp to the guest when a booking moves to Confirmed stage |
| **OTA Booking Import** | Webhook | Processes incoming OTA booking notifications and creates pipeline entries |
| **Cancellation Notice** | Booking cancelled | Sends cancellation confirmation to guest and notifies the provider |
| **Availability Sync** | Hourly | Pushes current availability to connected OTA platforms |
| **Anna Retraining** | Correction submitted | Feeds agent corrections back into Anna's classification model |
| **Low Inventory Alert** | Real-time | Alerts agent when a tour has fewer than 3 spots remaining |

---

## Workflows Section in Operations

**Operations > Workflows** shows the workflow management interface:

### Getting Started
A quick-start wizard for operators new to workflow automation:
1. Review the available pre-built workflows
2. Enable the ones relevant to your business
3. Configure templates for confirmation and follow-up messages
4. Test with a sample booking

### All Workflows
A table of all configured workflows with:
- Workflow name and description
- Trigger type (schedule, webhook, event)
- Status (Active / Paused / Error)
- Last execution time and result
- Execution count and success rate

Click any workflow to view its full configuration or execution history.

### Process Monitor
Real-time view of workflows currently executing or recently completed:
- Displays processing status per workflow
- Shows queue depth (how many items are waiting)
- Highlights any workflows in an error state
- Allows manually triggering a workflow run

### Process History
Complete log of all workflow executions:
- Timestamp, workflow name, trigger event
- Success or failure status
- Execution duration
- Input data and output results
- Error details (for failed executions)

### Workflow Library
A catalog of pre-built workflow templates available to enable:
- Core tour operations workflows (manifest, itinerary, follow-up)
- OTA-specific workflows (Viator acknowledgment, GYG notification)
- Anna AI workflows (classification, routing, retraining)
- Custom workflow templates shared by Anshin

---

## Configuring Workflows

### Viewing a Workflow
Click any workflow in the list to open its configuration panel:

- **Trigger** — What starts the workflow (time, event, webhook)
- **Steps** — The sequence of actions (send email, call API, check condition, wait, etc.)
- **Variables** — Configurable parameters (email template, timing, conditions)
- **Error handling** — What happens if a step fails

### Modifying a Workflow
Most operators only need to change:
1. **Email templates** — Which template is used for each notification type
2. **Timing** — When scheduled workflows run (adjust for your time zone and business hours)
3. **Recipients** — Who receives each notification type

Full workflow editing (adding/removing steps, changing logic) is done via the N8N interface, accessible by Anshin administrators.

---

## Workflow Variables

Workflows use variables to personalize messages and make decisions. Common variables available across all workflows:

| Variable | Value |
|----------|-------|
| `{{customer.name}}` | Guest's full name |
| `{{booking.reference}}` | Booking reference number |
| `{{tour.name}}` | Product name |
| `{{tour.date}}` | Departure date |
| `{{tour.time}}` | Departure time |
| `{{tour.meeting_point}}` | Meeting location |
| `{{provider.name}}` | Assigned guide's name |
| `{{provider.phone}}` | Guide's phone number |
| `{{company.name}}` | Your organization name |
| `{{company.phone}}` | Your office phone |
| `{{company.emergency_phone}}` | Emergency contact number |

---

## Manifest Generation Workflow

One of the most critical automated workflows:

### What It Does
1. At 7:00 AM each day, the workflow queries all bookings with tours scheduled for tomorrow
2. For each booking, it compiles:
   - Guest list (names, nationalities, contacts)
   - Pickup schedule (hotel, time, room number)
   - Special requirements (dietary, mobility, child seats)
   - Tour details (meeting point, departure time, duration)
3. Generates a formatted manifest document
4. Sends the manifest to the assigned provider via:
   - Email (to provider's email address)
   - WhatsApp (to provider's WhatsApp number, if configured)
5. Marks the manifest as "Sent" in the booking record

### Last-Minute Bookings
If a booking is confirmed after 7:00 AM (after the daily manifest run), an agent can manually trigger manifest generation from the booking detail view: **Open booking → Actions → Generate & Send Manifest**.

---

## Itinerary Delivery Workflow

### What It Does
1. At 6:00 AM each day, the workflow queries bookings with tours in the next 48 hours
2. For each booking, it generates a personalized itinerary containing:
   - Day-by-day schedule
   - Inclusions and exclusions
   - What to bring
   - Pickup information
   - Emergency contact
3. Sends to the guest via email and/or WhatsApp

### Itinerary Formats
- **Email** — Rich HTML with your branding
- **WhatsApp** — Text summary with key details
- **PDF** — Attached to the email for guests who prefer to print

---

## Post-Tour Follow-up Workflow

### What It Does
1. At 10:00 AM each morning, the workflow queries tours that were marked as "Completed" the previous day
2. For each completed tour, it sends the guest:
   - A personalized thank-you message
   - A link to leave a review on the original booking platform
   - Optionally, a cross-sell offer for a related tour
3. Marks the follow-up as "Sent" in the booking record

### Configuring Follow-up Templates
Navigate to **Settings > Workflows** → select the Post-Tour Follow-up workflow → edit the message templates for each channel (email, WhatsApp) and each OTA platform (Viator follow-ups should link to the Viator review page; direct bookings to your own Google listing, etc.).

---

## Monitoring Workflow Health

### Daily Check
- Open **Operations > Workflows > Process Monitor** each morning
- Verify no workflows show an error state
- Check queue depths are normal (should be near zero after morning run)

### Signs of a Problem
| Symptom | Likely Cause |
|---------|-------------|
| Manifests not being sent | Workflow paused, or time zone misconfiguration |
| Itineraries not arriving | Email/WhatsApp connection issue |
| Review Queue growing rapidly | Anna processing paused; check Anna Control |
| Bookings not appearing from OTA | OTA webhook disconnected; check Channels |

### Checking Execution History
In **Process History**, filter by the workflow name and the date range to see every execution with success/failure status. For failed executions, click to see the error details and input data.

---

## Tips

### Test Before Going Live
Before your first live booking, manually trigger each workflow and verify the output:
1. Create a test booking
2. Manually trigger Manifest Generation
3. Verify the manifest arrives at the test provider email
4. Manually trigger Itinerary Delivery
5. Verify the itinerary arrives at the test guest email

### Keep Templates Up to Date
Review and update your email and WhatsApp templates quarterly. Outdated template content (wrong pricing, discontinued products, old contact info) creates a poor guest experience.

### Never Pause Critical Workflows Without Backup Plan
If you need to pause Manifest Generation or Itinerary Delivery for any reason, implement a manual process as a backup for the duration. Missing manifests mean guides aren't briefed — a serious operational risk.
