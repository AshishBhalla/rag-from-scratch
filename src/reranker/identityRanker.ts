import { Reranker } from "./reranker.interface.js";

export const IdentityReranker: Reranker = {
  async rerank(request) {
    return [...request.candidates];
  },
};