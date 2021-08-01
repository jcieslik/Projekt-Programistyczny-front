import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/models/payment';
import { DeliveryMethodService } from 'src/app/services/delivery-method/delivery-method.service';
import { Router } from '@angular/router';
import { DeliveryMethodWithOffer } from 'src/app/models/delivery-method-with-offer';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderStatus } from 'src/app/enums/order-status';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { SummarizeOrderService } from 'src/app/services/summarize-order/summarize-order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  offers: CartOfferDTO[] = [];

  offerWithDeliveryMethods: Map<CartOfferDTO, DeliveryMethodWithOffer[]> = new Map<CartOfferDTO, DeliveryMethodWithOffer[]>()

  user: User = JSON.parse(localStorage.getItem('user'));

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

  stripeTest: FormGroup;

  deliveryMethods: FormGroup;

  constructor(private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private deliveryMethodService: DeliveryMethodService,
    private router: Router,
    private orderService: OrderService,
    private summarizeOrderService: SummarizeOrderService,
    private cdRef: ChangeDetectorRef) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.deliveryMethods = this.fb.group({
      done: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.summarizeOrderService.getOrderOffers().subscribe(d => {
      this.offers = d;
      this.getDeliveryMethods();
    });
  }

  private getDeliveryMethods(): void {
    this.offerWithDeliveryMethods.clear();

    this.offers.forEach(d => {
      this.deliveryMethodService.getDeliveryMethodsFromOffer(d.offerId)
        .subscribe((result) => {
          this.offerWithDeliveryMethods.set(d, result);
        });
      this.cdRef.detectChanges();
    });
  }

  get f() { return this.deliveryMethods.controls; }

  allSelected(): boolean {
    if(this.offers.find(e => e.selectedDeliveryMethod === undefined)){
      console.log("nah")
      this.deliveryMethods.setValue({done: ''});
      return false;
    }
    console.log("yas")
    this.deliveryMethods.setValue({done: 'done'});
    return true;
  }
  createOrders(): void {
    this.offers.forEach(e => {
      let order = new Order();
      order.offerWithDeliveryId = e.offerId;
      order.customerId = this.user.id;
      order.orderStatus = OrderStatus.AwaitingForPayment;
      this.orderService.createOrder(order)
        .subscribe((response) => {
          const name = this.stripeTest.get('name').value;
          this.stripeService
            .createToken(this.card.element, { name })
            .subscribe((result) => {
              if (result.token) {
                let paymentRequest = new Payment();
                paymentRequest.tokenId = result.token.id;
                paymentRequest.amount = 2000;
                this.paymentService.makePayment(paymentRequest)
                  .subscribe(() => {
                    order.id = response.id;
                    order.paymentDate = new Date();
                    order.orderStatus = OrderStatus.InDelivery;
                    this.orderService.changeStatus(order)
                      .subscribe(() => {
                        this.router.navigate(['account']);
                      });
                  })
              }
              else {
                alert("Wystąpił błąd płatności");
              }
            });
        });
    });
  }

  setOfferDeliveryMethod(offer: CartOfferDTO, deliveryMethod: DeliveryMethodWithOffer){
    offer.selectedDeliveryMethod = deliveryMethod;
    console.log(offer.selectedDeliveryMethod.deliveryMethodName)
    this.allSelected();
  }
}
