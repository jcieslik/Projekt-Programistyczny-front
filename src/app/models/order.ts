import { OrderStatus } from "../enums/order-status";

export class Order {
  id: number;
  customerId: number;
  offerWithDeliveryId: number;
  orderStatus: OrderStatus;
  paymentDate: Date;
  ProductCount: number;
  destinationCity: string;
  destinationStreet: string;
  destinationPostCode: string;
  cartOfferId: number;
  fullPrice: number;
}