import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ResponseComponent } from '../../response/response.component';
import { CommentComponent } from '../../forum-management/comment/comment.component';
import { Course } from '../../../models/course';
import { FavoriteCoursesService } from '../../../services/course-service/favorite-courses.service';
import { LoginService } from '../../../services/security-service/login.service';

@Component({
  selector: 'app-list-cours-favoris',
  standalone: true,
  imports: [CreateCourseComponent, CommonModule, YouTubePlayerModule, ResponseComponent, CommentComponent],
  templateUrl: './list-cours-favoris.component.html',
  styleUrl: './list-cours-favoris.component.css'
})
export class ListCoursFavorisComponent {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  filteredCourses: Course[] = [];
  userId: number | null = null; // User ID variable
  isCourseFavorite: boolean = false; // Initialize isCourseFavorite to true by default

  constructor(
    private router: Router,
    protected loginService: LoginService,
    private favoriteCoursesService: FavoriteCoursesService
  ) { }

  ngOnInit(): void {
    this.userId = this.loginService.getUserIdFromSessionStorage();
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.userId = this.loginService.getUserIdFromSessionStorage();
    if (this.userId) {
      this.favoriteCoursesService.getFavoriteCourses(this.userId).subscribe(
        courses => {
          this.courses = courses;
          this.filteredCourses = courses;
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }

  playVideo(course: Course): void {
    this.selectedCourse = course;
    if (this.selectedCourse && this.selectedCourse.id) {
      this.checkIfCourseIsFavorite(this.selectedCourse.id)
    }

  }


  createCourse(): void {
    this.router.navigate(['/courses/create']);
  }
  searchCourses(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value.trim();

    if (!inputValue) {
      this.filteredCourses = this.courses;
      return;
    }
    this.filteredCourses = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }


  addToFavorites(courseId: number): void {
    if (this.userId) {
      this.favoriteCoursesService.addToFavorites(this.userId, courseId).subscribe(
        () => {
          this.isCourseFavorite = !this.isCourseFavorite;
          window.location.reload();
        },
        error => {
          console.error('Error adding course to favorites:', error);
        }
      );
    }
  }

  removeFromFavorites(courseId: number): void {
    // Call the service method to remove the course from favorites
    this.favoriteCoursesService.removeFromFavorites(courseId).subscribe(
      () => {
        this.isCourseFavorite = !this.isCourseFavorite;
        window.location.reload();
      },
      error => {
        console.error('Error removing course from favorites:', error);
      }
    );
  }

  checkIfCourseIsFavorite(courseId: number): void {
    // Call the service method to check if the course is marked as a favorite by the user

    if (this.userId) {
      this.favoriteCoursesService.isCourseFavoriteByUser(this.userId, courseId).subscribe(
        isFavorite => {
          this.isCourseFavorite = isFavorite;
        },
        error => {
          // Handle any errors
          console.error('Error checking if course is favorite:', error);
          return false;
        }
      );
    }
  }

  openUrlCourse(url: string) {
    window.open(url);
  }



}
