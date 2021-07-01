import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OfferType } from 'src/app/enums/offer-type';
import { ProductState } from 'src/app/enums/product-state';
import { Category } from 'src/app/models/category';
import { Province } from 'src/app/models/province';
import { SearchModel } from 'src/app/models/searchModel';
import { ProductCategoryService } from 'src/app/services/product-category/product-category.service';
import { ProvinceService } from 'src/app/services/province/province.service';

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

  @Output()
  pageChange = new EventEmitter<SearchModel>();

  constructor(private provinceService: ProvinceService, private productCategoryService: ProductCategoryService) { }

  allCategories: Category[];
  displayedCategories: Category[] = [];
  parentCategoryId: number = undefined;
  currentCategory: Category;

  provinces: Province[];
  provincesForm = new FormControl();
  provincesList: string[] = ['Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie', 'Łódzkie', 'Małopolskie', 
                        'Mazowiecke', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
                        'Świętokrzyskie', 'Warmińsko-Mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'];

  minPrice: number;
  maxPrice: number;
  provincesIds: number[] = [];
  categoryId: number;
  offerTypes: Map[] = [
    {value: OfferType.BuyNow, viewValue: 'Kup teraz'},
    {value: OfferType.Auction, viewValue: 'Aukcja'}
  ];
  selectedOfferType: number;
  productStates: Map[] = [
    {value: ProductState.New, viewValue: 'Nowy'},
    {value: ProductState.VeryGood, viewValue: 'Bardzo dobry'},
    {value: ProductState.Used, viewValue: 'Używany'}
  ];
  selectedProductState: number;
  sortTypes: Map[] = [
    {value: 'price_asc', viewValue: 'Cena: rosnąco'},
    {value: 'price_desc', viewValue: 'Cena: malejąco'},
    {value: 'rate', viewValue: 'Ocena'},
    {value: 'creation', viewValue: 'Data dodania'}
  ];
  selectedSortType: string;

  provincesString:string;
  provincesArray: string[];

  maxCategories: number = 20;

  ngOnInit(): void {
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
    this.provincesString = this.provincesForm.value + '';
    this.provincesArray = this.provincesString.split(',');
    this.provincesArray.forEach(string => {
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
