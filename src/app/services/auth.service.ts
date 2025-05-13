import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost/culturizer-api';

  constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/?route=login`, { email, password });
}

register(username: string, email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/?route=register`, { username, email, password });
}

}
