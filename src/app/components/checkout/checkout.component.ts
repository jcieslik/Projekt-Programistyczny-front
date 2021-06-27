import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51J6t0pFBQwYWjNW6VzVlX04L3de14TnSCfJgW3fTMGKytO4Ou0eSV6rSlZCJNvzXTq3Sc8Pw02udihz0uhma9xNZ00QeIQpbiQ',
      locale: 'pl',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
      }
    })

    paymentHandler.open({
      name: 'Zaplata',
      description: 'Wpisz dane o swojej karcie',
      amount: amount * 100,
    })
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript'
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
