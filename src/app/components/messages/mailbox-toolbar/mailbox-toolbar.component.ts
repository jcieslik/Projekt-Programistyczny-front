import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailbox-toolbar',
  templateUrl: './mailbox-toolbar.component.html',
  styleUrls: ['./mailbox-toolbar.component.scss']
})
export class MailboxToolbarComponent implements OnInit {

  searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

  search() {

  }

  deleteMessages() {

  }
}
