import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comments } from '../../models/comment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getCommentsForCourse(courseId: number): Observable<Comments[]> {
    // Mocked data
    const comments: Comments[] = [
      {
        id: 1,
        commentText: "This course is amazing!",
        answer: "Thank you!",
        responses: [],
        user: new User()
      },
      {
        id: 2,
        commentText: "Can't wait to enroll!",
        answer: "",
        responses: [],
        user: new User()
      }
    ];
    return of(comments);
  }
}
