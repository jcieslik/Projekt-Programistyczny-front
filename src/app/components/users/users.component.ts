import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { PaginatedUsers } from 'src/app/models/paginatedUsers';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  defaultSort: string = "creation";

  displayedColumns: string[] = ['username', 'name', 'email', 'actions'];

  model: PaginationProperties = new PaginationProperties();
  paginationUsers: PaginationProperties = new PaginationProperties();
  paginatedUsers: PaginatedUsers;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initModel();
    this.getUsers();
  }

  private initModel() {
    this.model = new PaginationProperties();
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;

    this.paginationUsers.pageIndex = 0;
    this.paginationUsers.pageSize = 10;
    this.paginationUsers.orderBy = this.defaultSort;
  }

  public handlePageUsers(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsersPaginated(this.model)
      .subscribe((users) => {
        this.paginatedUsers = users;
      });
  }

  goToUserProfile(id: number) {
    this.router.navigateByUrl(`/userProfile/${id}`);
  }

  banUser(id: number) {

  }

  unbanUser(id: number) {
    
  }
}
