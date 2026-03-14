---
id: admin-portal
title: Admin Portal
sidebar_label: Admin Portal
---

# Admin Portal

The Admin Portal is a separate application used exclusively by **Anshin Health Solutions staff** to manage all tenants, platform health, billing, AI infrastructure, and data operations. Tour operator clients do not have access to this portal.

> **Access:** `https://admin.orchestrate.anshin.us` — Anshin internal staff only.

---

## Admin Portal Navigation

| Section | Purpose |
|---------|---------|
| **Dashboard** | Platform-wide operational overview |
| **Tenants** | Manage all client organizations |
| **Audit Log** | System-level audit trail *(in development)* |
| **System** | Platform health monitoring |
| **Billing** | Subscription management for all tenants |
| **Helpdesk** | Support ticket management *(in development)* |
| **Announcements** | Broadcast messages to all tenants |
| **Team** | Anshin admin team management |
| **Email Templates** | Platform-level email template library *(fixing)* |
| **Anna AI** | Platform-wide Anna knowledge base management |
| **Seed Data** | Living Demo Universe — demo data generator |
| **Cleanup** | Derelict tenant maintenance |

---

## Dashboard

The admin dashboard shows a high-level overview across all tenants:
- Total active tenants and user counts
- Platform-wide booking volume
- System health indicators
- Recent alerts and anomalies

---

## Tenants

The Tenants page is the primary management interface for all client organizations.

### Tenant Record Contents
| Field | Description |
|-------|-------------|
| Tenant Name | Organization name |
| Slug | URL identifier (e.g., `atl` for `sites/atl`) |
| Plan | Free Trial / Self-Serve / White Glove |
| Status | Active / Trial / Suspended / Churned |
| Users | Number of active users |
| Created | Onboarding date |
| Last Active | Most recent user activity |
| Feature Flags | Which optional features are enabled |

### Tenant Operations
From the tenant record, Anshin staff can:
- **Activate / Suspend** the tenant
- **Enable/disable feature flags** (e.g., `orch_pricing_engine`)
- **Impersonate** the tenant to troubleshoot issues (with audit logging)
- **View billing status** and payment history
- **Reset credentials** if requested
- **View audit logs** for the tenant's activity

### Feature Flags
Feature flags control which advanced features are available to each tenant:

| Flag | Feature |
|------|---------|
| `orch_pricing_engine` | Advanced pricing rules and rate plans |
| `orch_use_timeslot_instances` | Timeslot instance management |
| `orch_use_resource_reservations` | Resource availability and scheduling |
| `orch_accommodation` | Property and room inventory |
| `orch_ecommerce` | Checkout flows and e-commerce |
| `orch_structured_itineraries` | Visual itinerary editor |

---

## System Health

The System page shows the real-time health of all platform components:

| Component | Monitored Metrics |
|-----------|-----------------|
| **API Server** | Response time, error rate, uptime |
| **Database** | Query performance, connection pool, disk usage |
| **N8N (Workflows)** | Active workflows, execution queue depth, errors |
| **AI Engine** | Anna processing status, model response times |
| **Email Gateway** | Delivery rates, bounce rates, queue depth |
| **Background Jobs** | Job queue health, failure rates |

### Alerting
The system generates alerts when:
- Any component exceeds its error threshold
- API response times degrade
- The job queue builds up beyond normal limits
- An N8N workflow encounters repeated failures

---

## Billing

Manages subscription and billing for all tenants.

### Billing Overview
| Column | Description |
|--------|-------------|
| Tenant | Organization name |
| Plan | Current subscription plan |
| Billing Cycle | Monthly / Annual |
| Next Billing Date | When next payment is due |
| Status | Current / Overdue / Trial |
| MRR | Monthly recurring revenue from this tenant |

### Billing Actions
- Upgrade or downgrade a tenant's plan
- Apply credits or discounts
- View payment history
- Mark invoices as paid
- Handle trial extensions

---

## Announcements

Create and manage platform-wide announcements displayed to all tenants.

### Creating an Announcement
1. Click **+ New Announcement**
2. Set title, body, and severity (Info / Warning / Critical)
3. Set display window (start and end date)
4. Select target audience (all tenants, specific plan, specific tenants)
5. Publish

Announcements are displayed as banners in the client app header, keeping all tenants informed of maintenance windows, new features, or urgent notices.

---

## Team

Manage Anshin staff members who have access to the Admin Portal.

### Team Member Fields
| Field | Description |
|-------|-------------|
| Name | Staff member name |
| Email | Login email |
| Role | Administrator / Support / Billing / Read-only |
| Status | Active / Inactive |
| Last Login | Most recent access |

### Roles
- **Administrator** — Full access to all admin functions
- **Support** — Can view and manage tenants, impersonate, handle helpdesk
- **Billing** — Access to billing section only
- **Read-only** — View access to all sections, no modifications

### Inviting Staff
Click **+ Invite Staff** → Enter name, email, and role → Send invitation.

---

## Anna AI (Admin Portal)

The Admin Portal provides platform-level management of the Anna AI knowledge system:

### Knowledge Bases
Create and manage organization-specific knowledge bases. Each knowledge base can be assigned to specific tenants or made available to all.

### Sources
Upload raw documents to knowledge bases:
- PDFs, Word documents, text files
- Product guides, policy documents, FAQs, training materials
- Technical documentation and SOPs

### Chunks
View how uploaded documents have been split into searchable chunks by the indexing process. Each chunk represents a retrievable unit of knowledge.

### Index Runs
Monitor and trigger indexing jobs:
- View the status of all indexing operations (Running / Completed / Failed)
- Re-index a knowledge base when documents are updated
- View indexing logs and error details

### Settings
Configure platform-level Anna settings:
- Default confidence thresholds across all tenants
- Model configuration (which Qwen model version, inference parameters)
- Embedding model selection

---

## Seed Data: Living Demo Universe

The Living Demo Universe is a sophisticated tool for generating realistic demo data across all DocTypes — used for testing, demonstrations, and onboarding new tenants.

### What It Does
The Seed Data system generates a complete, interconnected dataset for any tenant, including:

| Category | Examples |
|----------|---------|
| **Foundation** | Chart of Accounts, Fiscal Years, Distribution Channels, Product Types, Pricing Categories, Roles |
| **Reference Data** | Providers, Locations, Accommodations, Email Templates, Detection Patterns |
| **Products** | Tour Products, Tour Packages, Seasons, Attribute Definitions, Cancellation Policies |
| **Transactional** | Customers, Bookings, Booking Requests, Manifests |
| **Financial** | Booking Payments, Provider Payments, Sales Invoices |

### Sub-Sections

| Section | Purpose |
|---------|---------|
| **Universe** | Control panel showing health of all 47 DocTypes (at target threshold / warning / failing) |
| **L0 Foundation** | Seed foundational system data |
| **L1 Reference Data** | Seed reference/lookup data |
| **L2 Products** | Seed the product catalog |
| **L3 Transactional** | Seed booking and operational records |
| **L4 Financial** | Seed financial documents |

### Universe Health Dashboard
The Universe control panel shows target counts vs. actual counts for every DocType. For example:
- Chart of Accounts: 394/1 (394 actual vs 1 minimum needed ✅)
- Bookings: 52/50 ✅
- Email Templates: 0/10 ❌ (needs seeding)

### Using Seed Data
1. Navigate to **Seed Data > Universe**
2. Review the health dashboard to see which categories need seeding
3. Select a specific layer (L0, L1, etc.) or seed all at once
4. Configure the data volume (e.g., 50 bookings, 10 products)
5. Click **Generate**
6. Monitor progress in the status indicators

---

## Cleanup

Manages derelict tenants — organizations that started the onboarding process but never completed setup.

### Inactivity Threshold
A configurable slider (default: 30 days) that determines how old an incomplete-setup tenant must be before appearing in the derelict list.

### Derelict Tenants
Shows all tenants with incomplete setup (unverified email or incomplete onboarding) older than the inactivity threshold:

| Column | Description |
|--------|-------------|
| Tenant | Organization name |
| Created | Account creation date |
| Days Inactive | How long since last activity |
| Setup Stage | Which onboarding step they reached |
| Email | Contact email |

### Cleanup Actions
For each derelict tenant, Anshin staff can:
- **Send reminder** — Re-send onboarding follow-up email
- **Extend trial** — Give more time to complete setup
- **Archive** — Mark as inactive (removes from active tenant count)
- **Delete** — Permanently remove the tenant and all associated data *(irreversible)*
