import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent implements OnInit {
  @Input()
  message: Message;

  @Output()
  displayingMessage = new EventEmitter<boolean>();

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.changeMessageStatus([this.message.id], true)
      .subscribe(() => {
        this.messagesService.getNumberOfUnreadMessages()
          .subscribe((result) => {
            this.messagesService.numberOfUnreadMessages.emit((result));
          })
      })
  }

  replyToMessage() {

  }

  replyToMessageAll() {

  }

  deleteMessage() {
    this.messagesService.deleteMessages([this.message.id])
      .subscribe((result) => {
        this.displayingMessage.emit(false);
      })
  }

  goBackToMailbox() {
    this.displayingMessage.emit(false);
  }
}
