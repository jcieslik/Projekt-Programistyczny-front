import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss']
})
export class UserOffersComponent implements OnInit {
  userId: number;
  offers: PaginatedOffers;
  model: SearchModel = new SearchModel();
  defaultSort: string = "creation";
  
  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')
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

  public getSearchModel(e: any) {
    this.model.minPrice = e.minPrice;
    this.model.maxPrice = e.maxPrice;
    this.model.offerType = e.offerType;
    this.model.productState = e.productState;
    this.model.provincesIds = e.provincesIds;
    this.model.categoryId = e.categoryId;
    
    if (e.orderBy == undefined)
      this.model.orderBy = this.defaultSort;
    else
      this.model.orderBy = e.orderBy;

    this.offerService.getOffers(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  private initModel() {
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;
    this.model.sellerId = this.userId;
  }

}
