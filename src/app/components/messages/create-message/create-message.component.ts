import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { CreateMessage } from 'src/app/models/create-message';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  editor: Editor;
  
  newMessage: CreateMessage = new CreateMessage();

  recipients: UserInfo[];
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.editor = new Editor();
    this.userService.getMessageRecipients()
      .subscribe((result) => {
        this.recipients = result;
      })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
