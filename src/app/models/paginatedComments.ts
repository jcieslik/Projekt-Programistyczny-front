import { Comment } from "./comment";

export class PaginatedComments
{
    items: Comment[] = [];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}