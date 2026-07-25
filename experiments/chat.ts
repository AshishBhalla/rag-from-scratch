import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import ollama from "ollama";
import { MODEL_NAME } from "../src/constants/constants.js";
const rl = readline.createInterface({ input, output });
import { ChatMessage } from "../src/interface/interface.js";
const conversationHistory:ChatMessage[] = [];

async function chat(content: ChatMessage): Promise<void> {
  conversationHistory.push(content);
  const response = await ollama.chat({
    model: MODEL_NAME,
    messages: conversationHistory,
  });
  conversationHistory.push(response.message);
  console.log(`Bot: ${response.message.content}`);
}

async function main(): Promise<void> {
  while (true) {
    const userMessage = await rl.question("Prompt: ");

    if (
      userMessage.toLowerCase() === "exit" ||
      userMessage.toLowerCase() === "quit"
    ) {
      console.log("Bot: Goodbye!");
      rl.close();
      break;
    }
    try {
      const message: ChatMessage = {
        role: "user",
        content: userMessage,
      };
      await chat(message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
}

main();
