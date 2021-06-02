import { UserRole } from "../enums/user-role"

export class User {
    username: string | undefined;
    role: UserRole | undefined;
    email: string | undefined;
    name: string | undefined;
    surname: string | undefined;
}