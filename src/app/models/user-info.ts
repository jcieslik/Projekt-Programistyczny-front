import { UserRole } from "../enums/user-role";
import { Province } from "./province";

export class UserInfo {
  id: number;
  cartId: number;
  username: string;
  role: UserRole;
  email: string;
  name: string;
  surname: string;
  city: string;
  street: string;
  postCode: string;
  province: Province;
  bankAccountNumber: string;
  isActive: boolean;
}