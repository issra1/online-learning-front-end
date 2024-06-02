import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../services/quiz-mgt/question.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  quizId: number | undefined;
  questions: any[] = [];
  selectedOptions: { [key: number]: number } = {};
  questionsPerPage: number = 1;
  currentPage: number = 1;
  timers: any[] = [];

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['quizId'];
      this.fetchQuestions();
    });
  }

  ngOnDestroy(): void {
    this.timers.forEach(timer => clearInterval(timer));
  }

  fetchQuestions() {
    if (this.quizId) {
      this.questionService.getQuestionsByQuizId(this.quizId)
        .subscribe(questions => {
          this.questions = questions;
          this.startTimers();
        });
    }
  }

  startTimers(): void {
    this.questions.forEach(question => {
      question.timeLeft = 60; // Set initial time for each question (60 seconds)
      this.startTimer(question);
    });
  }

  startTimer(question: any): void {
    const timer = setInterval(() => {
      if (question.timeLeft > 0) {
        question.timeLeft--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
    this.timers.push(timer);
  }

  submitQuiz() {
    this.questions.forEach(question => {
      const selectedOptionId = this.selectedOptions[question.id];
      question.options.forEach((option:any) => {
        option.selected = option.id === selectedOptionId;
      });
    });
  
    // Set the submitted property to true for all options after submitting the quiz
    this.questions.forEach(question => {
      question.options.forEach((option:any) => {
        option.submitted = true;
      });
    });
  }
  
    
    
  

  nextPage() {
    if (this.hasMorePages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  hasMorePages(): boolean {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    return startIndex + this.questionsPerPage < this.questions.length;
  }

  getCurrentPageQuestions(): any[] {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    return this.questions.slice(startIndex, startIndex + this.questionsPerPage);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
