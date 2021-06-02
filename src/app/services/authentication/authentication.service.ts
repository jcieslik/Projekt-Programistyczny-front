import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient)
  { }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/api/User/Authenticate?login=${username}&password=${password}`, null)
        .pipe(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user;
        });
}
}
