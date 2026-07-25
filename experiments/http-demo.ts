import { MODEL_NAME } from "../src/constants/constants.js";

const response = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL_NAME,
    messages: [
      {
        role: "user",
        content: "What is a good book to study AI?",
      },
    ],
    stream: false,
  }),
});

const data = await response.json();

console.log(data.message.content);