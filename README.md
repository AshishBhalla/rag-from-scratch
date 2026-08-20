# RAG From Scratch

A hands-on RAG implementation built from scratch with TypeScript and Ollama, exploring the architecture and engineering trade-offs behind modern Retrieval-Augmented Generation systems.

The project progressively builds a RAG pipeline from first principles, covering document chunking, embeddings, vector similarity, semantic retrieval, reranking, evidence evaluation, context construction, and grounded LLM generation.

Rather than relying on high-level RAG frameworks, the core retrieval pipeline is implemented explicitly to understand how each stage works, how information flows between components, and how retrieval quality can be improved incrementally.

## Current Pipeline

```text
Documents
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Store
    ↓
Semantic Retrieval
    ↓
Keyword Reranking
    ↓
Evidence Evaluation
    ↓
Context Construction
    ↓
Grounded LLM Generation

```markdown
## Project Status

### Gen-1 — Retrieval Quality Pipeline ✅

The first complete retrieval-quality pipeline is implemented.

- Semantic retrieval using vector embeddings
- Cosine similarity
- Top-K candidate retrieval
- Pluggable reranker interface
- Keyword-based reranking
- Evidence evaluation
- HIGH / MEDIUM / LOW evidence confidence
- Answerability assessment
- Context construction
- Grounded LLM generation

### Next

Gen-2 will explore adaptive retrieval — allowing the system to recognize when the retrieved evidence is insufficient and perform another retrieval iteration using feedback from the evaluation stage.
