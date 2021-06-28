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
import { DeliveryMethod } from 'src/app/models/delivery-method';

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
}
