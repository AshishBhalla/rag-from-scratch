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

export type Embedding = {
  embedding: number[];
}

export type BaseEmbed = Embedding & {
  text: string;
};

export type StoredDocument = BaseEmbed & {
  metadata: Metadata;
};

export type Query = BaseEmbed & {
  filter: Filter;
};
