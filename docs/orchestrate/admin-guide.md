---
id: admin-guide
title: Administrator Guide
sidebar_label: Admin Guide
---

# Administrator Guide

This guide covers everything a SaaS Client Administrator needs to configure and maintain their Anshin Orchestrate organization. Administrators have full access to all settings and are responsible for setting up the system for their team.

> **Prerequisites:** You must have the **Administrator** or **System Manager** role. Contact your Anshin account manager if you need role elevation.

---

## Administrator vs. Agent

| Capability | Administrator | Agent |
|-----------|--------------|-------|
| Access all Settings pages | ✅ | ❌ |
| Create and manage users | ✅ | ❌ |
| Configure OTA channels | ✅ | ❌ |
| Set up master data | ✅ | ✅ (limited) |
| Configure Anna AI | ✅ | ❌ |
| Process bookings | ✅ | ✅ |
| View financial reports | ✅ | Limited |
| Configure workflows | ✅ | ❌ |

---

## Recommended Setup Sequence

Follow this sequence when setting up a new organization:

```
Phase 1: Account & Users
  □ 1. Verify your company profile (Settings > General)
  □ 2. Invite team members (User Management)
  □ 3. Assign roles and permissions

Phase 2: Core Master Data
  □ 4. Create Locations
  □ 5. Create Providers
  □ 6. Create Seasons
  □ 7. Create Products and Packages
  □ 8. Create Cancellation Policies
  □ 9. Set up Pricing Categories

Phase 3: Channels & Communications
  □ 10. Connect Gmail (Settings > Integrations > Email Import)
  □ 11. Set up OTA connectors (Channels > Connectors)
  □ 12. Map OTA products to internal products (Channels > Products)
  □ 13. Configure WhatsApp Business (Channels > Connectors)

Phase 4: AI & Automation
  □ 14. Configure Anna detection patterns (Settings > Anna AI)
  □ 15. Set up Anna routing rules
  □ 16. Configure confidence thresholds
  □ 17. Upload knowledge base documents (Admin Portal > Anna AI)
  □ 18. Configure workflow automations (Settings > Workflows)

Phase 5: Testing
  □ 19. Send a test email to your connected Gmail
  □ 20. Create a manual test booking
  □ 21. Process the test booking through all pipeline stages
  □ 22. Verify manifests and itineraries are generated correctly
  □ 23. Verify post-tour follow-up sends correctly
```

---

## User Management

### Inviting Team Members

1. Navigate to **User Management** in the sidebar
2. Click **+ Invite User**
3. Enter:
   - Full name
   - Email address
   - Role (see Role Reference below)
4. Click **Send Invitation**

The user receives an email with a login link. They set their own password on first login.

### Role Reference

| Role | Access Level | Typical For |
|------|-------------|-------------|
| **System Manager** | Full access including system-level settings | Senior admin only |
| **Client Administrator** | Full tenant access; can manage users and settings | Operations manager |
| **Tour Agent** | Booking pipeline, communications, operations | Reservations staff |
| **Guide** | View assigned tours and manifests only | Tour guides |
| **Accountant** | Accounting and financial reports only | Finance staff |

### Permissions
Orchestrate uses **role-based access control (RBAC)**. Each role has a predefined set of permissions. Administrators can customize permissions per role in **User Management > Roles > Permissions**.

---

## Master Data Setup

Master data is the foundation of the system. Follow the [Master Data](/orchestrate/master-data) guide for complete instructions on creating:
- Locations (where tours operate)
- Providers (guides, drivers, operators)
- Seasons (when products run and at what price)
- Products (your tour offerings)
- Packages (bundles of products)
- Cancellation Policies
- Pricing Categories

**Critical:** Follow the setup order. Products reference Locations, Seasons, and Providers — creating them in the wrong order causes validation errors.

---

## Gmail Connection

### Connecting Your Email Account

1. Navigate to **Settings > Integrations**
2. Click **Connect Gmail**
3. Sign in with the email account used for tour bookings
4. Grant Orchestrate the requested permissions (read emails, send emails)
5. Set sync frequency (default: hourly; can be reduced to 15 minutes for high-volume operations)
6. Optionally specify which Gmail labels/folders to monitor

### After Connecting
- New emails appear in **Communications > Email Client** within one sync cycle
- Anna starts classifying incoming emails automatically
- Review **Communications > Email Classification** to verify Anna's classifications are accurate

### Multiple Inboxes
You can connect multiple Gmail accounts — e.g., `bookings@company.com` for customer-facing email and `providers@company.com` for provider communications. Each inbox is synced independently.

---

## OTA Channel Setup

For each OTA platform you use:

### Step 1: Get API Credentials from the OTA
- Log into your OTA partner dashboard
- Navigate to the API/Integration settings
- Generate an API key and note your Supplier/Operator ID

### Step 2: Register Orchestrate's Webhook URL
- In Orchestrate, navigate to **Channels > Connectors**
- Click **+ New Connector**
- Select the platform
- Copy the **Webhook URL** that Orchestrate provides
- Paste this URL into the OTA's webhook configuration

### Step 3: Enter Your Credentials in Orchestrate
- Back in Channels > Connectors, enter your API Key and Supplier ID
- Click **Test Connection**
- If successful, click **Activate**

### Step 4: Map Products
- Navigate to **Channels > Products**
- For each of your products, enter the corresponding OTA product code
- This ensures incoming bookings route to the correct product

See [Channels](/orchestrate/channels) for the complete guide.

---

## Anna AI Configuration

### Initial Setup

1. **Configure Detection Patterns** (Settings > Anna AI)
   - Add sender patterns for each OTA you've connected (e.g., `@viator.com` for Viator emails)
   - Add subject line patterns (e.g., "Booking Confirmation" for standard subject lines)

2. **Configure Routing Rules**
   - Define what happens when Anna identifies a booking request
   - Set up escalation rules for cancellations and modifications

3. **Set Confidence Thresholds**
   - Recommended starting thresholds: auto-process at 75%, review queue at 50%
   - Adjust after the first 2 weeks based on your actual error rate

4. **Build the Knowledge Base** (via Admin Portal > Anna AI)
   - Upload product descriptions, cancellation policies, FAQs, emergency procedures
   - Run the indexer after each upload
   - Test by asking Anna questions via the chatbox

5. **Monitor the Review Queue**
   - Check daily for the first month
   - Provide consistent corrections — this is how Anna learns your specific business

### Ongoing Anna Maintenance
- **Weekly:** Review Anna's accuracy metrics in Operations > Anna Control
- **Monthly:** Update the knowledge base with new product information
- **Quarterly:** Review detection patterns for new OTA email templates

---

## Workflow Automation

Orchestrate uses N8N for workflow automation. Workflows handle recurring tasks automatically.

### Key Workflows to Configure

| Workflow | What to Configure |
|----------|------------------|
| **Booking Confirmation** | Template for confirmation emails and WhatsApp messages |
| **Manifest Generation** | Time (default 7:00 AM), recipients (providers by default) |
| **Itinerary Delivery** | Lead time (default 48 hours before departure) |
| **Post-Tour Follow-up** | Follow-up templates, timing (default next morning 10:00 AM) |
| **OTA Acknowledgment** | Auto-reply template for OTA booking notifications |

### Enabling/Disabling Workflows
Navigate to **Settings > Workflows**. Each workflow can be toggled on/off independently. Do not disable critical workflows (manifest generation, itinerary delivery) without a manual backup process.

---

## Settings Quick Reference

| Task | Where to Go |
|------|-------------|
| Update company name/logo | Settings > General |
| Change time zone | Settings > General |
| Invite a new user | User Management |
| Change a user's role | User Management > [User] > Edit |
| Connect Gmail | Settings > Integrations > Email Import |
| Configure Anna | Settings > Anna AI |
| Connect an OTA | Channels > Connectors |
| Enable a feature flag | Contact Anshin admin |
| Update pricing rules | Settings > Pricing *(if enabled)* |
| Configure webhooks | Settings > Integrations > Webhooks |
| Change default language | Settings > General |

---

## Troubleshooting Common Admin Issues

| Issue | Check |
|-------|-------|
| Emails not appearing in Communications | Settings > Integrations — verify Gmail is connected and sync is active |
| OTA bookings not arriving | Channels > Events Log — check for webhook failures |
| Anna classifying incorrectly | Settings > Anna AI — update Detection Patterns; provide more corrections in Review Queue |
| Manifests not being sent | Settings > Workflows — verify manifest workflow is active; check time zone setting |
| New user can't log in | User Management — verify invitation was accepted; check role assignment |
| Feature page not visible | Some sections require feature flags — contact your Anshin administrator |
