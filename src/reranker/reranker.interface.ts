// import { RerankRequest, RetrievalResult } from "../interface/interface.js";

// export default async function reranker(
//   request: RerankRequest,
// ): Promise<RetrievalResult[]> {
//   return request.candidates;
// }


// Defining the contract for rerankers
import { RerankRequest, RetrievalResult } from "../interface/interface.js";

export interface Reranker {
  rerank(request: RerankRequest): Promise<RetrievalResult[]>;
}