import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { CreateOffer } from 'src/app/models/create-offer';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { Province } from 'src/app/models/province';
import { environment } from 'src/environments/environment';
import { AddOrRemoveOfferToCartDTO } from '../../models/add-or-remove-offer-to-cart';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getDataForCreatingOffer() {
    let response1 = this.http.get<Province[]>(`${environment.apiUrl}/api/Province/GetProvinces`, { withCredentials: true });
    let response2 = this.http.get<Category[]>(`${environment.apiUrl}/api/ProductCategory/GetProductCategories`, { withCredentials: true });
    
    return forkJoin([response1, response2]);
  }

  createOffer(offer: CreateOffer) {
    return this.http.post<CreateOffer>(`${environment.apiUrl}/api/Offer/CreateOffer`, offer, { withCredentials: true });
  }

  getAllOffers() {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetAllOffers`, { withCredentials: true });
  }

  getOffersFromUser(id: number) {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetOffersFromUser?id=${id}`, { withCredentials: true });
  }

  getOffer(id: number) {
    return this.http.get<Offer>(`${environment.apiUrl}/api/Offer/GetOfferById?id=${id}`, { withCredentials: true })
  }

  addOfferToCart(offerId: number) {
    return this.http.post(`${environment.apiUrl}/api/Offer/AddToCart?id=${offerId}`, { withCredentials: true });
  }

  removeOfferFromCart(offerId: number) {
    return this.http.post(`${environment.apiUrl}/api/Offer/RemoveFromCart?id=${offerId}`, { withCredentials: true });
  }

  getOffersFromCart(cartId) {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetFromCart?id=${cartId}`, { withCredentials: true });
  }
}
