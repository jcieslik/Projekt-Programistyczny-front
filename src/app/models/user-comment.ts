import { UserInfo } from "./user-info";

export class UserComment {
  id: number;
  content: string;
  rateValue: number;
  offerId: number;
  customer: UserInfo;
  sellerId: number;
}