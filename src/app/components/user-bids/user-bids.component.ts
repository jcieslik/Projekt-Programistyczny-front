import { Component, Input, OnInit } from '@angular/core';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Bid } from 'src/app/models/bid';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-user-bids',
  templateUrl: './user-bids.component.html',
  styleUrls: ['./user-bids.component.scss']
})
export class UserBidsComponent implements OnInit {
  @Input()
  userId: number;

  defaultSort: string = "creation";

  model: PaginationProperties = new PaginationProperties();
  paginationBids: PaginationProperties = new PaginationProperties();
  bidsPaginated: PaginatedOffers;

  paginatedBids: PaginatedOffers;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.initModel();
    this.getOffers();
  }

  initModel() {
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;

    this.paginationBids.pageIndex = 0;
    this.paginationBids.pageSize = 10;
    this.paginationBids.orderBy = this.defaultSort;
  }

  getOffers() {
    this.offerService.getUserBidOffers(this.model)
      .subscribe((result) => {
        this.paginatedBids = result;
      })
  }

  public handlePageBids(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;

    this.getOffers();
  }
}
