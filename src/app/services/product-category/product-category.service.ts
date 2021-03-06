import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getProductCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/ProductCategory/GetProductCategories`);
  }

  getProductCategoriesFromWishes() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/ProductCategory/GetProductCategoriesFromUserWishes`, { withCredentials: true });
  }
}
