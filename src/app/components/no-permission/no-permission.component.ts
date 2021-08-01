import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-no-permission',
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.scss']
})
export class NoPermissionComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigateByUrl('/login')
    }
  }

}
