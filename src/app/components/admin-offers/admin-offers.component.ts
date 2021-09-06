import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferState } from 'src/app/enums/offer-state';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-admin-offers',
  templateUrl: './admin-offers.component.html',
  styleUrls: ['./admin-offers.component.scss']
})
export class AdminOffersComponent implements OnInit {

  offers: PaginatedOffers;
  model: SearchModel = new SearchModel();
  defaultSort: string = "creation_asc";
  searchText: string;
  
  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initModel();
    this.searchText = this.route.snapshot.paramMap.get('q');
    if (this.searchText == undefined)
      this.searchText = "";
    this.model.searchText = this.searchText;
    this.offerService.getOffers(this.model, OfferState.AllForAdmin)
      .subscribe((response) => {
        this.offers = response;
      })
  }

  public getData(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;
    this.model.orderBy = e.orderBy;

    this.offerService.getOffers(this.model, OfferState.AllForAdmin)
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

    this.offerService.getOffers(this.model, OfferState.AllForAdmin)
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
