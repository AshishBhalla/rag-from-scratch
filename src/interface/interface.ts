export type ChatMessage = {
  role: string;
  content: string;
};

export type FinalOutput = {
  score: number;
  document: string;
};

export type Metadata = {
  project: string;
};

export type Filter = {
  project: string;
};

export type BaseEmbed = Embedding & {
  text: string;
};

export type Query = BaseEmbed & {
  filter: Filter;
};

export type Text = {
  text: string;
};

export type Embedding = {
  embedding: number[];
};

export type SourceDocument = Text & {
  metadata: Metadata;
};

export type DocumentChunk = Text & {
  metadata: Metadata;
};

export type EmbeddedChunk = Text &
  Embedding & {
    metadata: Metadata;
  };

export type RetrievalResult = {
  similarity: number;
  chunk: EmbeddedChunk;
  rerankScore?: number;
};

export type RerankRequest = {
  question: string;
  candidates: RetrievalResult[];
};

export type EvaluationRequest = {
  question: string;
  candidates: RetrievalResult[];
};

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export type EvaluatedEvidence = {
  candidate: RetrievalResult;
  confidence: ConfidenceLevel;
};

export type EvaluationResult = {
  evidence: EvaluatedEvidence[];
  canAnswer: boolean;
};

export type ContextBuildRequest = {
  question: string;
  evaluatedEvidence: EvaluatedEvidence[];
};

export type ContextBuildResult = {
  question: string;
  context: string;
};
