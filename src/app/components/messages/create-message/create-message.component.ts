import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  editor: Editor;
  html: '';
  
  constructor() { }
  
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
