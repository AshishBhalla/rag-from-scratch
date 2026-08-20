import { ContextBuilder } from "./context-builder.interface.js";

const rank = { HIGH: 1, MEDIUM: 2, LOW: 3 };

export const ContextBuilderFunction: ContextBuilder = {
  async build(request) {
    let context: string = "";
    const evaluatedEvidence = request.evaluatedEvidence ?? [];
    const sortedEvaluatedEvidence = evaluatedEvidence.sort(
      (e1, e2) => rank[e1.confidence] - rank[e2.confidence],
    );
    for (const evidence of sortedEvaluatedEvidence) {
      context += evidence.candidate.chunk.text;
    }
    return {
      question: request.question,
      context,
    };
  },
};
