---
id: operations
title: Operations
sidebar_label: Operations
---

# Operations

The Operations section provides all the tools needed for day-to-day tour execution — managing departures, coordinating providers, monitoring AI decisions, and ensuring every guest has a seamless experience.

**How to get there:** Click **Operations** in the sidebar (calendar icon).

---

## Operations Sub-Pages

| Sub-Page | URL | Purpose |
|----------|-----|---------|
| **Booking Pipeline** | `/operations` | Kanban board for managing booking stages |
| **Booking Requests** | `/operations/booking-requests` | Table/list view of all booking requests |
| **Today's Tours** | `/operations/today` | All tours departing today |
| **Tour Calendar** | `/operations/calendar` | Calendar view of scheduled tours |
| **Resource Availability** | `/operations/resources` | Schedule of guides, vehicles, boats, equipment |
| **Review Queue** | `/operations/review-queue` | Items flagged by Anna for human review |
| **AI Logs** | `/operations/ai-logs` | Complete audit trail of Anna's actions |
| **Anna Control** | `/operations/anna-control` | Anna's operational status and monitoring |

---

## Today's Tours

Your real-time departure board. Shows every tour scheduled for today, giving you everything needed to coordinate operations from a single screen.

### What You See

| Column | Description |
|--------|-------------|
| **Tour Name** | Product name (e.g., "San Blas Island Hopping") |
| **Departure Time** | Scheduled departure |
| **Guest Count** | Total guests booked |
| **Guide / Provider** | Assigned guide, driver, or partner |
| **Status** | Current operational status |

### Tour Status Values

| Status | Meaning |
|--------|---------|
| **Scheduled** | Tour has not yet departed. Provider is assigned. |
| **Departed** | Tour has left. Guide has checked in. |
| **In Progress** | Tour is actively running. |
| **Completed** | All guests returned. Post-tour workflows will trigger. |

### Morning Checklist
1. Open Today's Tours at the start of your shift
2. Confirm every tour shows a provider in the Guide column — if any show "Unassigned", take immediate action
3. Verify manifests were sent (status should show "Manifest Sent" or "Confirmed")
4. Click any tour to open full detail including the complete guest list, pickup times, and special requirements

### Quick Actions from Tour Detail
- **Contact Guide** — Send message to assigned guide via email or WhatsApp
- **View Manifest** — Open the provider briefing document
- **View Itinerary** — Open the guest-facing day plan
- **Mark Departed / Completed** — Update tour status

---

## Tour Calendar

A full calendar view of all scheduled tours, giving you the broader scheduling picture beyond just today.

### Calendar Views

| View | What It Shows |
|------|--------------|
| **Day** | All tours on a single day, by time |
| **Week** | Tours across 7 days with time slots |
| **Month** | Traditional calendar grid with tour counts |

### Visual Indicators
- Tours are **color-coded** by product type or status for at-a-glance differentiation
- Each entry shows tour name, departure time, and guest count
- Click any month-view cell to drill down into that day's full tour list

### Interacting with the Calendar
- **Click a tour entry** — Opens the full tour detail popup
- **Drag a tour** to a different date/time slot — Creates a reschedule record and notifies affected parties
- **Filter by product** — Show only specific tour types
- **Filter by provider** — Show only tours assigned to a specific guide
- **Filter by status** — Hide cancelled or completed tours

---

## Resource Availability

Shows all schedulable resources and when they are available, making it easy to find a free guide, vehicle, or piece of equipment for a new booking.

### Resource Types

| Type | Examples |
|------|----------|
| **Guide** | Tour guides, naturalists, historians |
| **Driver** | Vehicle drivers, bus operators |
| **Boat** | Speedboats, catamarans, kayaks |
| **Vehicle** | Vans, buses, 4x4s |
| **Room** | Hotel rooms, lodges (multi-day tours) |
| **Equipment** | Snorkeling gear, bikes, climbing gear |

### What You See
A calendar-style grid where:
- **Rows** = individual resources (e.g., "Maria Garcia — Guide")
- **Columns** = days or time blocks
- **Colored blocks** = booked times (showing which tour)
- **Empty cells** = available

### Key Features
- **Conflict detection** — Warning if you attempt to double-book a resource
- **Working hours profiles** — Resources have defined hours; times outside their window are grayed out
- **Filter by resource type** — Toggle between Guides, Vehicles, Boats, etc.

### How to Check Availability
1. Navigate to Resource Availability
2. Filter by resource type and date range
3. Identify which resources are free at your needed time
4. Go back to the booking and assign the available resource

---

## Review Queue

The Review Queue contains emails and messages where Anna AI had low confidence in her classification — these need a human agent to verify or correct before processing continues.

### What You See Per Item

| Column | Description |
|--------|-------------|
| **Document** | The email or message Anna processed |
| **Anna's Suggestion** | Anna's detected platform, type, and product match |
| **Confidence Score** | 0-100% — how certain Anna is |
| **Received** | When the item arrived |

### Agent Actions

| Action | What It Does |
|--------|--------------|
| **Confirm** | Accept Anna's classification as correct — item is processed as Anna recommended |
| **Correct** | Override Anna's classification — select the correct platform, type, and product. This correction trains Anna. |
| **Dismiss** | Mark the item as irrelevant (spam, out-of-scope, duplicate) |

### How Corrections Train Anna
Every correction you make is recorded:
- What Anna guessed
- What the correct answer was
- The document context

This data improves Anna's classification model. Most teams see Review Queue volume decrease significantly over the first few weeks as Anna learns your specific OTA email formats and product catalog.

### Best Practice
**Review the queue every morning.** Keep it empty. A neglected Review Queue means:
- Unprocessed items block downstream booking creation
- Anna stops receiving feedback and stops improving
- Customers wait longer for responses

---

## AI Logs

Complete audit trail of every action Anna has taken — useful for monitoring, troubleshooting, and pattern analysis.

### Log Entry Fields

| Field | Description |
|-------|-------------|
| **Timestamp** | When the action occurred |
| **Document** | Input email or message |
| **Input** | Raw content sent to the AI model |
| **Output** | Classification result or action produced |
| **Confidence** | Score for this processing action |
| **Processing Time** | Time taken in milliseconds |
| **Model Used** | Which AI model was invoked |

### Filtering
- **Date range** — View logs from a specific period
- **Confidence level** — Find low-confidence items (e.g., < 60%)
- **Document type** — Filter by email, WhatsApp, etc.

### When to Use AI Logs
- **Accuracy monitoring** — Check if Anna maintains high confidence
- **Pattern detection** — Identify systematic misclassification (e.g., Anna consistently misreads one OTA's subject lines)
- **Debugging** — Trace why a specific booking was incorrectly processed

---

## Anna Control

Operational monitoring panel for the Anna AI engine.

### What You See

| Section | Description |
|---------|-------------|
| **Processing Status** | Whether Anna is active, idle, or paused |
| **Queue Depth** | Items currently waiting for AI processing |
| **Learning Progress** | Accuracy trends and correction rates over time |
| **Task Controls** | Start/stop specific AI task types |

### When to Use
- **Routine monitoring** — Confirm Anna is running and processing items
- **Troubleshooting** — If the Review Queue isn't receiving items, check if Anna's processing has stopped
- **Learning oversight** — View how Anna's accuracy has trended since you started providing corrections

> **Note:** Anna configuration (confidence thresholds, model settings, training data) is done in **Settings > Anna AI**. Anna Control is for operational monitoring only.

---

## Booking Requests (List View)

An alternative to the Kanban pipeline — the full table view of all booking requests. Better for searching, sorting, and bulk operations.

### Advanced Search Builder
Click **Filter** to open the Advanced Search Builder (ASB):

| Filter Type | Example |
|-------------|---------|
| Date range | Requests received in the last 7 days |
| Source channel | Show only Viator requests |
| Status | Show only "Needs Attention" items |
| Customer | Find all requests from a specific guest |
| Product | Show all requests for a specific tour |

Combine filters with AND/OR logic for precise results.

### Bulk Actions
Select multiple rows, then:
- **Assign to Agent** — Distribute workload among your team
- **Change Status** — Advance multiple bookings at once
- **Export** — Download to CSV for external reporting

---

## Daily Operations Rhythm

Build these into your routine:

| Time | Action | Location |
|------|--------|---------|
| **8:00 AM** | Confirm all today's tours have providers assigned | Today's Tours |
| **8:15 AM** | Process Review Queue items | Review Queue |
| **8:30 AM** | Review new overnight booking requests | Booking Requests |
| **Throughout day** | Process bookings through the pipeline | Booking Pipeline |
| **5:00 PM** | Mark completed tours; verify next-day manifests generated | Today's Tours |
