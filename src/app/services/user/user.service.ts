import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { CreateUser } from 'src/app/models/createUser';
import { PaginatedUsers } from 'src/app/models/paginatedUsers';
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

  getUsersPaginated(pagination: PaginationProperties) {
    return this.http.post<PaginatedUsers>(`${environment.apiUrl}/api/User/GetAllUsers`, pagination, { withCredentials: true });
  }

  banUser(banInfo: string, userId: number) {
    return this.http.post(`${environment.apiUrl}/api/User/BanUser?userId=${userId}`, banInfo, { withCredentials: true });
  }

  unbanUser(userId: number) {
    return this.http.post(`${environment.apiUrl}/api/User/UnbanUser?userId=${userId}`, null, { withCredentials: true });
  }
}
