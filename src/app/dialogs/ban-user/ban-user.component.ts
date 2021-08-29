import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.scss']
})
export class BanUserComponent {

  user: UserInfo;

  form: FormGroup = this.fb.group({
    comment: ['', [Validators.required]]
  });

  get f() { return this.form.controls; }

  constructor(public dialogRef: MatDialogRef<BanUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo) {
      this.user = data;
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
