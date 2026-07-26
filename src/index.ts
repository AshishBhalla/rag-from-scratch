import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";
import readData from "./utils/readData.js";
import { DataStore, FinalOutput } from "./interface/interface.js";
import createEmbeddings from "./utils/embeddings.js";
import retrieve from "./retrieval/retrievalEngine.js";
import generateContent from "./generation/generator.js";
import { TOP_K } from "./constants/constants.js";

const rl = readline.createInterface({ input, output });

async function main(): Promise<void> {
  const dataStore: DataStore[] = [];
  const inputReference = await readData();
  for (const line of inputReference) {
    dataStore.push(await createEmbeddings(line));
  }

  console.log(chalk.cyan("================================="));
  console.log(chalk.cyan("🤖 AI Assistant"));
  console.log(chalk.cyan("==============================="));
  while (true) {
    const userMessage: string = await rl.question(chalk.greenBright("You: "));
    const userMessageEmbedding: DataStore = await createEmbeddings(userMessage);
    const documents: FinalOutput[] = retrieve(
      userMessageEmbedding,
      dataStore,
      TOP_K,
    );
    const context = documents.map((d) => d.document).join("\n");
    const llmResponse = await generateContent(context, userMessage);
    console.log(`Bot: ${JSON.stringify(llmResponse.response)}`);
  }
}

main();
