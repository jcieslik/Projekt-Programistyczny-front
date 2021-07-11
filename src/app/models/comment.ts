import { UserInfo } from "./user-info";

export class Comment {
  content: string;
  rateValue: number;
  customer: UserInfo
  offerId: number;
  sellerId: number;
}