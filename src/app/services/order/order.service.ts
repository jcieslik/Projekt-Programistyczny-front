import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Order } from 'src/app/models/order';
import { PaginatedOrders } from 'src/app/models/paginatedOrders';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order) {
    return this.http.post<Order>(`${environment.apiUrl}/api/Order/CreateOrder`, order, { withCredentials: true });
  }

  changeStatus(order: Order) {
    return this.http.patch<Order>(`${environment.apiUrl}/api/Order/ChangeStatus`, order, { withCredentials: true });
  }

  getOrdersFromUser(pagination: PaginationProperties) {
    return this.http.post<PaginatedOrders>(`${environment.apiUrl}/api/Order/GetOrdersFromUser`, pagination, { withCredentials: true })
  }
}
