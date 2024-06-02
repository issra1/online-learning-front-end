// answer.model.ts
export interface Answer {
    id: number;
    commentId: number;
    user: string; // Assuming a user property for the user who posted the answer
    text: string;
  }
  