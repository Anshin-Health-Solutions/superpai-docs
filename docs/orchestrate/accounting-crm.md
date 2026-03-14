---
id: accounting-crm
title: Accounting & CRM
sidebar_label: Accounting & CRM
---

# Accounting & CRM

Anshin Orchestrate includes built-in financial management and customer relationship tools powered by the **ERPNext framework**. Most financial documents are auto-generated from your booking activity — your primary job is to verify accuracy, process exceptions, and monitor the financial health of your business.

---

## Accounting

**How to get there:** Click **Accounting** in the sidebar.

The Accounting section covers all financial documents — sales invoices, purchase invoices, journal entries, and your chart of accounts.

### Sales Invoices

Sales Invoices are bills issued to customers for tours and services.

**Where:** Accounting > Sales Invoices

| Field | Description |
|-------|-------------|
| Invoice Number | Unique identifier (e.g., `SINV-00142`) |
| Customer | The guest being invoiced |
| Linked Booking | The Orchestrate booking that generated this invoice |
| Items | Line items: tour product, guest count, rate, amount |
| Grand Total | Total amount due including taxes |
| Status | Draft → Submitted → Paid / Overdue / Cancelled |
| Due Date | Payment deadline |

**How invoices are created (automatic flow):**
1. Booking is confirmed in the pipeline
2. Sales Order is auto-created from the confirmed booking
3. Sales Order converts to a Sales Invoice
4. Invoice is sent to the customer (manually or via email template)

**Your role:** Verify the correct product, guest count, pricing tier, and extras are reflected before submitting. If something is wrong, correct it in the source booking first.

---

### Purchase Invoices

Purchase Invoices are bills received from providers (guides, drivers, boats, partners).

**Where:** Accounting > Purchase Invoices

| Field | Description |
|-------|-------------|
| Invoice Number | Unique identifier (e.g., `PINV-00089`) |
| Supplier | The provider who issued the bill |
| Items | Services rendered, quantities, rates |
| Grand Total | Amount owed to the provider |
| Status | Draft → Submitted → Paid / Overdue |

Create purchase invoices manually when you receive a provider's bill, or generate from a Purchase Order when costs are finalized.

---

### Chart of Accounts

A view of your organization's account structure — the categories used to classify all financial transactions (revenue, expenses, assets, liabilities).

**Where:** Accounting > Chart of Accounts

For most agents, this is **view-only**. Your administrator or accountant sets up and maintains the account structure. You may need to reference it when coding unusual transactions.

---

## Selling

The Selling section manages the sales-side documents between booking and invoicing.

### Sales Orders

Sales Orders are the formal commitment that a customer is purchasing a tour — the bridge between the booking system and accounting.

**Where:** Accounting > Sales Orders

| Field | Description |
|-------|-------------|
| Order Number | Unique identifier (e.g., `SO-00231`) |
| Customer | The customer who placed the order |
| Linked Booking | The Orchestrate booking |
| Items | Tour products, packages, extras |
| Grand Total | Total sale value |
| Status | Draft → To Deliver and Bill → To Bill → Completed |

**Auto-creation:** When a booking moves to "Confirmed" status, a Sales Order is automatically created. Review for accuracy before billing.

### Quotations

Quotations are price proposals sent to potential customers before they commit.

**Use case:** A customer inquires about a custom multi-day tour. You create a Quotation showing the itinerary and total price. When they accept, the Quotation converts to a Sales Order.

---

## Buying

Covers the purchasing side — managing what you owe to providers and suppliers.

### Purchase Orders

Purchase Orders are formal requests to providers for services, created before a tour runs to confirm the provider's costs.

**Workflow:**
1. Booking is confirmed → Assign provider
2. Create Purchase Order to the provider specifying the tour date and agreed rate
3. After the tour, the provider sends an invoice
4. Match provider invoice to the Purchase Order → create Purchase Invoice → pay

---

## CRM

**How to get there:** Click **CRM** in the sidebar.

The CRM module tracks your sales pipeline from initial lead to converted customer — crucial for managing direct booking inquiries that haven't yet committed.

### Leads

A Lead represents a potential customer who has expressed interest but hasn't booked yet.

**Where:** CRM > Leads

| Field | Description |
|-------|-------------|
| Lead Name | Person's name |
| Company | Their organization (for group/corporate bookings) |
| Email / Phone | Contact information |
| Source | How they found you (website, referral, trade show, social) |
| Status | New → Contacted → Replied → Interested → Converted / Lost |
| Inquiry | What they're interested in (which products, dates, group size) |
| Follow-up Date | Scheduled date for next contact |
| Notes | Free-text notes on conversations |

**Converting a Lead:**
When a lead commits to a booking, click **Convert to Customer**. This creates a Customer record and optionally creates a Booking Request in the pipeline.

---

### Opportunities

An Opportunity represents a qualified lead — someone you've spoken with and who is seriously considering booking.

| Field | Description |
|-------|-------------|
| Opportunity Name | Descriptive name for this sales opportunity |
| Customer / Lead | The person (can be linked to a Lead or existing Customer) |
| Expected Value | Estimated booking value |
| Expected Close Date | When you expect them to confirm |
| Stage | Qualifying → Needs Analysis → Proposal → Negotiation → Closed |
| Linked Products | Which tours they're considering |
| Notes | Conversation history and next steps |

---

### Customers

The Customer record is the full financial and booking history for a guest.

**Where:** CRM > Customers

Customers in the CRM section represent the same records as in Master Data > Customers — they're the same data viewed through the financial lens. From the CRM view, you see:

- Complete booking history with values
- Outstanding invoices
- Payment history
- Communication history
- Notes and tags

---

## Financial Reports

Basic financial reports are accessible through the Accounting module:

| Report | What It Shows |
|--------|--------------|
| **Accounts Receivable** | Outstanding customer invoices |
| **Accounts Payable** | Outstanding provider bills |
| **Revenue by Product** | Which tours generated the most income |
| **Revenue by Channel** | OTA vs. direct booking breakdown |
| **Monthly P&L** | Revenue minus provider costs per month |

For advanced analytics and custom reports, use the **Insights** section.

---

## Tips

### Trust the Auto-Generation, But Verify
Most invoices and orders are auto-created correctly. However, always verify before submitting:
- Confirm the product price matches the agreed or published rate
- Check that any extras or add-ons are included
- Verify tax rates are correct for the booking's origin country

### Keep Provider Purchase Orders Current
Create Purchase Orders for all tours immediately after assigning a provider. This ensures you have a complete record of committed costs and makes provider settlement straightforward at month-end.

### Use Quotations for Group Bookings
For groups of 8+, always send a formal Quotation before confirming. This sets clear expectations on price, inclusions, and cancellation terms — reducing disputes.
