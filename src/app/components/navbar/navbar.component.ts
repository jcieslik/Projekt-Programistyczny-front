import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  expanded: boolean = false;

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private authenticationService: AuthenticationService) { }

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
}
