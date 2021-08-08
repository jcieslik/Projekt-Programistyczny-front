import { OrderStatus } from "../enums/order-status";
import { OfferWithBaseData } from "./offer-base-data";
import { UserComment } from "./user-comment";

export class Order {
  id: number;
  customerId: number;
  offerWithDeliveryId: number;
  orderStatus: OrderStatus;
  paymentDate: Date;
  productCount: number;
  fullPrice: number;
  destinationCity: string;
  destinationStreet: string;
  destinationPostCode: string;
  cartOfferId: number;
  offer: OfferWithBaseData;
  comment: UserComment;
}