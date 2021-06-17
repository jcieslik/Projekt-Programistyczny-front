import { Component, OnInit } from '@angular/core';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-own-offers',
  templateUrl: './own-offers.component.html',
  styleUrls: ['./own-offers.component.scss']
})
export class OwnOffersComponent implements OnInit {

  offers: OfferWithBaseData[] = [];

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getOffersFromUser(this.user.id)
      .subscribe((response) => {
        this.offers = response;
      })
  }
}
