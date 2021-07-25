import { MailboxType } from "../enums/mailbox-type";

export class Message {
  id: number;
  senderId: number;
  recipientId: number;
  recipient: string;
  sender: string;
  topic: string;
  content: string;
  sendDate: string;
  mailboxType: MailboxType;  
}