---
id: architecture
title: Anshin Orchestrate Architecture
sidebar_label: Architecture
---

# Anshin Orchestrate Architecture

Anshin Orchestrate is a modern, multi-tenant SaaS platform built on a purpose-designed stack for tour operations management. This page describes the technology foundation, component design, and how the pieces work together.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) + React + TypeScript | Client app, admin portal, public storefront |
| **Backend** | Python / FastAPI | REST API, business logic, integrations |
| **Framework** | Frappe / ERPNext | ERP foundation (accounting, CRM, master data) |
| **Workflow Engine** | N8N (self-hosted) | Business process automation |
| **Database** | PostgreSQL | Primary data store |
| **AI Models** | Qwen2.5:14b + Whisper + Coqui TTS | Anna AI engine (self-hosted) |
| **Embeddings** | nomic-embed-text / bge-m3 | Document vectorization for knowledge search |
| **Container Runtime** | Docker / Kubernetes | Deployment and scaling |
| **Authentication** | OAuth2 with PKCE | Secure session management |

---

## Platform Components

### Client Application (`app.orchestrate.anshin.us`)
The primary interface for tour operator staff. Built with **Next.js App Router** using a `(dashboard)` route group pattern. All operational sections — Dashboard, Communications, Operations, Master Data, Accounting, CRM, Settings, etc. — are nested within this route group with shared layout and navigation.

### Admin Portal (`admin.orchestrate.anshin.us`)
A separate Next.js application for Anshin internal staff only. Manages all tenants, billing, platform health, Anna AI configuration, seed data, and cleanup operations. Completely isolated from the client app.

### Public Storefront (`/sites/{slug}/packages`)
A customer-facing Next.js application where end-customers browse and book tours. Accessed at a URL containing the tour operator's unique slug. Supports full e-commerce flows including package browsing, availability checking, and booking submission.

### WordPress Plugin Integration
An Anshin-developed WordPress plugin that embeds Orchestrate tour data into any WordPress site using shortcodes:
```
[anshin_tours limit="4" columns="4"]
[anshin_packages limit="3" columns="3"]
```
The plugin fetches live data from the Orchestrate API, rendering tours and packages directly within the WordPress theme.

### Signup Wizard (`signup.orchestrate.anshin.us`)
An 8-step self-service onboarding application for new customers. Handles plan selection, account creation, company setup, team invitations, and initial master data entry.

---

## Multi-Tenant Architecture

Orchestrate is a true multi-tenant SaaS platform. Each tenant (tour operator) is fully isolated:

```
┌────────────────────────────────────────────────────────┐
│                  Anshin Orchestrate SaaS               │
│                                                        │
│  ┌─────────────────┐    ┌─────────────────┐           │
│  │  Tenant A       │    │  Tenant B       │           │
│  │  "Sunset Tours" │    │  "Alpine Guides"│           │
│  │                 │    │                 │           │
│  │  Products       │    │  Products       │           │
│  │  Bookings       │    │  Bookings       │           │
│  │  Staff          │    │  Staff          │           │
│  │  Financials     │    │  Financials     │           │
│  └─────────────────┘    └─────────────────┘           │
│                                                        │
│         Shared Infrastructure                         │
│  [PostgreSQL] [N8N] [AI Models] [Email Gateway]       │
└────────────────────────────────────────────────────────┘
```

Tenant isolation is enforced at:
- **Authentication layer** — Users are scoped to their tenant on login
- **Database layer** — All queries are filtered by `tenant_uuid`
- **API layer** — Every endpoint validates tenant context from the authenticated session
- **Workflow layer** — N8N workflows are tenant-scoped and cannot access cross-tenant data

---

## Booking Flow Architecture

```
Customer Inquiry
       │
       ▼
┌─────────────────────────────────────────────┐
│  Inbound Channels                           │
│  Email (Gmail) │ OTA Webhooks │ WhatsApp    │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
              Anna AI Classification
              (Qwen2.5:14b)
              - Detect platform (VIA/GYG/BDC...)
              - Detect intent (booking/cancel/inquiry)
              - Match to product catalog
              - Confidence score
                       │
              High Confidence    Low Confidence
                  │                    │
                  ▼                    ▼
         Auto-create            Review Queue
         Booking Request        (human review)
                  │
                  ▼
         Booking Pipeline
         (Kanban stages)
                  │
                  ▼
         Confirmed Booking
                  │
                  ├─── Auto-generate Manifest → Provider
                  ├─── Auto-generate Itinerary → Guest
                  └─── Auto-generate Invoice
```

---

## Anna AI Architecture

Anna is a self-hosted AI system — your data never leaves your infrastructure.

```
┌──────────────────────────────────────────────┐
│                  Anna AI                     │
│                                              │
│  ┌──────────────┐   ┌────────────────────┐  │
│  │  LLM Engine  │   │  Knowledge Search  │  │
│  │  Qwen2.5:14b │   │  Hybrid: BM25 +    │  │
│  │              │   │  Vector Embeddings │  │
│  └──────┬───────┘   └──────────┬─────────┘  │
│         │                      │            │
│         ▼                      ▼            │
│  ┌──────────────┐   ┌────────────────────┐  │
│  │  Voice I/O   │   │  Knowledge Base    │  │
│  │  Whisper STT │   │  Sources/Chunks    │  │
│  │  Coqui TTS   │   │  Index Runs        │  │
│  └──────────────┘   └────────────────────┘  │
└──────────────────────────────────────────────┘
         │
         ▼
  Chat Interface │ Email Classification │ Workflow Decisions
```

### Anna's Processing Pipeline (Email)
1. New email arrives via Gmail IMAP sync (hourly)
2. Anna extracts text from email body and subject
3. LLM classifies: Platform (VIA/GYG/BDC/DIR), Type (booking/cancel/modify/inquiry)
4. Confidence score is computed
5. If confidence ≥ threshold → auto-create booking record
6. If confidence < threshold → place in Review Queue for human review
7. Agent reviews, corrects if needed → correction fed back to model

---

## Workflow Automation (N8N)

Orchestrate uses a self-hosted N8N instance for business process automation. Key automated workflows include:

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Daily Manifest Generation** | 7:00 AM daily | Generate and email manifests to providers for next-day tours |
| **Itinerary Delivery** | 6:00 AM daily | Email/WhatsApp itineraries to guests 48h before departure |
| **Post-Tour Follow-up** | 10:00 AM daily | Send review requests to guests from previous day |
| **OTA Booking Import** | Webhook | Process incoming OTA booking notifications |
| **Booking Confirmation** | Status change | Send confirmation email and WhatsApp to guest |
| **Anna Retraining** | Correction event | Update Anna's model with agent feedback |

Workflows are configured per-tenant and can be customized through the **Settings > Workflows** section of the client app.

---

## Data Model Overview

The platform is built on the Frappe/ERPNext framework with custom Orchestrate DocTypes:

| Data Category | Key DocTypes |
|---------------|-------------|
| **Operational** | Tour Product, Tour Package, Booking, Booking Request, Timeslot Instance |
| **Reference** | Provider, Location, Season, Pricing Category, Cancellation Policy, Resource Type |
| **Communication** | Email Message, WhatsApp Message, Contact, Communication |
| **Financial** | Sales Invoice, Purchase Invoice, Sales Order, Chart of Accounts |
| **CRM** | Lead, Customer, Opportunity |
| **AI** | Knowledge Base, Knowledge Source, Knowledge Chunk, Index Run, Detection Pattern |

---

## Kubernetes Deployment

Orchestrate runs on the Anshin Kubernetes cluster:

- **Environments:** `dev.orchestrate.anshin.us` (dev/testing), `app.orchestrate.anshin.us` (production)
- **CI/CD:** GitLab Runner builds Docker images on `dev` branch push and deploys to K8s
- **Repos:** `orchestrate-core` (backend), `orchestrate-frontend` (Next.js), `orchestrate-n8n` (workflows)
- **Database:** PostgreSQL managed instance
- **Auth:** OAuth2 with PKCE; httpOnly cookie sessions

---

## Security

| Feature | Implementation |
|---------|----------------|
| Encryption in Transit | TLS via Nginx ingress |
| Session Security | HttpOnly cookies, PKCE OAuth2 |
| Multi-tenant Isolation | tenant_uuid scoped queries at all layers |
| Role-Based Access | RBAC — roles and permissions per tenant |
| Self-hosted AI | Anna models run on-premise; no data sent to external AI services |
| Audit Trail | All booking state changes logged with user, timestamp, action |
