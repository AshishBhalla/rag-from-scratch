# Architecture Diagram and Explanation

This repository is a simple Retrieval-Augmented Generation (RAG) application built from scratch in TypeScript using the Ollama SDK. It reads local text data, creates vector embeddings, performs semantic retrieval with a project filter, and generates grounded answers using an LLM.

## Architecture Diagram

```mermaid
flowchart TB
  subgraph Source
    A[Data files\n/data/*.dat]
  end

  subgraph Ingestion
    B[readData()\nsrc/utils/readData.ts]
    C[createOverlappingChunks()\nsrc/utils/overlapChunks.ts]
    D[createEmbeddings()\nsrc/utils/embeddings.ts]
  end

  subgraph Store
    E[Embedded chunks with metadata\nsrc/interface/interface.ts]
  end

  subgraph Query
    F[User input\nsrc/index.ts]
    G[createEmbeddings(userMessage)\nsrc/utils/embeddings.ts]
    H[filterBuilder(userMessage)\nsrc/utils/filter.ts]
    I[retrieve()\nsrc/retrieval/retrievalEngine.ts]
  end

  subgraph Generation
    J[createPrompt(context, question)\nsrc/utils/createPrompt.ts]
    K[generateContent()\nsrc/generation/generator.ts]
  end

  A --> B
  B --> C
  C --> D
  D --> E
  F --> G
  F --> H
  G --> I
  H --> I
  E --> I
  I --> J
  J --> K
  K --> F
```

## Purpose and Flow

1. **Data ingestion**
   - `src/utils/readData.ts` reads all `.dat` files from the `data/` directory.
   - It normalizes whitespace and builds a `SourceDocument` object for each file, tagging it with metadata derived from the filename (project name).

2. **Chunk creation**
   - `src/utils/overlapChunks.ts` splits each source document into overlapping 2-line chunks.
   - Overlapping chunks preserve context across the document and make similarity search more effective.

3. **Embedding generation**
   - `src/utils/embeddings.ts` calls Ollama's `embed` API with the configured `EMBEDDING_MODEL` (`embeddinggemma`).
   - Each chunk becomes an `EmbeddedChunk` with text, vector embedding, and metadata.

4. **Interactive query loop**
   - `src/index.ts` starts a console-based assistant.
   - For each user question, it creates an embedding and builds a project filter.
   - If the user mentions a project (e.g. "project falcon"), `src/utils/filter.ts` extracts the project name from the query. Otherwise, it uses the default project `falcon`.

5. **Retrieval**
   - `src/retrieval/retrievalEngine.ts` scores stored chunks against the query embedding using cosine similarity.
   - It filters chunks by metadata project and returns the top `TOP_K` chunks configured in `src/constants/constants.ts`.

6. **Prompt construction and generation**
   - `src/utils/createPrompt.ts` builds a simple prompt including the retrieved context and the user question.
   - `src/generation/generator.ts` sends the prompt to Ollama using the configured model `gemma3:4`.
   - The generated response is printed back to the console.

## Key Files and Roles

- `src/index.ts`
  - Main orchestration file.
  - Loads data, creates embeddings, then enters a chat loop.

- `src/utils/readData.ts`
  - Reads and normalizes raw text data files.
  - Produces the initial source documents.

- `src/utils/overlapChunks.ts`
  - Splits documents into overlapping chunks to preserve local context for retrieval.

- `src/utils/embeddings.ts`
  - Wraps Ollama embedding generation.

- `src/utils/filter.ts`
  - Extracts a `project` filter from the user query.

- `src/retrieval/retrievalEngine.ts`
  - Applies cosine similarity and project filtering to find relevant chunks.

- `src/utils/createPrompt.ts`
  - Builds the final LLM prompt with context and user question.

- `src/generation/generator.ts`
  - Calls Ollama to generate the answer.

- `src/constants/constants.ts`
  - Stores model names and default values.

- `src/interface/interface.ts`
  - Defines shared TypeScript types for documents, embeddings, queries, and metadata.

## Supporting Files

- `package.json`
  - Defines dependencies: `ollama` for embeddings and generation, `chalk` for console styling.
  - Uses `tsx` to run TypeScript directly.

- `data/`
  - Contains the source knowledge files used for retrieval.

- `experiments/`
  - Contains standalone scripts such as `asyncChat.ts`, `similarity.ts`, and `createEmbedding.ts` for experimental workflows or proofs of concept.

## Notes

- The repository is designed as a minimal RAG prototype.
- It currently enforces a project-level filter in retrieval, so only chunks matching the extracted or default project are considered.
- `src/utils/metedataEnrichment.ts` exists as an alternate metadata extraction helper but is not used in the current app flow.
