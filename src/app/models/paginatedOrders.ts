import { Order } from "./order";

export class PaginatedOrders
{
    items: Order[] = [];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}