import { RetrievalResult } from "../interface/interface.js";
import { Reranker } from "./reranker.interface.js";

const stopWords = new Set([
  "the",
  "a",
  "an",
  "in",
  "on",
  "at",
  "and",
  "but",
  "is",
  "are",
  "was",
  "to",
  "for",
]);

export const KeywordRanker: Reranker = {
  async rerank(request) {
    const { question, candidates } = request;
    const rerankedCandidates: RetrievalResult[] = [...candidates]
    const questionKeywords: string[] = normalizeText(question);
    for (let i = 0; i < candidates.length; i++) {
      let score = 0;
      const candidateKeywords: string[] = normalizeText(
        candidates[i]!.chunk.text,
      );
      const candidateKeywordSet = new Set(candidateKeywords);
      for (let j = 0; j < questionKeywords.length; j++) {
        if (candidateKeywordSet.has(questionKeywords[j]!)) {
          score++;
        }
      }
      rerankedCandidates[i]!.rerankScore = score;
    }
    return rerankedCandidates.sort(
      (prev, next) => (next.rerankScore ?? 0) - (prev.rerankScore ?? 0),
    );
  },
};

function normalizeText(text: string): string[] {
  const keywords = text
    .trim()
    .replace(/[^\w\s]|_/g, "")
    .toLowerCase()
    .split(" ")
    .filter((word) => !stopWords.has(word));
  return keywords;
}
