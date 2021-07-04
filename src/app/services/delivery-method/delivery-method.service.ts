import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethodWithOffer } from 'src/app/models/delivery-method-with-offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodService {

  constructor(private http: HttpClient) { }

  getDeliveryMethodsFromOffer(offerId: number) {
    return this.http.get<DeliveryMethodWithOffer[]>(`${environment.apiUrl}/api/DeliveryMethod/GetDeliveryMethodsFromOffer?offerId=${offerId}`, { withCredentials: true });
  }
}
