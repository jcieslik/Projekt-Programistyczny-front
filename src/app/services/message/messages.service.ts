import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailboxType } from 'src/app/enums/mailbox-type';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { PaginatedMessages } from 'src/app/models/paginatedMessages';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessagesByMailbox(mailboxType: MailboxType, pagination: PaginationProperties) {
    return this.http.post<PaginatedMessages>(`${environment.apiUrl}/api/Messages/GetMessagesFromUser?mailboxType=${mailboxType}`, pagination, { withCredentials: true })
  }
}
