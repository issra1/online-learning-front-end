import { Component, Input } from '@angular/core';
import { Comments } from '../../../models/comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comments;

  constructor() { }
}
