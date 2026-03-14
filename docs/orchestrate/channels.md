---
id: channels
title: Channels & OTA Integrations
sidebar_label: Channels
---

# Channels & OTA Integrations

The Channels section manages all of Orchestrate's connections to Online Travel Agencies (OTAs) and distribution platforms. It is where you configure integrations, monitor incoming bookings, sync availability, and track connection health.

**How to get there:** Click **Channels** in the sidebar (plug icon).

---

## Supported Platforms

| Platform | Code | Integration Type |
|----------|------|-----------------|
| **Viator** | VIA | Webhook + API — booking import, availability sync |
| **GetYourGuide** | GYG | Webhook + API — booking import, availability sync |
| **Booking.com Attractions** | BDC | Webhook — booking import |
| **Expedia** | EXP | Webhook — booking import |
| **Direct Booking** | DIR | API — from your own website or storefront |

---

## Channels Sub-Pages

| Page | Purpose |
|------|---------|
| **Connectors** | Configure and manage platform connections |
| **Bookings** | All incoming OTA bookings (raw feed) |
| **Products** | OTA product catalog sync and mapping |
| **Social** | Social media channel connections |
| **Commerce** | E-commerce settings and checkout configuration |
| **Sync Dashboard** | Real-time status of all channel sync operations |
| **Job Monitor** | Background job queue for channel processing |
| **Events** | Webhook event log from all platforms |
| **API Logs** | Outbound API call history and errors |

---

## How OTA Integration Works

### Incoming Booking Flow

```
OTA Platform
     │
     │  Webhook POST (new booking notification)
     ▼
Orchestrate Channels API
     │
     │  Parse booking data
     │  Match to product (via OTA product mapping)
     ▼
Anna AI
     │
     │  Validate and classify
     │  Confidence check
     ▼
Booking Pipeline (New Requests stage)
     │
     ▼
Agent processes the booking
```

### Key Data in OTA Webhook Payloads

When a booking arrives from an OTA, the payload typically contains:
- OTA booking reference number
- Tour product code
- Tour date and time
- Guest count (adults, children, seniors)
- Lead guest name and contact
- Booking price (amount paid to OTA)
- Special requests or notes

Orchestrate maps the OTA product code to your internal product catalog using the **OTA Product Mapping** configuration.

---

## Connectors

### Setting Up a New Connector

1. Navigate to **Channels > Connectors**
2. Click **+ New Connector**
3. Select the platform (Viator, GetYourGuide, etc.)
4. Enter your API credentials:
   - **API Key** — Your OTA partner API key
   - **Supplier ID / Operator Code** — Your account identifier on the platform
   - **Webhook URL** — Orchestrate provides a unique URL to register in your OTA dashboard
5. Test the connection
6. Save and activate

### Connector Health
The Connectors page shows the current status of each connection:
- **Active** — Connected and receiving bookings
- **Warning** — Connected but some errors in recent webhooks
- **Error** — Connection failing; check credentials
- **Inactive** — Manually disabled

---

## OTA Product Mapping

Product mapping tells Orchestrate how to match OTA product codes to your internal products.

### Why This Matters
When Viator sends a booking for "product ID 12345", Orchestrate needs to know that product 12345 maps to your "San Blas Island Full Day" product. Without this mapping, the booking can't be properly assigned.

### Creating a Mapping
1. Go to **Channels > Products**
2. Find your internal product
3. Click **Edit Mappings**
4. For each OTA, enter the OTA's product ID or tour option ID
5. Save

### Handling Unmapped Products
If a booking arrives for an OTA product code with no matching internal product:
1. The booking is placed in the **Review Queue** with an "Unmapped Product" flag
2. An agent reviews, identifies the correct internal product, and maps it
3. Future bookings for the same OTA product code will auto-route correctly

---

## Sync Dashboard

The Sync Dashboard provides a real-time view of all channel synchronization operations:

| Column | Description |
|--------|-------------|
| Platform | Which OTA this sync is for |
| Operation | What's being synced (bookings, availability, pricing) |
| Status | Running / Completed / Failed |
| Last Run | When the last sync occurred |
| Records | How many records were processed |
| Errors | Any errors in the last sync run |

### Availability Sync
For platforms that support two-way availability sync (Viator, GetYourGuide):
- Orchestrate pushes your availability calendar to the OTA
- When a timeslot fills up, the OTA is notified to stop accepting new bookings
- This prevents overbooking across channels

---

## Job Monitor

Background processing queue for all channel operations. Shows:
- Pending jobs (webhooks waiting to be processed)
- Active jobs (currently processing)
- Completed jobs (recently processed, with success/failure status)
- Failed jobs (with error details for debugging)

If you notice incoming bookings are being delayed, check the Job Monitor for a processing backlog.

---

## Events Log

A complete log of all webhook events received from OTA platforms:

| Column | Description |
|--------|-------------|
| Timestamp | When the webhook was received |
| Platform | Which OTA sent the event |
| Event Type | booking_created, booking_cancelled, booking_modified, etc. |
| Booking Ref | OTA's booking reference number |
| Status | Processed / Failed / Pending |
| Payload | Raw JSON payload from the OTA |

Use this log to:
- Verify a specific booking was received
- Debug why a booking didn't appear in the pipeline
- Trace the full lifecycle of an OTA booking event

---

## API Logs

Log of all **outbound** API calls from Orchestrate to OTA platforms:

| Column | Description |
|--------|-------------|
| Timestamp | When the API call was made |
| Platform | Target OTA |
| Operation | What was sent (availability update, confirmation, etc.) |
| HTTP Status | Response code from the OTA (200, 400, 500, etc.) |
| Response | OTA's response body |

Use this log when availability updates aren't reflecting on the OTA side — the API Logs will show if the update was sent and what the OTA responded.

---

## Direct Booking Integration

The **DIR** channel represents bookings from your own website or storefront (not from an OTA).

### Direct Storefront
Orchestrate provides a white-label storefront application that you can embed or host separately:
- **URL pattern:** `{domain}/sites/{your-slug}/packages`
- Customer browses available packages
- Selects a date and completes checkout
- Booking is automatically created in Orchestrate and placed in the pipeline

### WordPress Plugin
For WordPress-based websites, use the Anshin Orchestrate WordPress plugin:
```wordpress
[anshin_packages limit="6" columns="3"]
[anshin_tours limit="4" columns="4"]
```
The plugin fetches live data from the Orchestrate API and renders it within your WordPress theme.

See [Public Storefronts](/orchestrate/storefronts) for complete documentation.

---

## Tips

### Map Products Before Going Live
Complete OTA product mapping before activating a connector. Unmapped bookings pile up in the Review Queue and require manual intervention.

### Monitor the Events Log Daily
During the first week after connecting a new OTA, check the Events Log daily to verify bookings are flowing correctly and none are failing.

### Set Up Booking Acknowledgments
Configure an auto-reply acknowledgment for each OTA's confirmation emails. This keeps customers informed while you process their booking in the pipeline.

### Use Sync Dashboard for Troubleshooting
If a customer tells you their OTA booking isn't showing in your system, the Events Log is the first place to check.
