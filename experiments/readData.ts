  import { readFile } from "node:fs/promises";

  function createChunks(text: string): string[] {
    const chunk = text
      .split("\n")
      .map((line) => line.trim())
      .filter(line => line.length > 0);
    return chunk;
  }

  async function readData() {
    try {
      const data = await readFile("./data/input.txt", "utf8");
      const chunk = createChunks(data);
      console.log(chunk);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  readData();
