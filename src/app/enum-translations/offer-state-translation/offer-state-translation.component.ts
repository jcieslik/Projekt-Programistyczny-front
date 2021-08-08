import { Component, Input } from '@angular/core';
import { OfferState } from 'src/app/enums/offer-state';

@Component({
  selector: 'offer-state-i18n',
  template: `
  <ng-container i18n>
    {key, select,
      0 {Aktywna}
      1 {Zakończona}
      2 {Przedawniona}
      3 {Ukryta}
      4 {Zablokowana}
    }
  </ng-container>
  `,
})
export class OfferStateTranslationComponent {

  @Input()
  key: OfferState;
}
