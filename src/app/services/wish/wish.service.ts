import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wish } from 'src/app/models/wish';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  createWish(wish: Wish) {
    return this.http.post<Wish>(`${environment.apiUrl}/api/Wish/CreateWish`, wish, { withCredentials: true });
  }

  hideWish(id: number) {
    return this.http.patch<Wish>(`${environment.apiUrl}/api/Wish/HideWish?id=${id}`, null, { withCredentials: true });
  }
}
