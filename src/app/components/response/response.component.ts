import { Component, Input } from '@angular/core';
import { CommentComponent } from '../forum-management/comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommentComponent,CommonModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() response!: string;

  constructor() { }
}
