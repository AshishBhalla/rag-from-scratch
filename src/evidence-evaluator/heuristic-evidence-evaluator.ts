import { EvidenceEvaluator } from "./evidence-evaluator.interface.js";
import { ConfidenceLevel } from "../interface/interface.js";

export const HeuristicEvidenceEvaluator: EvidenceEvaluator = {
  async evaluate(request) {
    const evidence = [];
    let canAnswer: boolean = false;

    for (const candidate of request.candidates ?? []) {
      const score = candidate.rerankScore ?? 0;
      const confidenceLevel: ConfidenceLevel = getConfidence(score);
      if (confidenceLevel === "HIGH") {
        canAnswer = true;
      }
      evidence.push({
        candidate,
        confidence: confidenceLevel,
      });
    }

    return {
      evidence,
      canAnswer,
    };
  },
};

function getConfidence(score: number): ConfidenceLevel {
  if (score >= 3) {
    return "HIGH";
  } else if (score >= 2) {
    return "MEDIUM";
  } else {
    return "LOW";
  }
}
