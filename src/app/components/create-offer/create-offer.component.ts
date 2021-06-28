import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { Image } from 'src/app/models/image';
import { CreateOffer } from 'src/app/models/create-offer';
import { Province } from 'src/app/models/province';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer/offer.service';
import { DeliveryMethod } from 'src/app/models/delivery-method';
import { DeliveryMethodWithOffer } from 'src/app/models/delivery-method-with-offer';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  returnUrl: string;

  user: User = JSON.parse(localStorage.getItem('user'));

  offer: CreateOffer = new CreateOffer();

  provinces: Province[] = [];

  categories: Category[] = [];

  deliveryMethods: DeliveryMethod[] = [];

  chosenDeliveryMethods: DeliveryMethodWithOffer[] = [];

  selectedProvince: Province;

  selectedCategory: Category;

  selectedCity: string;

  selectedBrand: string;
   
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
        this.provinces = results[0];
        this.categories = results[1];
        this.deliveryMethods = results[2];
        this.deliveryMethods.forEach(method => {
          let deliveryMethod = new DeliveryMethodWithOffer();
          deliveryMethod.deliveryMethodId = method.id;
          deliveryMethod.fullPrice = method.basePrice;
          deliveryMethod.name = method.name;
          this.chosenDeliveryMethods.push(deliveryMethod);
        })
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
    this.offer.brand = this.selectedBrand;
    this.offer.city = this.selectedCity;
    this.offer.provinceId = this.selectedProvince.id;
    this.offer.categoryId = this.selectedCategory.id;
    this.offer.images[0].isMainProductImage = true;
    this.offer.deliveryMethods = this.chosenDeliveryMethods.filter(method => {
      if(method.isSelected) {
        return method;
      }
    })

    this.offerService.createOffer(this.offer)
      .subscribe((response) => {
        this.router.navigate([this.returnUrl]);
      });
  }

  removeImage(index: number) {
    this.offer.images.splice(index, 1);
  }
}
