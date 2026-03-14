---
id: intro
title: What is Anshin Orchestrate?
sidebar_label: Platform Overview
---

# Anshin Orchestrate

**Anshin Orchestrate** is a multi-tenant tour operations management platform built for tour operators, activity providers, and travel companies. It centralizes every aspect of running a tour business — from the first customer inquiry through booking confirmation, day-of-departure coordination, provider settlement, and post-tour follow-up — into a single, AI-powered workspace.

> **Version 1.0.0** | © 2026 Anshin Health Solutions, Inc.

---

## Who Is It For?

Orchestrate serves two primary audiences inside the client application:

| Role | Who They Are | Primary Tasks |
|------|-------------|---------------|
| **SaaS Client Administrator** | Owner, operations manager, or office manager | Configure the system, manage users, set up channels, monitor AI |
| **Tour Agent** | Reservations agent, coordinator, or guide manager | Process bookings, communicate with guests, manage daily departures |

A third audience — **Anshin staff** — manages all tenants through a separate [Admin Portal](/orchestrate/admin-portal).

---

## Key Capabilities

### Booking Pipeline
Every booking flows through a defined visual Kanban pipeline — from new inquiry to confirmed booking to completed tour. The pipeline tracks every stage transition, timestamp, and action automatically.

**Pipeline stages:** Processing → Needs Attention → Provider Assignment → Confirmed → Itinerary & Manifest → Active Tours

### Unified Communications
All inbound channels — **email (Gmail)**, **WhatsApp**, and **OTA platform notifications** — are unified in a single Communications interface. Agents never switch between apps to serve a customer.

### Anna AI Assistant
Anna is an AI assistant built directly into the platform. She automatically classifies inbound emails, matches customer inquiries to tour products, answers agent questions via chat and voice, and makes intelligent decisions in automated workflows. Anna runs on **self-hosted infrastructure** — your data never leaves your servers.

| Anna Component | Technology | Function |
|---------------|-----------|----------|
| Language Model (LLM) | Qwen2.5:14b | Classification, generation, chat |
| Speech-to-Text | Whisper | Voice input |
| Text-to-Speech | Coqui TTS | Voice responses |
| Knowledge Search | Hybrid (BM25 + Vector) | Document retrieval |

### OTA Channel Integrations
Orchestrate connects natively with the major Online Travel Agencies (OTAs):

| Platform | Code | Integration |
|----------|------|-------------|
| **Viator** | VIA | Receive bookings, sync availability |
| **GetYourGuide** | GYG | Receive bookings, sync availability |
| **Booking.com** | BDC | Receive bookings |
| **Expedia** | EXP | Receive bookings |
| **Direct Booking** | DIR | Website & API bookings |

### Master Data Management
Comprehensive management of all operational data — products, packages, providers, locations, seasons, pricing, cancellation policies, and more.

### Automated Operations
- **Manifests** auto-generated and delivered to guides at 7:00 AM each morning
- **Itineraries** automatically emailed and WhatsApp'd to guests 48 hours before departure
- **Post-tour follow-ups** automatically sent after tours complete
- **Workflow automation** handles repetitive tasks via the Workflows engine

### Accounting & CRM
Built-in financial management (ERPNext-powered) tracks sales invoices, purchase invoices, sales orders, and payment collection. The CRM module manages leads, opportunities, and full customer history.

### Public-Facing Storefronts
Orchestrate powers customer-facing booking experiences through two integration patterns:
- **Direct Next.js integration** — Standalone storefront hosted at a custom URL
- **WordPress plugin** — Shortcodes embedding tours and packages in any WordPress site

---

## The Five Web Properties

| Property | URL | Audience |
|----------|-----|---------|
| **Client App** | `app.orchestrate.anshin.us` | Tour operator staff — day-to-day operations |
| **Admin Portal** | `admin.orchestrate.anshin.us` | Anshin staff only — platform administration |
| **Signup Wizard** | `signup.orchestrate.anshin.us` | New customers — 8-step onboarding |
| **Direct Storefront** | `{domain}/sites/{slug}/packages` | End customers — browse and book tours |
| **WordPress Storefront** | Custom domain via plugin | End customers — browse and book via WordPress |

---

## Client App Navigation

The client application is organized into 11 major sections:

| Section | Purpose |
|---------|---------|
| **Dashboard** | Operational overview, pipeline stats, today's tours, revenue |
| **Communications** | Email, calendar, contacts, WhatsApp, Ask Anna |
| **Operations** | Booking pipeline, requests, today's tours, calendar, review queue, AI logs |
| **Master Data** | Products, providers, customers, locations, and all reference data |
| **Accounting** | Invoices, sales orders, chart of accounts |
| **CRM** | Leads, opportunities, customers |
| **User Management** | Users, roles, permissions |
| **Wiki** | Internal knowledge base |
| **Insights** | Business analytics and reporting |
| **Page Builder** | Custom page construction *(coming soon)* |
| **Settings** | System configuration |

---

## Interface Layout

The Orchestrate interface has four zones:

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: Page Title | Company Logo | Anna | Lang | User  │
├──────────┬───────────────────────────────────────────────┤
│          │                                               │
│ SIDEBAR  │           MAIN CONTENT AREA                  │
│  (Nav)   │                                               │
│          │                                               │
├──────────┴───────────────────────────────────────────────┤
│                      FOOTER                              │
└──────────────────────────────────────────────────────────┘
```

- **Header** — Page title, Anna AI button, language selector, theme toggle (light/dark), user menu
- **Sidebar** — Collapsible navigation; can be fully collapsed to icon-only rail
- **Content Area** — Dashboards, Kanban boards, data tables, forms, calendars
- **Footer** — Version info and copyright

---

## Supported Languages

Orchestrate supports 10 languages switchable at any time via the header:

English, Spanish, French, German, Japanese, Korean, Thai, Vietnamese, Chinese (Simplified), Chinese (Traditional)

---

## Next Steps

- [Getting Started](/orchestrate/getting-started) — Sign up, choose a plan, and complete onboarding
- [Administrator Guide](/orchestrate/admin-guide) — Configure your organization
- [Dashboard Guide](/orchestrate/dashboard) — Understand your operational command center
- [Booking Pipeline](/orchestrate/booking-pipeline) — Master the booking lifecycle
- [Anna AI](/orchestrate/anna-ai) — Get the most from your AI assistant
