import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/models/payment';
import { Router } from '@angular/router';
import { DeliveryMethodWithOffer } from 'src/app/models/delivery-method-with-offer';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderStatus } from 'src/app/enums/order-status';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { SummarizeOrderService } from 'src/app/services/summarize-order/summarize-order.service';
import { AngularInpostGeowidgetService, GeoWidgetMapTypeEnum, GeowidgetTypeEnum } from 'angular-inpost-geowidget';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user/user.service';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  offers: CartOfferDTO[] = [];

  stripeCardValid: boolean = false;

  user: User = JSON.parse(localStorage.getItem('user'));

  userInfo: UserInfo;

  mapType: GeoWidgetMapTypeEnum = GeoWidgetMapTypeEnum.GOOGLE_MAPS;

  name: string = '';

  public GeowidgetTypeEnum = GeowidgetTypeEnum;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'pl'
  };

  stripeForm: FormGroup;

  deliveryMethods: FormGroup;

  constructor(private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private router: Router,
    private orderService: OrderService,
    private summarizeOrderService: SummarizeOrderService,
    private userService: UserService,
    public angularInpostGeowidgetService: AngularInpostGeowidgetService) {
    this.stripeForm = this.fb.group({
      done: ['', [Validators.required]]
    });
    this.deliveryMethods = this.fb.group({
      done: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.summarizeOrderService.getOrderOffers().subscribe(d => {
      if(d.length === 0) {
        this.router.navigateByUrl('/home');
      }
      this.userService.getUserInfo(this.user.id)
        .subscribe((result) => {
          this.userInfo = result;
          let offers: CartOfferDTO[] = [];
          d.forEach((offer) => {
            offer.destinationCity = this.userInfo.city;
            offer.destinationStreet = this.userInfo.street;
            offer.destinationPostCode = this.userInfo.postCode;
            offers.push(offer);
          })
          this.offers = offers;
        });
    });
  }

  get f() { return this.deliveryMethods.controls; }

  allSelected(): boolean {
    if (this.offers.find(e => e.selectedDeliveryMethod === undefined)) {
      this.deliveryMethods.setValue({ done: '' });
      return false;
    }
    for (let offer of this.offers) {
      if (!offer.destinationCity || !offer.destinationStreet || !offer.destinationPostCode) {
        return false;
      }
    }
    this.deliveryMethods.setValue({ done: 'done' });
    return true;
  }
  createOrders(): void {
    this.offers.forEach(offer => {
      let order = new Order();
      order.offerWithDeliveryId = offer.selectedDeliveryMethod.deliveryMethodId;
      order.productCount = offer.productsCount;
      order.customerId = this.user.id;
      order.orderStatus = OrderStatus.AwaitingForPayment;
      order.cartOfferId = offer.id;
      order.fullPrice = offer.priceForOneProduct * order.productCount + offer.selectedDeliveryMethod.deliveryFullPrice;
      order.destinationCity = offer.destinationCity;
      order.destinationStreet = offer.destinationStreet;
      order.destinationPostCode = offer.destinationPostCode;
      this.orderService.createOrder(order)
        .subscribe((response) => {
          const name = this.name;
          this.stripeService
            .createToken(this.card.element, { name })
            .subscribe((result) => {
              if (result.token) {
                let paymentRequest = new Payment();
                paymentRequest.tokenId = result.token.id;
                paymentRequest.amount = Math.round((offer.priceForOneProduct * offer.productsCount + offer.selectedDeliveryMethod.deliveryFullPrice) * 100);
                paymentRequest.description = "ID Oferty: " + offer.id + "; Nazwa oferty: " + offer.title;
                this.paymentService.makePayment(paymentRequest)
                  .subscribe((result) => {
                    order.id = response.id;
                    order.paymentDate = new Date(Date.now());
                    order.orderStatus = OrderStatus.Paid;
                    this.orderService.changeStatus(order)
                      .subscribe(() => {
                        this.router.navigate(['account']);
                      });
                  }, (error) => {
                    alert("Wystąpił błąd płatności.");
                  })
              }
              else {
                alert("Wystąpił błąd płatności.");
              }
            });
        });
    });
  }

  setOfferDeliveryMethod(offer: CartOfferDTO, deliveryMethod: DeliveryMethodWithOffer) {
    offer.selectedDeliveryMethod = deliveryMethod;
    if (deliveryMethod.deliveryMethodName !== 'Paczkomaty InPost') {
      offer.destinationCity = this.userInfo.city;
      offer.destinationStreet = this.userInfo.street;
      offer.destinationPostCode = this.userInfo.postCode;
    } else {
      offer.destinationCity = '';
      offer.destinationStreet = '';
      offer.destinationPostCode = '';
    }
    this.allSelected();
  }

  selectPoint(event: any, offer: CartOfferDTO) {
    offer.destinationCity = event.address_details.city;
    offer.destinationPostCode = event.address_details.post_code;
    offer.destinationStreet = event.address_details.street + " " + event.address_details.building_number;
    this.allSelected();
  }

  onChange(event: any) {
    this.stripeCardValid = event.complete;
    if (this.stripeCardValid && this.name) {
      this.stripeForm.setValue({ done: 'done' });
    }
  }

  completedCardInfo() {
    if (!(this.stripeCardValid && this.name)) {
      this.stripeForm.setValue({ done: '' });
      return false;
    }
    this.stripeForm.setValue({ done: 'done' });
    return true;
  }
}
