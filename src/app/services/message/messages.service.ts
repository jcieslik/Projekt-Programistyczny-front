import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { CreateMessage } from 'src/app/models/create-message';
import { Message } from 'src/app/models/message';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public numberOfUnreadMessages: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getMessagesByMailbox(mailboxType: MailboxType, pagination: PaginationProperties) {
    return this.http.post<PaginatedMessages>(`${environment.apiUrl}/api/Messages/GetMessagesFromUser?mailboxType=${mailboxType}`, pagination, { withCredentials: true })
  }

  sendMessage(message: CreateMessage) {
    return this.http.post<Message>(`${environment.apiUrl}/api/Messages/CreateMessage`, message, { withCredentials: true })
  }

  getNumberOfUnreadMessages() {
    return this.http.get<number>(`${environment.apiUrl}/api/Messages/GetNumberOfUnreadMessages`, { withCredentials: true })
  }

  changeMessageStatus(messageIds: number[], isRead: boolean) {
    return this.http.put<Message>(`${environment.apiUrl}/api/Messages/ChangeMessagesStatus?isRead=${isRead}`, messageIds, { withCredentials: true })
  }
}
