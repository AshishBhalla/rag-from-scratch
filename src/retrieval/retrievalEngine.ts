import cosineSimilarity from "./similarity.js";
import { EmbeddedChunk, Query, RetrievalResult } from "../interface/interface.js";

// let bestScore: number = Infinity;
// let score: number = -Infinity;
// let document: string = "";

function getTopK(arr: RetrievalResult[], k: number): RetrievalResult[] {
  return [...arr].sort((a, b) => b.similarity - a.similarity).slice(0, k);
}

export default function retrieve(
  userMessageEmbedding: Query,
  storedDocuments: EmbeddedChunk[],
  k: number,
): RetrievalResult[] {
  const retrievalResult: RetrievalResult[] = [];
  for (const item of storedDocuments) {
    //   let score = similarity(item.embedding, userMessageEmbedding.embedding);
    //   if (score < bestScore) {
    //     bestScore = score;
    //     bestDocument = item.text;
    //   }
    if (item.metadata.project === userMessageEmbedding.filter.project) {
      const similarity: number = cosineSimilarity(
        item.embedding,
        userMessageEmbedding.embedding,
      );
      const document: string = item.text;
      console.log("Retrieved");
      console.log(`${similarity} | ${document}`);
      retrievalResult.push({ similarity, chunk: item });
    }
  }
  return getTopK(retrievalResult, k);
}
