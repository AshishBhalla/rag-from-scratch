import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import ollama from "ollama";
import chalk from "chalk";
import { MODEL_NAME } from "../src/constants/constants.js";
const rl = readline.createInterface({ input, output });
import { ChatMessage } from "../src/interface/interface.js";
const conversationHistory: ChatMessage[] = [];
let continueChat = true;

async function* chat(content: ChatMessage): AsyncGenerator<ChatMessage> {
  conversationHistory.push(content);
  const stream = await ollama.chat({
    model: MODEL_NAME,
    messages: conversationHistory,
    stream: true,
  });
  for await (const chunk of stream) {
    const text = chunk.message?.content ?? "";
    if (text) {
      yield { role: "assistant", content: text };
    }
  }
}

async function main(): Promise<void> {
  console.log(chalk.cyan("================================="));
  console.log(chalk.cyan("🤖 AI Assistant"));
  console.log(chalk.cyan("==============================="));
  while (continueChat) {
    const userMessage = await rl.question(chalk.greenBright("You: "));
    switch (userMessage.toLowerCase()) {
      case "/help":
        console.log(chalk.blue("Help Menu:"));
        console.log("/clear: to clear the output");
        console.log("/model: to get details of model used");
        console.log("/quit or /exit: to close the session");
        continue;
      case "/exit":
      case "/quit":
        console.log(chalk.red("Bot: Goodbye!"));
        rl.close();
        continueChat = false;
        break;
      case "/clear":
        console.clear();
        continue;
      case "/model":
        console.log(MODEL_NAME);
        continue;
    }

    try {
      const message: ChatMessage = {
        role: "user",
        content: userMessage,
      };

      const stream = chat(message);

      const streamedMessages: ChatMessage[] = [];

      output.write(chalk.yellow("Bot:"));
      for await (const message of stream) {
        streamedMessages.push(message);
        output.write(chalk.cyanBright(message.content));
      }
      console.log();

      const fullReply = streamedMessages
        .map((message) => message.content)
        .join("");

      conversationHistory.push({ role: "assistant", content: fullReply });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
}

main();
