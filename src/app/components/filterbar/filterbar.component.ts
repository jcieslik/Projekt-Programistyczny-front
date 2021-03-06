import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OfferType } from 'src/app/enums/offer-type';
import { ProductState } from 'src/app/enums/product-state';
import { Category } from 'src/app/models/category';
import { Province } from 'src/app/models/province';
import { SearchModel } from 'src/app/models/searchModel';
import { UserInfo } from 'src/app/models/user-info';
import { ProductCategoryService } from 'src/app/services/product-category/product-category.service';
import { ProvinceService } from 'src/app/services/province/province.service';
import { UserService } from 'src/app/services/user/user.service';

interface Map {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent implements OnInit {
  @Input()
  userId: number;

  @Output()
  pageChange = new EventEmitter<SearchModel>();

  user: UserInfo;

  constructor(private provinceService: ProvinceService, 
    private productCategoryService: ProductCategoryService, 
    private userService: UserService) { }

  allCategories: Category[];
  displayedCategories: Category[] = [];
  parentCategoryId: number = undefined;
  currentCategory: Category;

  provinces: Province[];
  provincesForm = new FormControl();

  minPrice: number;
  maxPrice: number;
  provincesIds: number[] = [];
  categoryId: number;
  offerTypes: Map[] = [
    { value: OfferType.BuyNow, viewValue: 'Kup teraz' },
    { value: OfferType.Auction, viewValue: 'Aukcja' }
  ];
  selectedOfferType: number;
  productStates: Map[] = [
    { value: ProductState.New, viewValue: 'Nowy' },
    { value: ProductState.VeryGood, viewValue: 'Bardzo dobry' },
    { value: ProductState.Used, viewValue: 'Używany' }
  ];
  selectedProductState: number;
  sortTypes: Map[] = [
    { value: 'price_asc', viewValue: 'Cena: rosnąco' },
    { value: 'price_desc', viewValue: 'Cena: malejąco' },
    { value: 'end_date_asc', viewValue: 'Czas do końca: najnowsze' },
    { value: 'end_date_desc', viewValue: 'Czas do końca: najstarsze' },
    { value: 'creation_asc', viewValue: 'Data dodania: najnowsze' },
    { value: 'creation_desc', viewValue: 'Data dodania: najstarsze' }
  ];
  selectedSortType: string;

  maxCategories: number = 20;

  ngOnInit(): void {
    if(this.userId) {
      this.userService.getUserInfo(this.userId)
        .subscribe((result) => {
          this.user = result;
        })
    }
    this.provinceService.getProvinces()
      .subscribe((response) => {
        this.provinces = response;
      })

    this.productCategoryService.getProductCategories()
      .subscribe((response) => {
        this.allCategories = response;
        this.listCategories();
      })
  }

  submit() {
    this.mapProvinces();

    const model = new SearchModel();
    model.minPrice = this.minPrice;
    model.maxPrice = this.maxPrice;
    model.provincesIds = this.provincesIds;
    model.offerType = this.selectedOfferType;
    model.productState = this.selectedProductState;
    model.orderBy = this.selectedSortType;
    model.categoryId = this.categoryId;

    this.pageChange.emit(model);
  }

  mapProvinces() {
    this.provincesIds = [];
    let provincesString = this.provincesForm.value + '';
    let provincesArray = provincesString.split(',');
    provincesArray.forEach(string => {
      this.provinces.forEach(province => {
        if (string == province.name) {
          this.provincesIds.push(province.id)
          return;
        }
      });
    });
  }

  reset() {
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.selectedProductState = undefined;
    this.selectedOfferType = undefined;
    this.provincesForm.reset();
    this.parentCategoryId = undefined;
    this.categoryId = undefined;
    this.listCategories();
  }

  listCategories() {
    this.displayedCategories = [];
    this.allCategories.forEach(element => {
      if (element.parentCategoryId == this.categoryId) {
        this.displayedCategories.push(element);
        if (this.displayedCategories.length == this.maxCategories)
          return;
      }
    });
  }

  onCategoryClick(category: Category) {
    if (!category) {
      this.currentCategory = undefined;
      this.categoryId = undefined;
      this.parentCategoryId = undefined;
    }
    else {
      this.currentCategory = category;
      this.categoryId = category.id;
      this.parentCategoryId = category.parentCategoryId;
    }
    this.listCategories();
    this.submit();
  }

  onBackClick() {
    this.onCategoryClick(this.getCategory(this.parentCategoryId));
  }

  getCategory(id: number) {
    let cat = new Category;
    if (!id)
      return undefined;

    this.allCategories.forEach(element => {
      if (element.id == id) {
        cat = element;
        return;
      }
    });
    return cat;
  }

}
