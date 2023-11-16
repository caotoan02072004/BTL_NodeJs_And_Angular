import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_GET_PRODUCT = 'http://localhost:8000/product/get';
  private API_GET_DETAIL_PRODUCT = 'http://localhost:8000/PRODUCT/getOneProduct/';
  private API_GET_SALE_PRICE = 'http://localhost:8000/product/getSalePrice';
  private API_POST_PRODUCT = 'http://localhost:8000/product/add';
  private API_PUT_PRODUCT = 'http://localhost:8000/product/update/';
  private API_DELETE_PRODUCT = 'http://localhost:8000/product/delete/';
  private API_SEARCH_PRODUCT = 'http://localhost:8000/product/searchProduct/?name=';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };


  constructor(private httpClient: HttpClient) { }

  public getProduct(): Observable<any> {
    const url = `${this.API_GET_PRODUCT}`
    return this.httpClient.get<any>(url, this.httpOptions)
  }

  public getSalePrice(): Observable<any> {
    const url = `${this.API_GET_SALE_PRICE}`
    return this.httpClient.get<any>(url, this.httpOptions)
  }

  public postProduct(data: any): Observable<any> {
    const url = `${this.API_POST_PRODUCT}`
    return this.httpClient.post<any>(url, data, this.httpOptions)
  }
  public deleteProduct(id: number): Observable<any> {
    const url = `${this.API_DELETE_PRODUCT}` + id
    return this.httpClient.delete<any>(url, this.httpOptions)
  }
  public getOneProduct(id: number): Observable<any> {
    const url = `${this.API_GET_DETAIL_PRODUCT}` + id
    return this.httpClient.get<any>(url, this.httpOptions)
  }
  public updateProduct(id: number, data: any): Observable<any> {
    const url = `${this.API_PUT_PRODUCT}` + id
    return this.httpClient.put<any>(url, data, this .httpOptions)
  }
  public searchProduct(data: any): Observable<any> {
    const url = `${this.API_SEARCH_PRODUCT}` + data
    return this.httpClient.get<any>(url, this.httpOptions)
  }
}
