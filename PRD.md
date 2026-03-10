# SmartyFy AI — Product Requirements Document

> **Tagline**: Machines with SuperIntelligence

## What It Is

SmartyFy AI is a **visual document RAG (Retrieval-Augmented Generation) SaaS** that lets users upload PDFs, ask questions about them, and receive LLM-powered answers grounded in the actual document pages. It uses **ColPali vision models** to understand documents as images (not extracted text), enabling it to comprehend charts, tables, diagrams, and layouts that traditional OCR-based RAG systems miss.

---

## Architecture

```
┌────────────────────────┐      ┌────────────────────────┐
│     Frontend (Next.js) │      │   Backend (FastAPI)     │
│     Port 3000          │◄────►│   Port 8000             │
│     Standalone build   │ SSE  │   Python + PyTorch      │
└────────────────────────┘      └────────────────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        ▼                 ▼                 ▼
                 ColPali Models     OpenAI API       SarvamAI / AAI
                 (retrieval)       (generation)     (voice STT)
```

**Deployment**: Docker Compose with two services (backend + frontend). Data persisted via Docker volume (`backend_data`).

---

## Core Features

### 1. Document Ingestion & Retrieval

- Users upload **PDFs** via the `/documents` page
- PDFs are converted to page images using `pdf2image`
- Pages are embedded using **two ColPali models**:
  - **Fast mode** — `colSmol-500M` (lightweight, quick)
  - **Deep mode** — `colPali-v1.3` (heavier, more accurate)
- Retrieval uses cosine similarity over ColPali embeddings
- Returns top-K pages with base64 page images as visual citations
- Documents can be listed, deleted, or bulk-cleared

### 2. Streaming Chat with RAG

The `/chat/stream` endpoint is the primary interface:

1. **Language detection** — Detects query language, translates to English for retrieval, responds in original language
2. **Query classification** — Routes query to one of:
   - `retrieve` → full RAG pipeline (search + generate)
   - `clarify` → asks user for clarification
   - `chat` → conversational response (no retrieval)
3. **Context-aware follow-ups** — Previous assistant response is passed as context; queries are rewritten for better retrieval
4. **SSE streaming** — Chunks streamed via Server-Sent Events: `sources → videos → content → mermaid/flowchart_prompt → usage → done`
5. **OpenAI prompt caching** — Leverages cached token prefixes to reduce cost

### 3. Flowchart Generation

- After generating an answer, the system scores how "procedural" the content is using heuristics
- Based on the score:
  - **High score** → auto-generates a Mermaid flowchart
  - **Medium score** → prompts user ("Do you want a flowchart?")
  - **Low score** → no flowchart
- Flowcharts are rendered in the frontend via `MermaidDiagram` component
- Supports multilingual labels with automatic language normalization
- Fullscreen view available

### 4. Video Resources

- Users can add YouTube/Vimeo video links with titles and summaries via `/videos` page
- Summaries are embedded using OpenAI `text-embedding-3-small`
- During chat, videos are semantically searched against the query
- **Relevance filtering**:
  - Absolute threshold: `VIDEO_MIN_SCORE = 0.40`
  - Adaptive score-drop: only videos within `0.15` of the top result are shown
- Videos render as embedded iframes with fullscreen support

### 5. User Notes

- Users can add freeform text notes (personal experience, tips, etc.)
- Notes are rendered as page images and **indexed alongside documents** in the ColPali retriever
- This means user knowledge participates in the same RAG search as uploaded PDFs
- Notes are grouped at `NOTES_PER_PAGE = 20` per rendered page

### 6. Voice Input (Speech-to-Text)

- **Primary provider**: SarvamAI (`saaras:v3` model, auto language detection)
- **Fallback**: AssemblyAI (used automatically if SarvamAI fails)
- Audio recorded as WebM in the browser, sent to `/transcribe` endpoint
- Inline animated UI: mic icon transforms into spinning stop button + audio visualizer bars + timer inside the chat input bar
- Transcribed text is appended to the input field

---

## Tech Stack

| Layer       | Technology                                       |
|-------------|--------------------------------------------------|
| Frontend    | Next.js 14, TypeScript, Tailwind CSS, Lucide icons |
| Backend     | FastAPI, Python 3.11+, PyTorch                   |
| Retrieval   | ColPali (colSmol-500M / colPali-v1.3)            |
| Generation  | OpenAI API (gpt-5-mini default)                  |
| Embeddings  | OpenAI text-embedding-3-small (videos)           |
| STT         | SarvamAI (primary) / AssemblyAI (fallback)       |
| Deployment  | Docker Compose, Node 20 Alpine, Python 3.11 Slim |

---

## File Structure

```
colpali-vision-rag/
├── docker-compose.yml
├── .env.example
│
├── backend/
│   ├── main.py                          # FastAPI app setup + CORS
│   ├── config.py                        # All env vars + model configs
│   ├── requirements.txt
│   ├── Dockerfile
│   └── app/
│       ├── api/routes/
│       │   ├── chat.py                  # /chat and /chat/stream endpoints
│       │   ├── documents.py             # PDF upload, list, delete
│       │   ├── videos.py                # Video CRUD
│       │   ├── notes.py                 # Notes CRUD + re-indexing
│       │   ├── transcribe.py            # Voice STT (SarvamAI → AssemblyAI)
│       │   ├── flowchart.py             # On-demand flowchart generation
│       │   └── health.py                # Health check
│       ├── core/
│       │   ├── retriever.py             # MultiModelRetriever (ColPali)
│       │   ├── llm.py                   # LLMClient (OpenAI, streaming, flowcharts)
│       │   ├── video_index.py           # VideoIndex (embedding + cosine search)
│       │   └── notes_manager.py         # NotesManager (notes → images → index)
│       └── models/
│           └── schemas.py               # All Pydantic request/response models
│
└── frontend/
    ├── Dockerfile
    ├── next.config.js
    └── src/
        ├── app/
        │   ├── layout.tsx               # Root layout (SmartyFy AI metadata)
        │   ├── page.tsx                  # Main chat page
        │   ├── globals.css              # Theme + design system
        │   ├── documents/page.tsx       # Document management page
        │   └── videos/page.tsx          # Video management page
        ├── components/
        │   ├── ChatInterface.tsx         # Chat input + recording + streaming
        │   ├── MessageBubble.tsx         # Message rendering + sources + videos
        │   ├── MermaidDiagram.tsx        # Flowchart renderer
        │   ├── ChatSidebar.tsx           # Chat history sidebar
        │   ├── Sidebar.tsx              # Navigation sidebar
        │   ├── DocumentManager.tsx       # Document upload/management UI
        │   ├── VideoManager.tsx          # Video management UI
        │   └── ThemeProvider.tsx         # Dark/light theme
        ├── hooks/
        │   └── useChatHistory.ts        # LocalStorage chat persistence
        └── lib/
            ├── api.ts                    # Backend API client
            ├── video.ts                  # YouTube/Vimeo embed URL parser
            └── utils.ts                  # cn() utility (clsx + tailwind-merge)
```

---

## Environment Variables

| Variable             | Default                  | Purpose                          |
|----------------------|--------------------------|----------------------------------|
| `OPENAI_API_KEY`     | —                        | LLM generation (required)        |
| `OPENAI_MODEL`       | `gpt-5-mini`             | OpenAI model for chat            |
| `COLPALI_DEVICE`     | `cpu`                    | PyTorch device (`cpu` / `cuda`)  |
| `SARVAM_API_KEY`     | —                        | SarvamAI voice STT               |
| `ASSEMBLYAI_API_KEY` | —                        | AssemblyAI fallback STT          |
| `STT_PROVIDER`       | `sarvam`                 | Default STT provider             |
| `TOP_K_RESULTS`      | `5`                      | Pages returned per search        |
| `VIDEO_MIN_SCORE`    | `0.40`                   | Min cosine similarity for videos |
| `VIDEO_SCORE_DROP`   | `0.15`                   | Max allowed drop from top score  |
| `FRONTEND_URL`       | `http://localhost:3000`   | CORS allowed origin             |

---

## API Endpoints

| Method | Path                 | Purpose                           |
|--------|----------------------|-----------------------------------|
| POST   | `/api/v1/chat`       | Non-streaming RAG query           |
| POST   | `/api/v1/chat/stream`| Streaming RAG query (SSE)         |
| POST   | `/api/v1/documents`  | Upload PDFs                       |
| GET    | `/api/v1/documents`  | List indexed documents            |
| DELETE | `/api/v1/documents/{name}` | Delete a document            |
| DELETE | `/api/v1/documents`  | Clear all documents               |
| POST   | `/api/v1/transcribe` | Voice-to-text transcription       |
| POST   | `/api/v1/flowchart`  | Generate Mermaid flowchart        |
| GET    | `/api/v1/videos`     | List videos                       |
| POST   | `/api/v1/videos`     | Add a video                       |
| DELETE | `/api/v1/videos/{id}`| Delete a video                    |
| GET    | `/api/v1/notes`      | List notes                        |
| POST   | `/api/v1/notes`      | Add a note                        |
| DELETE | `/api/v1/notes/{id}` | Delete a note                     |
| GET    | `/health`            | Health check + model status       |

---

## Key Design Decisions

1. **Vision-first retrieval** — Documents are indexed as images, not extracted text. This preserves visual context (tables, charts, formatting) that text-based RAG loses.

2. **Dual model architecture** — Users choose between speed (colSmol-500M) and accuracy (colPali-v1.3) at query time. Both models maintain separate indexes over the same documents.

3. **Notes as documents** — User notes are rendered as page images and indexed alongside PDFs, allowing personal knowledge to be retrieved alongside official documentation.

4. **STT with automatic fallback** — SarvamAI is primary (supports auto language detection), AssemblyAI is used transparently if SarvamAI fails.

5. **Adaptive video relevance** — Videos are only shown when genuinely relevant, using both absolute score threshold and relative score-drop filtering.

6. **Streaming-first** — The primary chat endpoint is SSE-based, sending sources/videos before the LLM starts generating, so users see citations immediately.
