import { OfferState } from "../enums/offer-state";
import { Image } from "./image"
import { OfferDeliveryDTO } from "./offer-delivery-dto";

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
  selectedDeliveryMethod : OfferDeliveryDTO = new OfferDeliveryDTO(); 
  deliveryMethods: OfferDeliveryDTO[];
  destinationCity: string;
  destinationStreet: string;
  destinationPostCode: string;
}