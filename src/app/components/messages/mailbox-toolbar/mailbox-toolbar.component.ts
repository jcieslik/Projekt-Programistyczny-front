import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-mailbox-toolbar',
  templateUrl: './mailbox-toolbar.component.html',
  styleUrls: ['./mailbox-toolbar.component.scss']
})
export class MailboxToolbarComponent {
  @Input() mailboxType: MailboxType;

  @Input() messages: PaginatedMessages;

  @Output() updatedMessages = new EventEmitter<boolean>();

  @Output() searchMessages = new EventEmitter<string>();

  searchText: string;

  constructor(private messagesService: MessagesService) { }

  search() {
    this.searchMessages.emit(this.searchText);
  }

  deleteMessages() {
    let selectedMessagesIds = [];
    this.messages.items.forEach(element => {
      if (element.isSelected) {
        selectedMessagesIds.push(element.id);
      }
    });
    this.messagesService.deleteMessages(selectedMessagesIds)
      .subscribe((result) => {
        this.updatedMessages.emit(result);
      });
  }

  takeBackMessages() {
    let selectedMessagesIds = [];
    this.messages.items.forEach(element => {
      if (element.isSelected) {
        selectedMessagesIds.push(element.id);
      }
    });
    this.messagesService.takeMessagesFromTrash(selectedMessagesIds)
      .subscribe((result) => {
        this.updatedMessages.emit(result);
      });
  }

  markMessagesAsRead() {
    let selectedMessagesIds = [];
    this.messages.items.forEach(element => {
      if (element.isSelected) {
        selectedMessagesIds.push(element.id);
      }
    });
    this.messagesService.changeMessageStatus(selectedMessagesIds, false)
      .subscribe((result) => {
        this.updatedMessages.emit(result);
      });
  }
}
