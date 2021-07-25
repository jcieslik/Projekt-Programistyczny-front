import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { CreateMessage } from 'src/app/models/create-message';
import { User } from 'src/app/models/user';
import { UserInfo } from 'src/app/models/user-info';
import { MessagesService } from 'src/app/services/message/messages.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  @Output()
  creatingMessage: EventEmitter<boolean> = new EventEmitter<boolean>();

  user: User = JSON.parse(localStorage.getItem('user'));

  editor: Editor;

  recipientsControl = new FormControl([]);

  recipientSearch: string;

  newMessage: CreateMessage = new CreateMessage();

  recipients: UserInfo[];

  recipientsDisplayed: UserInfo[];

  isAlertDisplayed = false;

  contactedUserId: number;

  constructor(private userService: UserService,
    private messagesService: MessagesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.newMessage.content = '';
    this.route.params.forEach(param => {
      this.contactedUserId = +param["id"];
    });
    this.userService.getMessageRecipients()
      .subscribe((result) => {
        this.recipients = result;
        this.recipientsDisplayed = result;
        if (this.contactedUserId) {
          let recipient = this.findRecipient(this.contactedUserId);
          this.recipientsControl.value.push(recipient);
        }
      })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onRecipientRemoved(recipient: UserInfo) {
    const recipients = this.recipientsControl.value as UserInfo[];
    this.removeFirst(recipients, recipient);
    this.recipientsControl.setValue(recipients);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  filterMyOptions() {
    let recipientsDispl: UserInfo[] = [];
    this.recipients.forEach((element) => {
      if (element.username.search(this.recipientSearch) != -1) {
        recipientsDispl.push(element);
      }
    })
    this.recipientsDisplayed = recipientsDispl;
  }

  closeAlert() {
    this.isAlertDisplayed = false;
  }

  sendMessage() {
    if (!this.newMessage.content || !this.newMessage.topic || this.recipientsControl.value.length < 1) {
      this.isAlertDisplayed = true;
    }
    else {
      this.newMessage.senderId = this.user.id;
      this.newMessage.recipientsIds = [];
      this.recipientsControl.value.forEach(element => {
        this.newMessage.recipientsIds.push(element.id);
      });
      this.messagesService.sendMessage(this.newMessage)
        .subscribe((result) => {
          this.creatingMessage.emit(false);
        })
    }
  }

  findRecipient(id: number) {
    for (let i = 0; i < this.recipients.length; i++) {
      if (this.recipients[i].id === id) {
        return this.recipients[i];
      }
    }
    return null
  }
}
