import { UserComment } from "./user-comment";

export class PaginatedComments {
  items: UserComment[] = [];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}