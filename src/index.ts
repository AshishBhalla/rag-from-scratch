import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";
import readData from "./utils/readData.js";
import {
  FinalOutput,
  Query,
  SourceDocument,
  DocumentChunk,
  EmbeddedChunk
} from "./interface/interface.js";
import {createEmbeddings} from "./utils/embeddings.js";
import retrieve from "./retrieval/retrievalEngine.js";
import generateContent from "./generation/generator.js";
import filterBuilder from "./utils/filter.js";
import createOverlappingChunks from "./utils/overlapChunks.js";
import { TOP_K } from "./constants/constants.js";

const rl = readline.createInterface({ input, output });

async function main(): Promise<void> {
  const embeddedChunks: EmbeddedChunk[] = [];
  const inputReference: SourceDocument[] = await readData();
  const overlappingChunks: DocumentChunk[] = createOverlappingChunks(inputReference)
  for (const record of overlappingChunks) {
    const { embedding } = await createEmbeddings(record.text);
    // const metadata = metadataEnrichment(record.metadata.project);
    const metadata = record.metadata;
    embeddedChunks.push({ text: record.text, embedding, metadata });
  }

  console.log(chalk.cyan("================================="));
  console.log(chalk.cyan("🤖 AI Assistant"));
  console.log(chalk.cyan("==============================="));
  while (true) {
    const userMessage: string = await rl.question(chalk.greenBright("You: "));
    const { embedding } = await createEmbeddings(userMessage);
    const filter = filterBuilder(userMessage);
    const query: Query = {
      text: userMessage,
      embedding,
      filter,
    };
    const documents: FinalOutput[] = retrieve(
      query,
      embeddedChunks,
      TOP_K,
    );
    console.log("top-k", documents);
    const context = documents.map((d) => d.document).join("\n");
    const llmResponse = await generateContent(context, userMessage);
    console.log(`Bot: ${JSON.stringify(llmResponse.response)}`);
  }
}

main();
