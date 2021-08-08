import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/enums/confirmation-dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  confirmationType: ConfirmationDialog;

  confirmationDialog = ConfirmationDialog;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialog) {
      this.confirmationType = data;
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submit() {
    this.dialogRef.close(true);
  }
}
