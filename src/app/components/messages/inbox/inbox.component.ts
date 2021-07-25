import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Message } from 'src/app/models/message';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  @Output()
  displayingMessage: EventEmitter<Message> = new EventEmitter<Message>();

  displayedColumns: string[] = ['checkbox', 'sender', 'topic', 'sendDate'];

  defaultSort: string = "creation";

  model: PaginationProperties = new PaginationProperties();
  paginationMessages: PaginationProperties = new PaginationProperties();
  messagesPaginated: PaginatedMessages;
  
  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.initModel();
    this.getMessages();
  }

  private initModel() {
    this.model = new PaginationProperties();
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;

    this.paginationMessages.pageIndex = 0;
    this.paginationMessages.pageSize = 10;
    this.paginationMessages.orderBy = this.defaultSort;
  }

  public handlePageMessages(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;

    this.getMessages();
  }

  getMessages() {
    this.messagesService.getMessagesByMailbox(MailboxType.Inbox, this.model)
      .subscribe((result) => {
        this.messagesPaginated = result;
      });
  }

  displayMessage(message: Message) {
    this.displayingMessage.emit(message);
  }

}
