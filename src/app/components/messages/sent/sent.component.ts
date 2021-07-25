import { Component, OnInit } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'recipients', 'topic', 'sendDate'];

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
    this.messagesService.getMessagesByMailbox(MailboxType.Sent, this.model)
      .subscribe((result) => {
        this.messagesPaginated = result;
      });
  }

}
