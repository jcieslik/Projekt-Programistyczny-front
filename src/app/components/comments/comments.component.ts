import { Component, Input, OnInit } from '@angular/core';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { CommentPagination } from 'src/app/models/comment-pagination';
import { PaginatedComments } from 'src/app/models/paginatedComments';
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

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.initModel();
    this.getComments();
  }

  private initModel() {
    this.model.pagination.pageIndex = 1;
    this.model.pagination.pageSize = 10;
    this.model.pagination.orderBy = this.defaultSort;
    this.model.subjectId = this.userId;

    this.paginationComments.pageIndex = 0;
    this.paginationComments.pageSize = 10;
    this.paginationComments.orderBy = this.defaultSort;
  }

  public handlePageComments(e: any) {
    this.model.pagination.pageIndex = e.pageIndex + 1;
    this.model.pagination.pageSize = e.pageSize;

    this.getComments();
  }

  getComments() {
    this.commentService.getPaginatedCommentsFromUser(this.model)
      .subscribe((result) => {
        this.commentsPaginated = result;
      })
  }
}
