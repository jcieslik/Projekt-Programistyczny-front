import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/models/payment';
import { DeliveryMethodService } from 'src/app/services/delivery-method/delivery-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryMethodWithOffer } from 'src/app/models/delivery-method-with-offer';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderStatus } from 'src/app/enums/order-status';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  offerId: number;

  deliveryMethods: DeliveryMethodWithOffer[] = [];

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

  deliveryMethodForm: FormGroup;

  constructor(private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private deliveryMethodService: DeliveryMethodService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')
    this.deliveryMethodService.getDeliveryMethodsFromOffer(this.offerId)
      .subscribe((result) => {
        this.deliveryMethods = result;
        this.f.option.setValue(this.deliveryMethods[0])
      })
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.deliveryMethodForm = this.fb.group({
      option: [new DeliveryMethodWithOffer(), [Validators.required]]
    });
  }

  get f() { return this.deliveryMethodForm.controls; }

  createOrder(): void {
    let order = new Order();
    order.offerId = this.offerId;
    order.customerId = this.user.id;
    order.orderStatus = 0;
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
  }
}
