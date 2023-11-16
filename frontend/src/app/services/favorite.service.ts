import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationModule, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private API_GET_FAVORITE_CATE = 'http://localhost:8000/favorite/get';
  private API_GET_FAVORITE_PROD = 'http://localhost:8000/favorite/get';
  private API_DELETE_FAVORITE_PROD = 'http://localhost:8000/favorite/delete';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  public getDetailCategory(id: number): Observable<any> {
    const url = `${this.API_GET_FAVORITE_CATE}`
    return this.httpClient.get<any>(url, this.httpOptions)
  }

  public getDetailProduct(id: number): Observable<any> {
    const url = `${this.API_GET_FAVORITE_PROD}`
    return this.httpClient.get<any>(url,this.httpOptions)
  }

  public deleteFavorite(id: number): Observable<any> {
    const url = `${this.API_DELETE_FAVORITE_PROD}`
    return this.httpClient.delete<any>(url, this.httpOptions)
  }
}
