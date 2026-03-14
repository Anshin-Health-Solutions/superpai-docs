---
id: master-data
title: Master Data
sidebar_label: Master Data
---

# Master Data

Master Data is the foundational reference layer of Anshin Orchestrate — the business objects that everything else depends on. Products, providers, customers, locations, seasons, pricing, and policies are all configured here. Getting master data right is the single most important setup task for any new organization.

**How to get there:** Click **Master Data** in the sidebar (package icon).

---

## Setup Order

Master data records reference each other, so they must be created in the right sequence. Follow this order:

```
1. Locations         → Where your tours happen
2. Providers         → Who delivers your tours (guides, drivers, boats)
3. Seasons           → When your products run (date ranges + pricing tiers)
4. Product Types     → Categories of products (Day Tour, Multi-Day, Package...)
5. Pricing Categories → Customer segments (Adult, Child, Senior, Group...)
6. Cancellation Policies → Refund rules by timeframe
7. Products          → Your individual tour offerings
8. Packages          → Bundled combinations of Products
9. Customers         → Guest records (often auto-created from bookings)
```

---

## Products

Products are the individual tours and activities you sell — the core of your catalog.

### Key Product Fields

| Field | Description |
|-------|-------------|
| **Product Name** | Display name (e.g., "San Blas Island Full Day") |
| **Product Code** | Internal SKU or OTA product code |
| **Product Type** | Category (Day Tour, Multi-Day, Package, Transfer, etc.) |
| **Duration** | Hours or days the product takes |
| **Location** | Where the tour departs from/takes place |
| **Season** | Which season(s) the product runs in |
| **Capacity** | Maximum guests per departure |
| **Minimum Guests** | Minimum required to run the tour |
| **Meeting Point** | Where guests assemble |
| **Inclusions** | What's included in the price |
| **Exclusions** | What's not included |
| **What to Bring** | Recommended items for guests |
| **Age Restrictions** | Minimum/maximum age requirements |
| **Cancellation Policy** | Which cancellation rules apply |
| **Provider(s)** | Which providers can deliver this tour |

### OTA Product Mappings
Each product can be mapped to OTA product codes:
- **Viator Product ID** — VIA's internal code for this tour
- **GetYourGuide Tour ID** — GYG's internal code
- **Booking.com Product ID** — BDC's reference

These mappings allow the Channels integration to automatically match incoming OTA bookings to the correct Orchestrate product.

---

## Packages

Packages are bundled combinations of multiple Products, often sold as multi-day experiences.

**Example:** "Panama City + San Blas 5-Day Adventure" combines:
- Day 1: Panama City Walking Tour
- Days 2-4: San Blas Island Hopping
- Day 5: Canal Transit Tour

### Package Fields
- Components (list of products + sequence)
- Package pricing (may differ from sum of individual products)
- Package inclusions/exclusions
- Accommodation details (if applicable)
- Transportation between components

---

## Providers

Providers are the people and companies who deliver your tours — guides, drivers, boat operators, partner agencies, and subcontractors.

### Provider Fields

| Field | Description |
|-------|-------------|
| **Name** | Provider's name or company name |
| **Type** | Guide, Driver, Boat Operator, Agency, etc. |
| **Contact Email** | For sending manifests and communications |
| **Phone / WhatsApp** | For manifest delivery and day-of coordination |
| **Languages** | Languages the provider speaks (for guest matching) |
| **Products** | Which tours this provider can lead |
| **Working Hours** | Their typical availability schedule |
| **Bank Details** | For provider payment settlements |
| **Contract Rate** | Cost per tour or per-guest rate |

### Provider Availability
The system tracks provider availability in real-time — visible in Operations > Resource Availability. When you assign a provider to a booking, the system:
1. Checks their schedule for conflicts
2. Warns if they are already assigned to another tour at the same time
3. Blocks double-booking if configured to prevent it

---

## Locations

Locations define where your tours operate — departure points, activity areas, regions, and meeting points.

### Location Fields
- Location name and type (City, Attraction, Region, Port, Airport, etc.)
- Country and region
- Coordinates (latitude/longitude for map display)
- Address and directions for guests
- Pickup zones (sub-locations within this area)

---

## Seasons

Seasons define time-based rules for your products — which products run during which date ranges, and the pricing that applies.

### Season Configuration
- Start date and end date
- Products active during this season
- Pricing overrides (high season vs. low season rates)
- Blackout dates (dates within the season where tours don't run)

**Example:**
- "High Season" — December 15 to April 30 — Premium pricing
- "Low Season" — May 1 to December 14 — Standard pricing
- "Rainy Season Closure" — October 1 to November 30 — No tours

---

## Customers

Customer records represent your guests. They are linked to all their bookings, communications, invoices, and contact history.

### How Customers Are Created
- **Automatically** — When a booking arrives from an OTA or email, the system creates or matches a customer record
- **From Contacts** — When a Contact in the Communications section is converted to a Customer
- **Manually** — Agents can create customer records directly

### Customer Fields
| Field | Description |
|-------|-------------|
| Full Name | Guest's name |
| Email | Primary email |
| Phone | Contact number |
| Nationality | Country of origin |
| Language | Preferred communication language |
| Booking History | All past and future bookings |
| Communication History | All emails and WhatsApp messages |
| Invoices | All financial transactions |

---

## Other Master Data Objects

The Master Data section also contains these reference objects:

| Object | Purpose |
|--------|---------|
| **Product Extras** | Add-on services (airport transfer, equipment rental, meal upgrades) |
| **Pickup Locations** | Hotel-level pickup points within a location |
| **Resource Types** | Categories of assignable resources (Guide, Vehicle, Boat, Equipment) |
| **Pricing Categories** | Guest segments with different rates (Adult, Child, Senior, Group) |
| **Cancellation Policies** | Refund tiers by how far in advance the cancellation occurs |
| **Attribute Definitions** | Custom data fields for products (difficulty level, fitness requirement, etc.) |
| **Promotions** | Discount codes and promotional pricing rules |
| **Wiki Pages** | Internal knowledge base articles |
| **Post-Tour Followups** | Tracking records for follow-up message delivery |

---

## The Universal Data Table (UDT)

All Master Data list pages use the same interface — the Universal Data Table:

```
┌─────────────────────────────────────────────────────┐
│ [Search...]  [Filter]  [Columns]  [Export]  [+ New] │
├─────────────────────────────────────────────────────┤
│ Column A  │ Column B  │ Column C  │ Column D  │ ... │
├───────────┼───────────┼───────────┼───────────┤     │
│ Row 1     │           │           │           │     │
│ Row 2     │           │           │           │     │
│ Row 3     │           │           │           │     │
├─────────────────────────────────────────────────────┤
│ Showing 1-20 of 150   │  [< Prev]  [Next >]  │ 20 ▼│
└─────────────────────────────────────────────────────┘
```

### UDT Features

| Feature | How to Use |
|---------|-----------|
| **Search** | Free-text across all visible columns |
| **Filter (ASB)** | Advanced AND/OR filtering with 16+ operators |
| **Column Visibility** | Show/hide columns, drag to reorder |
| **Sort** | Click column headers |
| **Export** | Download as CSV |
| **New Record** | Opens creation form |
| **Row Detail** | Double-click a row to open the full form |
| **Pagination** | Navigate pages, select rows per page |

### Advanced Search Builder (ASB)
The Filter button opens the Advanced Search Builder — a powerful query tool:

```
WHERE:
  [Product Name] [contains] [kayak]
  AND [Location] [equals] [Panama City]
  AND [Status] [is active]
```

Supports operators: equals, not equals, contains, starts with, ends with, greater than, less than, between, is empty, is not empty, in list, not in list.

---

## Tips

### Seed Data in the Correct Order
Always follow the setup sequence. Creating a Product before its required Location and Season will result in validation errors.

### Keep Product Codes Consistent
Use your OTA product codes as Orchestrate product codes whenever possible. This makes OTA channel mapping straightforward and reduces confusion.

### Use Pickup Locations
If you offer hotel pickup, create a Pickup Location for each hotel you service. The system will use these to auto-generate accurate pickup schedules in manifests.

### Audit Product Catalog Quarterly
Review your product catalog regularly. Archive discontinued products rather than deleting them — this preserves booking history.
