import { PaginationProperties } from "../enums/pagination-properties";

export class CommentPagination {
    subjectId: number;
    pagination: PaginationProperties;
    onlyNotHidden: boolean;
}