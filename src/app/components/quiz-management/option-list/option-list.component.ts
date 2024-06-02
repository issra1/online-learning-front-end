import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OptionService } from '../../services/quiz-mgt/options.service';

@Component({
  selector: 'app-option-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.css'
})
export class OptionListComponent {
  questionId: number | undefined;
  options: any[] | undefined;

  constructor(private route: ActivatedRoute, private optionService: OptionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = +params['questionId'];
      this.fetchOptions();
    });
  }

  fetchOptions() {
    if(this.questionId){
    this.optionService.getOptionsByQuestionId(this.questionId)
      .subscribe(options => {
        this.options = options;
      });
  }
}

}
