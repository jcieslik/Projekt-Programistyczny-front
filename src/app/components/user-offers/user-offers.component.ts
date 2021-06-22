import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss']
})
export class UserOffersComponent implements OnInit {
  userId: number;

  offers: OfferWithBaseData[];

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')
    this.offerService.getOffersFromUser(this.userId)
      .subscribe((result) => {
        this.offers = result;
      })
  }

}
