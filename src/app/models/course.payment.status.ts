import { Course } from "./course";
import { User } from "./user";

// answer.model.ts
export interface CoursePayementStatus {
    id: number;
    user: User; // Assuming a user property for the user who posted the answer
    course: Course;
  }
  