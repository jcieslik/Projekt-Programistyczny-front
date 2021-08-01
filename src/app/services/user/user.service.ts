import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from 'src/app/models/createUser';
import { UpdateUser } from 'src/app/models/updateUser';
import { UserInfo } from 'src/app/models/user-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: CreateUser){
    return this.http.post<CreateUser>(`${environment.apiUrl}/api/User/CreateUser`, user, { withCredentials: true });
  }

  updateUser(user: UpdateUser){
    return this.http.put<UpdateUser>(`${environment.apiUrl}/api/User/UpdateUser`, user, { withCredentials: true });
  }
  
  getUserInfo(userId: number) {
    return this.http.get<UserInfo>(`${environment.apiUrl}/api/User/GetUserInfo?userId=${userId}`, { withCredentials: true });
  }

  getMessageRecipients() {
    return this.http.get<UserInfo[]>(`${environment.apiUrl}/api/User/GetAllMessageRecipients`, { withCredentials: true });
  }
}
