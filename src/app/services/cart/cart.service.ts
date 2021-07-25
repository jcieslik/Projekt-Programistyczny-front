import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient) { }

  addOfferToCart(offerId: number) {
    return this.http.post(`${environment.apiUrl}/api/Cart/AddOfferToCart?offerId=${offerId}`, null,  { withCredentials: true });
  }  
  
  getOffersFromCart() {
    return this.http.get<CartOfferDTO[]>(`${environment.apiUrl}/api/Cart/GetOffersFromCart`, { withCredentials: true });
  }

  removeOfferFromCart(offerId: number) {
    return this.http.put(`${environment.apiUrl}/api/Cart/RemoveOfferFromCart?offerId=${offerId}`, null, { withCredentials: true });
  }

  decrementOfferCountInCart(offerId: number) {
    return this.http.put(`${environment.apiUrl}/api/Cart/DecrementOfferCountInCart?offerId=${offerId}`, null, { withCredentials: true });
  }


  
}
