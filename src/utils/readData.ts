import { readFile, readdir } from "node:fs/promises";
import { SourceDocument } from "../interface/interface.js";

function createCompleteText(text: string): string {
  // const concatenatedChunk: string[] = [];
  const completeText = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return completeText.join("\n");
}

export default async function readData(): Promise<SourceDocument[]> {
  const sourceDocuments: SourceDocument[] = [];
  try {
    const listOfFiles = await readdir("./data/");
    for (let i = 0; i < listOfFiles.length; i++) {
      const data = await readFile(`./data/${listOfFiles[i]}`, "utf8");
      const completeText = createCompleteText(data);
      sourceDocuments.push({
        text: completeText,
        metadata: { project: listOfFiles[i]?.split(".")[0]! },
      });
    }
    return sourceDocuments;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    throw error;
  }
}
