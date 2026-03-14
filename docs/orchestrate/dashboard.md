---
id: dashboard
title: Dashboard
sidebar_label: Dashboard
---

# Dashboard

The Dashboard is your operational command center — a real-time overview of your tour business. It loads immediately after login and provides at-a-glance visibility into what's happening today, what needs attention, and how your business is performing.

**How to get there:** Click **Dashboard** in the sidebar (or navigate to the root `/` of the app).

---

## Dashboard Tabs

The Dashboard has four tabs:

| Tab | Purpose |
|-----|---------|
| **Overview** | Pipeline summary, today's stats, top widgets |
| **Process Analytics** | Workflow execution metrics and automation health |
| **Booking Pipeline** | Quick Kanban view of active pipeline |
| **Revenue** | Financial performance summary |

---

## Overview Tab

### Top Stats Row
Four key metrics displayed prominently at the top:

| Metric | What It Shows |
|--------|--------------|
| **Today's Tours** | Number of tours departing today |
| **New Requests** | New booking requests received since midnight |
| **In Pipeline** | Total bookings currently being processed |
| **Revenue MTD** | Month-to-date revenue total |

### Widget Grid
The Overview tab displays a grid of real-time widgets:

#### Email Overview
A summary of your Communications inbox — shows unread count, recent messages, and how Anna has classified incoming emails. Provides a quick snapshot of communication activity without leaving the dashboard.

#### CRM Pipeline
Visual pipeline of your sales leads and opportunities — shows how many leads are at each stage (new, qualifying, proposing, confirmed).

#### Accounting Overview
Key financial KPIs at a glance:
- Outstanding invoices (unpaid/overdue)
- Recent payments received
- Upcoming provider settlements due

#### AI Classification Monitor
Real-time view of Anna's email classification activity:
- Emails processed in the last 24 hours
- Average confidence score
- Items placed in the Review Queue awaiting human attention
- Classification accuracy trend

#### Process Monitor
Status of active automated workflows — shows which N8N processes are running, any workflow errors, and the processing queue depth.

---

## Process Analytics Tab

Shows detailed metrics for automated business processes:

- **Workflow execution history** — How many times each workflow ran and whether it succeeded or failed
- **Processing time trends** — Average time for key operations (booking creation, manifest generation, etc.)
- **Error rates** — Percentage of workflow runs that encountered errors, with drill-down to see what failed
- **Volume metrics** — Bookings processed per day/week, emails classified, manifests sent

Use this tab to identify automation bottlenecks and monitor system health.

---

## Booking Pipeline Tab

A condensed Kanban board showing your active booking pipeline without navigating to the full Operations section. Useful for a quick status check. For full pipeline management, use [Operations > Booking Pipeline](/orchestrate/booking-pipeline).

Pipeline stages visible:
- **Processing** — New requests being reviewed
- **Needs Attention** — Items requiring agent action
- **Provider Assignment** — Awaiting guide/provider assignment
- **Confirmed** — Bookings confirmed with guests
- **Itinerary & Manifest** — Pre-departure documents generated
- **Active Tours** — Tours currently in progress

---

## Revenue Tab

Financial performance summary:

- **Revenue MTD** — Current month total vs. prior month
- **Revenue by Channel** — Breakdown by OTA (Viator, GetYourGuide, Booking.com, Direct, etc.)
- **Revenue by Product** — Which tours are generating the most revenue
- **Booking Volume Trend** — Daily bookings over the selected time period
- **Forecast** — Projected revenue based on confirmed future bookings

---

## Tips

### Start Every Day Here
Open the Dashboard first thing each morning. The Overview tab immediately shows you:
- How many tours are departing today (check providers are assigned)
- New overnight requests (take action before the business day starts)
- Review Queue items Anna flagged (process these early to keep the pipeline moving)

### Use Dashboard as a Health Check
If the AI Classification Monitor shows a high volume of Review Queue items or low confidence scores, that's a signal to check your Anna AI detection patterns (Settings > Anna AI).

### Dark Mode
Toggle dark mode with the sun/moon icon in the header. Many agents prefer dark mode for long shifts.
