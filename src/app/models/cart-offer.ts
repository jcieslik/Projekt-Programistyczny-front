import { OfferState } from "../enums/offer-state";
import { Image } from "./image"

export class CartOfferDTO {
  id: number;
  priceForOneProduct: number;
  title: string;
  image: Image;
  productsCount: number;
  availableProducts: number;
  cartId: number;
  offerId: number;
  offerState: OfferState;
}