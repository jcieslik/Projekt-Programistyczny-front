import { OfferWithBaseData } from "./offer-base-data";

export class PaginatedOffers
{
    items: OfferWithBaseData[] = [];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}