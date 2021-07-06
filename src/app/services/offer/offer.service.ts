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
import { SearchModel } from 'src/app/models/searchModel';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { DeliveryMethod } from 'src/app/models/delivery-method';
import { CartOfferDTO } from 'src/app/models/cart-offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getDataForCreatingOffer() {
    let response1 = this.http.get<Province[]>(`${environment.apiUrl}/api/Province/GetProvinces`);
    let response2 = this.http.get<Category[]>(`${environment.apiUrl}/api/ProductCategory/GetProductCategories`);
    let response3 = this.http.get<DeliveryMethod[]>(`${environment.apiUrl}/api/DeliveryMethod/GetDeliveryMethods`);
    
    return forkJoin([response1, response2, response3]);
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
    return this.http.post(`${environment.apiUrl}/api/Cart/AddOfferToCart?offerId=${offerId}`, null,  { withCredentials: true });
  }

  removeOfferFromCart(offerId: number) {
    return this.http.post(`${environment.apiUrl}/api/Cart/RemoveOfferFromCart?offerId=${offerId}`, null, { withCredentials: true });
  }

  getOffersFromCart(userId) {
    return this.http.get<CartOfferDTO[]>(`${environment.apiUrl}/api/Cart/GetOffersFromCart?userId=${userId}`, { withCredentials: true });
  }

  getOffers(model: SearchModel) {
    return this.http.post<PaginatedOffers>(`${environment.apiUrl}/api/Offer/GetOffers`, model);
  }
}
