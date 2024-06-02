import { CoursePayementStatus } from "./course.payment.status";
import { Professor } from "./professor";

export interface Course {
    id?: number;
    courseName: string;
    enrolledDate?: Date;
    instructor: Professor;
    instructorInstitution: string;
    enrolledCount: number;
    youtubeUrl: string;
    websiteUrl: string;
    courseType: string;
    skillLevel: string;
    language: string;
    description: string;
    coursePaymentStatuses : CoursePayementStatus[];
    department: string;
    price : string;
    comments: Comment[];
    isSelected: boolean;
    paiedOrNo: boolean;
    isAccepted: boolean;
    // Assuming Comment is another model/interface representing a comment

  }
  