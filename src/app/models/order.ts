import { OrderStatus } from "../enums/order-status";

export class Order {
  id: number;
  customerId: number;
  offerId: number;
  orderStatus: OrderStatus;
  paymentDate: Date;
}