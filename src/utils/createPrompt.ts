export default function createPrompt(
  context: string,
  question: string,
): string {
  return `INSTRUCTION
Use the provided context to answer the question.
If the answer isn't present in the context, say that you don't know.
CONTEXT
${context}
QUESTION
${question}
`;
}
