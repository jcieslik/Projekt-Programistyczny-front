import { OfferState } from "../enums/offer-state";
import { OfferType } from "../enums/offer-type";
import { ProductState } from "../enums/product-state";
import { DeliveryMethodWithOffer } from "./delivery-method-with-offer";
import { Image } from "./image" 
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
}