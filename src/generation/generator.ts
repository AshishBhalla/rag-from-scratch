import ollama from "ollama";
import { MODEL_NAME } from "../constants/constants.js";
import createPrompt from "../utils/createPrompt.js";

export default async function generateContent(
  context: string,
  question: string,
) {
  const response = await ollama.generate({
    model: MODEL_NAME,
    prompt: createPrompt(context, question),
  });
  return response;
}
