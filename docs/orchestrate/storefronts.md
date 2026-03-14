---
id: storefronts
title: Public-Facing Storefronts
sidebar_label: Storefronts
---

# Public-Facing Storefronts

Anshin Orchestrate powers customer-facing booking experiences through two integration patterns. Both allow your website visitors to browse your tour catalog and submit booking requests that flow directly into your Orchestrate pipeline.

---

## Integration Options

| Option | Best For | Technology |
|--------|----------|-----------|
| **Direct Storefront** | Dedicated booking site, custom domain | Next.js embedded application |
| **WordPress Plugin** | WordPress-powered websites | WooCommerce extension (v1.2.0) |

---

## Direct Storefront

The direct storefront is a standalone Next.js application hosted by Anshin that displays your live tour catalog and handles booking submissions.

### URL Structure
```
https://{your-domain}/sites/{tenant-slug}/home
https://{your-domain}/sites/{tenant-slug}/packages
https://{your-domain}/sites/{tenant-slug}/tours
```

**Example:** `https://app.orchestrate.anshin.us/sites/atl/home`

The `{tenant-slug}` is your organization's unique identifier, assigned during onboarding.

### Storefront Features

| Feature | Description |
|---------|-------------|
| **Package Catalog** | Grid display of all published packages with images and descriptions |
| **Category Filters** | Filter packages by type (Day Tour, Multi-Day, Cabin Stay, Diving Package, etc.) |
| **Product Detail Pages** | Full descriptions, inclusions/exclusions, pricing, availability calendar |
| **Booking Form** | Guest count, date selection, contact information, special requests |
| **Real-Time Availability** | Live check against Orchestrate's inventory |
| **Multi-Language** | Inherits language from the operator's settings |
| **Dark/Light Mode** | User-switchable theme |
| **Mobile Responsive** | Optimized for phone and tablet booking |

### Navigation Elements
The storefront header includes:
- Your company name and logo
- Primary nav: Home, Tours, About, Blog, Contact, Packages, Build Your Tour
- Language selector
- Dark/light mode toggle
- User account icon
- Shopping cart
- Contact Us button

### Storefront → Pipeline Flow

```
Customer browses packages on storefront
       │
       ▼
Customer selects a tour, date, and guest count
       │
       ▼
Customer completes booking form
       │
       ▼
Orchestrate API receives booking submission
       │
       ▼
New Booking Request created in pipeline (Source: DIR)
       │
       ▼
Agent processes booking in the Orchestrate client app
```

### Customization
The storefront is configured through your Orchestrate settings:
- **Products to display** — Only published products appear; control visibility per product in Master Data
- **Branding** — Logo and primary color from Settings > General
- **Domain** — Contact Anshin to configure a custom domain (e.g., `book.yourcompany.com`)

---

## WordPress Plugin

The Anshin Orchestrate WordPress plugin is a **WooCommerce extension** (v1.2.0) that deeply integrates your Orchestrate tour catalog with a WordPress/WooCommerce-powered website. Rather than a simple embed, it provides a full suite of catalog, booking, commerce, and CRM features layered on top of WooCommerce.

### Demo Site
Demo URL: `https://web.orchestrate.anshin.us/home/`

### Requirements
- WordPress 6.x
- WooCommerce (active)
- Orchestrate API URL and Tenant credentials (provided by Anshin)

### Installation

1. Log into your WordPress admin dashboard (`/wp-admin`)
2. Navigate to **Plugins > Add New**
3. Upload the Anshin Orchestrate plugin zip file (provided by Anshin)
4. Click **Activate**
5. Navigate to **WooCommerce > Settings** — the Anshin Orchestrate tab is added automatically
6. Enter your **API URL** and **Tenant ID** (provided by Anshin during onboarding)
7. Enable **Order Sync** and **Status Polling** as required
8. Save settings

### Connection Settings

API connection and sync settings are managed through **WooCommerce > Settings > Anshin Orchestrate**:

| Setting | Description |
|---------|-------------|
| **API URL** | Your Orchestrate instance URL (e.g., `https://core.orchestrate.anshin.us`) |
| **Tenant ID** | Your organization's tenant identifier |
| **Order Sync** | Syncs WooCommerce orders to Orchestrate bookings |
| **Status Polling** | Polls Orchestrate for real-time booking status updates |

### Plugin Dashboard

After installation, the plugin adds an **Anshin Orchestrate** menu to your WordPress admin. The dashboard shows:

- **Connection status** — Confirms the API is reachable and authenticated
- **Business metrics** — Total Bookings, Confirmed, Revenue, Newsletter Signups, Cancelled, Completed
- **Bookings by Destination** — Chart of booking distribution across tour products
- **Payment Status** — Breakdown of payment states across all bookings
- **Feature status summary** — Count of enabled vs. disabled features (e.g., 41/44 enabled)

### Plugin Features

The plugin ships with **44 features** across 8 categories. Features can be individually enabled or disabled from **Anshin Orchestrate > Features**:

#### Catalog & Discovery
| Feature | Status |
|---------|--------|
| Catalog Sync | Enabled |
| Availability | Enabled |
| Dynamic Pricing | Enabled |
| JSON-LD (structured data for SEO) | Enabled |
| Tour Filters | Enabled |
| Tour Map | Enabled |
| Product Compare | Enabled |
| Trending Products | Enabled |

#### Booking Management
| Feature | Status |
|---------|--------|
| Booking Lookup | Enabled |
| Cancel | Enabled |
| Reschedule | Enabled |
| Participants | Enabled |
| My Account — Bookings | Enabled |
| Booking Wizard | Coming Soon |
| Digital Waivers | Coming Soon |
| Travel Preferences | Coming Soon |
| Group Booking | Coming Soon |

#### Quote & Cart
| Feature | Status |
|---------|--------|
| Quote Engine | Disabled |
| Cart Holds | Enabled |
| Checkout Validation | Enabled |

#### CRM & Marketing
| Feature | Status |
|---------|--------|
| Newsletter | Enabled |
| Lead Capture | Enabled |
| CRM Tags | Enabled |

#### Commerce
| Feature | Status |
|---------|--------|
| Gift Cards | Enabled |
| Loyalty | Enabled |
| Promo Codes | Enabled |
| Referrals | Enabled |
| Wishlist | Enabled |
| Vouchers | Enabled |
| Addons | Disabled |
| Deposits | Disabled |

#### Reviews & Social
| Feature | Status |
|---------|--------|
| Reviews | Enabled |
| Social Proof | Enabled |

#### Communication
| Feature | Status |
|---------|--------|
| Customer Messaging | Enabled |

#### Media & Content
| Feature | Status |
|---------|--------|
| Photo Gallery | Coming Soon |
| Itinerary Export | Enabled |
| Itinerary Share | Enabled |
| Weather Widget | Enabled |

### How the Plugin Works

The plugin bridges WooCommerce with Orchestrate via API:

1. **Catalog Sync** pulls your published tour products from Orchestrate into WooCommerce as products
2. **Availability** is checked in real time against Orchestrate's inventory during browsing and at checkout
3. **Booking submission** POSTs to the Orchestrate booking API, creating a Direct (DIR) booking in your pipeline
4. **Order Sync** maps WooCommerce orders back to Orchestrate bookings, keeping statuses in sync
5. **Status Polling** pushes booking status changes from Orchestrate (e.g., Confirmed, Cancelled) back into WooCommerce order records

### Styling
The plugin's output renders within your WordPress theme's styles. Customize appearance via **WordPress > Appearance > Customize > Additional CSS**, or by editing the child theme stylesheet directly. The demo environment uses the "Anshin Travel Child" theme as a reference implementation.

---

## Managing Storefront Products

Control which products are visible on both storefront types from within Orchestrate:

1. Navigate to **Master Data > Products**
2. Open a product record
3. Find the **Visibility** or **Published** toggle
4. Enable "Published to Storefront" to make it visible
5. Disable to hide it (e.g., for products under construction or out of season)

---

## Booking Flow

Regardless of which storefront integration is used, all bookings follow the same flow into Orchestrate:

1. **Customer submits booking** on storefront or WordPress site
2. **New Booking Request** created automatically in the pipeline (Source: DIR)
3. **Anna AI validates** the booking data
4. **Agent reviews** the request in Operations > Booking Pipeline
5. **Agent confirms** availability, assigns provider, and confirms the booking
6. **System sends** booking confirmation to customer
7. **Automatic workflows** handle manifest, itinerary, and follow-up

---

## Build Your Tour (Custom Requests)

Both storefronts support a **"Build Your Tour"** feature — a customization form where customers can request a tailored itinerary rather than selecting from a fixed catalog:

- Customer specifies interests, dates, group size, budget
- Form submission creates a **Lead** in the CRM module
- Agent reviews the lead and creates a custom **Quotation**
- Quotation is sent to the customer for approval
- Upon acceptance, a Sales Order and Booking are created

---

## Tips

### Keep Catalog Fresh
Review your storefront-published products monthly. Remove products that are no longer offered, update descriptions and pricing, and add new products as they launch.

### Use High-Quality Images
The storefront displays product images prominently. Upload high-resolution photos (minimum 1200x800px) in the product record for the best visual presentation.

### Test Booking Forms Regularly
Submit a test booking from each storefront at least monthly to verify the end-to-end flow is working. Check that the booking appears correctly in your pipeline.

### Configure Custom Domain Early
If you want the storefront on your own domain (e.g., `book.sunsettourspty.com`), request this from Anshin during initial setup — DNS propagation can take 24-48 hours.

### Enable Features Incrementally
Start with the core Catalog & Discovery and Booking Management features. Enable Commerce features (Gift Cards, Loyalty, Promo Codes) once your basic booking flow is tested and stable.
