import { Component, OnInit } from '@angular/core';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-your-offers',
  templateUrl: './your-offers.component.html',
  styleUrls: ['./your-offers.component.scss']
})
export class YourOffersComponent implements OnInit {

  offers: OfferWithBaseData[] = [];

  user: User = JSON.parse(localStorage.getItem('user'))

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getOffersFromUser(this.user.id)
      .subscribe((result) => {
        this.offers = result;
      })
  }

}
