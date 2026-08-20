import { EvaluationRequest, EvaluationResult } from "../interface/interface.js";

export interface EvidenceEvaluator {
  evaluate(request: EvaluationRequest): Promise<EvaluationResult>;
}

