import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Order } from 'src/app/models/order';
import { Payment } from 'src/app/models/payment';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  name: string = '';

  stripeCardValid: boolean = false;

  stripeForm: FormGroup;

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

  constructor(private fb: FormBuilder,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: Order) {
    this.stripeForm = this.fb.group({
      done: ['', [Validators.required]]
    });
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
    const name = this.name;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          let paymentRequest = new Payment();
          paymentRequest.tokenId = result.token.id;
          paymentRequest.amount = Math.round(this.data.fullPrice * 100);
          paymentRequest.description = "ID Oferty: " + this.data.offer.id + "; Nazwa oferty: " + this.data.offer.title;
          this.paymentService.makePayment(paymentRequest, this.data.id)
            .subscribe(() => {
            }, (error) => {
              alert("Wystąpił błąd płatności.");
            })
          return true;
        }
      });
  }
}
