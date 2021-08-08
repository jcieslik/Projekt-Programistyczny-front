import { OfferType } from "../enums/offer-type";
import { Image } from "./image"
import { Bid } from "./bid"
import { ProductState } from "../enums/product-state";
import { OfferState } from "../enums/offer-state";

export class OfferWithBaseData {
  id: number;
  priceForOneProduct: number;
  productCount: number;
  title: string;
  offerType: OfferType;
  productState: ProductState;
  state: OfferState;
  image: Image;
  bestBid: Bid;
  minimalBid: number;
}