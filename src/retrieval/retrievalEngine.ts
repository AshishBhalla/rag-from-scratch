import cosineSimilarity from "./similarity.js";
import { DataStore, FinalOutput } from "../interface/interface.js";

// let bestScore: number = Infinity;
// let score: number = -Infinity;
// let document: string = "";

function getTopK(arr: FinalOutput[], k: number): FinalOutput[] {
  return [...arr].sort((a, b) => b.score - a.score).slice(0, k);
}

export default function retrieve(
  userMessageEmbedding: DataStore,
  dataStore: DataStore[],
  k: number,
): FinalOutput[] {
  const documents: FinalOutput[] = [];
  for (const item of dataStore) {
    //   let score = similarity(item.embedding, userMessageEmbedding.embedding);
    //   if (score < bestScore) {
    //     bestScore = score;
    //     bestDocument = item.text;
    //   }
    const score:number = cosineSimilarity(item.embedding, userMessageEmbedding.embedding);
    const document:string = item.text;
    documents.push({ score, document });
  }
  return getTopK(documents, k);
}
