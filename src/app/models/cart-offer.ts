import { OfferState } from "../enums/offer-state";
import { Image } from "./image"

export class CartOfferDTO {
  priceForOneProduct: number;
  title: string;
  image: Image;
  productsCount: number;
  cartId: number;
  offerId: number;
  offerState: OfferState;
}