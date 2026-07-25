import ollama from "ollama";
import { EMBEDDING_MODEL } from "../src/constants/constants.js";

async function main():Promise<void>{
const input = 'What is Generative AI?'
const response = await ollama.embed(
    {
        model : EMBEDDING_MODEL,
        input
    }
)
console.log(response.model);
console.log(response.embeddings.length);
console.log(response?.embeddings[0]?.length);
console.log(response?.embeddings[0]?.slice(0, 10));
}

main()