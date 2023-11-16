import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SIGNUP = 'http://localhost:8000/user/signup';
  private REST_API_FORGOT_PASSWORD = 'http://localhost:8000/user/fogotPassword';
  private REST_API_LOGIN = 'http://localhost:8000/user/login';
  private REST_API_TOKEN = 'http://localhost:8000/user/checkToken';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCarts(){
    let cartJson = sessionStorage.getItem(`cart`);
    if(cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(carts: any) {
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart', cartJson);
  }

  public signup(data: any): Observable<any> {
    const url = `${this.REST_API_SIGNUP}`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }
  public forgotPassword(data: any): Observable<any> {
    const url = `${this.REST_API_FORGOT_PASSWORD}`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }
  public login(data: any): Observable<any> {
    const url = `${this.REST_API_LOGIN}`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }

  public checkToken() {
    const url = `${this.REST_API_TOKEN}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
