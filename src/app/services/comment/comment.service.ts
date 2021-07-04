import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateComment } from 'src/app/models/create-comment';
import { UserComment } from 'src/app/models/user-comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment: CreateComment) {
    return this.http.post<UserComment>(`${environment.apiUrl}/api/Comment/CreateComment`, comment, { withCredentials: true });
  }

  getCommentsFromOffer(offerId: number) {
    return this.http.get<UserComment[]>(`${environment.apiUrl}/api/Comment/GetCommentsFromOffer?id=${offerId}`, { withCredentials: true });
  }

  getCommentsFromUser(userId: number) {
    return this.http.get<UserComment[]>(`${environment.apiUrl}/api/Comment/GetCommentsFromUser?id=${userId}`, { withCredentials: true });
  }
}
