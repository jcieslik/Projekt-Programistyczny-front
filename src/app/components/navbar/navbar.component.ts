import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  expanded: boolean = false;
  searchText: string;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    
  }

  expandMenu(){
    this.expanded = !this.expanded;
  }

  logout(){
    this.authenticationService.logout();
  }

  isLoggedIn() {
    return this.authenticationService.userValue;
  }

  find() {
    if (this.searchText) {
      this.router.navigateByUrl('/search').then(() => {
      this.router.navigate(['/home', {q: this.searchText}]);
      });
    }
    else this.gotoHome();
  }

  gotoHome() {
    this.router.navigateByUrl('/search').then(() => {
      this.router.navigate(['/home']);
    });
  }
}
