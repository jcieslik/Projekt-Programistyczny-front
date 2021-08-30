import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-ban-offer',
  templateUrl: './ban-offer.component.html',
  styleUrls: ['./ban-offer.component.scss']
})
export class BanOfferComponent {

  offer: Offer;

  form: FormGroup = this.fb.group({
    comment: ['', [Validators.required]]
  });

  get f() { return this.form.controls; }

  constructor(public dialogRef: MatDialogRef<BanOfferComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Offer) {
      this.offer = data;
    }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  submit(buttonType) {
    if((this.f.comment) && buttonType === 'submit') {
      this.dialogRef.close(this.f.comment.value);
    } else if (buttonType === 'close') {
      this.dialogRef.close(null);
    }
  }
}
