import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { Image } from 'src/app/models/image';
import { Offer } from 'src/app/models/offer';
import { Province } from 'src/app/models/province';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  returnUrl: string;

  user: User = JSON.parse(localStorage.getItem('user'));

  offer: Offer = new Offer();

  brands: Brand[] = [];

  provinces: Province[] = [];

  cities: City[] = [];

  categories: Category[] = [];
  
  selectedBrand: Brand;

  selectedProvince: Province;

  selectedCity: City;

  selectedCategory: Category;
   
  constructor(
    private offerService: OfferService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
  
  ngOnInit(): void {
    this.offer.sellerId = this.user.id;
    this.offerService.getDataForCreatingOffer()
      .subscribe((results) => {
        this.brands = results[0];
        this.cities = results[1];
        this.provinces = results[2];
        this.categories = results[3];
    })
  }
   
   
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
   
          reader.onload = (event:any) => {
            this.offer.images.push(new Image(event.target.result)); 
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
    
  submit(){
    this.offer.brandId = this.selectedBrand.id;
    this.offer.cityId = this.selectedCity.id;
    this.offer.provinceId = this.selectedProvince.id;
    this.offer.categoryId = this.selectedCategory.id;
    this.offer.images[0].isMainProductImage = true;

    this.offerService.createOffer(this.offer)
      .subscribe((response) => {
        this.router.navigate([this.returnUrl]);
      });
  }

  removeImage(index: number) {
    this.offer.images.splice(index, 1);
  }
}
