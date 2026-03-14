---
id: anna-ai
title: Anna AI
sidebar_label: Anna AI
---

# Anna AI

Anna is the AI assistant built directly into Anshin Orchestrate. She handles email classification, package matching, chat Q&A, voice interaction, workflow decisions, and knowledge retrieval — all running on **self-hosted infrastructure** so your data never leaves your servers.

---

## Anna's Technology Stack

| Component | Model | What It Does |
|-----------|-------|-------------|
| **Language Model (LLM)** | Qwen2.5:14b | Classification, text generation, chat responses |
| **Speech-to-Text** | Whisper | Converts voice input to text |
| **Text-to-Speech** | Coqui TTS | Reads responses aloud in natural voice |
| **Knowledge Search** | Hybrid (BM25 + Vector) | Searches documents for accurate answers |
| **Embeddings** | nomic-embed-text / bge-m3 | Converts documents to searchable vectors |

---

## Where to Find Anna

| Location | How to Access | Best For |
|----------|--------------|----------|
| **Floating Chat Button** | Click the Anna icon (top-right of any page) | Quick questions while working |
| **Ask Anna page** | Communications > Ask Anna | Longer conversations, research |
| **Email Classification** | Communications > Email Classification | Review Anna's email decisions |
| **Review Queue** | Operations > Review Queue | Review low-confidence items |
| **Anna Control** | Operations > Anna Control | Monitor Anna's operational status |
| **Admin Configuration** | Settings > Anna AI (admin) | Configure knowledge base, confidence thresholds |

---

## Using the Anna Chatbox

### Opening the Chatbox
Click the **Anna icon** (top-right header) from any page. A floating chat window opens, staying visible as you navigate.

### Chatbox Features

| Feature | Description |
|---------|-------------|
| **Text Input** | Type questions in natural language |
| **Rich Responses** | Anna replies with formatting — bold text, lists, tables, links |
| **Draggable Window** | Click the title bar to move the chatbox anywhere |
| **Resizable** | Drag edges/corners to resize |
| **File Attachment** | Upload PDFs, documents, or images for Anna to analyze |
| **Microphone** | Click for voice input |
| **Session Persistence** | Conversation stays active during your browser session |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| **Enter** | Send message |
| **Shift + Enter** | New line without sending |
| **Escape** | Close chatbox |

---

## What You Can Ask Anna

### Product & Catalog Questions
```
"What packages do we have for families visiting Panama in March?"
"What's included in the San Blas Day Tour?"
"Show me tours under $100 per person"
"Do we offer any overnight tours?"
"What tours run in the Boquete region?"
```

### Availability Questions
```
"Is the San Blas tour available on March 15?"
"How many spots are left on the sunset cruise for March 20?"
"What guides are available next Thursday?"
```

### Policy Questions
```
"What is the cancellation policy for the San Blas Full Day?"
"Can a customer get a full refund if they cancel 25 days before?"
"What happens if it rains on the day of the tour?"
```

### Booking Help
```
"Help me find booking #BK-2026-0342"
"What's the status of John Smith's booking?"
"Show me all bookings for tomorrow"
"Which bookings are stuck in Awaiting Provider?"
```

### Knowledge Base Research
Anna searches your organization's uploaded documents using hybrid search:
```
"What should guests bring for the jungle trek?"
"Where is the meeting point for the Canal tour?"
"How do I process a modification request?"
"What's the emergency protocol if a guest gets injured?"
```

> **Tip:** When Anna cites knowledge base documents, she includes references like `[Source 1]` so you can verify the original.

---

## Voice Interaction

### How to Use Voice Input
1. Open the Anna chatbox
2. Click the **microphone icon** at the bottom
3. A recording indicator appears — speak naturally
4. Click the microphone again when done
5. Whisper (speech-to-text) transcribes your words into text
6. The transcribed text appears in the input field
7. Anna processes and responds

### Voice Responses
Anna responds in two ways simultaneously:
- **Text** — Written answer in the chat window (with full formatting)
- **Audio** — Coqui TTS reads the response aloud

### Voice Tips
- Speak clearly; minimize background noise
- Use natural language: "What tours do we have for families next week?"
- Include specifics: mention names, dates, booking references
- Ideal for hands-free use when you're on the phone with a customer

---

## Anna's Email Classification (Automatic)

One of Anna's most powerful features works in the background, without you asking. Every time a new email arrives (via hourly Gmail sync), Anna automatically classifies it.

### What Anna Detects
For each email, Anna determines:

| Field | Values |
|-------|--------|
| **Platform** | VIA (Viator), GYG (GetYourGuide), BDC (Booking.com), EXP (Expedia), DIR (Direct), UNKNOWN |
| **Intent** | booking_request, cancellation, modification, inquiry, other |
| **Product Match** | Which tour product the email refers to |
| **Confidence** | 0–100% certainty score |

### What Happens Based on Confidence
| Confidence | Action |
|-----------|--------|
| **≥ Threshold** (default 75%) | Anna auto-creates a booking record and places it in the pipeline |
| **< Threshold** | Email placed in Review Queue for human review |

### Review Queue Workflow
1. Agent opens Review Queue (Operations > Review Queue)
2. Reviews Anna's suggestion for each item
3. **Confirms** if correct, **Corrects** if wrong, **Dismisses** if irrelevant
4. Each correction trains Anna's model to improve future accuracy

---

## Administrator: Setting Up Anna AI

### Overview of Anna Admin Pages

Anna's configuration is split between two places:
- **Settings > Anna AI** (client app) — Tenant-level Anna configuration
- **Admin Portal > Anna AI** (Anshin staff) — Platform-level Anna management

### Step 1: Configure Detection Patterns

Detection Patterns teach Anna how to recognize emails from each OTA platform.

**Navigate to:** Settings > Anna AI > Detection Patterns

For each OTA platform, you can configure:
- **Subject line patterns** — Keywords or regex that identify the OTA's emails (e.g., Viator confirmation emails always contain "Booking Confirmation from Viator")
- **Sender patterns** — Email addresses or domains from the OTA
- **Body patterns** — Characteristic phrases in the email body

The more patterns you define, the more accurately Anna classifies emails from that source.

### Step 2: Configure Routing Rules

Routing Rules determine what Anna does after classifying an email.

**Navigate to:** Settings > Anna AI > Routing Rules

Rules specify:
- If Platform = VIA and Intent = booking_request → Create Booking in pipeline → Assign to Agent
- If Platform = UNKNOWN → Place in Review Queue
- If Intent = cancellation → Place in Needs Attention → Notify agent

### Step 3: Build the Knowledge Base (Admin Portal)

The Knowledge Base allows Anna to answer questions about your specific organization — products, policies, procedures, FAQs.

**Navigate to:** Admin Portal > Anna AI > Knowledge Base

1. **Create a Knowledge Base** — Define the scope (e.g., "Product Catalog", "Cancellation Policies", "Emergency Procedures")
2. **Add Sources** — Upload documents: PDFs, Word files, text files containing your policies, product guides, and FAQs
3. **Index** — Run the indexer to process documents into searchable chunks
4. **Test** — Ask Anna a question to verify retrieval quality

### Step 4: Configure Confidence Thresholds

**Navigate to:** Settings > Anna AI > Settings (or Anna Triggers)

Set the minimum confidence score for:
- **Auto-processing** — Items above this threshold are processed automatically
- **Review Queue threshold** — Items below this go to human review
- **Hard reject** — Items below this minimum are discarded as likely spam

### Step 5: Configure Triggers

Anna Triggers are event-based automations that fire when Anna detects specific conditions.

**Examples:**
- "When Anna detects a Viator booking_request with confidence > 80% → Create booking → Send acknowledgment email"
- "When Anna detects a cancellation → Place in Needs Attention → Email alert to team"

---

## Anna in Workflows

Anna makes intelligent decisions within N8N automated workflows:
- Classify a new web form submission as a booking request or inquiry
- Match an inquiry to the most relevant product
- Determine if a modification request is simple (auto-approve) or complex (human review needed)
- Generate personalized response drafts for agent review

Workflow nodes that invoke Anna are configured in **Settings > Workflows**.

---

## Tips for Getting the Most from Anna

### Start Simple
Begin with just email classification. Once Anna is classifying accurately (< 20% Review Queue rate), expand to knowledge base Q&A.

### Be Consistent with Products
Anna matches emails to your product catalog. The more consistent and descriptive your product names are, the better Anna's matching accuracy.

### Review Queue is Your Training Tool
Every correction you submit in the Review Queue directly improves Anna. Treat it as a daily 5-minute investment that reduces your workload over time.

### Upload Your Policies
The more documents in Anna's knowledge base, the better her answers. Start with:
- Complete tour product descriptions
- Cancellation and refund policies
- Emergency procedures
- Meeting point and pickup instructions
- Frequently asked guest questions
