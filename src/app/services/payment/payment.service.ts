import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(paymentRequest: Payment) {
    return this.http.post<Payment>(`${environment.apiUrl}/api/Payment/MakePayment`, paymentRequest, { withCredentials: true });
  }
}
