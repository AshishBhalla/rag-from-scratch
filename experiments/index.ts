import ollama from "ollama";
import { MODEL_NAME, ROLE } from "../src/constants/constants.js";

const main = async (): Promise<void> => {
  try {
    console.time("AI response");

    const response = await ollama.chat({
      model: MODEL_NAME,
      messages: [
        {
          role: ROLE,
          content: "Explain why TypeScript is useful for AI applications.",
        },
      ],
    });

    console.timeEnd("AI response");
    console.log("\n🤖 Gemma\n");
    console.log(response.message.content);
  } catch (error) {
        console.error("Application failed.");
        console.error(error);
  }
};

main()