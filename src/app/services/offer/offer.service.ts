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
import { AddOrRemoveOfferToCartDTO } from 'src/app/models/add-or-remove-offer-to-cart';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getDataForCreatingOffer() {
    let response1 = this.http.get<Brand[]>(`${environment.apiUrl}/api/Brand/GetBrands`);
    let response2 = this.http.get<City[]>(`${environment.apiUrl}/api/City/GetCities`);
    let response3 = this.http.get<Province[]>(`${environment.apiUrl}/api/Province/GetProvinces`);
    let response4 = this.http.get<Category[]>(`${environment.apiUrl}/api/ProductCategory/GetProductCategories`);

    return forkJoin([response1, response2, response3, response4]);
  }

  createOffer(offer: CreateOffer) {
    return this.http.post<CreateOffer>(`${environment.apiUrl}/api/Offer/CreateOffer`, offer);
  }

  getAllOffers() {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetAllOffers`);
  }

  getOffersFromUser(id: number) {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetOffersFromUser?id=${id}`);
  }

  getOffer(id: number) {
    return this.http.get<Offer>(`${environment.apiUrl}/api/Offer/GetOfferById?id=${id}`)
  }

  addOfferToCart(cartId: number, offerId: number) {
    const params: AddOrRemoveOfferToCartDTO = { cartId: cartId, offerId: offerId };
    return this.http.post(`${environment.apiUrl}/api/Offer/AddToCart`, params);
  }

  removeOfferFromCart(cartId: number, offerId: number) {
    const params: AddOrRemoveOfferToCartDTO = { cartId: cartId, offerId: offerId };
    return this.http.post(`${environment.apiUrl}/api/Offer/RemoveFromCart`, params);
  }

  getOffersFromCart(cartId: number) {
    return this.http.get<OfferWithBaseData[]>(`${environment.apiUrl}/api/Offer/GetFromCart?cartId=${cartId}`);
  }
}
