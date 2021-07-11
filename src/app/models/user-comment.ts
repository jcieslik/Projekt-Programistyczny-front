import { UserInfo } from "./user-info";

export class UserComment {
  id: number;
  content: string;
  rateValue: number;
  customer: UserInfo
  offerId: number;
  sellerId: number;
  offerTitle: string;
}