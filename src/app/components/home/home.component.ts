import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { OfferService } from 'src/app/services/offer/offer.service';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  }

}
