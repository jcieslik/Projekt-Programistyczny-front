import { OfferState } from "../enums/offer-state";
import { OfferType } from "../enums/offer-type";
import { ProductState } from "../enums/product-state";
import { Image } from "./image" 

export class CreateOffer {
  id: number;
  productCount: number;
  priceForOneProduct: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  sellerId: number;
  cityId: number;
  provinceId: number;
  categoryId: number;
  brandId: number;
  productState: ProductState;
  offerState: OfferState;
  offerType: OfferType;
  images: Image[] = [];
}