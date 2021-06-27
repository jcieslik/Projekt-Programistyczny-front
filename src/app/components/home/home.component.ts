import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { OfferService } from 'src/app/services/offer/offer.service';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: PaginatedOffers;
  model: SearchModel = new SearchModel();
  
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.initModel();
    this.offerService.getOffers(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  public getData(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;
    this.model.orderBy = e.orderBy;

    this.offerService.getOffers(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  private initModel() {
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = "creation";
  }
}
