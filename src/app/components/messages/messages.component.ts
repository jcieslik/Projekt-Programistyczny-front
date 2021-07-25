import { Component, OnInit } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  mailboxTypes = [MailboxType.Inbox, MailboxType.Sent, MailboxType.Trash];

  currentMailbox = MailboxType.Inbox;

  creatingMessage = false;

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

  getButtonColor(mailbox: MailboxType) {
    return this.currentMailbox === mailbox ? 'primary' : '';
  }

  changeMailbox(mailbox: MailboxType) {
    switch(mailbox) {
      case MailboxType.Inbox:
        this.currentMailbox = MailboxType.Inbox;
        this.creatingMessage = false;
        break;
      case MailboxType.Sent:
        this.currentMailbox = MailboxType.Sent;
        this.creatingMessage = false;
        break;
      case MailboxType.Trash:
        this.currentMailbox = MailboxType.Trash;
        this.creatingMessage = false;
        break;
    }
  }

  createMessage() {
    this.creatingMessage = true;
  }

  goBackToMailbox(event: boolean) {
    this.creatingMessage = event;
    this.currentMailbox = MailboxType.Sent;
  }
}
