import { Message } from "./message";

export class PaginatedMessages
{
    items: Message[] = [];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}