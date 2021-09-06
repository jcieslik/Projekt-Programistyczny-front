import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { Category } from 'src/app/models/category';
import { CreateOffer } from 'src/app/models/create-offer';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { Province } from 'src/app/models/province';
import { environment } from 'src/environments/environment';
import { SearchModel } from 'src/app/models/searchModel';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { DeliveryMethod } from 'src/app/models/delivery-method';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { OfferState } from 'src/app/enums/offer-state';
import { Ban } from 'src/app/models/ban';

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


  getOffers(model: SearchModel, state?: OfferState) {
    return this.http.post<PaginatedOffers>(`${environment.apiUrl}/api/Offer/GetOffers?state=${state}`, model, { withCredentials: true });
  }

  updateOffer(offer: Offer) {
    return this.http.put<Offer>(`${environment.apiUrl}/api/Offer/UpdateOffer`, offer, { withCredentials: true });
  }

  getOffersFromUserWishes(model: SearchModel) {
    return this.http.post<PaginatedOffers>(`${environment.apiUrl}/api/Offer/GetOffersFromActiveUserWishes`, model, { withCredentials: true });
  }

  getUserBidOffers(model: PaginationProperties) {
    return this.http.post<PaginatedOffers>(`${environment.apiUrl}/api/Offer/GetUserActiveBidOffers`, model, { withCredentials: true });
  }

  banOffer(ban: Ban) {
    return this.http.put(`${environment.apiUrl}/api/Offer/BanOffer`, ban, { withCredentials: true });
  }

  unbanOffer(offerId: number) {
    return this.http.put(`${environment.apiUrl}/api/Offer/UnbanOffer`, offerId, { withCredentials: true });
  }
}
