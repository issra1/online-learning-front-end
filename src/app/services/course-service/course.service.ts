import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { environment } from '../../../environments/environment';
const NAV_URL_COURSE = environment.apiURLCourse;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${NAV_URL_COURSE}/addCourse`, course);
  }

  getAllCourses(role: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${NAV_URL_COURSE}/all/`+role);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${NAV_URL_COURSE}/${id}`);
  }

  updateCourse(courseId: number, course: Course) {
    return this.http.put<Course>(`${NAV_URL_COURSE}/${courseId}`, course);
  }

  setCourseAsPaid(courseId: number): Observable<void> {
    return this.http.post<void>(`${NAV_URL_COURSE}/${courseId}/paid`, null);
  }

  setCourseAsNotPaid(courseId: number): Observable<void> {
    return this.http.post<void>(`${NAV_URL_COURSE}/${courseId}/notpaid`, null);
  }

  acceptCourse(courseId: any, data: any): Observable<any> {
    return this.http.put<any>(`${NAV_URL_COURSE}/accept-course/${courseId}`, data);
  }

  deleteCourse(courseId: any, data: any): Observable<any> {
    return this.http.put<any>(`${NAV_URL_COURSE}/delete-course/${courseId}`, data);
  }

}
