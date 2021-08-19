import { OrderStatus } from "../enums/order-status";
import { DeliveryMethod } from "./delivery-method";
import { Offer } from "./offer";
import { UserComment } from "./user-comment";

export class Order {
  id: number;
  customerId: number;
  offer: Offer;
  offerId: number;
  deliveryMethod: DeliveryMethod;
  deliveryMethodId: number;
  deliveryFullPrice: number;
  orderStatus: OrderStatus;
  paymentDate: Date;
  productCount: number;
  fullPrice: number;
  destinationCity: string;
  destinationStreet: string;
  destinationPostCode: string;
  cartOfferId: number;
  comment: UserComment;
}
