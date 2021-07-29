import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateMessage } from 'src/app/models/create-message';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
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

  @Output()
  reply = new EventEmitter<CreateMessage>();

  dateTimePipe: DatePipe = new DatePipe('pl');

  currentUser: User = JSON.parse(localStorage.getItem('user'));

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
    let message = new CreateMessage();
    message.recipientsIds = [this.message.senderId];
    message.topic = "Odp: " + this.message.topic;
    message.content = "<br><br><br>_________________________________________________________<br>Od: " + this.message.sender + "<br>Do: " + this.message.recipientsString + 
        "<br>Data: " + this.dateTimePipe.transform(this.message.sendDate, 'short') + "<br>Temat: " + this.message.topic + "<br>" + this.message.content;
    this.reply.emit(message);
  }

  replyToMessageAll() {
    let message = new CreateMessage();
    message.recipientsIds = [];
    this.message.recipients.forEach((element) => {
      if (this.currentUser.id != element[1]) {
        message.recipientsIds.push(element[1]);
      }
    })
    message.recipientsIds.push(this.message.senderId);
    message.topic = "Odp: " + this.message.topic;
    message.content = "<br><br><br>_________________________________________________________<br>Od: " + this.message.sender + "<br>Do: " + this.message.recipientsString + 
        "<br>Data: " + this.dateTimePipe.transform(this.message.sendDate, 'short') + "<br>Temat: " + this.message.topic + "<br>" + this.message.content;
    this.reply.emit(message);
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
