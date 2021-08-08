import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { CreateComment } from 'src/app/models/create-comment';
import { Order } from 'src/app/models/order';
import { UpdateComment } from 'src/app/models/update-comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-create-comment-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrls: ['./create-comment-dialog.component.scss']
})
export class CreateCommentDialogComponent {
  order: Order;

  noStars = false;

  rateValue = 0;

  edit = false;

  form: FormGroup = this.fb.group({
    content: ['', [Validators.required]]
  });

  get f() { return this.form.controls; }

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    public dialogRef: MatDialogRef<CreateCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order) {
      if(data.comment) {
        this.edit = true;
        this.f.content.setValue(data.comment.content)
        this.rateValue = data.comment.rateValue;
      }
      this.order = data;
    }

  submit() {
    if (this.f.content.invalid || this.rateValue === 0) {
      this.noStars = true;
      return;
    }
    this.noStars = false;

    if(this.edit) {
      let comment = new UpdateComment();
      comment.id = this.data.comment.id;
      comment.content = this.f.content.value;
      comment.rateValue = this.rateValue;
      this.commentService.updateComment(comment)
        .subscribe((result) => {
          this.dialogRef.close(result);
        })
    } else {
      let comment = new CreateComment();
      comment.content = this.f.content.value;
      comment.rateValue = this.rateValue;
      comment.orderId = this.order.id;
      comment.customerId = this.order.customerId;
      this.commentService.createComment(comment)
      .subscribe((result) => {
        this.dialogRef.close(result);
      });
    }
  }
}
