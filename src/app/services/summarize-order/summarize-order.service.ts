import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, Subscription, of } from 'rxjs';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { CartService } from '../cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class SummarizeOrderService {

  private offers: BehaviorSubject<CartOfferDTO[]>;

  constructor(private cartService: CartService) { }

  setOrderOffers(orderOffers: CartOfferDTO[]) {
    this.offers = new BehaviorSubject(orderOffers);// = [];
    //orderOffers.forEach(val => this.offers.push(Object.assign({}, val)))
  }

  getOrderOffers(): Observable<CartOfferDTO[]> {
    var clonedOffers: CartOfferDTO[] = [];
    if (this.offers) {

      //this.offers.forEach(val => clonedOffers.push(Object.assign({}, val)))
      this.offers.getValue().forEach(e => clonedOffers.push(Object.assign({}, e)));
      return of(clonedOffers);
        
    }
    else {
      return this.cartService.getOffersFromCart();//.subscribe((result) => {
       // this.offers = new BehaviorSubject(result); // Set pffers 
       // this.offers.subscribe(val => val.forEach(e => clonedOffers.push(Object.assign({}, e))));
      //});
    }
    
    //return clonedOffers;//clonedOffers;
  }

}
