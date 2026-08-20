import { SourceDocument, DocumentChunk } from "../interface/interface.js";

export default function createOverlappingChunks(
  records: SourceDocument[],
): DocumentChunk[] {
  const documentChunks: DocumentChunk[] = [];
  for (let i = 0; i < records.length; i++) {
    const text = records[i]!.text;
    const textArray = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    for (let j = 0; j < textArray.length-1; j++) {
      const chunk = `${textArray[j]!}\n${textArray[j + 1]!}`;
      const metadata = records[i]!.metadata;
      documentChunks.push({ text: chunk, metadata });
    }
  }
  return documentChunks;
}
