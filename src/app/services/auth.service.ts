import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost/culturizer-api/';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}?route=login`, data);
  }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}?route=register`, data);
  }
}
