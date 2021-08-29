import { UserInfo } from "./user-info";

export class PaginatedUsers
{
    items: UserInfo[] = [];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}