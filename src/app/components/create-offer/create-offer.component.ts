import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Image } from 'src/app/models/image';
import { CreateOffer } from 'src/app/models/create-offer';
import { Province } from 'src/app/models/province';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer/offer.service';
import { DeliveryMethod } from 'src/app/models/delivery-method';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from 'src/app/dialogs/dialog-category/dialog-category.component';
import { OfferType } from 'src/app/enums/offer-type';
import { ProductState } from 'src/app/enums/product-state';
import { OfferDeliveryDTO } from 'src/app/models/offer-delivery-dto';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('categorySelect') categorySelect: any;

  returnUrl: string;

  user: User = JSON.parse(localStorage.getItem('user'));

  offer: CreateOffer = new CreateOffer();

  provinces: Province[] = [];

  categories: Category[] = [];

  deliveryMethods: DeliveryMethod[] = [];

  chosenDeliveryMethods: OfferDeliveryDTO[] = [];

  today: Date = new Date();

  chosenCategories: Category[] = [];

  auctionTypes = [OfferType.BuyNow, OfferType.Auction]

  productStates = [ProductState.New, ProductState.VeryGood, ProductState.Used]

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    priceForOneProduct: ['', [Validators.required]],
    productCount: ['', [Validators.required]],
    selectedProvince: [null as Province, [Validators.required]],
    selectedCategory: [null as Category, [Validators.required]],
    selectedCity: ['', [Validators.required]],
    selectedBrand: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    selectedType: [OfferType.BuyNow],
    selectedState: [ProductState.New, [Validators.required]],
    minimalBid: ['', [Validators.required]]
  });

  get f() { return this.form.controls; }

  get province() {
    return this.form.get('selectedProvince');
  }

  get category() {
    return this.form.get('selectedCategory');
  }

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ngOnInit(): void {
    this.f.minimalBid.disable();
    let startDate = new Date();
    startDate.setSeconds(0)
    startDate.setMinutes(startDate.getMinutes() + 2);
    let endDate = new Date()
    endDate.setSeconds(0)
    endDate.setMinutes(startDate.getMinutes());
    endDate.setDate(endDate.getDate() + 7)

    this.f.startDate.setValue(startDate)
    this.f.endDate.setValue(endDate)
    this.offer.sellerId = this.user.id;
    this.offerService.getDataForCreatingOffer()
      .subscribe((results) => {
        this.provinces = results[0];
        this.categories = results[1];
        this.deliveryMethods = results[2];
        this.deliveryMethods.forEach(method => {
          let deliveryMethod = new OfferDeliveryDTO();
          deliveryMethod.deliveryMethodId = method.id;
          deliveryMethod.deliveryFullPrice = method.price;
          deliveryMethod.deliveryMethodName = method.name;
          this.chosenDeliveryMethods.push(deliveryMethod);
        })
      })
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.offer.images.push(new Image(event.target.result));
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit(): void {
    this.offer.deliveryMethods = this.chosenDeliveryMethods.filter(method => {
      if (method.isSelected) {
        return method;
      }
    });

    if (this.form.invalid) {
      alert("Wypełnij wszystkie wymagane pola!")
      return;
    } else if (!(this.offer.images.length > 0)) {
      alert("Dodaj przynajmniej jedno zdjęcie do oferty!")
      return;
    } else if (!(this.offer.deliveryMethods.length > 0)) {
      alert("Wybierz przynajmniej jeden sposób dostawy!")
      return;
    }

    if(this.f.selectedType.value === OfferType.BuyNow) {
      this.offer.productCount = this.f.productCount.value;
      this.offer.priceForOneProduct = this.f.priceForOneProduct.value;
    } else {
      this.offer.productCount = 1;
      this.offer.priceForOneProduct = 0;
      this.offer.minimalBid = this.f.minimalBid.value;
    }

    console.log(this.f.startDate)

    this.offer.title = this.f.title.value;
    this.offer.description = this.f.description.value;
    this.offer.startDate = new Date(this.f.startDate.value.getTime() - (this.f.startDate.value.getTimezoneOffset() * 60000)).toISOString();
    this.offer.endDate = new Date(this.f.endDate.value.getTime() - (this.f.endDate.value.getTimezoneOffset() * 60000)).toISOString();
    this.offer.brand = this.f.selectedBrand.value;
    this.offer.city = this.f.selectedCity.value;
    this.offer.offerType = this.f.selectedType.value;
    this.offer.provinceId = (this.province.value as Province).id;
    this.offer.categoryId = (this.category.value as Category).id;
    this.offer.images[0].isMainProductImage = true;

    console.log(this.offer)

    this.offerService.createOffer(this.offer)
      .subscribe((response) => {
        this.router.navigate([this.returnUrl]);
      });
  }

  removeImage(index: number) {
    this.offer.images.splice(index, 1);
  }

  openDialog(): void {
    this.chosenCategories = [];
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: '1200px',
      height: '300px',
      data: this.categories,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.chosenCategories.push(result);
        this.f.selectedCategory.setValue(result);
      }
    });
  }

  roundMinutes(date: Date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0);
    date.setHours(date.getHours() + 1)
    return date;
  }

  getMinEndDate(): Date {
    let date = new Date(this.today)
    date.setDate(this.f.startDate.value.getDate())
    return date;
  }

  changeAuctionType(type: any) {
    if(type.value === OfferType.BuyNow) {
      this.f.minimalBid.disable()
      this.f.priceForOneProduct.enable()
      this.f.productCount.enable();
    } else {
      this.f.minimalBid.enable()
      this.f.priceForOneProduct.disable()
      this.f.productCount.disable();
    }
  }
}