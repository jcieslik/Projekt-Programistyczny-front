import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { SearchModel } from 'src/app/models/searchModel';
import { OfferService } from 'src/app/services/offer/offer.service';
import { ProductCategoryService } from 'src/app/services/product-category/product-category.service';

interface Map {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  categories: Category[];

  selectedCategory: Category;

  sortTypes: Map[] = [
    { value: 'price_asc', viewValue: 'Cena: rosnąco' },
    { value: 'price_desc', viewValue: 'Cena: malejąco' },
    { value: 'end_date_asc', viewValue: 'Czas do końca: najnowsze' },
    { value: 'end_date_desc', viewValue: 'Czas do końca: najstarsze' },
    { value: 'creation_asc', viewValue: 'Data dodania: najnowsze' },
    { value: 'creation_desc', viewValue: 'Data dodania: najstarsze' }
  ];
  selectedSortType: string = 'creation_asc';

  searchText: string;

  offers: PaginatedOffers;
  model: SearchModel = new SearchModel();
  defaultSort: string = "creation";
  
  constructor(private offerService: OfferService, private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.initModel();
    this.offerService.getOffersFromUserWishes(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
    this.productCategoryService.getProductCategoriesFromWishes()
      .subscribe((result) => {
        this.categories = result;
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

  applyFilters() {
    this.model.searchText = this.searchText;
    this.model.categoryId = this.selectedCategory?.id;
    this.model.orderBy = this.selectedSortType;
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    
    this.offerService.getOffersFromUserWishes(this.model)
      .subscribe((response) => {
        this.offers = response;
      })
  }

}
