import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent implements OnInit {
  @Input()
  message: Message

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
}
