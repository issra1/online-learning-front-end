import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { Professor } from '../models/professor';

@Injectable({
    providedIn: 'root'
})
export class MockCommentService {

    constructor() { }

    getAllCourses(): Observable<Course[]> {
        // Mocked data
        const courses: Course[] = [
            {
                id: 1,
                courseName: "Introduction to Angular",
                enrolledDate: new Date("2022-01-01"),
                instructor: new Professor(),
                instructorInstitution: "XYZ University",
                enrolledCount: 100,
                youtubeUrl: "https://www.youtube.com/watch?v=videoID",
                websiteUrl: "https://www.example.com",
                courseType: "Online",
                skillLevel: "Beginner",
                language: "English",
                description: "This course provides an introduction to Angular framework.",
                department: "Computer Science",
                price: 49.99,
                comments: [],
            },
            {
                id: 2,
                courseName: "Advanced React",
                enrolledDate: new Date("2022-03-15"),
                instructor: new Professor(),
                instructorInstitution: "ABC University",
                enrolledCount: 75,
                youtubeUrl: "https://www.youtube.com/watch?v=videoID",
                websiteUrl: "https://www.example.com",
                courseType: "Online",
                skillLevel: "Advanced",
                language: "English",
                description: "This course covers advanced concepts in React framework.",
                department: "Computer Science",
                price: 59.99,
                comments: [],
            }
        ];
        return of(courses);
    }
}
  
