import { Component, Input, OnInit } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';

@Component({
  selector: 'Mailbox-Type-i18n',
  template: `
  <ng-container i18n>
    {key, select,
      0 {Skrzynka odbiorcza}
      1 {Wysłane}
      2 {Kosz}
    }
  </ng-container>
  `,
})
export class MailboxTypeTranslationComponent {

  @Input()
  key: MailboxType;
}
