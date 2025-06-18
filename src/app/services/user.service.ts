import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL= 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  signUp(userData: {
    username: string;
    email: string;
    password: string
  }): Observable<any>{
    return this.http.post(`${this.BASE_URL}/signup`, userData);
  }

  login(credentials: {
    email: string;
    password: string
  }): Observable<any>{
    return this.http.post(`${this.BASE_URL}/login`, credentials);
  }
}
