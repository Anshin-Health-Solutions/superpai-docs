---
id: knowledge-search
title: Knowledge Search
sidebar_label: Knowledge Search
---

# Knowledge Search

Anna Voice includes a local knowledge base (RAG) powered by Tantivy BM25 full-text search. You can index documents from your filesystem and search them by voice or HTTP API. Search results can be read aloud by Anna or returned as JSON to an agent.

## How It Works

```
Files on disk → Ingest → Tantivy BM25 index → Search → Ranked results
```

1. **Ingest** — Anna reads configured directories and chunks documents into segments (default 512 tokens, 64 overlap)
2. **Index** — chunks are stored in a local Tantivy index at `%APPDATA%\AnnaVoice\knowledge.db`
3. **Search** — queries are matched using BM25 ranking; top results are returned with file path, snippet, and relevance score

## Supported File Types

| Extension | Default included? |
|---|---|
| `.txt` | ✅ |
| `.md` | ✅ |
| `.rs` | ✅ |
| `.py` | ✅ |
| `.ts` | ✅ |
| `.js` | ✅ |

Additional extensions can be configured in [Settings → Knowledge](../settings/knowledge).

## Enabling and Configuring

1. Open **Settings → Knowledge**
2. Toggle **Enable Knowledge Base** on
3. Add one or more **Index Directories** (directories whose files will be indexed)
4. Optionally adjust **Chunk Size** (default `512`) and **Chunk Overlap** (default `64`)
5. Click **Save**

After saving, Anna Voice automatically ingests the configured directories. Large directories may take a moment to index.

See [Settings → Knowledge](../settings/knowledge) for full configuration options.

## Searching via Voice (MCP)

When Anna Voice is connected as an MCP server, the `anna_knowledge_search` tool lets Claude and other agents query the knowledge base:

```json
{
  "name": "anna_knowledge_search",
  "arguments": {
    "query": "authentication middleware flow",
    "limit": 5
  }
}
```

Response:
```json
{
  "success": true,
  "result": {
    "results": [
      {
        "path": "C:\\projects\\superpai-server\\src\\middleware\\auth.ts",
        "snippet": "export async function authMiddleware(db: DataAdapter)...",
        "score": 1.84
      }
    ]
  }
}
```

The `limit` parameter controls how many results are returned (default: 5).

## Searching via HTTP API

```bash
POST http://127.0.0.1:8891/rag/search
Content-Type: application/json

{"query": "STT engine initialization", "limit": 3}
```

Response:
```json
{
  "ok": true,
  "results": [
    {
      "path": "C:\\projects\\anna-voice\\src\\stt\\sherpa.rs",
      "snippet": "fn init_sherpa(config: &SttConfig) -> Result<SherpaEngine>...",
      "score": 2.14
    }
  ]
}
```

## Re-indexing Content

To rebuild or refresh the index after adding new files:

```bash
POST http://127.0.0.1:8891/rag/ingest
```

This re-reads all configured directories and updates the index. No restart required.

You can also trigger ingest from the **Settings → Knowledge** page by clicking **Re-index Now** (if shown) or by toggling the setting off and on.

## What Gets Indexed

Anna indexes the **content** of each file in the configured directories, recursively. Each file is split into overlapping chunks so that relevant passages are matched even if a document is long. The chunk size and overlap are configurable:

| Setting | Default | Effect |
|---|---|---|
| Chunk Size | `512` | Larger → more context per result; may reduce precision |
| Chunk Overlap | `64` | Larger → fewer missed phrases at chunk boundaries |

## Privacy

The knowledge base is entirely local — no content is sent to any external service during indexing or search. Only query text leaves the machine if you have LLM enhancement enabled and the query is forwarded to an LLM.

## Use Cases

| Use Case | How |
|---|---|
| Search your codebase by voice | Index `C:\projects` — ask Claude to search via MCP |
| Quick lookup of project docs | Index `docs/` — query via HTTP API from scripts |
| Reference clinical protocols | Index protocol PDFs (convert to `.txt` first) |
| Find config snippets | Index config directories — ask Anna to search by keyword |
