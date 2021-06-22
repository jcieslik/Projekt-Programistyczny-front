import { Component, Input, OnInit } from '@angular/core';
import { ProductState } from 'src/app/enums/product-state';

@Component({
  selector: 'product-state-i18n',
  template: `
  <ng-container i18n>
    {key, select,
      0 {Nowy}
      1 {Bardzo dobry}
      2 {Używany}
    }
  </ng-container>
  `,
})
export class ProductStateTranslationComponent {

  @Input()
  key: ProductState;

}
