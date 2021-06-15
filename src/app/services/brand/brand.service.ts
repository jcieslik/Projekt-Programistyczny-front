import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient) { }

  getBrands() {
    return this.http.get<Brand[]>(`${environment.apiUrl}/api/brand/GetBrands`);
  }
}
