import { Component } from '@angular/core';
import { MessagesService } from './services/message/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Projekt-Programistyczny-front';

  constructor(private messagesService: MessagesService) { }

  changeOfRoutes() {
    this.messagesService.getNumberOfUnreadMessages()
      .subscribe((result) => {
        this.messagesService.numberOfUnreadMessages.emit((result));
      })
  }
}
