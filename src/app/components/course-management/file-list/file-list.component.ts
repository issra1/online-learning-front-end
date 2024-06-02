import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
  
  @Input() files: { name: string, url: SafeResourceUrl }[] = [];
  @Output() fileSelected = new EventEmitter<{ name: string, url: SafeResourceUrl }>();

  displayFile(file: { name: string, url: SafeResourceUrl }): void {
    this.fileSelected.emit(file);
  }

}
