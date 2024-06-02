import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ResponseComponent } from '../../response/response.component';
import { CommentComponent } from '../../forum-management/comment/comment.component';
import { Course } from '../../../models/course';
import { LoginService } from '../../../services/security-service/login.service';
import { PanelCoursesService } from '../../../services/course-service/panel-courses.service';
import { PaymentDialogComponent } from '../../payment-management/payment-dialog/payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/user-services/notification.service';

@Component({
  selector: 'app-list-cours-panel',
  standalone: true,
  imports: [CreateCourseComponent,PaymentDialogComponent ,CommonModule, YouTubePlayerModule, ResponseComponent, CommentComponent],
  templateUrl: './list-cours-panel.component.html',
  styleUrl: './list-cours-panel.component.css'
})
export class ListCoursPanelComponent {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  filteredCourses: Course[] = [];
  userId: number | null = null; // User ID variable
  isCoursePanel: boolean = false; 
  constructor(
    private router: Router,
    protected loginService: LoginService,
    private panelCourseService: PanelCoursesService,
    private dialog: MatDialog,
    private notification : NotificationService
  ) { }

  ngOnInit(): void {
    this.userId = this.loginService.getUserIdFromSessionStorage();
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.userId = this.loginService.getUserIdFromSessionStorage();
    if (this.userId) {
      this.panelCourseService.getPanelCourses(this.userId).subscribe(
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
      this.checkIfCourseIsPanel(this.selectedCourse.id)
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


  addToPanel(courseId: number): void {
    if (this.userId) {
      this.panelCourseService.addToPanel(this.userId, courseId).subscribe(
        () => {
          this.isCoursePanel = !this.isCoursePanel;
          window.location.reload();
        },
        error => {
          console.error('Error adding course to favorites:', error);
        }
      );
    }
  }


  checkIfCourseIsPanel(courseId: number): void {
    // Call the service method to check if the course is marked as a favorite by the user

    if (this.userId) {
      this.panelCourseService.isCoursePanelByUser(this.userId, courseId).subscribe(
        isPanel => {
          this.isCoursePanel = isPanel;
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

  openPaymentDialog(staticCourses: Course[]) {
    console.log(staticCourses);
    
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      data: { course: staticCourses }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The payment dialog was closed');
      // Perform actions after the dialog is closed if needed
      this.notification.success("Opertaion effectué avec succés!")
    });
  }

  removeCourseFromPaymentPanel(course: Course): void {
    this.courses = this.courses.filter(c => c !== course);
  }


  removeFromPanel(courseId: any): void {
    // Call the service method to remove the course from favorites
    this.panelCourseService.removeFromPanel(courseId).subscribe(
      () => {
        this.isCoursePanel = !this.isCoursePanel;
        window.location.reload();
      },
      error => {
        console.error('Error removing course from favorites:', error);
      }
    );
  }
  

}
