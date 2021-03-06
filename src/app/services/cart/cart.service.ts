import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient) { }

  addOfferToCart(offerId: number, amount: number) {
    return this.http.post(`${environment.apiUrl}/api/Cart/AddOfferToCart?offerId=${offerId}&amount=${amount}`, null,  { withCredentials: true });
  }  
  
  getOffersFromCart() {
    return this.http.get<CartOfferDTO[]>(`${environment.apiUrl}/api/Cart/GetOffersFromCart`, { withCredentials: true });
  }

  removeOfferFromCart(offerId: number) {
    return this.http.put(`${environment.apiUrl}/api/Cart/RemoveOfferFromCart?offerId=${offerId}`, null, { withCredentials: true });
  }

  updateProductCount(offerId: number, productCount: number) {
    return this.http.put<boolean>(`${environment.apiUrl}/api/Cart/UpdateProductCount?offerId=${offerId}&productCount=${productCount}`, null, { withCredentials: true });
  }
}
