import cosineSimilarity from "./similarity.js";
import { DataStore, FinalOutput } from "../interface/interface.js";

// let bestScore: number = Infinity;
let bestScore: number = -Infinity;
let bestDocument: string = "";

export default function retrieve(
  userMessageEmbedding: DataStore,
  dataStore: DataStore[],
): FinalOutput {
  for (const item of dataStore) {
    //   let score = similarity(item.embedding, userMessageEmbedding.embedding);
    //   if (score < bestScore) {
    //     bestScore = score;
    //     bestDocument = item.text;
    //   }
    let score = cosineSimilarity(
      item.embedding,
      userMessageEmbedding.embedding,
    );
    if (score > bestScore) {
      bestScore = score;
      bestDocument = item.text;
    }
  }
  return {bestScore, bestDocument};
}
