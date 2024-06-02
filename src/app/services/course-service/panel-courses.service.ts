// favorite-courses.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class PanelCoursesService {
  private baseUrl = 'http://localhost:8080/api/panel/users';

  constructor(private http: HttpClient) { }

  addToPanel(userId: number, courseId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/add/${courseId}`, {});
  }

  removeFromPanel(panelId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${panelId}`);
  }

  getPanelCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${userId}`);
  }

    isCoursePanelByUser(userId: number, courseId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/${userId}/courses/${courseId}/isPanel`);
    }
  
}
