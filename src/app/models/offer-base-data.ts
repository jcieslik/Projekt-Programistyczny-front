import { OfferType } from "../enums/offer-type";
import { Image } from "./image"
import { Bid } from "./bid"
import { ProductState } from "../enums/product-state";

export class OfferWithBaseData {
  id: number;
  priceForOneProduct: number;
  title: string;
  offerType: OfferType;
  productState: ProductState;
  image: Image;
  bestBid: Bid;
}