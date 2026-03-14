---
id: glossary
title: Glossary
sidebar_label: Glossary
---

# Glossary

A reference for all terms used throughout the Anshin Orchestrate platform and documentation.

---

## Platform Concepts

| Term | Definition |
|------|-----------|
| **Anna** | The AI-powered assistant built into Orchestrate. Handles email classification, package matching, chat Q&A, voice interaction, and workflow decisions. Runs on self-hosted infrastructure. |
| **Anshin Orchestrate** | The multi-tenant tour operations management platform. Built on Frappe/ERPNext (backend), Next.js + React (frontend), N8N (workflow automation), and PostgreSQL (database). |
| **ASB (Advanced Search Builder)** | The filtering tool on all data table pages. Supports nested AND/OR logic with 16+ comparison operators. Allows complex queries without writing code. |
| **Feature Flag** | A toggle that enables or disables optional platform features per tenant. Examples: `orch_pricing_engine`, `orch_accommodation`. Activated by Anshin administrators. |
| **Tenant** | An individual client organization using Orchestrate. Each tenant's data is completely isolated from other tenants. |
| **UDT (Universal Data Table)** | The standard list/grid interface used across all data management pages. Provides search, filter, sort, export, and pagination. |

---

## Booking & Operations

| Term | Definition |
|------|-----------|
| **Active Tour** | A tour that has departed or is currently in progress. |
| **Booking** | A confirmed reservation for a tour product on a specific date. |
| **Booking Pipeline** | The Kanban board showing all bookings and their current stage in the reservation process. |
| **Booking Reference** | A unique identifier for each booking (format: BK-YYYY-NNNN). |
| **Booking Request** | An incoming inquiry or reservation that has not yet been confirmed. The starting point of the booking pipeline. |
| **Cancellation Policy** | Rules defining refund percentages based on how far in advance a cancellation is made. |
| **Confirmed** | A booking stage where the tour date, guest count, and provider are all confirmed and the guest has been notified. |
| **Departure Date** | The date a tour is scheduled to run. |
| **Itinerary** | A guest-facing document detailing the day's schedule, inclusions, pickup information, and what to bring. Auto-generated 48 hours before departure. |
| **Manifest** | A provider briefing document with the complete guest list, pickup schedule, special requirements, and tour details. Auto-generated at 7:00 AM the day before the tour. |
| **Meeting Point** | The location where guests assemble for a tour. |
| **OTA (Online Travel Agency)** | External booking platforms such as Viator, GetYourGuide, Booking.com, and Expedia that sell tours on behalf of operators. |
| **Pipeline Stage** | One of the defined statuses a booking progresses through: New Request → Needs Attention → Provider Assignment → Confirmed → Itinerary & Manifest → Active Tours → Completed. |
| **Post-Tour Follow-up** | An automated message sent to guests after their tour, requesting a review and/or offering related tours. |
| **Provider** | A guide, driver, boat operator, or partner company assigned to deliver a tour. |
| **Provider Assignment** | The pipeline stage where a guide or provider is assigned to a confirmed booking. |
| **Pax Count** | The number of passengers/guests on a booking. Typically broken down into Adult, Child, and Senior counts. |
| **Review Queue** | A list of emails and messages where Anna AI had low confidence — requiring human review before processing. |
| **Special Requests** | Guest-specific needs noted on a booking: dietary restrictions, mobility requirements, birthday celebrations, child seats, etc. |

---

## Anna AI

| Term | Definition |
|------|-----------|
| **Confidence Score** | Anna's certainty (0-100%) that her classification of an email or message is correct. Items above the threshold are auto-processed; items below go to the Review Queue. |
| **Detection Pattern** | A rule that teaches Anna how to identify emails from a specific OTA platform, using subject line patterns, sender addresses, or body text patterns. |
| **Embeddings** | Mathematical vector representations of documents used to enable semantic search across the knowledge base. |
| **Index Run** | The process of converting uploaded documents into searchable vectors for Anna's knowledge retrieval system. |
| **Intent** | The purpose of an incoming email: booking_request, cancellation, modification, inquiry, or other. |
| **Knowledge Base** | A collection of documents uploaded by the operator that Anna uses to answer questions about products, policies, and procedures. |
| **Knowledge Source** | A single document uploaded to a Knowledge Base (PDF, Word file, text file). |
| **LLM (Large Language Model)** | The core AI model (Qwen2.5:14b) that powers Anna's text understanding, classification, and generation capabilities. |
| **RAG (Retrieval-Augmented Generation)** | The technique Anna uses to answer questions: retrieve relevant document chunks, then generate an answer grounded in those chunks. |
| **Routing Rule** | A rule defining what Anna should do after classifying an email (e.g., create booking, place in Review Queue, notify agent). |
| **Self-Hosted AI** | Anna's AI models run on Anshin's own servers — no data is sent to external AI services like OpenAI. |
| **TTS (Text-to-Speech)** | Anna's voice output feature, powered by Coqui TTS, which reads responses aloud. |
| **Whisper** | The speech-to-text model that converts an agent's voice input into text for Anna to process. |

---

## Channels & Integrations

| Term | Definition |
|------|-----------|
| **BDC** | Booking.com — one of the supported OTA channels. |
| **Channel** | An inbound booking source: Viator (VIA), GetYourGuide (GYG), Booking.com (BDC), Expedia (EXP), or Direct (DIR). |
| **Connector** | An active connection between Orchestrate and a specific OTA platform, including authentication credentials and webhook configuration. |
| **DIR (Direct)** | Bookings that arrive through your own website, storefront, or a manual phone/walk-in booking — not through an OTA. |
| **EXP** | Expedia — one of the supported OTA channels. |
| **GYG** | GetYourGuide — one of the supported OTA channels. |
| **OTA Product Mapping** | The linkage between an OTA's product code and an Orchestrate internal product. Required for automatic booking routing. |
| **VIA** | Viator — one of the supported OTA channels. |
| **Webhook** | An HTTP callback — when an OTA confirms a booking, they POST the booking data to your Orchestrate webhook URL. |

---

## Master Data

| Term | Definition |
|------|-----------|
| **Attribute Definition** | A custom data field that can be added to products to capture additional information (e.g., "Difficulty Level", "Minimum Fitness Level"). |
| **Cancellation Policy** | A tiered refund schedule: e.g., 100% refund if cancelled 30+ days before, 50% refund 8-29 days before, no refund within 7 days. |
| **Location** | A geographic area where tours operate — can be a city, region, attraction, port, or airport. |
| **Package** | A bundled combination of multiple products, often spanning multiple days (e.g., "3-Day San Blas + Panama City Combo"). |
| **Pickup Location** | A specific hotel or pickup point within a location where guests are collected for tours. |
| **Pricing Category** | A guest segment with its own rate: Adult, Child, Senior, Group. |
| **Product** | A single tour or activity offered for sale — the core catalog item. |
| **Product Type** | The category of a product: Day Tour, Multi-Day, Package, Transfer, Workshop, etc. |
| **Resource** | A bookable asset assigned to tours: guide, vehicle, boat, or piece of equipment. |
| **Season** | A defined date range during which specific products run and at which pricing applies. |
| **Supplier** | A business entity from whom services or goods are purchased (similar to Provider but used in the ERPNext/Buying module). |

---

## Accounting & CRM

| Term | Definition |
|------|-----------|
| **Chart of Accounts** | The structured hierarchy of financial accounts used to classify all transactions in the organization. |
| **Customer** | A guest who has made at least one booking. Has full booking history, communication log, and financial records. |
| **Lead** | A prospective customer who has expressed interest but has not yet made a booking. |
| **Opportunity** | A qualified lead — a prospective customer in active discussion about booking. |
| **Purchase Invoice** | A bill received from a provider for services delivered. |
| **Purchase Order** | A formal request/commitment to a provider to deliver a specific tour service at an agreed price. |
| **Quotation** | A price proposal sent to a potential customer before they commit to a booking. |
| **Sales Invoice** | A bill issued to a customer for a confirmed booking. |
| **Sales Order** | The formal record of a customer's purchase commitment, auto-generated from a confirmed booking. |

---

## Technical

| Term | Definition |
|------|-----------|
| **App Router** | Next.js 14's routing system used by the Orchestrate frontend, which uses a folder-based route structure. |
| **DocType** | Frappe/ERPNext's term for a data model/database table (e.g., Booking, Product, Customer are all DocTypes). |
| **ERPNext** | The open-source ERP framework that powers Orchestrate's accounting, CRM, and master data modules. |
| **Frappe** | The Python web framework underlying ERPNext on which Orchestrate's backend is built. |
| **N8N** | The open-source workflow automation engine used for Orchestrate's business process automation. |
| **PKCE (Proof Key for Code Exchange)** | An OAuth2 security extension used by Orchestrate for secure authentication without client secrets. |
| **RBAC (Role-Based Access Control)** | The permission system where user capabilities are determined by their assigned role. |
| **Slug** | A URL-safe identifier for a tenant (e.g., `atl`) used in storefront URLs and API paths. |
| **Timeslot Instance** | A specific departure date/time for a product (e.g., "San Blas Day Tour, March 15 at 7:00 AM"). |
