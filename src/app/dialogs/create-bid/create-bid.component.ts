import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.scss']
})
export class CreateBidComponent {
  currentBid: number;

  minimumBid: number;

  form: FormGroup = this.fb.group({
    bid: ['', [Validators.required]]
  });

  get f() { return this.form.controls; }

  constructor(
    public dialogRef: MatDialogRef<CreateBidComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: number) {
      this.currentBid = data;
      this.getMinimumBid();
    }

  getMinimumBid() {
    if(this.currentBid > 0 && this.currentBid < 100) {
      this.minimumBid = this.currentBid + 5;
    } else if (this.currentBid >= 100 && this.currentBid < 1000) {
      this.minimumBid = this.currentBid + 25;
    } else if (this.currentBid >= 1000) {
      this.minimumBid = this.currentBid + 50;
    }
    this.f.bid.setValue(this.minimumBid)
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  submit(buttonType) {
    if(!(this.f.bid.value < this.minimumBid) && buttonType === 'submit') {
      this.dialogRef.close(this.f.bid.value);
    } else if (buttonType === 'close') {
      this.dialogRef.close(null);
    }
  }

}
