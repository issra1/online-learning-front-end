import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-mat-confirm-dialog',
  standalone: true,
  imports: [MatIcon,MatDialogClose],
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrl: './mat-confirm-dialog.component.css'
})
export class MatConfirmDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MatConfirmDialogComponent>) {

    }
ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
