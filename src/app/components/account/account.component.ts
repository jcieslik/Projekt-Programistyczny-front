import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService) { }

  currentUser: User = JSON.parse(localStorage.getItem('user'));

  user: UserInfo;

  ngOnInit(): void {
    this.userService.getUserInfo(this.currentUser.id)
      .subscribe((result) => {
        this.user = result;
      })
  }
}
