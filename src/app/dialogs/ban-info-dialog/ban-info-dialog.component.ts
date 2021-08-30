import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ban-info-dialog',
  templateUrl: './ban-info-dialog.component.html',
  styleUrls: ['./ban-info-dialog.component.scss']
})
export class BanInfoDialogComponent {
  banInfo: string;

  constructor(public dialogRef: MatDialogRef<BanInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.banInfo = data;
    }

}
