import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer/offer.service';
import { User } from 'src/app/models/user';
import { CartOfferDTO } from 'src/app/models/cart-offer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private offerService: OfferService) { }

  offers: CartOfferDTO[] = [];
  
  user: User = JSON.parse(localStorage.getItem('user'))

  ngOnInit(): void {
    this.getOffersFromCart();
  }

  getOffersFromCart(){
    this.offerService.getOffersFromCart(this.user.id).subscribe((result) => {
        this.offers = result ;
      });;
  }

  removeOfferFromCart(offerId: number){
    this.offerService.removeOfferFromCart(offerId).subscribe();
    this.offers = this.offers.filter(elem => elem.offerId !== offerId);
  }
  
}