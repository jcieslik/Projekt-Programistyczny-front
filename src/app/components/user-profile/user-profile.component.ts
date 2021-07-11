import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserInfo;

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserInfo(userId)
      .subscribe((result) => {
        this.user = result;
      });
  }
}
