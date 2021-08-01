import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Message } from 'src/app/models/message';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  @Output()
  displayingMessage: EventEmitter<Message> = new EventEmitter<Message>();

  mailboxType = MailboxType.Trash;

  isAllCheckboxChecked = false;

  displayedColumns: string[] = ['checkbox', 'sender', 'topic', 'sendDate'];

  defaultSort: string = "creation";

  model: PaginationProperties = new PaginationProperties();
  paginationMessages: PaginationProperties = new PaginationProperties();
  messagesPaginated: PaginatedMessages;

  searchText = '';
  
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
    this.isAllCheckboxChecked = false;

    this.getMessages();
  }

  getMessages() {
    this.messagesService.getMessagesByMailbox(MailboxType.Trash, this.model, this.searchText)
      .subscribe((result) => {
        this.messagesPaginated = result;
      });
  }

  displayMessage(message: Message) {
    this.displayingMessage.emit(message);
  }

  onAllSelected(event: any) {
    if(event.checked === true) {
      this.messagesPaginated.items.forEach(element => {
        element.isSelected = true;
      })
    } else {
      this.messagesPaginated.items.forEach(element => {
        element.isSelected = false;
      })
    }
  }

  onOneSelected() {
    this.isAllCheckboxChecked = false;
  }

  updateMessages(e: boolean) {
    if(e) {
      this.model.pageIndex = 1;
      this.isAllCheckboxChecked = false;
  
      this.getMessages();
    }
  }

  search(e: string) {
    this.searchText = e;
    this.getMessages();
  }
}
