import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { CartService } from 'src/app/services/cart/cart.service';
import { OfferService } from 'src/app/services/offer/offer.service';
import { Offer } from 'src/app/models/offer';
import { SummarizeOrderService } from 'src/app/services/summarize-order/summarize-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private offerService: OfferService,
    private summarizeOrderService: SummarizeOrderService,
    private router: Router) { }

  offers: CartOfferDTO[] = [];

  user: User = JSON.parse(localStorage.getItem('user'))

  ngOnInit(): void {
    this.getOffersFromCart();
  }

  incrementOfferCount(offer: CartOfferDTO): Boolean {
    if (offer.productsCount < offer.availableProducts) {
      offer.productsCount += 1;
      this.cartService.addOfferToCart(offer.offerId).subscribe();
      return true;
    }
    return false;
  }

  getProductCount(offer: CartOfferDTO): number { return 10; }
  decrementOfferCount(offer: CartOfferDTO) {

    if (offer.productsCount > 1) {
      offer.productsCount -= 1;
    } else {
      this.offers.splice(this.offers.indexOf(offer), 1);
    }
    this.cartService.decrementOfferCountInCart(offer.offerId).subscribe();
  }

  getOffersFromCart() {
    this.cartService.getOffersFromCart().subscribe((result) => {
      this.offers = result;
    });;
  }

  removeOfferFromCart(offerId: number) {
    this.cartService.removeOfferFromCart(offerId).subscribe();
    this.offers = this.offers.filter(elem => elem.offerId !== offerId);
  }

  validateQuantity(offer: CartOfferDTO){ 
    return (offer.productsCount > 0 && offer.productsCount <= offer.availableProducts)
  }

  getTotalCost(){
    var cost = 0;
    this.offers.forEach(d => cost += d.priceForOneProduct * d.productsCount);
    return cost;
  }

  summarizeOrder(){
    this.summarizeOrderService.setOrderOffers(this.offers);
    this.router.navigateByUrl('/checkout')
  }
}