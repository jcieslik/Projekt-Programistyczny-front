import { OfferState } from "../enums/offer-state";
import { OfferType } from "../enums/offer-type";
import { ProductState } from "../enums/product-state";
import { Bid } from "./bid";
import { Image } from "./image" 
import { OfferDeliveryDTO } from "./offer-delivery-dto";
import { User } from "./user";

export class Offer {
  id: number;
  productCount: number;
  priceForOneProduct: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  seller: User;
  city: string;
  province: string;
  category: string;
  brand: string;
  productState: ProductState;
  state: OfferState;
  offerType: OfferType;
  images: Image[] = [];
  bestBid: Bid;
  minimalBid: number;
  deliveryMethods: OfferDeliveryDTO[];
}