---
id: getting-started
title: Getting Started with Anshin Orchestrate
sidebar_label: Getting Started
---

# Getting Started with Anshin Orchestrate

This guide walks you through signing up for Anshin Orchestrate, choosing your plan, completing the onboarding wizard, and taking your first steps as an administrator.

---

## Step 1: Choose Your Plan

Navigate to [signup.orchestrate.anshin.us](https://signup.orchestrate.anshin.us/) to begin. You will see three plans:

| Plan | Price | Users | Support | Trial |
|------|-------|-------|---------|-------|
| **Free Trial** | Free | Unlimited | Email | 15 days, all features, no credit card |
| **Self-Serve** | $725/mo | Up to 10 | Email | — |
| **White Glove** | $1,250/mo | Unlimited | Phone + Email + Training | — |

> **Recommended:** White Glove includes onboarding training and phone support — ideal for companies setting up for the first time.

> **Note:** Need a dedicated server for compliance or high volume? Contact Anshin for custom pricing.

---

## Step 2: The Signup Wizard

The onboarding wizard has **8 steps**. You can save and exit at any time using "Save & Exit" — your progress is preserved.

### Step 1: Sign Up
Create your account by entering:
- Full Name
- Email Address
- Password (min 8 characters, must include uppercase, lowercase, number, and special character)
- Company Name
- Country

Click **Create Account & Start Setup** to begin.

### Step 2: Verify Email
Check your inbox for a verification email from Anshin Orchestrate. Click the confirmation link to verify your email address. Return to the wizard after verifying.

### Step 3: Welcome
An introduction to the platform and what you'll set up in the remaining steps. Read through the overview to understand what's ahead.

### Step 4: Company
Enter your organization's details:
- Company legal name and trading name
- Primary phone number
- Business address
- Time zone (critical for correct scheduling of tours)
- Currency
- Date and number format preferences

### Step 5: Accounting
Configure your financial settings:
- Fiscal year start date
- Chart of accounts selection (standard tour operator template recommended)
- Default tax rates
- Invoice numbering format

### Step 6: Team
Invite your initial team members. For each person, enter:
- Name and email address
- Role assignment (Administrator, Agent, Guide, Accountant)

Team members will receive invitation emails with login instructions.

### Step 7: Master Data
Seed your initial operational data. The wizard guides you through creating:
- At least one **Location** (where your tours operate)
- At least one **Provider** (guide, driver, or partner company)
- At least one **Product** (a tour or activity you sell)

This is the minimum data set needed to start processing bookings. More detail can be added later through [Master Data](/orchestrate/master-data).

### Step 8: Products
Add your tour products and packages to the catalog. For each product, you'll specify:
- Product name and description
- Product type (Day Tour, Multi-Day, Package, etc.)
- Duration and pricing
- Included items and meeting point

After completing all 8 steps, your organization is live and ready to use.

---

## First Login to the Client App

After completing the wizard, navigate to [app.orchestrate.anshin.us](https://app.orchestrate.anshin.us/).

### Login Page
- Enter your email and password
- Click **Sign In**

> **Security:** Orchestrate uses OAuth2 with PKCE for authentication. Session tokens are stored in secure httpOnly cookies — never exposed to JavaScript.

### Post-Login
You land on the **Dashboard** — your operational command center. If this is your first login, the dashboard may show empty widgets until bookings start flowing in.

---

## Interface Orientation

### Sidebar Navigation
The left sidebar contains all sections. It has two modes:
- **Expanded** — Full labels with collapsible sub-menus
- **Collapsed** — Icons only; hover to reveal pop-out sub-menus

Drag the sidebar's right edge to resize it.

### Header Bar
| Element | Location | Purpose |
|---------|----------|---------|
| Page Title | Left | Current page name |
| Company Logo | Center | Your branding |
| Anna Button | Right | Open Anna AI chatbox |
| Language Selector | Right | Switch interface language |
| Theme Toggle | Right | Light / Dark mode |
| User Menu | Right | Profile, settings, logout |

---

## Initial Administrator Checklist

After first login, complete these setup tasks as an administrator:

```
□ 1. Verify your company profile (Settings > General)
□ 2. Invite all team members (User Management)
□ 3. Complete master data setup (Master Data section)
□ 4. Connect your Gmail account for email sync (Settings > Email Import)
□ 5. Configure OTA channel connections (Channels section)
□ 6. Set up Anna AI knowledge base (Settings > Anna AI)
□ 7. Configure workflow automations (Operations > Workflows)
□ 8. Test with a sample booking
```

See the [Administrator Guide](/orchestrate/admin-guide) for detailed instructions on each step.

---

## Next Steps

- [Administrator Guide](/orchestrate/admin-guide) — Complete platform configuration
- [Dashboard](/orchestrate/dashboard) — Understand your command center
- [Booking Pipeline](/orchestrate/booking-pipeline) — Learn how bookings flow through the system
- [Anna AI](/orchestrate/anna-ai) — Configure and use your AI assistant
