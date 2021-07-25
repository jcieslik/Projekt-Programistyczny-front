import { MailboxType } from "../enums/mailbox-type";

export class Message {
  id: number;
  senderId: number;
  recipients: [number, string];
  recipientsString: string;
  sender: string;
  topic: string;
  content: string;
  sendDate: string;
  mailboxType: MailboxType;  
  isRead: boolean;
  isSelected: boolean;
}