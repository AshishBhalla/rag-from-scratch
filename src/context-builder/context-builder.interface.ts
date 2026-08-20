import { ContextBuildRequest, ContextBuildResult } from "../interface/interface.js";

export interface ContextBuilder {
  build(request: ContextBuildRequest): Promise<ContextBuildResult>;
}