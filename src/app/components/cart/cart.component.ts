import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  offers: CartOfferDTO[] = [];

  user: User = JSON.parse(localStorage.getItem('user'))

  ngOnInit(): void {
    this.getOffersFromCart();
  }

  incrementOfferCount(offer: CartOfferDTO): void {
    offer.productsCount += 1;
    this.cartService.addOfferToCart(offer.offerId).subscribe();
  }

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

}