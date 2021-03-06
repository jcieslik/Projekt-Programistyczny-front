import { OfferState } from "../enums/offer-state";
import { OfferType } from "../enums/offer-type";
import { ProductState } from "../enums/product-state";
import { Image } from "./image" 
import { OfferDeliveryDTO } from "./offer-delivery-dto";

export class CreateOffer {
  id: number;
  productCount: number;
  priceForOneProduct: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sellerId: number;
  city: string;
  provinceId: number;
  categoryId: number;
  brand: string;
  productState: ProductState;
  offerState: OfferState;
  offerType: OfferType;
  images: Image[] = [];
  deliveryMethods: OfferDeliveryDTO[] = [];
  minimalBid: number;
}