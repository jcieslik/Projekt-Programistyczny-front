import { Component, Input } from '@angular/core';
import { OfferType } from 'src/app/enums/offer-type';

@Component({
  selector: 'offer-type-i18n',
  template: `
  <ng-container i18n>
    {key, select,
      0 {Kup teraz}
      1 {Aukcja}
    }
  </ng-container>
  `,
})
export class OfferTypeTranslationComponent {

  @Input()
  key: OfferType;
}
