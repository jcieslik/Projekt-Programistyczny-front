import { Component, Input } from '@angular/core';
import { OrderStatus } from 'src/app/enums/order-status';

@Component({
  selector: 'order-status-i18n',
  template: `
  <ng-container i18n>
    {key, select,
      0 {Oczekuje na płatność}
      1 {Wysłana}
      2 {Dostarczona}
    }
  </ng-container>
  `,
})
export class OrderStatusTranslationComponent {

  @Input()
  key: OrderStatus;
}
