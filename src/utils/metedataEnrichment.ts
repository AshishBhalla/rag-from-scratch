import { Metadata } from "../interface/interface.js";
import { DEFAULT_PROJECT } from "../constants/constants.js";

let project: string = DEFAULT_PROJECT;

export default function metadataEnrichment(data: string): Metadata {
  const hasProjectkey: boolean = data.toLowerCase().includes("project");
  const dataArray: string[] = data.toLowerCase().split(" ");
  if (hasProjectkey) {
    const projectIndex: number = dataArray.indexOf("project");
    return { project: dataArray[projectIndex + 1]! };
  }
  return { project };
}
