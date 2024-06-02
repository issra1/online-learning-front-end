import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursePaymentStatusService {

  private baseUrl = 'http://localhost:8080/api/course-payment-status/';

  constructor(private http: HttpClient) { }

  setCourseAsPaidForUser(courseId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${courseId}/set-paid/${userId}`, null);
  }

  setCourseAsNotPaidForUser(courseId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${courseId}/set-not-paid/${userId}`, null);
  }

  getPaidCoursesByUser(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}paid-courses/${userId}`);
  }

  getAllPaiedCoursesForUser(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}all-paied-courses/${userId}`);
  }
}
