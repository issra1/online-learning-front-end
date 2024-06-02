import { Component } from '@angular/core';
import { QuestionService } from '../../services/quiz-mgt/question.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './question-create.component.html',
  styleUrl: './question-create.component.css'
})
export class QuestionCreateComponent {
  question: any = { text: '', options: [] };
  options: any[] = [{ text: '' }, { text: '' }];

  constructor(private questionService: QuestionService, private router: Router) {}

  addOption() {
    this.options.push(new Option());
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  createQuestion() {
    this.question.options = this.options;
    this.questionService.createQuestion(this.question)
      .subscribe(() => {
        this.router.navigate(['/quizzes']); // Redirect to quizzes page after question creation
      });
  }

}
