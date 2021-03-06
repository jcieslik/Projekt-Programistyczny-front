import { PaginationProperties } from "../enums/pagination-properties";

export class CommentPagination {
  subjectId: number;
  properties: PaginationProperties;
  onlyNotHidden: boolean;
}