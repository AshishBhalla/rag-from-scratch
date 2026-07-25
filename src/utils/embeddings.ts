import ollama from "ollama";
import { EMBEDDING_MODEL } from "../constants/constants.js";
import { DataStore } from "../interface/interface.js";

export default async function createEmbeddings(
  input: string,
): Promise<DataStore> {
  const response = await ollama.embed({
    model: EMBEDDING_MODEL,
    input,
  });
  return {
    text: input,
    embedding: response.embeddings[0] ?? [],
  };
}


// calculating Manhattan distance
// const similarity = (a: number[], b: number[]): number => {
//   const len = Math.min(a.length, b.length);
//   if (a.length !== b.length) {
//     throw new Error("Vectors must have the same dimensions");
//   }
//   let sum = 0;
//   for (let i = 0; i < len; i++) {
//     sum += Math.abs(a[i]! - b[i]!);
//   }
//   return sum;
// };