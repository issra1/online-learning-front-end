import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  getAllComments(courseId: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.baseUrl}/all/${courseId}`);
  }

  addComment(userId: number, courseId: number, commentsData : Comments): Observable<Comments> {
    return this.http.post<Comments>(`${this.baseUrl}/add/${userId}/${courseId}`,commentsData);
  }

  removeComment(commentId: number) {
    return this.http.delete(`${this.baseUrl}/remove/${commentId}`);
  }

  
  // Add more methods as needed
}
