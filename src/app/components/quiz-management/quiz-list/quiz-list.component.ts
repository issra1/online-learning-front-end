import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/user-services/notification.service';
import { QuizService } from '../../../services/quiz-mgt/quize.service';
import { DialogService } from '../../../services/user-services/dialog.service';
import { LoginService } from '../../../services/security-service/login.service';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent implements OnInit {

  quizzes: any[] = [];
  pageSize: number = 3; // Number of quizzes per page
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages
  pagedQuizzes: any[] = []; // Quizzes for the current page
  pages: number[] = []; // Page numbers
  searchQuery: string = ''; // Search query entered by the user

  constructor (protected loginService: LoginService,private notification: NotificationService, private quizService: QuizService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes() {
    let role = this.loginService.userType();
    if (role)
    this.quizService.getAllQuizzes(role)
      .subscribe(quizzes => {
        this.quizzes = quizzes;
        this.totalPages = Math.ceil(this.quizzes.length / this.pageSize);
        this.updatePageNumbers();
        this.setPage(1); // Show the first page initially
      },
        error => {
          console.log('Error:', error);
        });
  }

  updatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return; // Don't navigate to invalid pages
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.quizzes.length - 1);
    this.pagedQuizzes = this.quizzes.slice(startIndex, endIndex + 1);
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  search() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      // If search query is empty, show all quizzes
      this.fetchQuizzes();
      return;
    }
    // Filter quizzes based on search query
    this.pagedQuizzes = this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(query) ||
      quiz.description.toLowerCase().includes(query)
    );
    // Update pagination based on filtered quizzes
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.pagedQuizzes.length / this.pageSize);
    this.updatePageNumbers();
  }

  openCreateQuiz() {
    this.router.navigate(['/create-quiz']); // Navigate to the create quiz component
  }

  /*   removeQuiz(quiz: any) {
      const dialogRef = this.dialogService.openConfirmDialog('Vous êtes sûr de supprimer ce quiz ?');
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User confirmed the action, proceed with deletion
          this.quizService.deleteQuiz(quiz.id).subscribe(() => {
            // Remove the quiz from the local array
            const index = this.quizzes.findIndex(q => q.id === quiz.id);
            if (index !== -1) {
              this.quizzes.splice(index, 1);
              this.updatePageNumbers();
              this.setPage(1);
            }
            // Remove the quiz from the pagedQuizzes array as well
            const pageIndex = this.pagedQuizzes.findIndex(q => q.id === quiz.id);
            if (pageIndex !== -1) {
              this.pagedQuizzes.splice(pageIndex, 1);
            }
            this.notification.success("Opération effectuée avec succès!");
          });
        }
      }
      );
    }
   */
  removeQuiz(quiz: any) {

    this.dialogService.openConfirmDialog('Vous êtes sûr de supprimer ce quiz ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.quizService.deleteQuiz(quiz.id);
          resp.subscribe(() => {
            this.notification.success("Opertaion effectué avec succés!")
          },
            error => {
              this.notification.warn("Opertaion echoué!")
            }
          )
        }
        window.location.reload();
      });
  }




  updateQuiz(quiz: any) {
    // Navigate to the update quiz component with the quiz ID
    this.router.navigate(['/quiz-update', quiz.id]);
  }
  
  acceptQuiz(quiz: any) {    
    let resp = this.quizService.acceptQuiz(quiz.id, quiz);
    resp.subscribe(res => {
      console.log(res);
    })
    window.location.reload()
  }



}
