// favorite-courses.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCoursesService {
  private baseUrl = 'http://localhost:8080/api/favorites/users';

  constructor(private http: HttpClient) { }

  addToFavorites(userId: number, courseId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/add/${courseId}`, {});
  }

  removeFromFavorites(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${favoriteId}`);
  }

  getFavoriteCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${userId}`);
  }

    isCourseFavoriteByUser(userId: number, courseId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/${userId}/courses/${courseId}/isFavorite`);
    }
  
}
