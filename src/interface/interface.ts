export type ChatMessage = {
    role: string;
  content: string;  
}

export type DataStore = {
  text: string;
  embedding: number[];
}

export type FinalOutput = {
  score : number,
  document: string
}