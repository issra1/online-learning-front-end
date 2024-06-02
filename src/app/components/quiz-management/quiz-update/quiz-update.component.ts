import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz-mgt/quize.service';

@Component({
  selector: 'app-quiz-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz-update.component.html',
  styleUrl: './quiz-update.component.css'
})
export class QuizUpdateComponent implements OnInit {
  quiz: any = { title: '', description: '', questions: [] };
  quizId: string | undefined;
  originalQuiz: any;
  allOptionsFilled: boolean = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.quizId = params['id'];
        this.loadQuiz();
      }
    });
  }


  loadQuiz(): void {
    if (this.quizId) {
      this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
        console.log('Received quiz:', quiz);
        this.originalQuiz = quiz;
        this.quiz.title = quiz.title;
        this.quiz.description = quiz.description;
        this.quiz.questions = [];
  
        // Ensure quiz.questions is defined before iterating
        if (quiz.questions && quiz.questions.length > 0) {
          for (const originalQuestion of quiz.questions) {
            this.quizService.getOptionsForQuestion(originalQuestion.id).subscribe((options: any[]) => {
              const newQuestion = { text: originalQuestion.text, options: [] as string[] }; // Define newQuestion object
              if (options && options.length > 0) {
                options.forEach((option: any) => {
                  newQuestion.options.push(option); // Push each option text into newQuestion.options
                });
              }
              this.quiz.questions.push(newQuestion); // Add newQuestion to the quiz's questions array
              console.log('Updated quiz:', this.quiz); // Log the updated quiz object
              // Check if all options are filled
              this.checkOptionsFilled();
            }, (error) => {
              console.error('Error fetching options:', error); // Handle error
            });
          }
        } else {
          console.log('No questions found in the quiz.');
        }
      });
    }
  }
  
                                

  updateQuiz(): void {
    if (this.quizId) {
      this.quizService.updateQuiz(this.quizId, this.quiz)
        .subscribe(() => {
          this.router.navigate(['/quizzes']);
        });
    }
  }

  addQuestion(): void {
    this.quiz.questions.push({ text: '', options: [] });
    // Check if all options are filled after adding a question
    this.checkOptionsFilled();
  }

  removeQuestion(index: number): void {
    this.quiz.questions.splice(index, 1);
    // Check if all options are filled after removing a question
    this.checkOptionsFilled();
  }

  addOption(question: any): void {
    if (!question.options) {
      question.options = []; // Initialize options array if it's undefined
    }
    question.options.push({ text: '' });
    // Check if all options are filled after adding an option
    this.checkOptionsFilled();
  }

  markCorrectOption(question: any, index: number): void {
    question.options.forEach((option: any, i: number) => {
      option.correct = i === index;
    });
  }

  removeOption(question: any, index: number): void {
    question.options.splice(index, 1);
    // Check if all options are filled after removing an option
    this.checkOptionsFilled();
  }

  checkOptionsFilled(): void {
    // Check if there is any question without options
    this.allOptionsFilled = this.quiz.questions.some((question: any) => {
      return question.options.length === 0;
    });
  }
}
