import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CoursePaymentStatusService } from '../../../services/course-service/course-payment-status.service';
import { LoginService } from '../../../services/security-service/login.service';
import { Course } from '../../../models/course';
import { PanelCoursesService } from '../../../services/course-service/panel-courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule, FormsModule, MatIcon, MatInputModule, CommonModule],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css'
})
export class PaymentDialogComponent {
  cardNumber: string = '';
  userId: number | null = null; // User ID variable
  courseId: number | null = null; 
  courseList : Course []= [];
  // User ID variable
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private paymentService: CoursePaymentStatusService, 
    private loginService: LoginService,
    private panelService: PanelCoursesService,
    private snackBar: MatSnackBar  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.courseList = this.data.course;
    console.log(this.data);
    
    this.userId = this.loginService.getUserIdFromSessionStorage();
  }

  onSubmitClick(): void {
    for (const course of this.courseList) {
      if (course.id && this.userId) {
        this.paymentService.setCourseAsPaidForUser(course.id, this.userId).subscribe(() => {
          this.panelService.removeFromPanel(course.id).subscribe( res => {

            this.snackBar.open('Paiement soumis avec succès', 'Fermer', {
              duration: 8000,
            });
            }
          )
          window.location.reload();
          console.log('Course marked as paid.');
        }, error => {
          // Handle error if needed
          console.error('Error marking course as paid:', error);
        });
      }
      }
    // Close the dialog
    this.dialogRef.close();
  }

  isValidCardNumber(): boolean {
    // Validate the card number here (e.g., check length)
    return this.cardNumber.length === 16;
  }
}
