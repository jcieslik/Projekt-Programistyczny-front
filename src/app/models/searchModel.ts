export class SearchModel {
    sellerId: number;
    minPrice: number;
    maxPrice: number;
    cities: string[] = [];
    provincesIds: number[] = [];
    brands: string[] = [];
    categoryId: number;
    offerType: number;
    productState: number;
    offerState: number;
    pageIndex: number;
    pageSize: number;
    orderBy: string;
    searchText: string;
  }