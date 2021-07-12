import { Component, OnInit } from '@angular/core';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  offers: PaginatedOffers;
  model: SearchModel = new SearchModel();
  defaultSort: string = "creation";
  
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.initModel();
    this.offerService.getOffersFromUserWishes(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  public getData(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;
    this.model.orderBy = e.orderBy;

    this.offerService.getOffersFromUserWishes(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  private initModel() {
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;
  }

}
