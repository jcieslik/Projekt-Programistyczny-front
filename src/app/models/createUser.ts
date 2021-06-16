import { UserRole } from "../enums/user-role"

export class CreateUser {
    username: string;
    password: string;
    role: UserRole;
    email: string;
    name: string;
    surname: string;
}