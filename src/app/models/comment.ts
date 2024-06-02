import { Course } from "./course";
import { User } from "./user";

export interface Comments {
  id: number;
  commentText: string; // Change 'text' to 'commentText' or use the appropriate property name
  timestamp: Date;
  user: User;
}
