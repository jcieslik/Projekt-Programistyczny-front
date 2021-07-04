import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserComment } from 'src/app/models/user-comment';
import { UserInfo } from 'src/app/models/user-info';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  comments: UserComment[] = [];

  user: UserInfo;

  dataSource: any; 

  pageSize = 10;
  currentPage = 0;
  totalSize = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private commentService: CommentService) { }

  ngOnInit(): void {
    let userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserInfo(userId)
      .subscribe((result) => {
        this.user = result;
        this.commentService.getCommentsFromUser(userId)
          .subscribe((response) => {
            this.comments = response;
            this.dataSource = new MatTableDataSource<UserComment>(response);
            this.dataSource.paginator = this.paginator;
            this.totalSize = this.comments.length;
            this.iterator();
          })  
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.comments.slice(start, end);
    this.dataSource = part;
  }

}
