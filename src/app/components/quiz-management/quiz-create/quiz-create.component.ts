import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz-mgt/quize.service';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent {
  quiz: any = { title: '', description: '', questions: [] };

  constructor(private quizService: QuizService, private router: Router) { }

  createQuiz() {
         this.quizService.createQuiz(this.quiz)
      .subscribe(() => {
        this.router.navigate(['/quizzes']); // Redirect to quizzes page after quiz creation
      });
   }

  addQuestion(): void {
    this.quiz.questions.push({ text: '', options: [] });
  }

  removeQuestion(index: number): void {
    this.quiz.questions.splice(index, 1);
  }

  addOption(question: any): void {
    question.options.push({ text: '' });
  }

  removeOption(question: any, index: number): void {
    question.options.splice(index, 1);
  }

  markCorrectOption(question: any, index: number): void {
    question.options.forEach((option: any, i: number) => {
      option.correct = i === index; 
      console.log(option.correct);
      // Set the correct property to true for the selected option
    });
  }
  
}
