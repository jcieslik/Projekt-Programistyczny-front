import { PaginationProperties } from "../enums/pagination-properties";

export class SearchComments {
  subjectId: number;
  properties: PaginationProperties;
  onlyNotHidden: boolean;
}