import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/models/createUser';
import { UpdateUser } from 'src/app/models/updateUser';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  createUser(user: CreateUser){
    return this.http.post<CreateUser>(`${environment.apiUrl}/api/User/CreateUser`, user, { withCredentials: true });
  }

  updateUser(user: UpdateUser){
    return this.http.post<UpdateUser>(`${environment.apiUrl}/api/User/UpdateUser`, user, { withCredentials: true });
  }

  getAccountDetails() {
    return this.http.get<User>(`${environment.apiUrl}/api/User/AccountDetails`, { withCredentials: true });
  }

}
