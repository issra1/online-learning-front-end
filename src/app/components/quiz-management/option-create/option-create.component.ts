import { Component } from '@angular/core';
import { OptionService } from '../../services/quiz-mgt/options.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './option-create.component.html',
  styleUrl: './option-create.component.css'
})
export class OptionCreateComponent {
  option: any = { text: '' };

  constructor(private optionService: OptionService, private router: Router) {}

  createOption() {
    this.optionService.createOption(this.option)
      .subscribe(() => {
        this.router.navigate(['/quizzes']); // Redirect to quizzes page after option creation
      });
  }

}
