import { OfferType } from "../enums/offer-type";
import { Image } from "./image"
import { Bid } from "./bid"

export class OfferWithBaseData {
  id: number;
  priceForOneProduct: number;
  title: string;
  offerType: OfferType;
  image: Image;
  bestBid: Bid;
}