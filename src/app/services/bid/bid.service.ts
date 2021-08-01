import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from 'src/app/models/bid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http: HttpClient) { }

  createBid(bid: Bid) {
    return this.http.post<Bid>(`${environment.apiUrl}/api/Bid/CreateBid`, bid, { withCredentials: true });
  }
}
