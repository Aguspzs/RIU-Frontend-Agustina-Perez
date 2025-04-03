import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-alert',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>This action cannot be undone.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button color="warn" (click)="confirm()">Delete</button>
    </mat-dialog-actions>
  `,
})
export class DeleteAlertComponent {
  private dialogRef = inject(MatDialogRef<DeleteAlertComponent>);

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
