import { UserRole } from "../enums/user-role"

export class User {
    username: string;
    role: UserRole;
    email: string;
    name: string;
    surname: string;
}