import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { CreateMessage } from 'src/app/models/create-message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  mailboxTypes = [MailboxType.Inbox, MailboxType.Sent, MailboxType.Trash];

  currentMailbox = MailboxType.Inbox;

  creatingMessage = false;
  
  displayedMessage: Message = null;

  displayingMessage = false;

  reply: CreateMessage = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      let userId = param["id"];
      if(userId) {
        this.creatingMessage = true;
      }
    });
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
    this.displayingMessage = false;
    this.creatingMessage = false;
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
    this.displayingMessage = false;
    this.creatingMessage = true;
  }

  goBackToMailbox(event: boolean) {
    this.creatingMessage = event;
    this.currentMailbox = MailboxType.Sent;
  }

  displayMessage(event: Message) {
    this.displayedMessage = event;
    this.displayingMessage = true;
  }

  stopDisplayingMessage() {
    this.displayingMessage = false;
  }

  createReply(e: CreateMessage) {
    this.reply = e;
    this.displayingMessage = false;
    this.creatingMessage = true;
  }
}
