import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";
import readData from "./utils/readData.js";
import {
  StoredDocument,
  FinalOutput,
  Query,
} from "./interface/interface.js";
import createEmbeddings from "./utils/embeddings.js";
import retrieve from "./retrieval/retrievalEngine.js";
import generateContent from "./generation/generator.js";
import metadataEnrichment from "./utils/metedataEnrichment.js";
import filterBuilder from "./utils/filter.js";
import { TOP_K } from "./constants/constants.js";

const rl = readline.createInterface({ input, output });

async function main(): Promise<void> {
  const storedDocuments: StoredDocument[] = [];
  const inputReference = await readData();
  for (const line of inputReference) {
    const { embedding } = await createEmbeddings(line);
    const metadata = metadataEnrichment(line);
    storedDocuments.push({ text:line, embedding, metadata });
  }

  console.log(chalk.cyan("================================="));
  console.log(chalk.cyan("🤖 AI Assistant"));
  console.log(chalk.cyan("==============================="));
  while (true) {
    const userMessage: string = await rl.question(chalk.greenBright("You: "));
    const { embedding } = await createEmbeddings(userMessage);
    const filter = filterBuilder(userMessage);
    const userMessageEmbedding: Query = { text: userMessage, embedding, filter };
    console.log("userMessageEmbedding", userMessageEmbedding);
    const documents: FinalOutput[] = retrieve(
      userMessageEmbedding,
      storedDocuments,
      TOP_K,
    );
    console.log("top-k", documents);
    const context = documents.map((d) => d.document).join("\n");
    const llmResponse = await generateContent(context, userMessage);
    console.log(`Bot: ${JSON.stringify(llmResponse.response)}`);
  }
}

main();
