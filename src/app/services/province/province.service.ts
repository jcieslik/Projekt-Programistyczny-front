import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from 'src/app/models/province';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get<Province[]>(`${environment.apiUrl}/api/Province/GetProvinces`);
  }
}
