import { Component, OnInit } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  mailboxTypes = [MailboxType.Inbox, MailboxType.Sent, MailboxType.Trash];

  constructor() { }

  ngOnInit(): void {
  }

  getMailboxIcon(mailbox: MailboxType) {
    switch(mailbox) {
      case MailboxType.Inbox:
        return "fas fa-envelope";
      case MailboxType.Sent:
        return "fas fa-paper-plane";
      case MailboxType.Trash:
        return "fas fa-trash";
    }
  }

}
