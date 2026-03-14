---
id: knowledge
title: Settings — Knowledge Base
sidebar_label: Knowledge Base
---

# Settings — Knowledge Base

The **Knowledge Base** tab configures a local document search engine powered by [Tantivy](https://github.com/quickwit-oss/tantivy) BM25 full-text indexing. When enabled, you can search your local documents by voice or through the HTTP API.

![Knowledge Base settings tab showing Enable local knowledge base toggle, Index directories field with path and Add button, Create Default Knowledge Base and Open Folder buttons, file extensions list txt md rs py ts js, Chunk size 512, and Re-index Now button](/img/anna-voice/settings-knowledge.jpg)

## Settings

| Setting | Default | Description |
|---|---|---|
| **Enable local knowledge base** | ❌ Disabled | Master toggle. When disabled, the index is not built and search endpoints return an error. |
| **Index Directories** | *(none)* | Folders whose contents will be indexed. Add directories using the **+** button. Subdirectories are included recursively. |
| **File Extensions** | `txt, md, rs, py, ts, js` | Only files with these extensions are indexed. |
| **Chunk Size** | `512` characters | Each file is split into chunks of this size for indexing. Smaller chunks give more precise search results at the cost of a larger index. |
| **Chunk Overlap** | `64` characters | How many characters overlap between adjacent chunks. Overlap prevents relevant context from being cut off at chunk boundaries. |

## Adding Index Directories

1. Open Settings → **Knowledge**
2. Click the **+** (Add Directory) button
3. Browse to or type the path of the folder you want to index
4. Click **Save**

Anna Voice indexes all matching files in the directory and its subdirectories immediately when you save. A status message shows how many documents were indexed.

## Rebuilding the Index

If you add new files to an indexed directory or change your configuration, click **Rebuild Index** to re-scan all directories. Anna Voice clears the existing index and rebuilds from scratch.

The rebuild runs in the background — Anna Voice remains fully functional during indexing.

## Triggering Index via API

You can also trigger indexing via the HTTP API:

```bash
POST http://127.0.0.1:8891/rag/ingest
```

Response:
```json
{"ok": true, "message": "Ingested 142 documents"}
```

## Searching via API

```bash
POST http://127.0.0.1:8891/rag/search
Content-Type: application/json

{"query": "authentication token expiry", "limit": 5}
```

Response:
```json
{
  "ok": true,
  "results": [
    {
      "path": "/projects/api/auth.md",
      "snippet": "...tokens expire after 24 hours. Refresh tokens...",
      "score": 4.82
    }
  ]
}
```

## Searching by Voice

See [Knowledge Search →](../using-anna/knowledge-search) for the voice command syntax and examples.

## Index Location

The Tantivy index is stored at `%LOCALAPPDATA%\AnnaVoice\rag-index\`. This directory can be safely deleted to force a full rebuild.
