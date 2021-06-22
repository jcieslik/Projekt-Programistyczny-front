import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: OfferWithBaseData[];
  
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getAllOffers()
      .subscribe((response) => {
        this.offers = response;
        console.log(this.offers)
      })
  }
}
