import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseComponent } from '../../response/response.component';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course-service/course.service';
import { LoginService } from '../../../services/security-service/login.service';
import { CommentComponent } from '../../forum-management/comment/comment.component';
import { FavoriteCoursesService } from '../../../services/course-service/favorite-courses.service';
import { PaymentDialogComponent } from '../../payment-management/payment-dialog/payment-dialog.component';
import { PanelCoursesService } from '../../../services/course-service/panel-courses.service';
import { CommentService } from '../../../services/course-service/comment.service';
import { Comments } from '../../../models/comment';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list-courses',
  standalone: true,
  imports: [CreateCourseComponent, RouterLink, FormsModule, ReactiveFormsModule, CommonModule, YouTubePlayerModule, ResponseComponent, CommentComponent],
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  filteredCourses: Course[] = [];
  userId: number | null = null; // User ID variable
  isCourseFavorite: boolean = false; // Initialize isCourseFavorite to true by default
  isCoursePanel: boolean = false; // Initialize isCourseFavorite to true by default
  selectedCourses: Course[] = []; // Array to hold selected courses

  isDisableAccess: boolean = false;
  staticCourses: Course[] = []; // Static array to hold selected courses

  comments: Comments[] = [];
  newComment: string = '';

  commentsData: Comments = {
    id: 0, // Provide a default value for id if needed
    commentText: '',
    timestamp: new Date(),
    user: new User, // Provide a default user object if needed
  };

  constructor(
    private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog,
    protected loginService: LoginService,
    private favoriteCoursesService: FavoriteCoursesService,
    private panelService: PanelCoursesService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.userId = this.loginService.getUserIdFromSessionStorage();
    this.getAllCourses();
  }

  getAllCourses(): void {
    let role = this.loginService.userType();
    if (!role) {
      role= 'USER'
    }
      this.courseService.getAllCourses(role).subscribe(
        courses => {
          this.courses = courses;
          this.filteredCourses = courses;
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );

  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  loadComments(): void {
    if (this.selectedCourse && this.selectedCourse.id) {
      this.commentService.getAllComments(this.selectedCourse.id).subscribe(comments => {
        this.comments = comments;
      });
    }
  }


  playVideo(course: Course): void {
    this.selectedCourse = course;
    if (this.selectedCourse && this.selectedCourse.id) {
      this.checkIfCourseIsFavorite(this.selectedCourse.id)
      this.loadComments();
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

  updateCourse(course: Course): void {
    this.router.navigate(['/updatecourse', course.id]);
  }

  addCourseToPaymentPanel(course: Course) {
    this.staticCourses.push(course);
  }

  checkCourseAvailablity(course: Course): boolean {
    const role = sessionStorage.getItem('ROLE');
    if (role) {
      if (role === 'USER') {
        return false;
      } else if (role === 'LEARNER' && course.price === 'Gratuit') {
        return true;
      } else if (role === 'LEARNER' && course.coursePaymentStatuses && course.coursePaymentStatuses.length > 0) {
        return true;
      } else if (role === 'TRAINER' || role === 'ADMIN') {
        return true;
      }
    } else {
      return false;
    }
    return false;
  }

  isCourseInStaticCourses(course: Course): boolean {
    return this.staticCourses.some(staticCourse => staticCourse.id === course.id);
  }


  removeCourseFromPaymentPanel(course: Course): void {
    this.staticCourses = this.staticCourses.filter(c => c !== course);
  }

  getCourseRowClass(index: number): string {
    return index % 2 === 0 ? 'even-item' : 'odd-item';
  }


  openPaymentDialog(staticCourses: Course[]) {
    console.log(staticCourses);

    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '800px',
      data: { course: staticCourses }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The payment dialog was closed');
      // Perform actions after the dialog is closed if needed
    });
  }


  addToPanel(courseId: any): void {
    this.isCoursePanel = true; // Initialize isCourseFavorite to true by default
    if (this.userId) {
      this.panelService.addToPanel(this.userId, courseId).subscribe(
        () => {
          //this.isCoursePanel = !this.isCoursePanel;
          window.location.reload();
          this.checkIfCourseIsPanel(courseId)
        },
        error => {
          console.error('Error adding course to favorites:', error);
        }
      );
    }
  }



  checkIfCourseIsPanel(courseId: any): void {
    // Call the service method to check if the course is marked as a favorite by the user
    if (this.userId) {
      this.panelService.isCoursePanelByUser(this.userId, courseId).subscribe(
        isPanel => {
          //this.isCoursePanel = isPanel;
        },
        error => {
          // Handle any errors
          console.error('Error checking if course is favorite:', error);
          return false;
        }
      );
    }
  }


  isSelectedPanel(course: any) {
    return course.isInPanel;
  }


  addComment(courseId: any): void {
    // Initialize a new comment object with the text

    if (!this.userId) {
      console.error('User ID not available.');
      return;
    }

    // Add comment only if userId is available
    this.commentService.addComment(this.userId, courseId, this.commentsData).subscribe(
      comment => {
        console.log(comment);
        // Push the returned comment to the comments array
        this.comments.push(comment);
        this.newComment = ''; // Clear the input field after adding the comment
      },
      error => {
        console.error('Error adding comment:', error);
        // Handle error if needed
      }
    );
  }

  deleteComment(commentId: number) {
    this.commentService.removeComment(commentId).subscribe(() => {
      // Handle success, such as updating the UI
      console.log('Comment deleted successfully');
    }, (error) => {
      // Handle error, such as displaying an error message
      console.error('Error deleting comment:', error.error);
    });
  }

  acceptCourseFunction(courseId: any, course: Course) {
    let resp = this.courseService.acceptCourse(courseId, course);
    resp.subscribe(res => {
      console.log(res);
    })
    window.location.reload()
  }

  deleteCourse(courseId: any, course: Course) {
    let resp = this.courseService.deleteCourse(courseId, course);
    resp.subscribe(() => {
    })
    window.location.reload()
  }

  addToPaymentConfirmationPanel(): void {
    // Filter selected courses
    const selected = this.filteredCourses.filter(course => course.isSelected);

    // Add selected courses to the panel or perform other actions
    console.log('Selected courses:', selected);
  }




}
