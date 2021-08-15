import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { Order } from 'src/app/models/order';
import { CartService } from '../cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class SummarizeOrderService {

  private offers: BehaviorSubject<CartOfferDTO[]>;

  public order: BehaviorSubject<Order>;

  constructor(private cartService: CartService) { }

  setOrderOffers(orderOffers: CartOfferDTO[]) {
    this.offers = new BehaviorSubject(orderOffers);
  }

  getOrderOffers(): Observable<CartOfferDTO[]> {
    var clonedOffers: CartOfferDTO[] = [];
    if (this.offers) {
      this.offers.getValue().forEach(e => clonedOffers.push(Object.assign({}, e)));
      return of(clonedOffers);
    }
    else {
      return this.cartService.getOffersFromCart();
    }
  }

  setOrder(order: Order) {
    this.order = new BehaviorSubject(order);
  }
}
