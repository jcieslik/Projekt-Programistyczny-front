import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { CommentPagination } from 'src/app/models/comment-pagination';
import { PaginatedComments } from 'src/app/models/paginatedComments';
import { UserComment } from 'src/app/models/user-comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input()
  userId: number;

  defaultSort: string = "creation";

  model: CommentPagination = new CommentPagination();
  paginationComments: PaginationProperties = new PaginationProperties();
  commentsPaginated: PaginatedComments;

  constructor(private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.initModel();
    this.getComments();
  }

  private initModel() {
    this.model.properties = new PaginationProperties();
    this.model.properties.pageIndex = 1;
    this.model.properties.pageSize = 10;
    this.model.properties.orderBy = this.defaultSort;
    this.model.subjectId = this.userId;
    this.model.onlyNotHidden = true;

    this.paginationComments.pageIndex = 0;
    this.paginationComments.pageSize = 10;
    this.paginationComments.orderBy = this.defaultSort;
  }

  public handlePageComments(e: any) {
    this.model.properties.pageIndex = e.pageIndex + 1;
    this.model.properties.pageSize = e.pageSize;

    this.getComments();
  }

  getComments() {
    this.commentService.getPaginatedCommentsFromUser(this.model)
      .subscribe((result) => {
        this.commentsPaginated = result;
      })
  }
}
